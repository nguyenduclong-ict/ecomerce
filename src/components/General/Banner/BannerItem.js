import React, { useEffect } from "react";
import Transfer from "../../../helpers/Transfer";
import chanel from "../../../helpers/chanel";
/**
 *
 * @param {*} props data : {title, active, content, img}
 */
const BannerItem = props => {
  const addToCart = () => {
    Transfer.pushMessage(chanel.CART, {
      type: "object",
      action: "add to cart",
      data: [{_id : item._id, name : item.title}]
    });
  };

  useEffect(() => {}, []);
  const item = props.data;
  return (
    <div className={"carousel-item " + (item.active ? "active" : "")}>
      <div className="row">
        <div className="col-md-8 offset-md-4">
          <img src={item.img || "General/img/banner/banner-img.png"} alt="..." />
        </div>

        <div className="col-md-4 offset-md-1" style={{ position: "absolute" }}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>

          <button class="btn btn-success">
            <i class="fa fa-plus" onClick={addToCart}>
              {" "}
              Thêm vào giỏ hàng
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerItem;
