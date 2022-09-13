import {
  AccentText,
  HeaderText,
  LinkText,
  SubHeaderText,
} from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useState } from 'preact/hooks'
import BlockchainList from 'components/BlockchainList'
import Button from 'components/ui/Button'
import CharInCircle from 'components/ui/CharInCircle'
import Sizes from 'models/MarkSizes'
import TextArea from 'components/ui/TextArea'
import ToolTip from 'components/ui/ToolTip'
import classnames, {
  alignItems,
  alignSelf,
  display,
  flexDirection,
  fontSize,
  gap,
  justifyContent,
  margin,
  maxWidth,
  space,
  textDecoration,
  width,
} from 'classnames/tailwind'

const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1'),
  fontSize('text-xs')
)

export default function () {
  const [text, setText] = useState('')

  const farcasterEchoUrl = 'https://echo.sealcred.xyz'
  const [suffix, setSuffix] = useState('')

  const maxLength = 280 - suffix.length

  const zkProofText =
    'You’re casting from the burner you just created. You’re anonymous now. This will persist between page loads until you disconnect.'

  return (
    <>
      <div className={space('space-y-6')}>
        <div
          className={classnames(
            space('space-y-4'),
            width('md:w-full', 'w-4/5')
          )}
        >
          <HeaderText big extraLeading>
            Create your anonymous cast
          </HeaderText>
          <SubHeaderText>
            Everything will cast from{' '}
            <LinkText underline url={farcasterEchoUrl}>
              @echo
            </LinkText>{' '}
            <div
              className={classnames(displayFrom('md'), display('md:!inline'))}
            >
              (SealCredEcho)
            </div>{' '}
            on Farcaster.
          </SubHeaderText>
        </div>
        <div className={space('md:space-y-2', 'space-y-4')}>
          <TextArea
            text={text}
            placeholder="Write something here..."
            onTextChange={(newText) => {
              setText(newText)
            }}
            setSuffix={setSuffix}
            maxLength={maxLength}
          />
          <div
            className={classnames(
              display('flex'),
              justifyContent('justify-between'),
              flexDirection('md:flex-row', 'flex-col'),
              alignItems('md:items-center'),
              space('md:space-y-0', 'space-y-4')
            )}
          >
            <AccentText extraSmall color="text-accent">
              <ToolTip position="bottom" fitContainer text={zkProofText}>
                <span className={hintWrapper}>
                  <span>Posting from burner wallet</span>
                  <br></br>
                  <CharInCircle size={Sizes.Small} char="?" />
                </span>
              </ToolTip>
            </AccentText>
            <div className={displayTo('md')}>
              <Button disabled fullWidth center type="primary">
                Cast
              </Button>
            </div>
            <span className={classnames(alignSelf('self-center'))}>
              <Button type="tertiary">
                <AccentText extraSmall color="text-secondary">
                  <span
                    className={classnames(
                      textDecoration('underline'),
                      displayFrom('md')
                    )}
                  >
                    Trash Burner
                  </span>
                  <span
                    className={classnames(
                      textDecoration('underline'),
                      displayTo('md'),
                      margin('mt-2')
                    )}
                  >
                    Trash Burner and disconnect
                  </span>
                </AccentText>
              </Button>
            </span>
          </div>
        </div>
        <div className={displayFrom('md')}>
          <Button disabled type="primary">
            Cast
          </Button>
        </div>
      </div>
      <div className={margin('mt-24')}>
        <BlockchainList />
      </div>
    </>
  )
}
