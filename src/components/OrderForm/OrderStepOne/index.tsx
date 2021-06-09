/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Radio } from "antd";
import TextArea from "antd/lib/input/TextArea";

import React from "react";
import Loader from "react-loader-spinner";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Mechanic } from "../../../models/user";

import "./styles.scss";

interface OneProps {
  setPickedMechanic: React.Dispatch<React.SetStateAction<Mechanic>>;
  pickedMechanic: Mechanic;
  loading: boolean;
  setPercent: React.Dispatch<React.SetStateAction<number>>;
  mechanicList: Mechanic[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
}

const OrderStepOne: React.FC<OneProps & RouteComponentProps> = ({
  setPickedMechanic,
  setPercent,
  setStep,
  setNotes,
  history,
  loading,
  pickedMechanic,
  mechanicList,
  notes,
}) => {
  const onGoToStepTwo = () => {
    setStep(2);
    setPercent(100);
    history.push("/order/2/");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>{"Wybór mechanika"}</h2>
          <div className="order-container__mechanicList">
            {mechanicList.map((mechanicPerson, index) => {
              const val =
                mechanicPerson.id === pickedMechanic.id ? true : false;
              const { user: mechanic, hourly_rate } = mechanicPerson;
              return (
                <div
                  className="order-container__mechanicList-mechanic"
                  key={index}
                >
                  <div className="order-container__mechanicList-mechanic__description">
                    <p className="order-container__mechanicList-mechanic__description-names">
                      {mechanic.first_name} {mechanic.last_name}
                    </p>
                    <p className="order-container__mechanicList-mechanic__description-address">
                      ul. Kościelna 80 16-315 Lipsk
                    </p>
                    <p className="order-container__mechanicList-mechanic__description-perHour">
                      {"Stawka godzinowa"}: {hourly_rate} zł/h
                    </p>
                  </div>
                  <div className="order-container__mechanicList-mechanic__description-radio">
                    <Radio
                      onChange={() => {
                        setPercent(50);
                        setPickedMechanic(mechanicPerson);
                      }}
                      value={val}
                      defaultChecked={val}
                      checked={val}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <>
            <div className="order-container__div">
              <p className="order-container__extramessage">
                {"Napisz dodatkową wiadomość do mechanika"}{" "}
                {pickedMechanic.user && (
                  <>
                    : {pickedMechanic.user.first_name}{" "}
                    {pickedMechanic.user.last_name}
                  </>
                )}
              </p>
            </div>
            <TextArea
              className="order-container__textarea"
              autoSize={{ minRows: 3 }}
              onChange={(ev) => setNotes(ev.target.value)}
              defaultValue={notes}
            />
            <Button
              disabled={pickedMechanic.id ? false : true}
              className="order-container__button"
              onClick={() => onGoToStepTwo()}
            >
              {"Wybór mechanika"}{" "}
              {pickedMechanic.user && (
                <>
                  : {pickedMechanic.user.first_name}{" "}
                  {pickedMechanic.user.last_name}
                </>
              )}
            </Button>
          </>
        </>
      )}
    </>
  );
};

export default withRouter(OrderStepOne);
