import { PostStatus } from 'models/PostStatus'
import { proxy } from 'valtio'
import PostStore from 'stores/PostStore'
import getPostStatuses from 'helpers/getPostStatuses'

interface PostData {
  status: PostStatus
  serviceId?: string | undefined
}

export interface LastUserPostData {
  blockchainId: number
  status: PostStatus
  serviceId?: string
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

async function updateStatuses(ids: number[]) {
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

function updateStatusesForAllPosts() {
  const ids = Object.keys(PostStore.posts).map(Number)
  void checkStatuses({ ids, force: true })
}

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
  if (!ids.length) return

  await checkStatuses({
    ids,
    force: false,
  })
}, 5000)

void updateStatusesForAllPosts()

export default postStatusStore
