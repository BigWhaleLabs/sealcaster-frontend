import { Navbar } from '@big-whale-labs/ui-kit'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Logo from 'icons/Logo'
import Main from 'pages/Main'
import classnames, {
  display,
  flexDirection,
  gap,
  margin,
  minHeight,
  width,
} from 'classnames/tailwind'

const pageContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  minHeight('min-h-screen')
)
const bodyContainer = classnames(
  width('md:w-body'),
  gap('gap-y-4'),
  margin('md:mx-auto', 'mx-4', 'mb-auto')
)

export default function () {
  return (
    <Router>
      <div className={pageContainer}>
        <Navbar
          logo={<Logo />}
          account={undefined}
          needNetworkChange={false}
          logoText="SealCaster"
          noWalletText="Connect burner wallet"
        />
        <div className={bodyContainer}>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
