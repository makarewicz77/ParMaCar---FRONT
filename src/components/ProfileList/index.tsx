import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider, message } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { LoginApi } from "../../api/loginApi";
import { Mechanic } from "../../models/user";
import { getImageUrl } from "../../utils/utils";

import "./styles.scss";

const ProfileList: React.FC<RouteComponentProps> = ({ history }) => {
  const [mechanics, setMechanics] = useState([] as Mechanic[]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    LoginApi.getMechanics()
      .then((res) => {
        setMechanics(res.data);
        setLoading(false);
      })
      .catch((e) => {
        message.error("ERROR");
      });
  }, []);
  const goToProfile = (ev: number) => {
    history.push(`/profile/${ev}/`);
  };
  const { t } = useTranslation("common");
  return (
    <div>
      <h1>{t("mechanics.title")}</h1>
      <div className="mechanic">
        <Card>
          {loading ? (
            <Loader />
          ) : (
            mechanics.map((mechanic: Mechanic) => {
              const { id, avatar, user, hourly_rate, city } = mechanic;
              const { first_name, last_name } = user;
              return (
                <div
                  onClick={() => goToProfile(id)}
                  className="mechanic-list"
                  key={id}
                >
                  <Card.Grid
                    style={{
                      width: "25%",
                      textAlign: "center",
                    }}
                  >
                    {avatar ? (
                      <img
                        src={getImageUrl(mechanic.avatar)}
                        alt="mechanic avatar"
                        className="mechanic-list__avatar"
                      />
                    ) : (
                      <Avatar size={200} icon={<UserOutlined />} />
                    )}
                    <Divider />
                    <h3>
                      {first_name} {last_name}
                    </h3>
                    <h4>
                      {t("mechanics.city")}: {city ? city : "Brak danych"}
                    </h4>
                    <h4>
                      <>
                        {t("mechanics.hourlyRate")}: {hourly_rate}{" "}
                        {t("product.value")}/h
                      </>
                    </h4>
                  </Card.Grid>
                </div>
              );
            })
          )}
        </Card>
      </div>
    </div>
  );
};

export default withRouter(ProfileList);
