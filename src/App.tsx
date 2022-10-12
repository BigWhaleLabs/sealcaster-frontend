import { Redirect, Route, Router, Switch, useLocation } from 'wouter'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'preact/compat'
import BurnerWallet from 'pages/BurnerWallet'
import Footer from 'components/Footer'
import InteractWithBurner from 'components/ui/InteractWithBurner'
import LazyComponent from 'components/LazyComponent'
import Navbar from 'components/navbar'
import NotFound from 'pages/NotFound'
import Privacy from 'pages/Privacy'
import ScrollToTopButton from 'components/ui/ScrollToTopButton'
import SliderTicker from 'components/ui/SliderTicker'
import Terms from 'pages/Terms'
import Thread from 'components/Thread'
import classnames, {
  display,
  flexDirection,
  margin,
  maxWidth,
  minHeight,
  overflow,
  width,
} from 'classnames/tailwind'

const Landing = lazy(() => import('pages/Landing'))

const pageContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  overflow('overflow-hidden'),
  minHeight('min-h-screen')
)
const bodyContainer = (marginTop?: boolean) =>
  classnames(
    width('xs:w-full'),
    maxWidth('max-w-fit', 'body:max-w-body'),
    margin('mx-4', 'mb-auto', 'body:mx-auto', { 'mt-auto': marginTop })
  )

export default function () {
  const [location] = useLocation()
  const displayScrollToTop =
    location === '/' || location === '/cast' || location === '/thread'
  const is404 = location === '/404'

  return (
    <Router>
      <Navbar />
      <div className={pageContainer}>
        {location === '/' && (
          <SliderTicker
            sentences={['spill your tea', 'snatch your burner wallet ']}
          />
        )}
        <InteractWithBurner
          showAttention
          headerText="Burner wallet unlocked"
          mainText="You’ve casted using a new burner wallet. This wallet contains a ZK badge that verifies its owner is a Farcaster user, but is completely anonymous. Feel free to keep it or destory it. If you chose to destroy it or ignore this message, you will lose the wallet forever."
          primaryButton={{
            text: 'View burner wallet',
            action: () => {
              // TODO: add logic
            },
          }}
          tertiaryButton={{
            text: 'Destroy burner wallet',
            action: () => {
              // TODO: add logic
            },
          }}
        />
        <InteractWithBurner
          headerText="Are you sure you want to destroy this burner?"
          mainText="If you chose to destroy it or ignore this message, you will lose the wallet forever."
          primaryButton={{
            text: 'Yes, destroy it',
            action: () => {
              // TODO: add logic
            },
          }}
          tertiaryButton={{
            text: 'View it',
            action: () => {
              // TODO: add logic
            },
          }}
        />
        {/* <InteractWithBurner
          tertiaryButton={{
            text: 'Got it',
            action: () => {
              // TODO: add logic
            },
          }}
          headerText="We all get destroyed eventually"
          mainText="That’s okay! You can choose to cast with a different burner wallet each time."
          sadSeal
        /> */}
        <div className={bodyContainer(is404)}>
          <Switch>
            <Route path="/">
              <LazyComponent lazyImported={<Landing />} />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route path="/privacy">
              <Privacy />
            </Route>
            <Route path="/wallet">
              <BurnerWallet />
            </Route>
            <Route path="/thread/:blockchainId">
              <Thread />
            </Route>
            <Route path="/404">
              <NotFound />
            </Route>
            <Route path="">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
        <Footer />
        {displayScrollToTop && <ScrollToTopButton />}
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
