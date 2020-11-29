import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Product } from '../../models/product';
import Categories from '../categories';
import LoginForm from '../login/LoginForm/LoginForm';
import RegisterForm from '../login/RegisterForm';
import LoginModal from '../Modals/LoginModal';
import ProductList from '../products/ProductList/ProductList';
import ProductListView from '../products/ProductListView';
import ProductView from '../products/ProductView';

import './styles.css';

type MainRoutesProps={
  setModalVisible:React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
}

const MainRoutes: React.FC<MainRoutesProps> = ({modalVisible, setModalVisible}) => {
  return (
    <>
        <Switch>
            <Route path="/login">
              <LoginModal visible={modalVisible} setModalVisible={setModalVisible} />
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/home" component={ProductListView}>

            </Route>
            <Route path="/category" component={ProductListView} />
            <Route path="/product" component={ProductView} />
            <Route path="/">
              HOMEPAGE
            </Route>
          </Switch>
    </>
  );
};

export default MainRoutes;
