import Dashboard from "./Dashboard";
// Payment
import Payment from "./Payment";
import AddPayment from "./AddPayment";
import EditPayment from "./EditPayment";
// User
import User from "./User";
// Category
import Category from "./Category";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
// Discount
import Discount from "./Discount";
import AddDiscount from "./AddDiscount";
import EditDiscount from "./EditDiscount";

const router = {
  routers: [
    {
      url: "/admin/dashboard",
      component: Dashboard,
      header: "Trang chủ Admin"
    },
    // User
    {
      url: "/admin/user/list",
      component: User,
      header: "Danh sách sản phẩm"
    },
    // Category
    {
      url: "/admin/category/list",
      component: Category,
      header: "Danh sách danh mục sản phẩm"
    },
    {
      url: "/admin/category/add",
      component: AddCategory,
      header: "Thêm danh mục sản phẩm"
    },
    {
      url: "/admin/category/edit",
      component: EditCategory,
      header: "Chỉnh sửa danh mục sản phẩm"
    },
    // Discount
    {
      url: "/admin/discount/list",
      component: Discount,
      header: "Danh sách danh mục sản phẩm"
    },
    {
      url: "/admin/discount/add",
      component: AddDiscount,
      header: "Thêm danh mục sản phẩm"
    },
    {
      url: "/admin/discount/edit",
      component: EditDiscount,
      header: "Chỉnh sửa danh mục sản phẩm"
    },
    // Payment
    {
      url: "/admin/payment/list",
      component: Payment,
      header: "Danh sách danh mục sản phẩm"
    },
    {
      url: "/admin/payment/add",
      component: AddPayment,
      header: "Thêm danh mục sản phẩm"
    },
    {
      url: "/admin/payment/edit",
      component: EditPayment,
      header: "Chỉnh sửa danh mục sản phẩm"
    }
  ],
  getRoute: function(url) {
    let router = this.routers.find(e => url === e.url);
    return router;
  }
};

export default router;
