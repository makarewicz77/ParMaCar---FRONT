import React, { useContext, useState } from "react";
import "./styles.less";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import { UserContext } from "../../contexts/UserContext";
import Navbar from "../Navbar";
import MainRoutes from "../MainRoutes";

const Home: React.FC = () => {
  const userContext = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Router>
      <div>
        <Navbar user={userContext.user} setModalVisible={setModalVisible} />
        <div className="main-div">
          <MainRoutes
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </div>
      </div>
    </Router>
  );
};

export default Home;
