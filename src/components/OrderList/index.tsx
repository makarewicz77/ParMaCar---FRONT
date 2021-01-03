/* eslint-disable react-hooks/exhaustive-deps */
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
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
  const [orderList, setOrderList] = useState<Order[]>([] as Order[]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLogged, user, mechanicId } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
  const { Option } = Select;
  const [orderToChange, setOrderToChange] = useState<Order | undefined>(
    undefined
  );
  const [mechanicOrders, setMechanicsOrders] = useState<Order[]>([] as Order[]);
  const [changeModal, setChangeModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const columns = [
    { dataIndex: "id", title: t("orderList.table.orderId"), width: "15%" },
    {
      title: t("orderList.table.status"),
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
      title: t("orderList.table.date"),
      width: "20%",
      render: (date: string) => {
        return new Date(date).toLocaleString();
      },
    },
    {
      dataIndex: "mechanic_full_name",
      title:
        user?.groups[0].name === "Client"
          ? t("order.mechanic")
          : t("orderList.table.changeOrderStatus"),
      render: (name: string, obj: any) =>
        user?.groups[0].name === "Client" ? (
          <Link to={`/profile/${obj.mechanic}/`} key={obj.id}>
            {name}
          </Link>
        ) : (
          <div
            className="orderList-changeStatus"
            onClick={(ev) => {
              setOrderToChange(obj);
              setChangeModal(true);
            }}
          >
            <EditOutlined /> {t("orderList.table.changeStatus")}
          </div>
        ),
    },
    {
      dataIndex: "id",
      title: t("orderList.table.action"),
      render: (name: string, obj: any) => (
        <>
          <Link to={`/order-details/${obj.id}/`} key={`${obj.id}_action`}>
            {t("orderList.details")}
          </Link>
          {obj.status === "New" && user?.groups[0].name === "Client" && (
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
  const columns2 = [
    { dataIndex: "id", title: t("orderList.table.orderId"), width: "15%" },
    {
      title: t("orderList.table.status"),
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
      title: t("orderList.table.date"),
      width: "20%",
      render: (date: string) => {
        return new Date(date).toLocaleString();
      },
    },
    {
      dataIndex: "mechanic_full_name",
      title:
        user?.groups[0].name !== "Client"
          ? t("order.mechanic")
          : t("orderList.table.changeOrderStatus"),
      render: (name: string, obj: any) =>
        user?.groups[0].name !== "Client" ? (
          <Link to={`/profile/${obj.mechanic}/`} key={obj.id}>
            {name}
          </Link>
        ) : (
          <div
            className="orderList-changeStatus"
            onClick={(ev) => {
              setOrderToChange(obj);
              setChangeModal(true);
            }}
          >
            <EditOutlined /> {t("orderList.table.changeStatus")}
          </div>
        ),
    },
    {
      dataIndex: "id",
      title: t("orderList.table.action"),
      render: (name: string, obj: any) => (
        <>
          <Link to={`/order-details/${obj.id}/`} key={`${obj.id}_action`}>
            {t("orderList.details")}
          </Link>
          {obj.status === "New" && user?.groups[0].name !== "Client" && (
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
      if (user.groups[0].name === "Client")
        OrderApi.getUserOrders(user.id)
          .then((res) => {
            setOrderList(res.data);
            setLoading(false);
          })
          .catch((e) => {
            message.error("Error");
            setLoading(false);
          });
      if (user.groups[0].name === "Mechanic" && mechanicId) {
        OrderApi.getMechanicOrders(mechanicId)
          .then((res) => {
            setOrderList(res.data);
          })
          .catch((e) => {
            message.error("Error");
          });
        OrderApi.getUserOrders(user.id)
          .then((res) => {
            setMechanicsOrders(res.data);
            setLoading(false);
          })
          .catch((e) => {
            message.error("Error");
            setLoading(false);
          });
      }
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
      {user?.groups[0].name === "Client" ? (
        <h1>{t("orderList.title")}</h1>
      ) : (
        <h1>{t("orderList.orderAssigned")}</h1>
      )}
      <Divider />
      <Table
        loading={loading}
        dataSource={orderList}
        columns={columns}
        key="table"
      />
      {user?.groups[0].name === "Mechanic" && (
        <>
          <h1>{t("orderList.title")}</h1> <Divider />{" "}
          <Table dataSource={mechanicOrders} columns={columns2} />
        </>
      )}
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
