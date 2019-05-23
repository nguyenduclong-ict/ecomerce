import React, { useState, useEffect } from "react";
import BannerItem from "./BannerItem";
import axios from "axios";
/**
 *
 * @param {*} props items : array
 *
 */
const Banner = props => {
  let [items, setItems] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);
  
  const fetchProduct = () => {
    let url = process.config.apiUrl + "/product/list?sortf=ordered&sortv=-1&page=5";
    axios.get(url).then(res => {
      let newItems = res.data.map(e => ({
        ...e,
        title: e.name,
        content: e.description,
        active: false
      }));
      if (newItems.length > 0) newItems[0].active = true;
      console.log(newItems);
      setItems([...newItems]);
    });
  };

  const onNext = () => {
    if (items.length < 2) return;
    let index = items.findIndex(e => e.active);
    if (index == -1 && items.length > 0) items[0].active = true;
    else {
      items[index].active = false;
      items[(index + 1) % items.length].active = true;
    }
    console.log(items);
    setItems([...items]);
  };

  const onPrev = () => {
    if (items.length < 2) return;
    let index = items.findIndex(e => e.active);
    if (index == -1 && items.length > 0) items[items.length - 1].active = true;
    else {
      items[index].active = false;
      items[(items.length + index - 1) % items.length].active = true;
    }
    // console.log(items);
    setItems([...items]);
  };

  return (
    <section className="banner-area">
      <div className="container">
        <div className="row fullscreen align-items-center justify-content-start" style={{ height: "766px" }}>
          <div className="col-lg-12">
            <div className="active-banner-slider owl-carousel owl-theme owl-loaded">
              <div id="ci" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {items.map((e, i) => (
                    <BannerItem key={i} data={e} />
                  ))}
                </div>
                <a className="carousel-control-prev" href="#ci" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#ci" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
