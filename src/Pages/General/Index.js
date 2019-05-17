import React, { useEffect } from "react";
import "./Index.css";
import loading from "../../components/Loading";
import "../../components/loading.css";
// or less ideally

import {
  loadCSS,
  loadScript,
  clearAllScriptAndCSS
} from "../../helpers/Loader";
import AdminNavbar from "../../layouts/AdminNavbar/AdminNavbar";

const loadHtmlLibrary = () => {
  clearAllScriptAndCSS();
  loadCSS("lib/bootstrap-4.0.0/dist/css/bootstrap.min.css");
  loadScript("lib/jquery/dist/jquery-3.4.1.min.js");
  loadScript("lib/popper/popper.min.js");
  loadScript("lib/bootstrap-4.0.0/dist/js/bootstrap.min.js");

};

const Index = () => {
  useEffect(() => {
    loadHtmlLibrary();
  }, []);
  return (
    <div>
      <AdminNavbar title={"EcoStore"} />
    </div>
  );
};

export default Index;
