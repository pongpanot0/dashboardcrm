import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from '../src/components/RigtSide/RightSide';
import Sidebar from '../src/components/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </div>
    </div>
  );
}

export default App;
