import Index from "./Index";
import List from "./List";

const router = {
    routers: [
      {
        url: "/",
        banner : true,
        component: List,
        header: "Trang chủ"
      },
      {
        url: "/product",
        component: Index,
        header: "Thông tin sản phẩm"
      }
    ],
    /**
     * return component, url , header
     * @param {*} url 
     */
    getRoute: function(url) {
      let router = this.routers.find(e => url === e.url);
      return router || {};
    }
  };
  
  export default router;
  