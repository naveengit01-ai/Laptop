import { Routes,Route } from 'react-router-dom';
import Display_images from './src/Contents/Homepage1';
import Navbar from './src/components/Navbar';
import Contact from './src/components/Contact';
import Login from './src/Logins/Login';
import Sec_HOME from './src/Contents/Homepage2';
import AddUser from './src/Sign/Sign';
import About_Content from './src/components/About_Content';
import Tickets_book from './src/components/Tickets_book';
import Payments from './src/components/Payments';
function Heart() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Display_images />}></Route>
      <Route path='/about' element={<About_Content />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/sechome' element={<Sec_HOME />}></Route>
      <Route path='/sign' element={<AddUser />}></Route>
      <Route path='/tickets-book' element={<Tickets_book />}></Route>
      <Route path='/payment' element={<Payments />}></Route>
    </Routes>
    </>
  )
}

export default Heart;
