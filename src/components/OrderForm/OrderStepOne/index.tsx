/* eslint-disable react-hooks/rules-of-hooks */
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Radio, Skeleton } from "antd";
import TextArea from "antd/lib/input/TextArea";

import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { User } from "../../../models/user";
import { getImageUrl } from "../../../utils/utils";

import "./styles.scss";

interface OneProps {
  setPickedMechanic: React.Dispatch<React.SetStateAction<User>>;
  pickedMechanic: User;
  loading: boolean;
  setPercent: React.Dispatch<React.SetStateAction<number>>;
  mechanicList: User[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
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
}) => {
  console.log(pickedMechanic);
  const onGoToStepTwo = () => {
    setStep(1);
    history.push("/order/2/");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>Wybór mechanika</h2>
          <div className="order-container__mechanicList">
            {mechanicList.map((mechanic, index) => {
              const val = mechanic.id === pickedMechanic.id ? true : false;
              return (
                <div
                  className="order-container__mechanicList-mechanic"
                  key={index}
                >
                  <div className="order-container__mechanicList-mechanic__avatar">
                    {" "}
                    {mechanic.avatar ? (
                      <img
                        src={getImageUrl(mechanic.avatar)}
                        alt="mechanic avatar"
                      />
                    ) : (
                      <Avatar size={50} icon={<UserOutlined />} />
                    )}
                  </div>
                  <div className="order-container__mechanicList-mechanic__description">
                    <p className="order-container__mechanicList-mechanic__description-names">
                      {mechanic.first_name} {mechanic.last_name}
                    </p>
                    <p className="order-container__mechanicList-mechanic__description-address">
                      ul. Kościelna 80 16-315 Lipsk
                    </p>
                    <p className="order-container__mechanicList-mechanic__description-perHour">
                      Stawka na godzinę: 15zł/h
                    </p>
                  </div>
                  <div className="order-container__mechanicList-mechanic__description-radio">
                    <Radio
                      onChange={() => {
                        setPercent(50);
                        setPickedMechanic(mechanic);
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
                Napisz dodatkową wiadomość do mechanika{" "}
                {pickedMechanic && (
                  <>
                    : {pickedMechanic.first_name} {pickedMechanic.last_name}
                  </>
                )}
              </p>
            </div>
            <TextArea
              className="order-container__textarea"
              autoSize={{ minRows: 3 }}
              onChange={(ev) => setNotes(ev.target.value)}
            />
            <Button
              disabled={pickedMechanic.id ? false : true}
              className="order-container__button"
              onClick={() => onGoToStepTwo()}
            >
              Wybierz mechanika{" "}
              {pickedMechanic && (
                <>
                  : {pickedMechanic.first_name} {pickedMechanic.last_name}
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
