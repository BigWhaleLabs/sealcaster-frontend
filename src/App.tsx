import { Route, Router } from 'wouter'
import { Suspense } from 'preact/compat'
import { ToastContainer } from 'react-toastify'
import Cast from 'pages/Cast'
import CreateBurnerWallet from 'pages/CreateBurnerWallet'
import Footer from 'components/Footer'
import Landing from 'pages/Landing'
import Logo from 'icons/Logo'
import Navbar from 'components/navbar/Navbar'
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
import useAccount from 'hooks/useAccount'

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

function NavBarSuspended() {
  const { account } = useAccount()

  return (
    <Navbar
      logo={<Logo />}
      account={account}
      needNetworkChange={false}
      logoText="SealCaster"
    />
  )
}

export default function () {
  return (
    <Router>
      <ScrollToTop>
        <div className={pageContainer}>
          <Suspense
            fallback={
              <Navbar
                logo={<Logo />}
                needNetworkChange={false}
                logoText="SealCaster"
              />
            }
          >
            <NavBarSuspended />
          </Suspense>
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
