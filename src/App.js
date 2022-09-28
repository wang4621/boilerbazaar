import { CgProfile } from 'react-icons/cg';
import { TbMap2 } from 'react-icons/tb';
import './App.css';
import Img from './logo.png'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Profile from './pages/Profile'
import Home from './pages/Home'

function App() {
  // return (
  //   <div className="App">
  //     <div className="navbar">
  //       <img src={Img} height={70} alt="logo" style={{"float":"left"}}></img>
  //       <ul className="centerNav" style={{"margin-right":"10%"}}>
  //         <a href="#home">Home</a>
  //         <a href="#buy">Buy</a>
  //         <a href="#sell">Sell</a>
  //         <a href="#about">About</a>
  //         <a href="#map" style={{"margin-top":"5px"}}>
  //           <TbMap2 size={30}></TbMap2>
  //         </a>
  //       </ul>
  //       <a href="#profile" style={{"margin-top":"5px"}}>
  //         <CgProfile size={30}></CgProfile>
  //       </a>
  //     </div>
  //   </div>
  // );
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
                <Route exact path='/profile' element={< Profile />}></Route>
          </Routes>
       </div>
    </Router>
  );
}

export default App;
