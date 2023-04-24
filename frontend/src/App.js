import React from "react";
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import AddProducts from "./components/products/addProduct";

const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/addProduct" element={<AddProducts/>}/>
      </Routes>
     
    </BrowserRouter>
  );
}
export default App;