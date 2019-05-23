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
import Profile from "./Profile";
import Error from "../Error";

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
      header: "Danh sách tài khoản"
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
      header: "Danh sách mã giảm giá"
    },
    {
      url: "/admin/discount/add",
      component: AddDiscount,
      header: "Thêm mã giảm giá"
    },
    {
      url: "/admin/discount/edit",
      component: EditDiscount,
      header: "Chỉnh sửa mã giảm giá"
    },
    // Payment
    {
      url: "/admin/payment/list",
      component: Payment,
      header: "Danh sách phương thức thanh toán"
    },
    {
      url: "/admin/payment/add",
      component: AddPayment,
      header: "Thêm phương thức thanh toán"
    },
    {
      url: "/admin/payment/edit",
      component: EditPayment,
      header: "Chỉnh phương thức thanh toán"
    },
    {
      url: "/admin/profile",
      component: Profile,
      header: "Thông tin tài khoản"
    }
  ],
  getRoute: function (url) {
    let router = this.routers.find(e => url === e.url);
    console.log(router);
    return (router ? router : {component : Error, header : "404", code : 404});
  }
};

export default router;
