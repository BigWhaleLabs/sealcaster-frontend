import { derive } from 'valtio/utils'
import { proxy } from 'valtio'
import getPostStatuses from 'helpers/getPostStatuses'
import getPostStorage from 'helpers/getPostStorage'
import getQuestionOfTheDayIds from 'helpers/getQuestionOfTheDayIds'
import safeTransformPostOutput from 'helpers/safeTransformPostOutput'

interface QodStoreType {
  qodAddress: Promise<string>
  allQodPostIds: Promise<number[]>
}

const contract = getPostStorage(false)

const state = proxy<QodStoreType>({
  qodAddress: contract.replyAllAddress(),
  allQodPostIds: getQuestionOfTheDayIds(contract),
})

const QodStore = derive(
  {
    lastQoDPost: async (get) => {
      const qodIds = await get(state).allQodPostIds
      const lastId = !!qodIds.length && Math.max(...qodIds)
      if (!lastId) return

      const hash = await getPostStatuses([lastId])
      if (!hash.length) return

      const post = await contract
        .posts(lastId - 1)
        .then(safeTransformPostOutput)
      return { qod: post, hash: hash[0].serviceId }
    },
  },
  { proxy: state }
)

export default QodStore
