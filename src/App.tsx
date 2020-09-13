import React from "react";
import "./App.css";
import Test from "./components/test";
import Categories from "./components/Categories";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <div className="top_bar">
        <div className="login_btn_div">
          <Test test="string" test2={2}></Test>
        </div>
      </div>

      <div className="cat_list_div">
        <Categories></Categories>
      </div>
    </div>
  );
}

export default App;
