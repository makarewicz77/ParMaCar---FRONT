import React from 'react';
import './App.css';
import Test from './components/test'
import Categories from './components/categories'
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
      <Test test="string" test2={2}></Test>

      <div className="cat_list_div">
        <Categories></Categories>
      </div>

    </div>
  );
}

export default App;
