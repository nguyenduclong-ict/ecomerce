import React, { useState, useEffect } from "react";
import "./Index.css";
import loading from "../../components/Loading";
import "../../components/loading.css";
// or less ideally

import Loader from "../../helpers/Loader";
import AdminNavbar from "../../layouts/AdminNavbar/AdminNavbar";

const cssHrefs = [
  "lib/bootstrap-4.0.0/dist/css/bootstrap.min.css"
]
const scriptSrcs = [
  "lib/jquery/dist/jquery-3.4.1.min.js",
  "lib/popper/popper.min.js",
  "lib/bootstrap-4.0.0/dist/js/bootstrap.min.js"
]

const Index = () => {
  const [isload, setIsload] = useState(true)
  useEffect(() => {
    loading.show();
    Promise.all([Loader.loadCSS(cssHrefs), Loader.loadScript(scriptSrcs)])
      .then(() => {
        loading.hide();
        setIsload(false);
      })
  }, []);
  return !isload ? (
    <div>
      <AdminNavbar title={"EcoStore"} />
    </div>
  ) : null;
};

export default Index;
