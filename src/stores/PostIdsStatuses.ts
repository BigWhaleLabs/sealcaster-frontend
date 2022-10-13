import { PostStatus } from 'models/PostStatus'
import { proxy } from 'valtio'
import getPostStatuses from 'helpers/getPostStatuses'

export interface LastUserPostData {
  blockchainId: number
  status: PostStatus
  serviceId?: string
}

interface PostStatusStoreType {
  lastUserPost?: { [account: string]: LastUserPostData }
  statuses: { [blockchainId: number]: Promise<PostStatus> }
  idToMerkleRoot: { [blockchainId: number]: Promise<string | undefined> }
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

  for (const { blockchainId, status, serviceId } of updatedStatuses) {
    postStatusStore.statuses[blockchainId] = Promise.resolve(status)
    postStatusStore.idToMerkleRoot[blockchainId] = Promise.resolve(serviceId)

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

setInterval(async () => {
  const ids: number[] = []

  await Promise.all(
    Object.entries(postStatusStore.statuses).map(
      async ([blockchainId, promiseStatus]) => {
        const status = await promiseStatus
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

export default postStatusStore
