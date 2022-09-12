import {
  AccentText,
  HeaderText,
  LinkText,
  SubHeaderText,
} from 'components/ui/Text'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import CharInCircle from 'components/ui/CharInCircle'
import Input from 'components/ui/Input'
import Sizes from 'models/MarkSizes'
import TextArea from 'components/ui/TextArea'
import ToolTip from 'components/ui/ToolTip'
import classnames, {
  alignItems,
  display,
  gap,
  justifyContent,
  textDecoration,
} from 'classnames/tailwind'

const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1')
)

export default function () {
  const [text, setText] = useState('')

  // TODO: Put a    ctual link here
  const farcasterEchoUrl = 'https://sealcaster.xyz'
  const [suffix, setSuffix] = useState('')

  const maxLength = 280 - suffix.length

  const zkProofText =
    'You’re casting from the burner you just created. You’re anonymous now. This will persist between page loads until you disconnect.'

  return (
    <div>
      <HeaderText big extraLeading>
        Cast anonymously on Farcaster
      </HeaderText>
      <SubHeaderText>
        Everything will cast from{' '}
        <LinkText url={farcasterEchoUrl}>@echo</LinkText> (SealCredEcho) on
        Farcaster.
      </SubHeaderText>
      <TextArea
        text={text}
        placeholder="Write something here"
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
          justifyContent('justify-between')
        )}
      >
        <AccentText color="text-accent">
          <ToolTip position="bottom" fitContainer text={zkProofText}>
            <span className={hintWrapper}>
              <span>Posting from burner wallet</span>
              <CharInCircle size={Sizes.Small} char="?" />
            </span>
          </ToolTip>
        </AccentText>
        <Button type="tertiary">
          <AccentText color="text-secondary">
            <span className={textDecoration('underline')}>Trash Burner</span>
          </AccentText>
        </Button>
      </div>
      <Button type="primary">Cast</Button>
    </div>
  )
}
