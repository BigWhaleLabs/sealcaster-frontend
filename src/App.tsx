import { Route, Router, Switch, useLocation } from 'wouter'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'preact/compat'
import BurnerWallet from 'pages/BurnerWallet'
import Footer from 'components/Footer'
import LazyComponent from 'components/LazyComponent'
import Navbar from 'components/navbar'
import Privacy from 'pages/Privacy'
import ScrollToTopButton from 'components/ui/ScrollToTopButton'
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

const Cast = lazy(() => import('pages/Cast'))
const Landing = lazy(() => import('pages/Landing'))

const pageContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-screen')
)
const overflowEffects = overflow('overflow-hidden')
const bodyContainer = classnames(
  width('xs:w-full'),
  maxWidth('max-w-fit', 'body:max-w-body'),
  margin('mx-4', 'mb-auto', 'body:mx-auto')
)

export default function () {
  const [location] = useLocation()
  const hasBlockchainList = location === '/' || location === '/cast'

  return (
    <Router>
      <div className={pageContainer}>
        <Navbar />
        <div className={overflowEffects}>
          <div className={bodyContainer}>
            <Switch>
              <Route path="/">
                <LazyComponent lazyImported={<Landing />} />
              </Route>
              <Route path="/cast">
                <LazyComponent lazyImported={<Cast />} />
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
              <Route path="/thread">
                <Thread />
              </Route>
            </Switch>
          </div>
          {hasBlockchainList && <ScrollToTopButton />}
          <Footer noExtraPadding={hasBlockchainList} />
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
