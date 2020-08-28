import React, { useState, useEffect } from 'react';
import './styles.css';
import { Router } from 'react-router-dom';
import { type } from 'os';
import Item from 'antd/lib/list/Item';
import { strict } from 'assert';

type catProps = {
  id?: number,
  name?: string
}

const Categories: React.FC<catProps> = ({ id, name }) => {

  var tmpCatList: string[] = [];
  const [catList, setCatList] = useState({});

  async function fetchData() {
    const res = await fetch("http://127.0.0.1:8000/api/categories/?format=json");
    res
      .json()
      .then(res => setCatList(res))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchData();
  });

  // catList.forEach(item => {
  //   var tmp = tmpCatList.find(elem => elem.id === item.id);
  // });

  for(let i=0; i<JSON.stringify(catList).split("{").length-1; i++){
    tmpCatList.push(JSON.stringify(catList).split("{")[i+1].split("\"")[5]);
  }

  return (
    <>
      <h1>categories</h1>
      {/* {JSON.stringify(catList).split("{")[1].split("\"")[5]} */}
      <hr/>
      {/* {tmpCatList.forEach(e => { return e })} */}
      <hr/>
      {tmpCatList[0]}
      {tmpCatList[1]}
      {tmpCatList[2]}
      <hr/>
    </>
  );
};

export default Categories;
