import { CgProfile } from 'react-icons/cg';
import { TbMap2 } from 'react-icons/tb';
import './App.css';
import Img from './logo.png'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
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
            <ul className="centerNav" style={{"margin-right":"10%"}}>
              <Link to="/">Home</Link>
              <Link to="/buy">Buy</Link>
              <Link to="/sell">Sell</Link>
              <Link to="/about">About</Link>
              <Link to="/map" style={{"margin-top":"5px"}}>
                <TbMap2 size={30}></TbMap2>
              </Link>
            </ul>
              <Link to="/profile" style={{"margin-top":"5px"}}>
                <CgProfile size={30}></CgProfile>
              </Link>  
          </div>
          <Routes>
                <Route exact path='/' element={< Home />}></Route>
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
