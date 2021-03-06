import React, { useState, useEffect } from "react";
import "./Index.css";
import "../../components/loading.css";
import router from "./router";

// or less ideally
import myfunction from "./myfunction";
import loading from "../../components/Loading";
import Loader from "../../helpers/Loader";
import Navbar from "../../components/General/Navbar/Navbar";
import Banner from "../../components/General/Banner/Banner";

const cssHrefs = [
  "General/css/linearicons.css",
  "General/css/themify-icons.css",
  "lib/bootstrap-4.0.0/dist/css/bootstrap.min.css",
  "lib/font-awesome/css/font-awesome.min.css",
  "plugins/jquery-confirm/jquery-confirm.min.css",
  "plugins/alertifyjs/css/alertify.min.css",
  // "General/css/owl.carousel.css",
  // "General/css/nice-select.css",
  // "General/css/nouislider.min.css",
  // "General/css/ion.rangeSlider.css",
  // "General/css/ion.rangeSlider.skinFlat.css",
  // "General/css/magnific-popup.css",
  "General/css/main.css"
];

const scriptSrcs = [
  "lib/jquery/dist/jquery-3.4.1.min.js",
  "lib/popper/popper.min.js",
  "lib/bootstrap-4.0.0/dist/js/bootstrap.min.js",
  "General/js/jquery.sticky.js",
  "plugins/alertifyjs/alertify.min.js",
  "plugins/jquery-confirm/jquery-confirm.min.js"
  // "General/js/jquery.ajaxchimp.min.js",
  // "General/js/jquery.nice-select.min.js",
  // "General/js/nouislider.min.js",
  // "General/js/countdown.js",
  // "General/js/jquery.magnific-popup.min.js",
  // "General/js/owl.carousel.min.js",
  // "General/https://maps.googleapis.com/maps/api/js?key=AIzaSyCjCGmQ0Uq4exrzdcL6rvxywDDOvfAu6eE",
  // "General/js/gmaps.min.js",
  // "General/js/main.js"
];

const Index = props => {
  const [isload, setIsload] = useState(true);
  useEffect(() => {
    loading.show();
    Loader.load(cssHrefs, scriptSrcs, () => {
      loading.hide();
      setIsload(false);
      myfunction();
    });
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

  const query = getQuery(props.location.search);
  const match = props.match;
  const page = router.getRoute(match.url);

  return !isload ? (
    <div>
      <Navbar />
      {page.banner ? <Banner /> : null}
      {page ? <page.component query={query} params={match.params} /> : null}
    </div>
  ) : null;
};

export default Index;
