import { CgProfile } from 'react-icons/cg';
import { TbMap2 } from 'react-icons/tb';
import './App.css';
import Img from './logo.png'
import { BrowserRouter as Router,Routes, Route, NavLink } from 'react-router-dom';
import Profile from './pages/Profile'
import Home from './pages/Home'
import Sell from './pages/Sell'
import Buy from './pages/Buy'
import About from './pages/About'
import Map from './pages/Map'

function App() {
  return (
    <Router>
        <div className="App">
          <div className="navbar">
            <img src={Img} height={70} alt="logo" style={{"float":"left"}}></img>
            <ul className="centerNav" style={{"margin-right":"15%"}}>
              <NavLink activeClassName="active" to="/boilerbazaar">Home</NavLink>
              <NavLink activeClassName="active" to="/buy">Buy</NavLink>
              <NavLink activeClassName="active" to="/sell">Sell</NavLink>
              <NavLink activeClassName="active" to="/about">About</NavLink>
              <NavLink activeClassName="active" to="/map" style={{"margin-top":"5px"}}>
                <TbMap2 size={28}></TbMap2>
              </NavLink>
            </ul>
              <NavLink activeClassName="active" to="/profile">
                <CgProfile size={30}></CgProfile>
              </NavLink>  
          </div>
          <Routes>
            <Route exact path='/boilerbazaar' element={< Home />}></Route>
            <Route exact path='/buy' element={< Buy />}></Route>
            <Route exact path='/sell' element={< Sell />}></Route>
            <Route exact path='/about' element={< About />}></Route>
            <Route exact path='/map' element={< Map />}></Route>
            <Route exact path='/profile' element={< Profile />}></Route>
          </Routes>
       </div>
    </Router>
  );
}

export default App;
