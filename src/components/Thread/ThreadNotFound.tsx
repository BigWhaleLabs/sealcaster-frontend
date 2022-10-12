import { BodyText } from 'components/ui/Text'
import BareCard from 'components/BareCard'
import Button from 'components/ui/Button'
import SadSealColorful from 'icons/SadSealColorful'
import classNamesToString from 'helpers/classNamesToString'

export default function () {
  return (
    <BareCard centered gapY>
      <SadSealColorful />
      <h1 className={classNamesToString('colorful-text')}>UH-OH</h1>
      <BodyText>
        We were unable to locate the thread you were looking for. Please check
        retry your link or check out the latest.
      </BodyText>
      <a href="/">
        <Button type="primary" small center>
          View recent casts
        </Button>
      </a>
    </BareCard>
  )
}
