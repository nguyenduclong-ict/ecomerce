import Product from "./Product";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Order from "./Order";
import EditOrder from './EditOrder'

const router = {
  routers: [
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
    }
  ],
  getRoute: function(url) {
    let router = this.routers.find(e => url === e.url);
    return router || {};
  }
};

export default router;
