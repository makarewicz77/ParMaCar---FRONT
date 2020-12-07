import React from "react";
import { Route, Switch } from "react-router-dom";
import CartList from "../cart/CartList/CartList";
import RegisterForm from "../login/RegisterForm";
import LoginModal from "../Modals/LoginModal";
import OrderForm from "../OrderForm";
import ProductListView from "../products/ProductListView";
import ProductView from "../products/ProductView/ProductView";
import UserConfig from "../UserConfig";

import "./styles.css";

type MainRoutesProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
};

const MainRoutes: React.FC<MainRoutesProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  return (
    <>
      <Switch>
        <Route path="/login">
          <LoginModal
            visible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/home" component={ProductListView}></Route>
        <Route path="/category" component={ProductListView} />
        <Route path="/product" component={ProductView} />
        <Route path="/cart" component={CartList} />
        <Route path="/user-config" component={UserConfig} />
        <Route path="/order" component={OrderForm} />
      </Switch>
    </>
  );
};

export default MainRoutes;
