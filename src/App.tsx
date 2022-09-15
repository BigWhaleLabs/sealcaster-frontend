import { Route, Router } from 'wouter'
import { Suspense } from 'preact/compat'
import { ToastContainer } from 'react-toastify'
import Cast from 'pages/Cast'
import CreateBurnerWallet from 'pages/CreateBurnerWallet'
import Footer from 'components/Footer'
import Landing from 'pages/Landing'
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
      <ScrollToTop>
        <div className={pageContainer}>
          <Navbar />
          <div className={bodyContainer}>
            <Route path="/">
              <Landing />
            </Route>
            <Route path="/cast">
              <Suspense fallback="Loading...">
                <ProtectedRoute>
                  <Cast />
                </ProtectedRoute>
              </Suspense>
            </Route>
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
      </ScrollToTop>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
