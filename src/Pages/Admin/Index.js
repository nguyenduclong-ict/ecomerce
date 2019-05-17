import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import PageHeader from "./PageHeader";
import AdminRouter from "./router";

import Loader from "../../helpers/Loader";
import loading from "../../components/Loading";
import "../../components/loading.css";

const cssUrl = [
  "lib/bootstrap/dist/css/bootstrap.min.css",
  "lib/font-awesome/css/font-awesome.min.css",
  "lib/Ionicons/css/ionicons.min.css",
  "dist/css/AdminLTE.css",
  "plugins/alertifyjs/css/alertify.min.css",
  "plugins/alertifyjs/css/themes/default.min.css",
  "plugins/jquery-confirm/jquery-confirm.min.css",
  "dist/css/skins/skin-blue.min.css"
]

const scriptUrl = [
  "lib/jquery/dist/jquery.min.js",
  "lib/bootstrap/dist/js/bootstrap.min.js",
  "dist/js/adminlte.js",
  "plugins/alertifyjs/alertify.min.js",
  "plugins/jquery-confirm/jquery-confirm.min.js"
]


function myFunction() {
  window.$.alertError = message => {
    window.$.alert({
      title: "Lỗi",
      content: message,
      type: "red",
      animationSpeed: 100
    });
  };

  window.$.alertWarning = message => {
    window.$.alert({
      title: "Lưu ý",
      content: message,
      animationSpeed: 100,
      type: "orange"
    });
  };

  window.$.alertSuccess = message => {
    window.$.alert({
      title: "Thành công",
      content: message,
      animationSpeed: 100,
      type: "green"
    });
  };
  // custorm library
  window.$.showAlert = (title, message) => {
    window.$.alert({
      title: title,
      content: message,
      animation: "bottom",
      animationSpeed: 200
    });
  };
  loading.hide();
}



const Index = props => {

  const [isload, setIsload] = useState(true);

  useEffect(() => {
    loading.show();
    Loader.load(cssUrl, scriptUrl)
      .then(() => {
        setIsload(false);
        loading.hide();
      })
  }, [])
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
  const query = getQuery(props.location.search);
  const match = props.match;
  const page = AdminRouter.getRoute(match.url);
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
        open: false,
        subItem: [{ name: "Danh sách", url: "/admin/user/list" }]
      },
      {
        name: "Mã giảm giá",
        open: false,
        subItem: [
          { name: "Danh sách", url: "/admin/discount/list" },
          { name: "Thêm", url: "/admin/discount/add" }
        ]
      },
      {
        name: "Phương thức thanh toán",
        open: false,
        subItem: [
          { name: "Danh sách", url: "/admin/payment/list" },
          { name: "Thêm", url: "/admin/payment/add" }
        ]
      }
    ];
  };

  return !isload ? (
    <div>
      <Header url="/admin/dashboard" />
      <Sidebar menu={initMenu} />
      <div className="content-wrapper" style={{ minHeight: "619px" }}>
        <PageHeader
          header={page ? page.header : ""}
          subHeader="EcoStore"
          level={match.url}
        />
        {page ? <page.component query={query} params={match.params} /> : ""}
      </div>
    </div>
  ) : null;
};

export default Index;
