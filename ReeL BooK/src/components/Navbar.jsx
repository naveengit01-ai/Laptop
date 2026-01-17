// import { Link } from 'react-router-dom'
// import "../CSS/Navbar.css"
// function Navbar() {
//   return (
//     <div className='hedding'>
//       <h1>ReeL BooK</h1>
      
//     <div className='nav'>
//     <nav>
//         <Link to={"/"}>HOME</Link>
//         <Link to={"/about"}>About</Link>
//         <Link to={"/contact"}>Contact</Link>
//     </nav>
//     </div>
//     </div>
//   )
// }

// export default Navbar;

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "../CSS/Navbar.css"

function Navbar(){
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    setIsLoggedIn(loggedIn === "true")
  })

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    navigate("/login")
  }

  return (
    <div className='hedding'>
      <h1>ReeL BooK 🎞️</h1>
      
      <div className='nav'>
        <nav>
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>

          {!isLoggedIn ? (
            <Link to={"/login"}>Login</Link>
          ) : (
            <>
            <button onClick={handleLogout} className='logout'>Logout</button>
            <button onClick={()=>navigate("/sechome")}>BOOK</button>
            </>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Navbar
