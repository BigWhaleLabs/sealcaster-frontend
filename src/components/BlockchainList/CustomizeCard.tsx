import { AccentText, CardSubheader, PostText } from 'components/ui/Text'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'

const cardContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-start'),
  gap('gap-y-2')
)
export default function () {
  return (
    <Card blueBg>
      <div className={cardContainer}>
        <CardSubheader>
          Customize your anonymous burner wallet with{' '}
          <AccentText bold color="text-accent">
            SealCred{' '}
          </AccentText>
        </CardSubheader>
        <PostText small>
          SealCred is an open-source privacy-preserving social protocol powered
          by zero-knowledge proofs. We allow users to easily create pseudonymous
          identities/wallets and transfer social capital from wallet A to wallet
          B using anonymous but verified, soulbound zkNFTs or zkBadges.
        </PostText>
      </div>
      <Button type="primary" small url="https://sealcred.xyz">
        Try it out.
      </Button>
    </Card>
  )
}
