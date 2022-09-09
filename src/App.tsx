import { Navbar } from '@big-whale-labs/ui-kit'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from 'components/Footer'
import Logo from 'icons/Logo'
import Main from 'pages/Main'
import Privacy from 'pages/Privacy'
import Root from 'components/Root'
import Terms from 'pages/Terms'

export default function () {
  return (
    <Root>
      <Router>
        <Navbar
          logo={<Logo />}
          account={undefined}
          needNetworkChange={false}
          logoText="SealCaster"
          noWalletText="Connect burner wallet"
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </Router>
    </Root>
  )
}
