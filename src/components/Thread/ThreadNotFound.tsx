import { BodyText } from 'components/ui/Text'
import { dropShadow } from 'classnames/tailwind'
import BareCard from 'components/BareCard'
import Button from 'components/ui/Button'
import SadSealColorful from 'icons/SadSealColorful'
import classNamesToString from 'helpers/classNamesToString'

export default function () {
  return (
    <BareCard centered gapY>
      <SadSealColorful />
      <div className={dropShadow('drop-shadow-formal-accent')}>
        <h1 className={classNamesToString('colorful-text')}>UH-OH</h1>
      </div>
      <BodyText large>
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
