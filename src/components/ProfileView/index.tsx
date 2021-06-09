import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { LoginApi } from "../../api/loginApi";
import { Mechanic } from "../../models/user";

import "./styles.scss";

const ProfileView: React.FC<RouteComponentProps> = ({ history, location }) => {
  const id = history.location.pathname.split("/")[2];
  const [mechanic, setMechanic] = useState<Mechanic | undefined>(undefined);
  useEffect(() => {
    if (id)
      LoginApi.getMechanic(Number(id)).then((res) => {
        setMechanic(res.data);
      });
  }, [id]);
  return (
    <div>
      <div style={{ position: "relative" }}>
        <h1>Profil mechanika</h1>
        <Link
          to="/profile-list"
          style={{ top: 0, left: 0, position: "absolute" }}
        >
          Wróć do listy
        </Link>
      </div>

      <Divider />
      {!mechanic ? (
        <Loader />
      ) : (
        <>
          <div className="profile-container">
            <div style={{ float: "left" }}>
              <Divider type="vertical" style={{ height: "150px" }} />
            </div>

            <div className="profile-container__informations">
              <h2>
                {mechanic.user.first_name} {mechanic.user.last_name}
              </h2>
              <h3>
                Adres email: <strong>{mechanic.user.email}</strong>
              </h3>
              <h3>
                Telefon: <strong>{mechanic.phone}</strong>
              </h3>
              <h3>
                Adres:{" "}
                <strong>
                  {mechanic.street}, {mechanic.postal_code} {mechanic.city}
                </strong>
              </h3>
              <h3>
                Stawka godzinowa: <strong>{mechanic.hourly_rate} zł/h</strong>
              </h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(ProfileView);
