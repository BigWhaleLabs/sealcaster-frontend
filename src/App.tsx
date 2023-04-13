import { Redirect, Route, Router, Switch } from 'wouter'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'preact/compat'
import BurnerWallet from 'pages/BurnerWallet'
import Cookie from 'components/ui/Cookie'
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
  alignItems,
  display,
  flex,
  flexDirection,
  margin,
  minHeight,
  overflow,
  width,
} from 'classnames/tailwind'
import useHashLocation from 'hooks/useHashLocation'

const Landing = lazy(() => import('pages/Landing'))

const overallWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-screen')
)
const pageContainer = (noOverflow: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    flex('flex-1'),
    overflow({ 'overflow-x-hidden': noOverflow })
  )
const bodyContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  width('body:w-body'),
  margin('mx-4', 'body:mx-auto')
)

export default function () {
  const [location] = useHashLocation()
  const displayScrollToTop =
    location === '/' || location === '/cast' || location === '/thread'
  const is404 = location === '/404'

  return (
    <Router hook={useHashLocation}>
      <div className={overallWrapper}>
        <Navbar />
        <div className={pageContainer(!is404)}>
          {location === '/' && (
            <SliderTicker
              sentences={['spill your tea', 'snatch your burner wallet ']}
            />
          )}
          <div className={bodyContainer}>
            <div className={width('w-full')}>
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
          </div>
          {displayScrollToTop && <ScrollToTopButton />}
        </div>
        <Cookie />
        <Footer />
      </div>
      <InteractWithBurner />
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
