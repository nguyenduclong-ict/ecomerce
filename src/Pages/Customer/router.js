import Profile from "./Profile";
import Cart from "./Cart";

const router = {
    routers: [
      {
        url: "/customer/profile",
        component: Profile,
        header: "Trang cá nhân"
      },
      {
        url: "/customer/cart",
        component: Cart,
        header: "Thông tin giỏ hàng"
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
  