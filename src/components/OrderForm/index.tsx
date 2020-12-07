import { message, Progress, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { LoginApi } from "../../api/loginApi";
import { User } from "../../models/user";
import OrderStepOne from "./OrderStepOne";
import OrderStepTwo from "./OrderStepTwo";

import "./styles.scss";

const OrderForm: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [success, setSuccess] = useState(0);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);
  const [pickedMechanic, setPickedMechanic] = useState<User>({} as User);
  const [mechanicList, setMechanicList] = useState<User[]>([] as User[]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    LoginApi.getUsersByGroup("Mechanic")
      .then((res) => {
        setMechanicList(res.data);
        setLoading(false);
      })
      .catch((e) => {
        message.error("ERROR");
        console.log(e);
      });
  }, []);
  return (
    <div className="order-container">
      <h1>Złóż zamówienie</h1>
      <Progress
        type="circle"
        percent={percent}
        format={(percent) => `Krok ${step} z 2`}
        className="order-container__progress"
      />
      {}
      <Route>
        <Switch>
          <Route
            path="/order/1/"
            render={() => (
              <OrderStepOne
                setPickedMechanic={setPickedMechanic}
                mechanicList={mechanicList}
                loading={loading}
                pickedMechanic={pickedMechanic}
                setPercent={setPercent}
                setStep={setStep}
                setNotes={setNotes}
              />
            )}
          />
          <Route path="/order/2/" component={OrderStepTwo} />
          <Route path="/order/3/" component={OrderStepOne} />
        </Switch>
      </Route>
    </div>
  );
};

export default OrderForm;
