import { AccentText, BodyText } from 'components/ui/Text'
import { useState } from 'preact/hooks'
import Card from 'components/ui/Card'
import Cross from 'icons/Cross'

export default function () {
  const [show, setShow] = useState(true)

  if (!show) return null

  return (
    <Card error small>
      <div className="flex">
        <div className="flex flex-col">
          <AccentText color="text-error" primary large bold>
            You didn’t connect a burner.
          </AccentText>
          <BodyText primary large>
            That’s okay, you can still post with a burner wallet. Or you can
            disconnect your wallet and connect a burner.
          </BodyText>
        </div>
        <Cross onClick={() => setShow(false)} />
      </div>
    </Card>
  )
}
