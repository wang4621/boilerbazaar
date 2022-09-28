import { CgProfile } from 'react-icons/cg';
import { TbMap2 } from 'react-icons/tb';
import './App.css';
import Img from './logo.png'

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <img src={Img} height={70} alt="logo" style={{"float":"left"}}></img>
        <ul className="centerNav" style={{"margin-right":"10%"}}>
          <a href="#home">Home</a>
          <a href="#buy">Buy</a>
          <a href="#sell">Sell</a>
          <a href="#about">About</a>
          <a href="#map" style={{"margin-top":"5px"}}>
            <TbMap2 size={30}></TbMap2>
          </a>
        </ul>
        <a href="#profile" style={{"margin-top":"5px"}}>
          <CgProfile size={30}></CgProfile>
        </a>
      </div>
    </div>
  );
}

export default App;
