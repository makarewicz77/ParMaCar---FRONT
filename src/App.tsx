import React from 'react';
import './App.css';
import Test from './components/test'
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
      <Test test="string" test2={2}></Test>
    </div>
  );
}

export default App;
