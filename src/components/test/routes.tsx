import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Test from ".";
import Categories from "../categories";

export const baseUrl = "/";
export const categoryUrl = `${baseUrl}category/:slug([a-z-0-9]+)/:id([0-9]+)/`;

export const Routes: React.FC = () => (
  <Switch>
    <PrivateRoute exact path={baseUrl} Component={Test} />
    <PrivateRoute path={categoryUrl} Component={Categories} />
  </Switch>
);

export function PrivateRoute({ Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/search", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
