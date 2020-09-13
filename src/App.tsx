import React, { Suspense } from "react";
import "./App.css";
import Test from "./components/test";
import Categories from "./components/Categories";
import "antd/dist/antd.css";

function App() {
  return (
    <Suspense fallback="loading">
      <div className="App">
        <div className="top_bar">
          <div className="login_btn_div">
            <Test test="string" test2={2}></Test>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
