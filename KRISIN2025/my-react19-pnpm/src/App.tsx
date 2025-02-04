import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import ActionsIndex from './pages/actions'
import UseActionStateDemo from './pages/actions/useActionState'
import UseFormStatusDemo from './pages/actions/useFormStatus'
import UseTransitionDemo from './pages/actions/useTransition'

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <nav>
          <ul>
            <li>
              <Link to="/actions">Actions Demos</Link>
              <ul>
                <li>
                  <Link to="/actions/useTransition">useTransition Demo</Link>
                </li>
                <li>
                  <Link to="/actions/useActionState">useActionState Demo</Link>
                </li>
                <li>
                  <Link to="/actions/UseFormStatusDemo">UseFormStatusDemo Demo</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/actions" element={<ActionsIndex />} />
          <Route path="/actions/useTransition" element={<UseTransitionDemo />} />
          <Route path="/actions/useActionState" element={<UseActionStateDemo />} />
          <Route path="/actions/useFormStatusDemo" element={<UseFormStatusDemo />} />
          <Route path="/" element={<h1>Welcome to React 19 Features Demo</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
