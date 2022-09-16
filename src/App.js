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
import Addcustomer from "./components/Customer/Addcustomer";
import AddShooting from "./components/Setting/AddShooting";
import Login from "./components/Login/Login";
import Addproduct from "./components/Product/Addproduct";
function App() {
  const MainContainer = () => (
    <>
      <div className="App">
        <div className="AppGlass">
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
            <Route path="/Addcustomer" exact element={<Addcustomer />} />
            <Route path="/AddShooting" exact element={<AddShooting />} />
            <Route path="/addproduct" exact element={<Addproduct />} />
            
          </Routes>
          <RightSide />
        </div>
      </div>
    </>
  );
  const PublicLink = () => (
    <>
      <Routes className="">
        <Route path="/" exact element={<Login />} />
      </Routes>
    </>
  );
  return (
    <Routes>
      <Route path="/*" element={<MainContainer />} />
      <Route path="/login/*" element={<PublicLink />} />
    </Routes>
  );
}

export default App;
