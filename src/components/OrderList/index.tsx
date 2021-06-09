/* eslint-disable react-hooks/exhaustive-deps */
import { CloseSquareOutlined } from "@ant-design/icons";
import { Divider, message, Modal, Select, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { OrderApi } from "../../api/orderApi";
import { UserContext } from "../../contexts/UserContext";
import { Order } from "../../models/order";

import "./styles.scss";

const OrderList: React.FC = () => {
  const { t } = useTranslation("common");
  const [orderList, setOrderList] = useState<Order[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLogged, user } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
  const { Option } = Select;
  const [orderToChange, setOrderToChange] =
    useState<Order | undefined>(undefined);
  const [changeModal, setChangeModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const columns = [
    { dataIndex: "id", title: "Numer zamówienia", width: "15%" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <div
          className={`orderList-status__${text.replace(" ", "_")}`}
          key={text}
        >
          {t(`orderList.status.${text.replace(" ", "_")}`)}
        </div>
      ),
    },
    {
      dataIndex: "date",
      title: "Data",
      width: "20%",
      render: (date: string) => {
        return new Date(date).toLocaleString();
      },
    },
    {
      dataIndex: "mechanic_full_name",
      title: "Mechanik",
      render: (name: string, obj: any) => (
        <Link to={`/profile/${obj.mechanic}/`} key={obj.id}>
          {name}
        </Link>
      ),
    },
    {
      dataIndex: "id",
      title: "Akcja",
      render: (name: string, obj: any) => (
        <>
          <Link to={`/order-details/${obj.id}/`} key={`${obj.id}_action`}>
            Szczegóły
          </Link>
          {obj.status === "New" && (
            <div
              className="orderList-cancel"
              onClick={() => {
                setModalVisible(true);
                setOrderToCancel(obj.id);
              }}
            >
              <CloseSquareOutlined /> {t("orderList.cancelOrder")}
            </div>
          )}
        </>
      ),
    },
  ];
  const cancelOrder = () => {
    if (orderToCancel)
      OrderApi.cancelOrder(orderToCancel)
        .then((res) => {
          message.success(t("orderList.successfullyCancel"));
          setModalVisible(false);
          setLoading(true);
          getOrders();
        })
        .catch((err) => message.error("Error"));
  };
  const getOrders = () => {
    if (user && isLogged) {
      OrderApi.getUserOrders(user.id)
        .then((res) => {
          setOrderList(res.data);
          setLoading(false);
        })
        .catch((e) => {
          message.error("Error");
          setLoading(false);
        });
    }
  };
  const changeStatus = () => {
    if (orderToChange)
      OrderApi.changeOrderStatus(orderToChange, status).then((res) => {
        message.success(t("orderList.changedSuccess"));
        getOrders();
      });
  };
  const handleChange = (e: any) => {
    setStatus(e.replace("_", " "));
  };

  useEffect(() => {
    getOrders();
  }, [isLogged, user]);
  return (
    <>
      <h1>Moje zamówienia</h1>
      <Divider />
      <Table
        loading={loading}
        dataSource={orderList}
        columns={columns}
        key="table"
      />
      <Modal
        destroyOnClose
        visible={modalVisible}
        title={t("orderList.modalTitle")}
        cancelText={t("orderList.cancel")}
        okText={t("orderList.confirm")}
        onCancel={() => {
          setOrderToCancel(null);
          setModalVisible(false);
        }}
        onOk={() => {
          cancelOrder();
        }}
      >
        {t("orderList.deleteQuestion")}{" "}
        <strong>
          {t("orderList.orderId")}-{orderToCancel}?
        </strong>
      </Modal>
      <Modal
        destroyOnClose
        visible={changeModal}
        title={t("orderList.changeStatus")}
        cancelText={t("orderList.cancel")}
        okText={t("orderList.confirm")}
        onCancel={() => {
          setChangeModal(false);
          setOrderToChange(undefined);
          setStatus("");
        }}
        onOk={() => {
          changeStatus();
          setChangeModal(false);
          setStatus("");
        }}
      >
        {" "}
        <Select
          defaultValue={
            orderToChange?.status.replace(" ", "_") === "new"
              ? "New"
              : orderToChange?.status.replace(" ", "_")
          }
          style={{ width: 230 }}
          onChange={handleChange}
        >
          <Option value="New">{t("orderList.status.New")}</Option>
          <Option value="Accepted">{t("orderList.status.Accepted")}</Option>
          <Option value="Declined">{t("orderList.status.Declined")}</Option>
          <Option value="In_progress">
            {t("orderList.status.In_progress")}
          </Option>
          <Option value="Finished">{t("orderList.status.Finished")}</Option>
        </Select>
      </Modal>
    </>
  );
};

export default OrderList;
