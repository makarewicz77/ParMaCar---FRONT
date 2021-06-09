import React from "react";
import { Route, Switch } from "react-router-dom";
import CartList from "../cart/CartList/CartList";
import RegisterForm from "../login/RegisterForm";
import LoginModal from "../Modals/LoginModal";
import OrderForm from "../OrderForm";
import OrderList from "../OrderList";
import OrderDetails from "../OrderList/OrderDetails";
import ProductListView from "../products/ProductListView";
import ProductView from "../products/ProductView/ProductView";
import ProfileList from "../ProfileList";
import ProfileView from "../ProfileView";

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
        <Route path="/products" component={ProductListView} />
        <Route path="/category" component={ProductListView} />
        <Route path="/product" component={ProductView} />
        <Route path="/cart" component={CartList} />
        <Route path="/order" component={OrderForm} />
        <Route path="/profile" component={ProfileView} />
        <Route path="/profile-list" component={ProfileList} />
        <Route path="/my-orders" component={OrderList} />
        <Route path="/order-details" component={OrderDetails} />
        <Route
          path="/"
          render={() => (
            <div>
              <h1>Strona główna</h1>
              <h3>Wybierz powyżej interesujące cię opcje</h3>
            </div>
          )}
        />
      </Switch>
    </>
  );
};

export default MainRoutes;
