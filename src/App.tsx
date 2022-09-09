import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Landing from 'pages/Landing'
import Logo from 'icons/Logo'
import Navbar from 'components/navbar/Navbar'
import Root from 'components/Root'

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
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </Root>
  )
}
