import React, { useEffect, useState } from "react";
import { getHeader, getAuthInfo } from "../../helpers/Auth";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState({ userId: null, products: [] });
  useEffect(() => {
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
      c.products = r.data.map(e => e);
      console.log(url, c, r.data);
    }
    console.log(c);
    setCart({ ...c });
  };

  return (
    <div className="cart-page container">
      <div class="card">
        <div class="card-header">Giỏ hàng</div>
        <div class="list-group">
          {cart.products.map(e => (
            <div class="list-group-item my-list-item">
              <img
                src={
                  e.images[0]
                    ? process.config.apiUrl + "/file?filename=" + e.images[0]
                    : "General/img/banner/banner-img.png"
                }
                alt="..."
                style={{ maxWidth: "500px", width: "100px", height: "100px", marginRight: "100px" }}
              />
              <div  className="w-50">
              <Link to={"/product?id=" + e._id} >
                {e.name}
              </Link>
              </div>
              <button className="btn btn-primary pull-right" onClick={()=>{}}> Đặt hàng ngay</button>
            </div>
          ))}
        </div>
                
        <div class="card-footer" />
      </div>
      <div className="margin" style={{ height: "100px" }} />
    </div>
  );
};

export default Cart;
