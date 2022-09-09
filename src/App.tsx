import { Route, Router } from 'wouter'
import Landing from 'pages/Landing'
import Logo from 'icons/Logo'
import Navbar from 'components/navbar/Navbar'
import classnames, { margin, width } from 'classnames/tailwind'

const bodyContainer = classnames(
  width('md:w-body'),
  margin('md:mx-auto', 'mx-4', 'mb-auto')
)

export default function () {
  return (
    <Router>
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
      </div>
    </Router>
  )
}
