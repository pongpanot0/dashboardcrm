import "./App.css";

import RightSide from "../src/components/RigtSide/RightSide";
import Sidebar from "../src/components/Sidebar";
import { Route, Routes } from "react-router-dom";
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
import MainDash from "./components/MainDash/Maindash";
import ProductEdit from "./components/Product/ProductEdit";
import AddSupplier from "./components/Supplier/AddSupplier";
import SettingQuatation from "./components/Setting/SettingQuatation";
import Createperson from "./components/Admin/Person/Createperson";
import Dashboard from "./components/Admin/Dashboard";
import Editperson from "./components/Admin/Person/Editperson";
import Settingcompany from "./components/Setting/Settingcompany";
import Add from "./components/Order/Add";
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
            <Route path="/Setting" exact element={<Settingcompany />} />
            <Route path="/Addorder" exact element={<Add />} />
            <Route path="/Orderupdate/:id" exact element={<Orderupdate />} />
            <Route path="/Addcustomer" exact element={<Addcustomer />} />
            <Route path="/AddShooting" exact element={<AddShooting />} />
            <Route path="/addproduct" exact element={<Addproduct />} />
            <Route path="/ProductEdit/:id" exact element={<ProductEdit />} />
            <Route path="/AddSupplier" exact element={<AddSupplier />} />
            <Route
              path="/SettingQuatation"
              exact
              element={<SettingQuatation />}
            />
            <Route path="/addminsetting" exact element={<Createperson />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/editperson/:id" exact element={<Editperson />} />
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
      <Route path="/login/*" element={<PublicLink />} />
      <Route path="/*" element={<MainContainer />} />
    </Routes>
  );
}

export default App;
