import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from './login/Login'
import Signup from './signup/Signup'
import Forgot from './forgot/Forgot'
import Landing from "./landing/Landing";
import Blogs from "./blogs/Blogs";
import ModelSelection from "./ml_models/ModelSelection";


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/reset-password' element={<Forgot/>}></Route>
      <Route path="/landing" element={<Landing />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/models" element={<ModelSelection />} />

    </Routes>
  )
}

export default App