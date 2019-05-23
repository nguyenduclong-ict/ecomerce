import React from "react";
import { Link } from "react-router-dom";
import './ListItem.css'
import Transfer from '../../../helpers/Transfer';
import chanel from '../../../helpers/chanel';

const ListItem = ({ data }) => {

  const addToCart = (e) => {
    e.preventDefault();
    Transfer.pushMessage(chanel.CART, {
      type: "object",
      action: "add to cart",
      data: [{ _id: data._id, name: data.title }]
    });
  }
  return (
    <div className="list-item-container col-lg-3 col-sm-12 col-md-6">
      <div className="single-product">
        <Link className="product-image">
          <img
            className="img-fluid"
            src={process.config.apiUrl + "/file?filename=" + data.images[0] || "General/img/product/p3.jpg"}
          />
        </Link>
        <div className="product-details">
          <h6>{data.name}</h6>
          <div className="price">
            <h6>{data.isSale ? data.price - (data.price * data.sale) / 100 : data.price} VND</h6>
            {data.isSale ? <h6 className="l-through">{data.price} VND</h6> : null}
          </div>
          <p>{data.ordered} đã bán</p>
          <div className="prd-bottom">
            <a href="#" className="social-info" onClick={addToCart}>
              <span className="fa fa-cart-plus" />
              <p className="hover-text" >Thêm</p>
            </a>
            <a href="#" className="social-info">
              <span className="fa fa-eye" />
              <p className="hover-text">Chi tiết</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
