import React, { Suspense } from "react";
import "./App.css";
import Home from './components/home/Home'
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
            <Home test="string" test2={2}></Home>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
