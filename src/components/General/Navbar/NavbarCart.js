import React, { useEffect, useState } from "react";
import Transfer from "../../../helpers/Transfer";
import chanel from "../../../helpers/chanel";
import { getHeader, getAuthInfo } from "../../../helpers/Auth";
import {Link} from 'react-router-dom'
import axios from "axios";
import "./NavbarCart.css";
import {alertError,alertSuccess,alertWarning, showAlert} from '../../../helpers/Alert'
const NavbarCart = () => {
  const [cart, setCart] = useState({ userId: null, products: [] });
  useEffect(() => {
    Transfer.subscribe(chanel.CART, message => {
      switch (message.action) {
        case "add to cart":
          addToCart(message.data);
          break;
      }
    });

    // get Cart info
    getCartInfo();
  }, []);

  const getCartInfo = async () => {
    let headers = getHeader();
    let c = { ...cart };
    if (!headers || getAuthInfo().role !== "customer") {
      // Chua dang nhap
      localStorage.getItem("cart");
      try {
        c = JSON.parse(c);
        console.log(c);
        if (c) setCart({ ...c });
      } catch (err) {
        console.log(err);
      }
    } else {
      // Da dang nhap
      let url = process.config.apiUrl + "/customer/cart";
      let result = await axios.get(url, { headers: headers });
      console.log(result);
      c = JSON.parse(result.data);
    }
    if (c.products.length > 0) {
      let url = process.config.apiUrl + "/product/list?ids=" + c.products.join("|");
      let r = await axios.get(url);
      c.products = r.data.map(e => ({ _id: e._id, name: e.name }));
      console.log(url, c, r.data);
    }
    setCart({ ...c });
  };

  const addToCart = data => {
    console.log(data);
    let headers = getHeader();
    if (!headers || getAuthInfo().role !== "customer") {
      // Chua dang nhap
      let c = { ...cart };
      data.forEach(e => {
        c.products.push(e);
      });
      console.log(c);
      c.products = [...new Set(c.products)];
      localStorage.setItem("cart", JSON.stringify(c));
      alertSuccess("Thêm vào giỏ hàng thành công");
      getCartInfo();
    } else {
      // Da dang nhap
      let url = process.config.apiUrl + "/customer/cart/add-product";
      let products = data.map(e => e._id);
      console.log(products);
      axios
        .post(url, { products: products }, { headers: headers })
        .then(res => {
          alertSuccess("Thêm vào giỏ hàng thành công");
          getCartInfo();
        })
        .catch(err => {
          alertError("Lỗi");
        });
    }
  };

  const onClickRemoveFromCart = e => {
    let url = process.config.apiUrl + "/customer/cart/remove-product";
    let products = [e._id];
    let headers = getHeader();
    console.log(url, products, headers);
    axios
      .post(url, { products }, { headers })
      .then(res => {
        alertSuccess("Đã xóa khỏi giỏ hàng");
        getCartInfo();
      })
      .catch(err => {
        alertError("Có lỗi xảy ra");
      });
  };

  return (
    <ul className="">
      <li className="nav-item submenu">
        <Link to="/customer/cart" className="cart">
          <span className="fa fa-shopping-cart">
            &#32;
            <span style={{ lineHeight: "normal", color: "white" }} className="badge badge-danger">
              {cart.products.length}
            </span>
          </span>
        </Link>

        <ul className="dropdown-menu" id="dropdown-cart" style={ulStyle}>
          {cart.products.map((e, index) => (
            <div>
              <a className="dropdown-item">
                {e.name}
                <button
                  class="badge badge-danger pull-right"
                  style={{ color: "white" }}
                  onClick={() => onClickRemoveFromCart(e)}
                >
                  <i class="fa fa-times pull-right" aria-hidden="true" />
                </button>
              </a>
              {index >= 0 && index < cart.products.length ? <div class="dropdown-divider" /> : null}
            </div>
          ))}
          <div >
            <button style={{marginBottom : "5px", marginRight : "5px"}} class="btn btn-yellow pull-right">
              <i class="fa fa-shopping-cart" aria-hidden="true" />
              Xem giỏ hàng
            </button>
          </div>
        </ul>
      </li>
    </ul>
  );
};

export default NavbarCart;

const ulStyle = {
  minHeight: "100px",
  height: "auto",
  backgroundColor: "white",
  minWidth: "300px",
  width: "auto",
  borderRadius: "5px",
  marginTop: "10px"
};
