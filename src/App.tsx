import { Route, Router } from 'wouter'
import { ToastContainer } from 'react-toastify'
import Cast from 'pages/Cast'
import CreateBurnerWallet from 'pages/CreateBurnerWallet'
import Footer from 'components/Footer'
import Landing from 'pages/Landing'
import Logo from 'icons/Logo'
import Navbar from 'components/navbar/Navbar'
import Privacy from 'pages/Privacy'
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
          <Navbar
            logo={<Logo />}
            account={undefined}
            needNetworkChange={false}
            logoText="SealCaster"
          />
          <div className={bodyContainer}>
            <Route path="/">
              <Landing />
            </Route>
            <Route path="/create">
              <CreateBurnerWallet />
            </Route>
            <Route path="/cast">
              <Cast />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route path="/privacy">
              <Privacy />
            </Route>
          </div>
          <Footer />
        </div>
      </ScrollToTop>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}
