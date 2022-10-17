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
  alignItems,
  display,
  flexDirection,
  margin,
  minHeight,
  overflow,
  width,
} from 'classnames/tailwind'

const Landing = lazy(() => import('pages/Landing'))

const pageContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  overflow('overflow-x-hidden'),
  minHeight('min-h-screen')
)
const bodyContainer = (marginTop?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    alignItems('items-center'),
    width('body:w-body'),
    margin('mx-4', 'body:mx-auto', { 'mt-auto': marginTop })
  )

export default function () {
  const [location] = useLocation()
  const displayScrollToTop =
    location === '/' || location === '/cast' || location === '/thread'
  const is404 = location === '/404'

  return (
    <Router>
      <div className={pageContainer}>
        <Navbar />
        {location === '/' && (
          <SliderTicker
            sentences={['spill your tea', 'snatch your burner wallet ']}
          />
        )}
        <div className={bodyContainer(is404)}>
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
        <Footer />
        {displayScrollToTop && <ScrollToTopButton />}
      </div>
      <InteractWithBurner />
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
