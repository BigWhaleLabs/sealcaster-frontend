import { derive, subscribeKey } from 'valtio/utils'
import { proxy } from 'valtio'
import getPostStatuses from 'helpers/getPostStatuses'
import getPostStorage from 'helpers/getPostStorage'
import getQuestionOfTheDayIds from 'helpers/getQuestionOfTheDayIds'
import safeTransformPostOutput from 'helpers/safeTransformPostOutput'

interface QodStoreType {
  qodAddress: Promise<string>
  allQodPostIds: Promise<number[]>
  lastQoDId: Promise<number | undefined>
}

const contract = getPostStorage()

const state = proxy<QodStoreType>({
  qodAddress: contract.replyAllAddress(),
  allQodPostIds: getQuestionOfTheDayIds(contract),
  lastQoDId: Promise.resolve(undefined),
})

subscribeKey(state, 'allQodPostIds', async (allQodPostIds) => {
  const listOfIds = await allQodPostIds
  state.lastQoDId = Promise.resolve(
    listOfIds.length ? Math.max(...listOfIds) : undefined
  )
})

const QodStore = derive(
  {
    lastQoDPost: async (get) => {
      const lastId = await get(state).lastQoDId
      if (!lastId) return

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

export default QodStore
