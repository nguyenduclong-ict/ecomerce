import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import AsyncSelect from "react-select/lib/Async";
import axios from "axios";
import { getHeader } from "../../helpers/Auth";
import { resolve } from "url";
import { Promise, reject } from "q";
const $ = window.$;

const EditDiscount = ({params}) => {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [list, setList] = useState([]);
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());

  const postAdd = e => {
    e.preventDefault();
    products.map(es => es._id);
    let body = { value, products, startDate, endDate };
    let url = process.config.apiUrl + "/admin/discount/add";
    axios
      .post(url, body, { headers: getHeader() })
      .then(res => {
        console.log(res.data);
        if (res.data.ok === 1) $.alertSuccess("Thêm mã giảm giá thành công!");
        else throw new Error();
      })
      .catch(err => {
        $.alertError("Có lỗi xảy ra, thêm thất bại!");
      });
  };

  const getData = () => {
    let url = process.config.apiUrl + "/admin/discount/detail/" + params.id;
    axios
      .get(url, { headers: getHeader() })
      .then(res => {
          console.log(res.data);
        res.data.products.map(e => {
          e.value = e._id;
          e.label = e.name;
          return e;
        });
        console.log(res.data);
        setProducts([...res.data.products]);
        setStartDate(new Date(res.data.startDate));
        setEndDate(new Date(res.data.endDate));
        setValue(res.data.value);
      })
      .catch(err => {
          console.log(err);
      });
  };

  useEffect(() => {
    getListProducts().then(result => setList([...result]));
    getData();
    //
    return () => {};
  }, []);
  const removeProductSelected = value => {
    products.splice(products.indexOf(value), 1);
    console.log(products);
    setProducts([...products]);
  };
  const selectProductChange = e => {
    if (products.indexOf(e) < 0) setProducts([e, ...products]);
  };

  const getListProducts = async name =>
    new Promise(resolve => {
      name = name ? name.split(" ").join("%20") : "all";
      let url = process.config.apiUrl + "/admin/discount/products/" + name;
      axios
        .get(url, { headers: getHeader() })
        .then(res => {
          res.data.map(e => {
            e.value = e._id;
            e.label = e.name;
            return e;
          });
          resolve(res.data);
        })
        .catch(err => {});
    });

  return (
    <section className="content">
      <div className="box box-primary">
        <div className="box-header with-border">
          <h3 className="box-title">Thêm phương thức thanh toán</h3>
        </div>
        {/* <!-- /.box-header --> */}
        {/* <!-- form start --> */}
        <form role="form">
          <div className="box-body">
            <div className="form-group">
              <label>Start Date:</label>

              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-calendar" />
                </div>
                <DatePicker
                  name="startDate"
                  className="form-control"
                  selected={startDate}
                  onChange={e => setStartDate(e)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>End Date:</label>

              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-calendar" />
                </div>
                <DatePicker
                  name="endDate"
                  className="form-control"
                  selected={endDate}
                  onChange={e => setEndDate(e)}
                />
              </div>
            </div>

            

            <div className="form-group">
              <label>Chọn sản phẩm áp dụng:</label>

              <AsyncSelect
                name="products"
                cacheOptions
                onChange={selectProductChange}
                defaultOptions={list}
                loadOptions={getListProducts}
              />

              <ul className="list-group">
                {products.map(e => {
                  return (
                    <div>
                      <li className="list-group-item">
                        {e.label}{" "}
                        <i
                          className="fa fa-close red pull-right"
                          onClick={() => removeProductSelected(e)}
                        />
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>

            <div className="form-group">
              <label>Tỉ lệ giảm giá (%):</label>

              <div className="input-group">
                <input
                  className="form-control"
                  type="number"
                  max={99}
                  min={0}
                  value={value}
                  placeholder="Nhập phần trăm giảm giá"
                  onChange={e => setValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <!-- /.box-body --> */}

          <div className="box-footer">
            <button type="button" onClick={postAdd} className="btn btn-primary">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditDiscount;
