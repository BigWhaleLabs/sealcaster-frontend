import { PostStatus } from 'models/PostStatus'
import { proxy } from 'valtio'
import getPostStatuses from 'helpers/getPostStatuses'

export interface LastUserPostData {
  id: number
  status: PostStatus
  serviceId?: string
}

interface PostStatusStoreType {
  lastUserPost?: { [account: string]: LastUserPostData }
  statuses: { [postId: number]: Promise<PostStatus> }
  idToMerkleRoot: { [postId: number]: Promise<string | undefined> }
}

interface CheckStatusesStoreProps {
  ids: number[]
  force?: boolean
}

const postStatusStore = proxy<PostStatusStoreType>({
  lastUserPost: undefined,
  statuses: {},
  idToMerkleRoot: {},
})

export async function updateStatuses(ids: number[]) {
  if (ids.length === 0) return

  const updatedStatuses = await getPostStatuses(ids)

  for (const { id, status, serviceId } of updatedStatuses) {
    postStatusStore.statuses[id] = Promise.resolve(status)
    postStatusStore.idToMerkleRoot[id] = Promise.resolve(serviceId)

    const lastUserPost = postStatusStore.lastUserPost
    if (!lastUserPost) continue

    // Update status of lastUserPost only having blockchainId
    Object.keys(lastUserPost).filter((account) => {
      if (
        !lastUserPost[account] ||
        !(lastUserPost[account].id === id) ||
        !postStatusStore.lastUserPost
      )
        return
      postStatusStore.lastUserPost[account] = {
        id,
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

setInterval(async () => {
  const ids: number[] = []

  await Promise.all(
    Object.entries(postStatusStore.statuses).map(
      async ([postId, promiseStatus]) => {
        const status = await promiseStatus
        if (status === PostStatus.pending || status === PostStatus.approved)
          ids.push(Number(postId))
      }
    )
  )
  if (!ids.length) return

  await checkStatuses({
    ids: [...new Set(ids)], // to remove duplicates
    force: false,
  })
}, 5000)

export default postStatusStore
