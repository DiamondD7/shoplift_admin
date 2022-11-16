import React from "react";
import Home from "./components/Home";
import RegisteredUsers from "./components/RegisteredUsers";
import Jackets from "./components/Jackets";
import Hoodies from "./components/Hoodies";
import Shirts from "./components/Shirts";
import Accessories from "./components/Accessories";
import Shoes from "./components/Shoes";
import Wdress from "./components/Women/Wdress";
import Whoodies from "./components/Women/Whoodies";

import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <div className="container">
        <div className="nav-container">
          <h1 className="title">Shoplift NZ-ADMIN</h1>
          <a className="homepage" href="/">
            Home
          </a>

          <ul className="u-lists first">
            <h2>Men</h2>
            <li>
              <a href="/jackets">Jackets</a>
            </li>
            <li>
              <a href="/hoodies">Hoodies</a>
            </li>
            <li>
              <a href="/shirts">Shirts</a>
            </li>
            <li>
              <a href="/accessories">Accessories</a>
            </li>
            <li>
              <a href="/shoes">Shoes</a>
            </li>
          </ul>

          <ul className="u-lists first">
            <h2>Women</h2>
            <li>
              <a href="/wdress">Dress</a>
            </li>

            <li>
              <a href="/whoodies">Hoodies</a>
            </li>
          </ul>

          <ul className="u-lists second">
            <h2>Users</h2>
            <li>
              <a href="/registeredusers">Registered Users</a>
            </li>
          </ul>
        </div>
        <div className="component-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jackets" element={<Jackets />} />
            <Route
              exact
              path="/registeredusers"
              element={<RegisteredUsers />}
            />
            <Route exact path="/hoodies" element={<Hoodies />} />
            <Route exact path="/shirts" element={<Shirts />} />
            <Route exact path="/accessories" element={<Accessories />} />
            <Route exact path="/shoes" element={<Shoes />} />
            <Route exact path="/wdress" element={<Wdress />} />
            <Route exact path="/whoodies" element={<Whoodies />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
