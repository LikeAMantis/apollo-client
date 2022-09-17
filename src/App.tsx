import React from "react";
import {Shops} from "./Shops";
import {AddShop} from "./AddShop";
import {ActiveShop} from "./ActiveShop";
import {UpdateShop} from "./UpdateShop";

export default function App() {
  return (
    <div className="App">
        <h1>Hello World</h1>
      <Shops />
      <ActiveShop />
      <AddShop />
        <UpdateShop />
    </div>
  );
}

