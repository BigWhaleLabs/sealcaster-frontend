import { CardParagraph } from 'components/ui/Text'
import OrderedList from 'components/OrderedList'

export default function () {
  return (
    <OrderedList>
      <CardParagraph>
        You'll verify that you have a profile on Farcaster by connecting the
        wallet you connected to Farcaster.
      </CardParagraph>
      <CardParagraph>
        We'll create your burner wallet with a Farcaster zk badge.
      </CardParagraph>
      <CardParagraph>Create a cast that will be anonymous.</CardParagraph>
    </OrderedList>
  )
}
