import { CardParagraph } from 'components/ui/Text'
import OrderedList from 'components/OrderedList'

export default function () {
  return (
    <OrderedList>
      <CardParagraph>
        When you initiate a ‘cast’, you’ll verify you’re on Farcaster by
        connecting the wallet you have connected to Farcaster.
      </CardParagraph>
      <CardParagraph>
        Once verified, we snap our magic fingers and post your cast using a
        burner wallet.
      </CardParagraph>
      <CardParagraph>
        Done! Your cast is posted to Farcaster and the blockchain. Additionally,
        you keep the burner if you wish to use it as your pseudonymous identity.{' '}
      </CardParagraph>
    </OrderedList>
  )
}
