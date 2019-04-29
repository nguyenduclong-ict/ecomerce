import React, { useState, useEffect } from "react";
import "./Login.css";
import Axios from "axios";
import { login } from "../helpers/Auth";
import { getHeader } from "../helpers/Auth";

var $ = window.$;
const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = e => {
    e.preventDefault();
    console.log(process.config.loginUrl);
    Axios.post(process.config.loginUrl, {
      email: email,
      password: password
    }).then(res => {
      if (res.data.result) {
        login(res.data.token, res.data.role, res.data.imageCode);
        props.history.push("/admin/dashboard");
      } else $.alert(res.data.message);
    });
  };

  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="../../index2.html">
          <b>Ecom</b>Store
        </a>
      </div>
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
                  <input
                    type="checkbox"
                    style={{ position: "unset", margin: 0 }}
                  />
                  <span>Nhớ tài khoản</span>
                </label>
              </div>
            </div>
            {/* <!-- /.col --> */}
            <div className="col-xs-4">
              <button
                className="btn btn-primary btn-block btn-flat"
                onClick={submitForm}
              >
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
