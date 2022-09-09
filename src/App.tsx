import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Landing from 'pages/Landing'
import Logo from 'icons/Logo'
import Navbar from 'components/navbar/Navbar'
import Root from 'components/Root'
import classnames, {
  display,
  flexDirection,
  justifyContent,
  margin,
  minHeight,
  width,
} from 'classnames/tailwind'

const bodyContainer = classnames(
  width('md:w-body'),
  margin('md:mx-auto', 'mx-4', 'mb-auto')
)

const pageContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-screen')
)

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
        <div className={bodyContainer}>
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
      </Router>
    </Root>
  )
}
