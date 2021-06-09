import { Card, Divider, message } from "antd";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { LoginApi } from "../../api/loginApi";
import { Mechanic } from "../../models/user";

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
  return (
    <div>
      <h1>Lista mechaników</h1>
      <div className="mechanic">
        <Card>
          {loading ? (
            <Loader />
          ) : (
            mechanics.map((mechanic: Mechanic) => {
              const { id, user, hourly_rate, city } = mechanic;
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
                    <Divider />
                    <h3>
                      {first_name} {last_name}
                    </h3>
                    <h4>Miasto: {city ? city : "Brak danych"}</h4>
                    <h4>
                      <>Stawka godzinowa: {hourly_rate} zł./h</>
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
