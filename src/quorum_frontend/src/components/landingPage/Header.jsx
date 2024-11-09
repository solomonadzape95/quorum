// import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center w-full h-[68px] backdrop-blur-lg max-w-3xl">
        <a href="/" className="mr-auto flex items-center justify-center">

        <img src="/quorum_logo.png" alt="logo" />
        </a>
    </header>
  )
}

export default Header;