import React from "react";
import './Login.css';

const Login = () => {
  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="../../index2.html">
          <b>Eco</b>Store
        </a>
      </div>
      {/* <!-- /.login-logo --> */}
      <div className="login-box-body">
        <p className="login-box-msg">Đăng nhập để tiếp tục</p>

        <form action="../../index2.html" method="post">
          <div className="form-group has-feedback">
            <input type="email" className="form-control" placeholder="Email" />
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
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
                    style={{position: "relative"}}
                  >
                    <input type="checkbox" />
                    <ins className="iCheck-helper" />
                  </div>{" "}
                  Nhớ tài khoản
                </label>
              </div>
            </div>
            {/* <!-- /.col --> */}
            <div className="col-xs-4">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-flat"
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
