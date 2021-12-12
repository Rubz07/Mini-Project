import React from "react";
import Topbar from "../Topbar/Topbar";
import SidebarAdmin from "../Sidebar/SideBarAdmin";
import "./AdminDashboard.css";
import AdminHome from "../AdminMain/AdminHome/AdminHome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Userlist from "../AdminMain/UserList/Userlist";
import User from "../AdminMain/user/User";
import NewUser from "../AdminMain/newUser/NewUser";
import Product from "../AdminMain/product/Product";
import NewProduct from "../AdminMain/newProduct/NewProduct";
import ProductList from "../AdminMain/productList/ProductList";
import OfficerList from "../AdminMain/OfficerList/OfficerList";
import Departments from "../AdminMain/Departments/Departments";
import AddOfficer from "../AdminMain/Officer/AddOfficer";
function AdminDashboard() {
  return (
    <Router>
      <Topbar />
      <div className="AdminWrapper">
        <SidebarAdmin />
        <Switch>
          <Route exact path="/Admindashboard">
            <AdminHome />
          </Route>
          <Route path="/users">
            <Userlist />
          </Route>
          <Route path="/officers">
            <OfficerList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/departments">
            <Departments />
          </Route>
          <Route path="/add-officer">
            <AddOfficer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AdminDashboard;
