import { displayFrom } from 'helpers/visibilityClassnames'
import { margin, space } from 'classnames/tailwind'
import { useState } from 'preact/hooks'
import BlockchainList from 'components/BlockchainList'
import Button from 'components/ui/Button'
import CastHeader from 'components/Cast/CastHeader'
import TextArea from 'components/ui/TextArea'
import TextareaInfo from 'components/Cast/TextareaInfo'

export default function () {
  const [text, setText] = useState('')

  const [suffix, setSuffix] = useState('')

  const maxLength = 280 - suffix.length

  return (
    <>
      <div className={space('space-y-6')}>
        <CastHeader />
        <div className={space('md:space-y-2', 'space-y-4')}>
          <TextArea
            text={text}
            placeholder="Write something here..."
            onTextChange={setText}
            setSuffix={setSuffix}
            maxLength={maxLength}
          />
          <TextareaInfo />
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
