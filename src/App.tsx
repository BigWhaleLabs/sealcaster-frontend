import { Route, Router } from 'wouter'
import { ToastContainer } from 'react-toastify'
import { useSnapshot } from 'valtio'
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
import walletStore from 'stores/WalletStore'

const pageContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-screen')
)
const bodyContainer = classnames(
  width('w-full'),
  maxWidth('max-w-fit', 'body:max-w-body'),
  margin('mx-4', 'mb-auto', 'body:mx-auto')
)

export default function () {
  const { account } = useSnapshot(walletStore)

  return (
    <Router>
      <ScrollToTop>
        <div className={pageContainer}>
          <Navbar
            logo={<Logo />}
            account={account}
            needNetworkChange={false}
            logoText="SealCaster"
          />
          <div className={bodyContainer}>
            <Route path="/">
              <Landing />
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
