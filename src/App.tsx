import React, { Suspense } from "react";
import "./App.css";
import Home from "./components/home/Home";

function App() {
  return (
    <Suspense fallback="loading">
      <div className="App">
        <div className="top_bar">
          <div className="login_btn_div">
            <Home />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
