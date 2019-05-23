import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import PageHeader from "./PageHeader";
import router from "./router";

import Loader from "../../helpers/Loader";
import loading from "../../components/Loading";
import "../../components/loading.css";
import './Index.css'
import $ from 'jquery'

const cssUrl = [
  "lib/bootstrap/dist/css/bootstrap.min.css",
  "lib/font-awesome/css/font-awesome.min.css",
  "lib/Ionicons/css/ionicons.min.css",
  "dist/css/AdminLTE.css",
  "plugins/alertifyjs/css/alertify.min.css",
  "plugins/alertifyjs/css/themes/default.min.css",
  "plugins/jquery-confirm/jquery-confirm.min.css",
  "dist/css/skins/skin-blue.min.css"
];

const scriptUrl = [
  "lib/jquery/dist/jquery.min.js",
  "lib/bootstrap/dist/js/bootstrap.min.js",
  "dist/js/adminlte.js",
  "plugins/alertifyjs/alertify.min.js",
  "plugins/jquery-confirm/jquery-confirm.min.js"
];

function myFunction() {
  window.$('body').css('background-color', '#222d32');
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
    Loader.load(cssUrl, scriptUrl, event => {
      myFunction();
      loading.hide();
      setIsload(false);
    });
  }, []);
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
  const query = getQuery(props.location.search);
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

  return !isload ? (
    <div>
      <Header url="/provider/dashboard" history={props.history} />
      <Sidebar menu={initMenu} />
      <div className="content-wrapper" style={{ minHeight: "619px" }}>
        <PageHeader header={page ? page.header : ""} subHeader="EcoStore" level={match.url} />
        {page ? <page.component query={query} params={match.params} /> : ""}
      </div>
    </div>
  ) : null;
};

export default Index;
