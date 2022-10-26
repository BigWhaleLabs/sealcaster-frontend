import { derive } from 'valtio/utils'
import { farcasterContract } from 'stores/PostStore'
import { proxy } from 'valtio'
import getPostStatuses from 'helpers/getPostStatuses'
import getQuestionOfTheDayIds from 'helpers/getQuestionOfTheDayIds'
import safeTransformPostOutput from 'helpers/safeTransformPostOutput'

interface QodStoreType {
  qodAddress: Promise<string>
  lastQoDId: Promise<number>
}

const state = proxy<QodStoreType>({
  qodAddress: farcasterContract.replyAllAddress(),
  lastQoDId: getQuestionOfTheDayIds(farcasterContract).then((ids: number[]) =>
    Math.max(...ids)
  ),
})

const QodStore = derive(
  {
    lastQoDPost: async (get) => {
      const lastId = await get(state).lastQoDId
      const merkleRoot = await getPostStatuses([lastId])

      if (!merkleRoot.length) return

      const post = await farcasterContract
        .posts(lastId - 1)
        .then(safeTransformPostOutput)
      return { qod: post, merkleRoot: merkleRoot[0].serviceId }
    },
  },
  { proxy: state }
)

farcasterContract.on(
  farcasterContract.filters.PostSaved(),
  async (id, sender) => {
    const replyToAll = await QodStore.qodAddress
    if (sender !== replyToAll) return

    QodStore.lastQoDId = Promise.resolve(id.toNumber())
  }
)

export default QodStore
