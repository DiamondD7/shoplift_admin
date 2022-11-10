import React from "react";
import Home from "./components/Home";
import RegisteredUsers from "./components/RegisteredUsers";
import Jackets from "./components/Jackets";
import Hoodies from "./components/Hoodies";
import Shirts from "./components/Shirts";
import Accessories from "./components/Accessories";
import Shoes from "./components/Shoes";
const App = () => {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/registeredusers":
      component = <RegisteredUsers />;
      break;

    case "/jackets":
      component = <Jackets />;
      break;

    case "/hoodies":
      component = <Hoodies />;
      break;
    case "/shirts":
      component = <Shirts />;
      break;
    case "/accessories":
      component = <Accessories />;
      break;
    case "/shoes":
      component = <Shoes />;
      break;
    default:
      console.log("Error in switch");
      break;
  }
  return (
    <div>
      <div className="container">
        <div className="nav-container">
          <h1 className="title">Shoplift NZ-ADMIN</h1>
          <a className="homepage" href="/">
            Home
          </a>
          <ul className="u-lists first">
            <h2>Products/Items</h2>
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
          <ul className="u-lists second">
            <h2>Users</h2>
            <li>
              <a href="/registeredusers">Registered Users</a>
            </li>
          </ul>
        </div>
        <div className="component-container">{component}</div>
      </div>
    </div>
  );
};

export default App;
