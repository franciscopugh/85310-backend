import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Products';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;