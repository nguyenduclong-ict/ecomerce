import React from "react";
import Header from "../../layouts/Header/Header";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import PageHeader from "./../Admin/PageHeader";
import router from "./router";

const Index = props => {
  // Get Query
  const getQuery = (str) => {
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
  const query = getQuery(props.location.search);
  const match = props.match;
  let page = router.getRoute(match.url);

  //Init menu sidebar
  const initMenu = () => {
    return [
      {
        name: "Quản lý sản phẩm",
        open: false,
        subItem: [
          { name: "Danh sách", url: "/provider/product/list" },
          { name: "Thêm", url: "/provider/product/add" }
        ]
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
      <Header url="/provider/product/list" />
      <Sidebar menu={initMenu} />
      <div className="content-wrapper" style={{ minHeight: "619px" }}>
        <PageHeader
          header={page.header}
          subHeader="EcoStore"
          level={props.match.url}
        />
        <page.component query={query} params={match.params} />
      </div>
    </div>
  );
};

export default Index;
