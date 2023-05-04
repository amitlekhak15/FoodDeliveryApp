import './App.css';
//import { Navbar } from './components/Navbar';
import { Home } from './screens/Home';
import {BrowserRouter as Router,
  Routes,Route} from "react-router-dom"
import { Login } from './screens/Login';
import { Signup } from './screens/Signup';
import { Cart } from './screens/Cart';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import { CartProvider } from './components/ContextReducer.js';
import {Checkout} from './screens/Checkout';
function App() {
  return (
    <CartProvider>
      <Router>
    <div > 
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/Login" element={<Login/>}/>
      <Route exact path="/Signup" element={<Signup/>}/>
      <Route exact path="/shopping" element={<Cart/>}/>
      <Route exact path="/checkout" element={<Checkout/>}/>
    </Routes>
   </div>
  </Router>
    
  </CartProvider>
      
  
   
  
  );
}

export default App;
