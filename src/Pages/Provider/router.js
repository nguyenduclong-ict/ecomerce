import Product from "./Product";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Order from "./Order";
import EditOrder from "./EditOrder";
import Error from "../Error";
import Dashboard from "../Admin/Dashboard";
import Profile from "./Profile";

const router = {
  routers: [
    {
      url: "/provider/dashboard",
      component: Dashboard,
      header: "Trang chủ"
    },
    {
      url: "/provider/product/list",
      component: Product,
      header: "Danh sách sản phẩm"
    },
    {
      url: "/provider/product/add",
      component: AddProduct,
      header: "Thêm sản phẩm"
    },
    {
      url: "/provider/product/edit",
      component: EditProduct,
      header: "Chỉnh sửa thông tin sản phẩm"
    },
    {
      url: "/provider/order/list",
      component: Order,
      header: "Danh sách đơn hàng"
    },
    {
      url: "/provider/order/edit",
      component: EditOrder,
      header: "Chỉnh sửa thông tin đơn hàng"
    },
    {
      url: "/provider/profile",
      component: Profile,
      header: "Chỉnh sửa thông tài khoản"
    }
  ],
  getRoute: function(url) {
    let router = this.routers.find(e => url === e.url);
    console.log(router);
    return router ? router : { component: Error, header: "404", code: 404 };
  }
};

export default router;
