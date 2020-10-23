import React, { Suspense } from "react";
import "./App.css";
import Test from "./components/test";
import "antd/dist/antd.css";
import Helmet from "react-helmet";

function App() {
  return (
    <Suspense fallback="loading">
      <div className="App">
        <div className="top_bar">
          <div className="login_btn_div">
            <Helmet>
              <title>ParMaCar</title>
            </Helmet>
            <Test test="string" test2={2}></Test>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
