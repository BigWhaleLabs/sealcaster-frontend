import { CardParagraph } from 'components/ui/Text'
import OrderedList from 'components/OrderedList'

export default function () {
  return (
    <OrderedList>
      <CardParagraph>
        Verify that you have a profile on Farcaster by matching your username to
        the wallet you have connected to Farcaster.
      </CardParagraph>
      <CardParagraph>
        Create your burner wallet with a Farcaster ZK badge.
      </CardParagraph>
      <CardParagraph>Create a cast that will be anonymous.</CardParagraph>
    </OrderedList>
  )
}
