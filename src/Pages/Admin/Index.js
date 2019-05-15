import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../layouts/Header/Header";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import PageHeader from "./PageHeader";
import AdminRouter from "./router";
import {
  loadScript,
  loadCSS,
  clearAllScriptAndCSS
} from "../../helpers/Loader";
import loading from "../../components/Loading";
import "../../components/loading.css";

// Add js and css to html
const addJsAndCss = async () => {
  clearAllScriptAndCSS();
  await loadCSS("lib/bootstrap/dist/css/bootstrap.min.css");
  await loadCSS("lib/font-awesome/css/font-awesome.min.css");
  await loadCSS("lib/Ionicons/css/ionicons.min.css");
  await loadCSS("dist/css/AdminLTE.css");
  await loadCSS("plugins/alertifyjs/css/alertify.min.css");
  await loadCSS("plugins/alertifyjs/css/themes/default.min.css");
  await loadCSS("plugins/jquery-confirm/jquery-confirm.min.css");
  await loadCSS("dist/css/skins/skin-blue.min.css");
  await loadCSS(
    "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic"
  );

  // Footer
  await loadScript("lib/jquery/dist/jquery.min.js");
  // await loadScript("lib/bootstrap/dist/js/bootstrap.min.js");
  await loadScript("dist/js/adminlte.js");
  await loadScript("plugins/alertifyjs/alertify.min.js");
  await loadScript("plugins/jquery-confirm/jquery-confirm.min.js");

  window.onload = () => {
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
  };
};
// Add JS and CSS
console.log("aaa");

// Index Component
const Index = props => {
  const [isload, setIsload] = useState(true);
  useEffect(() => {
    addJsAndCss();
    setIsload(false);
  }, []);
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
  let page = AdminRouter.getRoute(match.url);
  console.log(page);
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

  return isload === false ? (
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
  ) : (
    ""
  );
};

export default Index;
