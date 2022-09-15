import { PostStatus } from 'models/PostStatus'
import { proxy } from 'valtio'
import PostStore from 'stores/PostStore'
import getPostStatuses from 'helpers/getPostStatuses'

interface PostData {
  status: PostStatus
  serviceId?: number | undefined
}

export interface LastUserPostData {
  blockchainId: number
  status: PostStatus
  serviceId?: number
}

interface PostStatusStoreType {
  lastUserPost?: { [account: string]: LastUserPostData }
  statuses: { [blockchainId: number]: Promise<PostData> }
}

interface CheckStatusesStoreProps {
  ids: number[]
  force?: boolean
}

const postStatusStore = proxy<PostStatusStoreType>({
  lastUserPost: undefined,
  statuses: {},
})

export async function updateStatuses(ids: number[]) {
  const updatedStatuses = await getPostStatuses(ids)

  for (const { blockchainId, status, serviceId } of updatedStatuses) {
    postStatusStore.statuses[blockchainId] = Promise.resolve({
      status,
      serviceId,
    })

    const lastUserPost = postStatusStore.lastUserPost
    if (!lastUserPost) continue

    // Update status of lastUserPost only having blockchainId
    Object.keys(lastUserPost).filter((account) => {
      if (
        !lastUserPost[account] ||
        !(lastUserPost[account].blockchainId === blockchainId) ||
        !postStatusStore.lastUserPost
      )
        return
      postStatusStore.lastUserPost[account] = {
        blockchainId,
        status,
        serviceId,
      }
    })
  }
}

let checkingStatuses = false
async function checkStatuses({ ids, force }: CheckStatusesStoreProps) {
  if (checkingStatuses && !force) return
  checkingStatuses = true
  try {
    await updateStatuses(ids)
  } catch (error) {
    console.error(error)
  } finally {
    checkingStatuses = false
  }
}

async function updateStatusesForSelectedPosts() {
  const ids = (await PostStore.posts).map(({ id }) => id.toNumber())
  void checkStatuses({ ids, force: true })
}

setInterval(() => updateStatusesForSelectedPosts(), 5000)

setInterval(async () => {
  if (!postStatusStore.statuses) return
  const ids: number[] = []

  await Promise.all(
    Object.entries(postStatusStore.statuses).map(
      async ([blockchainId, postData]) => {
        const { status } = await postData
        if (status === PostStatus.pending || status === PostStatus.approved)
          ids.push(Number(blockchainId))
      }
    )
  )
  if (!ids) return

  await checkStatuses({
    ids,
    force: false,
  })
}, 5000)

export default postStatusStore
