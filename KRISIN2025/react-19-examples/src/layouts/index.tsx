import { Outlet } from "react-router"

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <nav></nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>React 19 Features Demo</p>
      </footer>
    </div>
  )
}
