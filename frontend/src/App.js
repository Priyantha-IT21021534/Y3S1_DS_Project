import React from "react";

import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import Profile from "./components/Profile/profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signUp" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>

    </BrowserRouter>
  );
}
export default App;