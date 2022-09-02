import "./App.css";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "../src/components/RigtSide/RightSide";
import Sidebar from "../src/components/Sidebar";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Customer from "./components/Customer/Customer";
import Product from "./components/Product/Product";
import Supplier from "./components/Supplier/Supplier";
import Order from "./components/Order/Order";
import Setting from "./components/Setting/Setting";
import Addorder from "./components/Order/Addorder";
import Orderupdate from "./components/Order/Orderupdate";
function App() {
  const MainContainer = () => (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainDash />} />
        <Route path="/Customer" exact element={<Customer />} />
        <Route path="/product" exact element={<Product />} />
        <Route path="/supplier" exact element={<Supplier />} />
        <Route path="/Order" exact element={<Order />} />
        <Route path="/Setting" exact element={<Setting />} />
        <Route path="/Addorder" exact element={<Addorder />} />
        <Route path="/Orderupdate/:id" exact element={<Orderupdate />} />
      </Routes>
      <RightSide />
    </>
  );
  /*   const PublicLink = () => (
    <>
      <Routes className="">
        <Route path="/qrcodeshow/:id" element={<QrcodeShow />} />
      </Routes>
    </>
  ); */
  return (
    <div className="App">
      <div className="AppGlass">
        <Routes>
          <Route path="/*" element={<MainContainer />} />
          {/*   <Route path="/publiclink/*" element={<PublicLink />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
