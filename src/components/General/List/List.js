import React, { useState, useEffect, useRef } from "react";
import ListItem from "./ListItem";
import Transfer from "../../../helpers/Transfer";
import chanel from "../../../helpers/chanel";
import axios from "axios";
import { RegExp } from "core-js";
const List = () => {
  // filter  : { key : string }
  const [filter, setFilter] = useState({});
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const cbRef = useRef(false);

  useEffect(() => {
    Transfer.subscribe(chanel.FILTER_CHANEL, message => {
      if (message && message.type === "object") {
        for (let key in message.data) filter[key] = message.data[key];
        console.log(filter);
        setFilter({ ...filter });
      }
    });
    getListCategory();
  }, []);

  useEffect(() => {
    getListProduct();
  }, [filter]);


  // Lay danh sach theo dieu kien loc trong bien filter
  const getListProduct = () => {
    let url = process.config.apiUrl + "/product/list?";
    for (let key in filter) {
      url += `${key}=${filter[key]}&`;
    }
    url = url.replace(/&$/i, "");
    axios.get(url).then(res => {
      console.log(res.data);
      setList([...res.data]);
    });
  };

  // Lay danh sach danh muc san pham
  const getListCategory = () => {
    let url = process.config.apiUrl + "/category/list?parentId=null";
    axios
      .get(url)
      .then(res => {
        res.data = res.data.map(e => ({ ...e, checked: false })).filter(e => e.parentId === null);
        console.log(res.data);
        setCategories([...res.data]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    let category = categories
      .filter(e => e.checked === true)
      .map(e => e._id)
      .join("|");
    filter.category = category;
    setFilter({ ...filter });
  }, [categories]);
  const sortChange = e => {
    if (!filter.sort) filter.sort = "";
    let { name, value } = e.target;
    if (!value) value = -1;
    let regex;

    // Sort by So luong ban hoac ngay dang
    if (["oredred", "created"].includes(name)) {
      regex = new RegExp("(ordered|created)" + "\\|" + ".{1,2}", "i");
    } else {
      regex = new RegExp(name + "\\|" + ".{1,2}", "i");
    }
    filter.sort = filter.sort.replace(regex, "");
    filter.sort = `${name}|${value}|` + filter.sort;
    filter.sort = filter.sort.replace(/\|*$/i, "");
    setFilter({ ...filter });
  };

  const cbFilterChange = item => {
    let arr = categories.map(e => {
      e.checked = e._id === item._id ? !e.checked : e.checked;
      return e;
    });
    setCategories([...arr]);
  };

  return (
    <div className="row" id="list-filter">
      {/* Left side */}
      <div className="col-md-2 padding" id="left-category" style={{ textAlign: "left" }}>
        <div className="col-md-12">
          <p style={{ fontWeight: "bold" }}>
            <i class="fa fa-filter" aria-hidden="true" />
            &ensp; Danh mục sản phẩm
          </p>
        </div>
        <div className="col-md-12">
          {categories.map(e => (
            <p>
              <input type="checkbox" checked={e.checked} onChange={() => cbFilterChange(e)} /> {e.name}
            </p>
          ))}
        </div>
      </div>

      {/* Center list show product filter */}
      <div className="col-md-8">
        <div className="col-md-12" style={{ height: "100px" }}>
          <div className="row align-items-center">
            <div
              class="d-flex p-3"
              style={{ backgroundColor: "rgb(237, 237, 237)", marginTop: "7px", marginBottom: "7px", width: "100%" }}
            >
              <div className="p-2" style={{width: "100%" }}>
                <form className="form-inline" style={{ display: "inline" }}>
                  <div className="form-group">
                    <span style={{ marginRight: "15px" }}>Sắp xếp theo</span>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons" style={{ marginRight: "5px" }}>
                      <label class="btn btn-light  active" onClick={() => sortChange({ target: { name: "created" } })}>
                        <input type="radio" name="created" id="option1" autocomplete="off" checked />
                        Mới nhất
                      </label>
                      <label
                        style={{ marginLeft: "5px" }}
                        class="btn btn-light"
                        onClick={() => sortChange({ target: { name: "ordered" } })}
                      >
                        <input type="radio" id="option2" autocomplete="off" /> Bán chạy
                      </label>
                    </div>

                    <select className="form-control btn-fix-left" id="select1" name="price" onChange={sortChange}>
                      <option value="1">Giá từ thấp đến cao</option>
                      <option value="-1">Giá từ cao đến thấp</option>
                    </select>

                    {/* Pager */}
                    <div className="col pull-right" style={{textAlign : "end"}}>
                      <input type="button" class="btn btn-light" value="preview" style={{marginRight : "3px"}}/>
                      <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-light">
                          <input type="radio" autocomplete="off" checked /> 1
                        </label>
                        <label class="btn btn-light">
                          <input type="radio" autocomplete="off" /> 2
                        </label>
                        <label class="btn btn-light">
                          <input type="radio" autocomplete="off" /> 3
                        </label>
                        <label class="btn btn-light">
                          <input type="radio" autocomplete="off" /> ...
                        </label>
                      </div>
                      <input type="button" class="btn btn-light" value="next" style={{marginLeft : "3px"}}/>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Content show list product */}
        <div className="col-md-12" style={{ minHeight: "500px" }}>
          <div className="row">
            {list.map(e => (
              <ListItem data={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
