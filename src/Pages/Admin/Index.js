import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import PageHeader from "./PageHeader";
import AdminRouter from "./router";
import "./Index.css";

const querystring = require("query-string");
// function myFunction() {
//   window.$("body").css("background-color", "#222d32");
//   loading.hide();
// }

const Index = props => {
  // Get Query from url
  const getQuery = str => {
    let query = str.replace("?", "");
    let myRegex = /([^\&]*)\=([^\&]*)/g;
    let result = {};
    let match;
    while ((match = myRegex.exec(query))) {
      result[match[1]] = match[2];
    }
    return result;
  };

  //
  const query = querystring.parse(props.location.search);
  const match = props.match;
  const page = AdminRouter.getRoute(match.url);
  //Init menu sidebar
  const initMenu = () => {
    return [
      {
        name: "Danh mục sản phẩm",
        open: true,
        subItem: [{ name: "Danh sách", url: "/admin/category/list" }, { name: "Thêm", url: "/admin/category/add" }]
      },
      {
        name: "Tài khoản người dùng",
        open: false,
        subItem: [{ name: "Danh sách", url: "/admin/user/list" }]
      },
      {
        name: "Mã giảm giá",
        open: false,
        subItem: [{ name: "Danh sách", url: "/admin/discount/list" }, { name: "Thêm", url: "/admin/discount/add" }]
      },
      {
        name: "Phương thức thanh toán",
        open: false,
        subItem: [{ name: "Danh sách", url: "/admin/payment/list" }, { name: "Thêm", url: "/admin/payment/add" }]
      }
    ];
  };

  return (
    <div>
      <Header url="/admin/dashboard" history={props.history} />
      <Sidebar menu={initMenu} />
      <div className="content-wrapper" style={{ minHeight: "619px" }}>
        <PageHeader header={page ? page.header : ""} subHeader="EcoStore" level={match.url} />
        {page ? <page.component query={query} params={match.params} /> : ""}
      </div>
    </div>
  );
};

export default Index;
