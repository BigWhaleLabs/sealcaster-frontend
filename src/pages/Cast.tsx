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
import Input from 'components/ui/Input'
import Sizes from 'models/MarkSizes'
import TextArea from 'components/ui/TextArea'
import ToolTip from 'components/ui/ToolTip'
import classnames, {
  alignItems,
  alignSelf,
  display,
  flexDirection,
  gap,
  justifyContent,
  margin,
  space,
  textDecoration,
} from 'classnames/tailwind'

const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1')
)

export default function () {
  const [text, setText] = useState('')

  // TODO: Put actual link here
  const farcasterEchoUrl = 'https://sealcaster.xyz'
  const [suffix, setSuffix] = useState('')

  const maxLength = 280 - suffix.length

  const zkProofText =
    'You’re casting from the burner you just created. You’re anonymous now. This will persist between page loads until you disconnect.'

  return (
    <>
      <div className={space('space-y-6')}>
        <div className={space('space-y-4')}>
          <HeaderText big extraLeading>
            Cast anonymously on Farcaster
          </HeaderText>
          <SubHeaderText>
            Everything will cast from{' '}
            <LinkText url={farcasterEchoUrl}>@echo</LinkText> (SealCredEcho) on
            Farcaster.
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
            currentAddress={'asd'}
            disabled={false}
            error={false}
          />
          <div
            className={classnames(
              display('flex'),
              justifyContent('justify-between'),
              flexDirection('md:flex-row', 'flex-col'),
              alignItems('md:items-center'),
              space('space-y-4')
            )}
          >
            <AccentText extraSmall color="text-accent">
              <ToolTip position="bottom" fitContainer text={zkProofText}>
                <span className={hintWrapper}>
                  <span>Posting from burner wallet</span>
                  <CharInCircle size={Sizes.Small} char="?" />
                </span>
              </ToolTip>
            </AccentText>
            <div className={displayTo('md')}>
              <Button fullWidth center type="primary">
                Cast
              </Button>
            </div>
            <span
              className={classnames(alignSelf('self-center'), margin('mt-2'))}
            >
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
                      displayTo('md')
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
          <Button type="primary">Cast</Button>
        </div>
      </div>
      <div className={margin('mt-24')}>
        <BlockchainList />
      </div>
    </>
  )
}
