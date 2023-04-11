import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import classnames, {
  TStroke,
  display,
  stroke,
  strokeWidth,
  width,
} from 'classnames/tailwind'

const triangle = (strokeColor: TStroke) =>
  classnames(
    stroke(strokeColor),
    strokeWidth('stroke-1', 'md:stroke-2'),
    width('w-8', 'md:w-16')
  )

const sealStroke = (strokeColor: TStroke) =>
  classnames(stroke(strokeColor), strokeWidth('stroke-1', 'md:stroke-2'))

export default function ({
  noMobile,
  sealColor = 'stroke-tertiary',
  triangleColor = 'stroke-secondary-dimmed',
}: {
  triangleColor?: TStroke
  sealColor?: TStroke
  noMobile?: boolean
}) {
  return (
    <div>
      <svg
        className={noMobile ? undefined : displayFrom('md')}
        height="65"
        viewBox="0 0 80 65"
        width="80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={sealStroke(sealColor)}
          d="M54.5533 34.035C54.5533 37.0132 52.2042 39.4274 49.3064 39.4274C46.4087 39.4274 44.0596 37.0132 44.0596 34.035C44.0596 31.0569 46.4087 34.035 49.3064 34.035C52.2042 34.035 54.5533 31.0569 54.5533 34.035Z"
        />
        <path
          className={sealStroke(sealColor)}
          d="M38.9865 47.9278C40.9473 47.9278 42.5368 48.1628 42.5368 45.9137C42.5368 43.6646 40.9473 41.8414 38.9865 41.8414C37.0257 41.8414 35.4361 43.6646 35.4361 45.9137C35.4361 48.1628 37.0257 47.9278 38.9865 47.9278ZM38.9865 47.9278C38.9865 49.2803 38.9865 52.2897 38.9865 53.5069M38.9865 53.5069C38.9865 57.5646 45.5107 54.0449 45.5107 58.3112M38.9865 53.5069C38.9865 57.5645 32.7107 53.5069 32.7107 58.3115"
        />
        <path
          className={sealStroke(sealColor)}
          d="M34.2701 34.0365C34.2701 37.0146 31.921 39.4289 29.0232 39.4289C26.1255 39.4289 23.7764 37.0146 23.7764 34.0365C23.7764 31.0584 26.1255 34.0365 29.0232 34.0365C31.921 34.0365 34.2701 31.0584 34.2701 34.0365Z"
        />
        <path
          className={sealStroke(sealColor)}
          d="M55.2172 47.9282L49.1309 48.9426"
        />
        <path
          className={sealStroke(sealColor)}
          d="M49.1334 51.9849L55.2197 52.9993"
        />
        <path
          className={sealStroke(sealColor)}
          d="M22.7564 47.9282L28.8428 48.9426"
        />
        <path
          className={sealStroke(sealColor)}
          d="M28.8432 51.9868L22.7568 53.0012"
        />
        <path
          className={triangle(triangleColor)}
          d="M3.71909 57.9142L35.698 5.58512C37.2577 3.03285 40.9645 3.03284 42.5242 5.58511L74.5031 57.9142C76.132 60.5796 74.2137 64 71.09 64H7.13223C4.00851 64 2.09023 60.5796 3.71909 57.9142Z"
        />
      </svg>

      <svg
        className={noMobile ? display('hidden') : displayTo('md')}
        height="33"
        viewBox="0 0 40 33"
        width="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={sealStroke(sealColor)}
          d="M27.2761 17.0178C27.2761 18.5068 26.1016 19.7139 24.6527 19.7139C23.2038 19.7139 22.0293 18.5068 22.0293 17.0178C22.0293 15.5287 23.2038 17.0177 24.6527 17.0177C26.1016 17.0177 27.2761 15.5287 27.2761 17.0178Z"
        />
        <path
          className={sealStroke(sealColor)}
          d="M19.4928 23.9644C20.4732 23.9644 21.2679 24.0819 21.2679 22.9574C21.2679 21.8328 20.4732 20.9212 19.4927 20.9212C18.5123 20.9212 17.7176 21.8328 17.7176 22.9574C17.7176 24.0819 18.5123 23.9644 19.4928 23.9644ZM19.4928 23.9644C19.4928 24.6406 19.4928 26.1453 19.4928 26.754M19.4928 26.754C19.4928 28.7828 22.7549 27.0229 22.7549 29.1561M19.4928 26.754C19.4928 28.7828 16.3549 26.754 16.3549 29.1563"
        />
        <path
          className={sealStroke(sealColor)}
          d="M17.1336 17.0183C17.1336 18.5073 15.959 19.7144 14.5101 19.7144C13.0613 19.7144 11.8867 18.5073 11.8867 17.0183C11.8867 15.5292 13.0613 17.0182 14.5101 17.0182C15.959 17.0182 17.1336 15.5292 17.1336 17.0183Z"
        />
        <path
          className={sealStroke(sealColor)}
          d="M27.6076 23.9644L24.5645 24.4716"
        />
        <path
          className={sealStroke(sealColor)}
          d="M24.5652 25.9927L27.6084 26.4999"
        />
        <path
          className={sealStroke(sealColor)}
          d="M11.3758 23.9648L14.4189 24.472"
        />
        <path
          className={sealStroke(sealColor)}
          d="M14.4191 25.9941L11.376 26.5013"
        />
        <path
          className={triangle(triangleColor)}
          d="M3.7191 25.9142L16.1424 5.58512C17.7021 3.03285 21.409 3.03284 22.9687 5.58511L35.392 25.9142C37.0209 28.5796 35.1026 32 31.9789 32H7.13223C4.00851 32 2.09023 28.5796 3.7191 25.9142Z"
        />
      </svg>
    </div>
  )
}
