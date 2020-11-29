import React, { useContext, useState } from "react";
import "./styles.less";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import { Product } from "../../models/product";
import { ProductApi } from "../../api/productApi";
import { UserContext } from "../../contexts/UserContext";
import Navbar from "../Navbar";
import MainRoutes from "../MainRoutes";

type props = {
  test?: string;
  test2?: number;
};

const Home: React.FC<props> = () => {
  const userContext = useContext(UserContext)
  const [, setProducts] = useState([] as Product[]);
  const [modalVisible, setModalVisible] = useState(false);
  React.useEffect(() => {
    ProductApi.getAllProducts(setProducts);
  }, []);

  return (
    <Router>
      <div>
        <Navbar user={userContext.user} setModalVisible={setModalVisible} />
        <div className="main-div">
          <MainRoutes modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </div>
      </div>
    </Router>
  );
};

export default Home;
