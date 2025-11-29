import { BrowserRouter, Routes, Route } from "react-router"
import Centenario from "./pages/Centenario"
import Home from "./pages/home/Home"


export default function Router() {
    return (
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Centenario/>}  />
         <Route path="/home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    )
  }