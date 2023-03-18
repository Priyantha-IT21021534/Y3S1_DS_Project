
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useSelector } from "react-redux";
import Header from './components/header';
import Login from './components/login';
import SignUp from './components/signUp';
import Welcome from './components/welcome';

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () =>{

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (

      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          {isLoggedIn && <Route path="/welcome" element={<Welcome/>}/>}
        </Routes>
      </BrowserRouter>

  );
}

export default App;