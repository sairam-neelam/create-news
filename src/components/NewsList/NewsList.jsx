import { Button, Table } from "antd";
import { NEWS_DATA } from "./constants";
import {
  EditOutlined,
  MobileOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import "./NewsList.css";
import AddNewsModal from "../AddNewsModal/AddNewsModal";
import { useState } from "react";

const NewsList = () => {
  const [openNewsModal, setOpenNewsModal] = useState(false);
  const columns = [
    {
      title: "S NO",
      key: "sno",
      render: (text, object, index) => index + 1,
    },
    {
      title: "Intro text",
      dataIndex: "introText",
      key: "introText",
      ellipsis: true,
    },
    {
      title: "Posted By",
      dataIndex: "postedBy",
      key: "postedBy",
      ellipsis: true,
    },
    {
      title: "Last Updated From",
      dataIndex: "isUpdatedFromMobile",
      key: "isUpdatedFromMobile",
      render: (text) => (
        <span>{text ? <MobileOutlined /> : <DesktopOutlined />}</span>
      ),
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <span>{text ? text : "None"}</span>,
      filters: [
        {
          text: "None",
          value: "None",
        },
        {
          text: "Art",
          value: "Art",
        },
        {
          text: "Events",
          value: "Events",
        },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      align: "center",
    },
    {
      title: "Published",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (text) => <span>{text ? "Published" : "Unpublished"}</span>,
      align: "center",
    },
    {
      title: "Edit",
      key: "edit",
      render: () => (
        <span>
          <EditOutlined />
        </span>
      ),
      align: "center",
    },
  ];

  const onClickAdd = () => {
    setOpenNewsModal(true);
  };

  return (
    <div className="manage-news-page">
      <div className="page-header">
        <h3>Manage School News</h3>
        <Button onClick={onClickAdd}> Add</Button>
      </div>
      <Table
        columns={columns}
        dataSource={NEWS_DATA}
        bordered
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record.id}
      />
      <AddNewsModal modalOpen={openNewsModal} closeModal={setOpenNewsModal} />
    </div>
  );
};

export default NewsList;
