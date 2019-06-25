import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import PageHeader from "./PageHeader";
import router from "./router";
import querystring from "query-string";
// function myFunction() {
//   window.$('body').css('background-color', '#222d32');
// }

const Index = props => {
  // Get Query
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

  // Prepare data
  const query = querystring.parse(props.location.search);
  console.log(query);
  const match = props.match;
  let page = router.getRoute(match.url);

  //Init menu sidebar
  const initMenu = () => {
    return [
      {
        name: "Quản lý sản phẩm",
        open: false,
        subItem: [{ name: "Danh sách", url: "/provider/product/list" }, { name: "Thêm", url: "/provider/product/add" }]
      },
      {
        name: "Đặt hàng",
        open: false,
        subItem: [{ name: "Danh sách", url: "/provider/order/list" }]
      }
    ];
  };

  return (
    <div>
      <Header url="/provider/dashboard" history={props.history} />
      <Sidebar menu={initMenu} />
      <div className="content-wrapper" style={{ minHeight: "619px" }}>
        <PageHeader header={page ? page.header : ""} subHeader="EcoStore" level={match.url} />
        {page ? <page.component query={query} params={match.params} /> : ""}
      </div>
    </div>
  );
};

export default Index;
