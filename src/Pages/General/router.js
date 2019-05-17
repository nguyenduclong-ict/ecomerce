import Index from "./Index";

const router = {
    routers: [
      {
        url: "/",
        component: Index,
        header: "Trang chủ"
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
  