import React from "react";
import Header from "../../layouts/Header/Header";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import PageHeader from "./PageHeader";
import Discount from "./Discount";
import User from "./User";
import Category from "./Category";
import Payment from "./Payment";
import AddPayment from "./AddPayment";
import AddDiscount from "./AddDiscount";
import AddUser from "./AddUser";
import AddCategory from "./AddCategory";
import EditPayment from "./EditPayment";

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
        subItem: [{ name: "Danh sách", url: "/admin/user/list" }]
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
  const route = (params) => {
    let page = {};
    switch (params.page) {
      case "dashboard":
        page = <Dashboard />;
        break;
      case "payment":
        if (params.p2 === "add") page = <AddPayment />;
        else if (params.p2 === "edit") page = <EditPayment params={params}/>
        else page = <Payment />;
        break;
      case "discount":
        if (params.p2 === "add") page = <AddDiscount />;
        else page = <Discount />;
        break;
      case "user":
        if (params.p2 === "add") page = <AddUser />;
        else page = <User />;
        break;
      case "category":
        if (params.p2 === "add") page = <AddCategory />;
        else page = <Category />;
        break;
      default:
        page = <Dashboard />;
        break;
    }
    return page;
  };

  const getPageHeader = page => {
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  return (
    <div>
      <Header />
      <Sidebar menu={initMenu} />
      <div className="content-wrapper" style={{ minHeight: "619px" }}>
        <PageHeader
          header={getPageHeader(match.params.page)}
          subHeader="EcoStore"
          level={match.url}
        />
        {route(match.params)}
      </div>
    </div>
  );
};

export default Index;
