import { BodyText } from 'components/ui/Text'
import BareCard from 'components/BareCard'
import Button from 'components/ui/Button'
import SadSealColorful from 'icons/SadSealColorful'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  backgroundClip,
  brightness,
  dropShadow,
  filter,
  fontFamily,
  fontSize,
  fontWeight,
  saturate,
  textColor,
} from 'classnames/tailwind'

const uhOhText = classnames(
  fontFamily('font-primary'),
  fontWeight('font-bold'),
  textColor('text-transparent'),
  backgroundClip('bg-clip-text'),
  dropShadow('drop-shadow-text-shadow'),
  brightness('brightness-110'),
  saturate('saturate-200'),
  filter('filter'),
  fontSize('text-6xl', 'sm:text-8xl')
)

export default function () {
  return (
    <BareCard centered gapY bigPaddings>
      <SadSealColorful />
      <h1 className={classNamesToString('colorful-gradient', uhOhText)}>
        UH-OH
      </h1>
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
