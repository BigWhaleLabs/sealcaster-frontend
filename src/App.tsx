import { Route, Router } from 'wouter'
import { ToastContainer } from 'react-toastify'
import { lazy } from 'preact/compat'
import CreateBurnerWallet from 'pages/CreateBurnerWallet'
import Footer from 'components/Footer'
import LazyComponent from 'components/LazyComponent'
import Navbar from 'components/navbar'
import Privacy from 'pages/Privacy'
import ProtectedRoute from 'components/ui/ProtectedRoute'
import ScrollToTop from 'components/ui/ScrollToTop'
import Terms from 'pages/Terms'
import classnames, {
  display,
  flexDirection,
  margin,
  maxWidth,
  minHeight,
  width,
} from 'classnames/tailwind'

const Cast = lazy(() => import('pages/Cast'))
const Landing = lazy(() => import('pages/Landing'))

const pageContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-screen')
)
const bodyContainer = classnames(
  width('xs:w-full'),
  maxWidth('max-w-fit', 'body:max-w-body'),
  margin('mx-4', 'mb-auto', 'body:mx-auto')
)

export default function () {
  return (
    <Router>
      <div className={pageContainer}>
        <Navbar />
        <div className={bodyContainer}>
          <Route path="/">
            <LazyComponent lazyImported={<Landing />} />
          </Route>
          <ProtectedRoute path="/cast">
            <Cast />
          </ProtectedRoute>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/create">
            <CreateBurnerWallet />
          </Route>
        </div>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
