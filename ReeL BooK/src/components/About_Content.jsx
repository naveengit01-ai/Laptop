import About from './About';
import "../CSS/About_content.css"
function About_Content() {
  return (
    <>
    <div>
      <h1>Movie Ticket book Web Application </h1>
    </div>
    <div>
        <table className='table'>
            <thead>
                <tr className='tr'>
                    <th className='th'>COMPONENT</th>
                    <th className='th'>WORKING</th>
                    <th className='th'>LOCATION</th>
                </tr>
            </thead>
            <tbody>
                <tr className='tr'>
                    <td className='td'>Body</td>
                    <td  className='td'>Main body of react</td>
                    <td  className='td'>D:\REACT\student\Body.jsx</td>
                </tr>
                <tr className='tr'>
                    <td  className='td'>HEART</td>
                    <td>By using the react-route-dom to create navigate <br></br>one page to another</td>
                    <td>D:\REACT\student\Heart.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>HOME NAVBAR</td>
                    <td>Navigate to the one to another pages</td>
                    <td>D:\REACT\student\src\components\Navbar.jsx</td>
                </tr >
                <tr className='tr'>
                    <td>Navbar HOME</td>
                    <td>To display the main home page</td>
                    <td>D:\REACT\student\src\Contents\Homepage1.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>Navbar about</td>
                    <td>To display the about page how this<br></br> application is designed and feedback</td>
                    <td>D:\REACT\student\src\Contents\Homepage1.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>Navbar Contact</td>
                    <td>My  contact information </td>
                    <td>D:\REACT\student\src\components\Contact.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>Navbar Login</td>
                    <td>Login to page to book the tickets</td>
                    <td>D:\REACT\student\src\Logins\Login.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>Navbar Logout</td>
                    <td>Logout to the page</td>
                    <td>D:\REACT\student\src\components\Navbar.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>Navbar BOOK</td>
                    <td>To book the tickets in that page</td>
                    <td>D:\REACT\student\src\components\Navbar.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>Sign page </td>
                    <td>TO create the account in this web application</td>
                    <td>D:\REACT\student\src\Sign\Sign.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>Images Display</td>
                    <td>Images will be show in the main home it self</td>
                    <td>D:\REACT\student\src\Contents\Homepage1.jsx</td>
                </tr>
                <tr className='tr'>
                <td>Select Seats</td>
                <td>To select what are the seats we want to book</td>
                <td>D:\REACT\student\src\Contents\Homepage2.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>Search movie</td>
                    <td>To find the movies to book tickets</td>
                    <td>D:\REACT\student\src\Contents\Homepage2.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>BooK seats</td>
                    <td>To book the seats in Movie hall</td>
                    <td>D:\REACT\student\src\components\Tickets_book.jsx</td>
                </tr>
                <tr className='tr'>
                    <td>Payment</td>
                    <td>Pay and get the tickets</td>
                    <td>D:\REACT\student\src\components\Payments.jsx</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className='about'>
        <About />
    </div>
    </>
  )
}

export default About_Content;
