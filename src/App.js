import logo from "./logo.svg";

import Sidebar from "./components/sidebar/Sidebar";
import './App.css'
import Maindash from "./components/MainDash/Maindash";
import RightSide from "./components/RightSide/RightSide";
function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <Maindash/>
        <RightSide/>
      </div>
    </div>
  );
}

export default App;
