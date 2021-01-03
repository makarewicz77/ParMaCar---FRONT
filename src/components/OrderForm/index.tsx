import { message, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch } from "react-router-dom";
import { LoginApi } from "../../api/loginApi";
import { Mechanic } from "../../models/user";
import OrderStepOne from "./OrderStepOne";
import OrderStepTwo from "./OrderStepTwo";

import "./styles.scss";

const OrderForm: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);
  const [pickedMechanic, setPickedMechanic] = useState<Mechanic>(
    {} as Mechanic
  );
  const [mechanicList, setMechanicList] = useState<Mechanic[]>(
    [] as Mechanic[]
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation("common");
  useEffect(() => {
    LoginApi.getMechanics()
      .then((res) => {
        setMechanicList(res.data);
        setLoading(false);
      })
      .catch((e) => {
        message.error("ERROR");
      });
  }, []);
  return (
    <div className="order-container">
      <h1>{t("order.submitOrder")}</h1>
      <Progress
        type="circle"
        percent={percent}
        format={() => `${t("order.step")} ${step} ${t("order.stepOf")} 2`}
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
                notes={notes}
                mechanicList={mechanicList}
                loading={loading}
                pickedMechanic={pickedMechanic}
                setPercent={setPercent}
                setStep={setStep}
                setNotes={setNotes}
              />
            )}
          />
          <Route
            path="/order/2/"
            render={() => (
              <OrderStepTwo
                mechanic={pickedMechanic}
                note={notes}
                setPercent={setPercent}
                setStep={setStep}
              />
            )}
          />
          <Route path="/order/3/" component={OrderStepOne} />
        </Switch>
      </Route>
    </div>
  );
};

export default OrderForm;
