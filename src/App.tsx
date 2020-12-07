import React, { Suspense } from "react";
import "./App.css";
import Home from './components/home/Home'
import Helmet from "react-helmet";

function App() {
  return (
    <Suspense fallback="loading">
      {/* <div style={{backgroundImage:bkgd, float:'left'}}>
        <img src={bkgd}>
        </img>
      </div> */}
      <div className="App">
        <div className="top_bar">
          <div className="login_btn_div">
            <Helmet link={[
              {"rel": "icon", 
               "type": "image/png", 
               "href": "ParMaCar_icon.ico"
              }
             ]}>
              <title>ParMaCar</title>
              <link rel="icon" type="image/png" href="./static/images/ParMaCar_icon.ico" sizes="16x16" />
            </Helmet>
            <Home test="string" test2={2}></Home>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
