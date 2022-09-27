import './App.css';
import Img from './logo.png'

function App() {
  return (
    <div className="App">
      <div className="navBar">
        <img src={Img} height={60} alt="logo" style={{"float":"left"}}></img>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#buy">Buy</a></li>
          <li><a href="#sell">Sell</a></li>
          <li><a href="#about">About</a></li>
          <li>
            <a href="#map">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-2" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="18" y1="6" x2="18" y2="6.01"></line>
                <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5"></path>
                <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15"></polyline>
                <line x1="9" y1="4" x2="9" y2="17"></line>
                <line x1="15" y1="15" x2="15" y2="20"></line>
              </svg>
            </a>
          </li>
        </ul>
        <a href="#profile" style={{"float":"right"}}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="12" cy="12" r="9"></circle>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;
