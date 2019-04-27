import React from "react";
import Header from "../../layouts/Header/Header";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import PageHeader from "../PageHeader";
import Discount from "./Discount";
import User from "./User";
import Category from "./Category";
import Payment from "./Payment";

const Index = ({ match }) => {
  console.log(match);
   //Init menu sidebar
   const initMenu = () => {
    return [
      {
        name: "Danh mục sản phẩm",
        open: false,
        subItem: [
          { name: "Danh sách", url: "/admin/category/list" },
          { name: "Thêm", url: "/admin/category/add" }
        ]
      },
      {
        name: "Tài khoản người dùng",
        url: "/admin/user",
        open: false,
        subItem: [
          { name: "Danh sách", url: "/admin/user/list" },
          { name: "Thêm", url: "/admin/user/add" }
        ]
      },
      {
        name: "Mã giảm giá",
        url: "/admin/discount",
        open: false,
        subItem: [
          { name: "Danh sách", url: "/admin/discount/list" },
          { name: "Thêm", url: "/admin/discount/add" }
        ]
      },
      {
        name: "Phương thức thanh toán",
        url: "/admin/payment",
        open: false,
        subItem: [
          { name: "Danh sách", url: "/admin/payment/list" },
          { name: "Thêm", url: "/admin/payment/add" }
        ]
      }
    ];
  };

  // Phan route
  const route = params => { 
    let page = {};
    console.log(params);
    switch (params) {
      case "dashboard":
        page = <Dashboard />;
        break;
      case "payment":
        page = <Payment />;
        break;
      case "discount":
        page = <Discount />;
        break;
      case "user":
        page = <User />;
        break;
      case "category":
        page = <Category />;
        break;
      default:
        page = <Dashboard />;
        break;
    }
    return page;
  };

  return (
    <div>
      <Header />
      <Sidebar menu={initMenu}/>
      <div className="content-wrapper" style={{ minHeight: "619px" }}>
        <PageHeader header="Dasboard" subHeader="EcoStore" level={match.url} />
        {route(match.params.page)}
      </div>
    </div>
  );
};

export default Index;
