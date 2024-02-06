import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home.jsx";
import Create from "./pages/Create/Create.jsx";
import Read from "./pages/Read/Read.jsx";
import Edit from "./pages/Edit/Edit.jsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/read/:id" element={<Read/>} />
            <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
