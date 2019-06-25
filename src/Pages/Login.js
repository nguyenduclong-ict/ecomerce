import React, { useState, useEffect } from "react";
import "./Login.css";
import Axios from "axios";
import { login, getHeader } from "../helpers/Auth";
import "../components/loading.css";
import { alertError, alertSuccess, alertWarning } from "../helpers/Alert";
import { checkTokenStatus } from "../helpers/Auth";
const Login = props => {
  useEffect(() => {
    checkTokenStatus()
      .then(res => {
        console.log(res.data);
        if (res.data.status === "live") props.history.push(res.data.role + "/dashboard");
      })
      .catch(e => console.log(e));
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = e => {
    e.preventDefault();
    Axios.post(process.config.loginUrl, {
      email: email,
      password: password
    })
      .then(res => {
        if (res.data.result) {
          login(res.data.token, res.data.role, res.data.imageCode);
          if (res.data.role === "admin") window.location.href = "/admin/dashboard";
          else if (res.data.role === "provider") window.location.href = "/provider/dashboard";
          else if (res.data.role === "customer") {
            // merge cart to server
            let cart = JSON.parse(localStorage.getItem("cart")) || {};
            let url = process.config.apiUrl + "/customer/cart/add-product";
            // let body = {products : cart.products}
            Axios.post(url, { products: cart.products || [] }, { headers: getHeader() }).then(() => {
              localStorage.removeItem("cart");
              window.location.href = "/";
            });
          }
        } else alertError(res.data.message);
      })
      .catch(err => {
        console.log(err);
        alertError("Lỗi kết nối");
      });
  };

  return (
    <div className="login-box">
      {/* <!-- /.login-logo --> */}
      <div className="login-box-body">
        <p className="login-box-msg">Đăng nhập để tiếp tục</p>

        <form action={process.config.loginUrl} method="post">
          <div className="form-group has-feedback">
            <input
              type="email"
              className="form-control"
              placeholder="Email or Username"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span className="glyphicon glyphicon-lock form-control-feedback" />
          </div>
          <div className="row">
            <div className="col-xs-8">
              <div className="checkbox icheck">
                <label>
                  <div
                    className="icheckbox_square-blue checked"
                    aria-checked="false"
                    aria-disabled="false"
                    style={{ position: "relative" }}
                  />
                  <input type="checkbox" style={{ position: "unset", margin: 0 }} />
                  <span>Nhớ tài khoản</span>
                </label>
              </div>
            </div>
            {/* <!-- /.col --> */}
            <div className="col-xs-4">
              <button className="btn btn-primary btn-block btn-flat" onClick={submitForm}>
                Đăng nhập
              </button>
            </div>
            {/* <!-- /.col --> */}
          </div>
        </form>

        <a href="#">Quên mật khẩu</a>
        <br />
        <a href="register.html" className="text-center">
          Đăng kí mới
        </a>
      </div>
    </div>
  );
};

export default Login;
