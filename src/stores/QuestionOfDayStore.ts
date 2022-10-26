import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import getPostStatuses from 'helpers/getPostStatuses'
import getPostStorage from 'helpers/getPostStorage'
import getQuestionOfTheDayIds from 'helpers/getQuestionOfTheDayIds'
import safeTransformPostOutput from 'helpers/safeTransformPostOutput'

interface QodStoreType {
  qodAddress: Promise<string>
  lastQoDId: Promise<number>
}

const contract = getPostStorage()

const state = proxy<QodStoreType>({
  qodAddress: contract.replyAllAddress(),
  lastQoDId: getQuestionOfTheDayIds(contract).then((ids: number[]) =>
    Math.max(...ids)
  ),
})

const QodStore = derive(
  {
    lastQoDPost: async (get) => {
      const lastId = await get(state).lastQoDId
      const merkleRoot = await getPostStatuses([lastId])

      if (!merkleRoot.length) return

      const post = await contract
        .posts(lastId - 1)
        .then(safeTransformPostOutput)
      return { qod: post, merkleRoot: merkleRoot[0].serviceId }
    },
  },
  { proxy: state }
)

contract.on(contract.filters.PostSaved(), async (id, sender) => {
  const replyToAll = await QodStore.qodAddress
  if (sender !== replyToAll) return

  QodStore.lastQoDId = Promise.resolve(id.toNumber())
})

export default QodStore
