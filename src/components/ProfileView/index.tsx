import { UserOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { LoginApi } from "../../api/loginApi";
import { Mechanic } from "../../models/user";
import { getImageUrl } from "../../utils/utils";

import "./styles.scss";

const ProfileView: React.FC<RouteComponentProps> = ({ history, location }) => {
  const id = history.location.pathname.split("/")[2];
  const [mechanic, setMechanic] = useState<Mechanic | undefined>(undefined);
  // const [filters, setFilters] = useState({
  //   first_name: "",
  //   last_name: "",
  //   city: "",
  // });
  const { t } = useTranslation("common");
  useEffect(() => {
    if (id)
      LoginApi.getMechanic(Number(id)).then((res) => {
        setMechanic(res.data);
      });
  }, [id]);
  return (
    <div>
      <div style={{ position: "relative" }}>
        <h1>{t("mechanics.detailTitle")}</h1>
        <Link
          to="/profile-list"
          style={{ top: 0, left: 0, position: "absolute" }}
        >
          {t("mechanics.backToList")}
        </Link>
      </div>

      <Divider />
      {!mechanic ? (
        <Loader />
      ) : (
        <>
          <div className="profile-container">
            <div className="profile-container__avatar-div">
              {mechanic.avatar ? (
                <img
                  src={getImageUrl(mechanic.avatar)}
                  alt="mechanic avatar"
                  className="profile-container__avatar"
                />
              ) : (
                <Avatar size={200} icon={<UserOutlined />} />
              )}
            </div>
            <div style={{ float: "left" }}>
              <Divider type="vertical" style={{ height: "150px" }} />
            </div>

            <div className="profile-container__informations">
              <h2>
                {mechanic.user.first_name} {mechanic.user.last_name}
              </h2>
              <h3>
                {t("mechanics.emailAddress")}:{" "}
                <strong>{mechanic.user.email}</strong>
              </h3>
              <h3>
                {t("mechanics.phone")}: <strong>{mechanic.phone}</strong>
              </h3>
              <h3>
                {t("mechanics.address")}:{" "}
                <strong>
                  {mechanic.street}, {mechanic.postal_code} {mechanic.city}
                </strong>
              </h3>
              <h3>
                {t("mechanics.hourlyRate")}:{" "}
                <strong>{mechanic.hourly_rate} zł/h</strong>
              </h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(ProfileView);
