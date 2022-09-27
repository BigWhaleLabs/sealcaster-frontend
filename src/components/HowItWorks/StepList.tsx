import { CardParagraph } from 'components/ui/Text'
import OrderedList from 'components/OrderedList'

export default function () {
  return (
    <OrderedList>
      <CardParagraph>
        You verify that you have a profile on Farcaster by connecting a wallet
        you connected to Farcaster.
      </CardParagraph>
      <CardParagraph>
        We create your burner wallet with a Farcaster ZK badge.
      </CardParagraph>
      <CardParagraph>You create a cast that will be anonymous.</CardParagraph>
    </OrderedList>
  )
}
