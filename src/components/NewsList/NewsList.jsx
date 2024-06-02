import { Button, Table, Space, Input } from "antd";
import { NEWS_DATA } from "./constants";
import {
  EditOutlined,
  MobileOutlined,
  DesktopOutlined,
  SearchOutlined,
  UploadOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import "./NewsList.css";
import AddNewsModal from "../AddNewsModal/AddNewsModal";
import { useState, useRef } from "react";

const NewsList = () => {
  const [openNewsModal, setOpenNewsModal] = useState(false);
  const [newsList, setNewsList] = useState(NEWS_DATA);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const searchInput = useRef(null);

  const handleSearch = (confirm) => {
    confirm();
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "S NO",
      key: "sno",
      render: (text, object, index) => index + 1,
      width: "10%",
    },
    {
      title: "Intro text",
      dataIndex: "introText",
      key: "introText",
      ellipsis: true,
      ...getColumnSearchProps("introText"),
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
      title: "Created On",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
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
      render: (text) => (
        <span className={`chip ${text ? "green-chip" : "red-chip"}`}>
          {text ? "Published" : "Unpublished"}
        </span>
      ),
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
      width: "10%",
    },
  ];

  const onClickAdd = () => {
    setOpenNewsModal(true);
  };

  const addNews = (data) => {
    console.log(data);
    setNewsList([{ ...data, id: newsList.length }, ...newsList]);
  };

  const handleSelect = (record, selected) => {
    if (selected) {
      setSelectedKeys((keys) => [...keys, record.id]);
    } else {
      setSelectedKeys((keys) => {
        const index = keys.indexOf(record.id);
        return [...keys.slice(0, index), ...keys.slice(index + 1)];
      });
    }
  };

  const publishNews = () => {
    newsList.forEach((el) => {
      if (selectedKeys.includes(el.id)) {
        el.isPublished = true;
      }
    });
    setNewsList([...newsList]);
    setSelectedKeys([]);
  };

  const rowSelection = {
    selectedKeys,
    type: "checkbox",
    fixed: true,
    onSelect: handleSelect,
    columnTitle: "Select",
  };

  return (
    <div className="manage-news-page">
      <div className="page-header">
        <h3>Manage School News</h3>
        <div className="btn-container">
          <Button
            icon={<PlusSquareOutlined />}
            type="primary"
            onClick={onClickAdd}
          >
            Add
          </Button>
          <Button
            icon={<UploadOutlined />}
            onClick={publishNews}
            disabled={selectedKeys.length === 0}
          >
            Publish
          </Button>
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={newsList}
        bordered
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record.id}
      />
      {openNewsModal && (
        <AddNewsModal
          modalOpen={openNewsModal}
          closeModal={setOpenNewsModal}
          addNews={addNews}
        />
      )}
    </div>
  );
};

export default NewsList;
