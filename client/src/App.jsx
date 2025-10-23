import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ByBrand from './Pages/ByBrand'
import ByCategory from './Pages/ByCategory'
import Byproduct from './Pages/Byproduct'
import ByProductDetails from './Pages/ByProductDetails'
import ByKewordPage from './Pages/ByKewordPage'

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<HomePage/>}/>
         <Route path='/by-brand/:id' element={<ByBrand/>}/>
         <Route path='/by-categori/:id' element={<ByCategory/>}/>
         <Route path='/by-Keyword/:Keyword' element={<ByKewordPage/>}/>
         <Route path='/By-product/:id' element={<ByProductDetails/>}/>
         <Route path='/By-product/:Remark' element={<Byproduct/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App