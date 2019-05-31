import React, { useState, useEffect } from "react";
import axios from "axios";
import { getHeader } from "../../helpers/Auth";
const $ = window.$;

const AddCategory = () => {
  const [name, setName] = useState();
  const [parentId, setParentId] = useState();
  const [list, setList] = useState([{ _id: -1, name: "None" }]);
  const handleInputChange = e => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "parentId":
        setParentId(e.target.value);
        break;
    }
  };

  const getList = () => {
    let url = process.config.apiUrl + "/admin/category/list";
    axios.get(url, { headers: getHeader() }).then(res => {
        console.log(res.data);
      setList([{ _id: -1, name: "None" }, ...res.data]);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const renderOptions = () => {
    let options = [];

    list.forEach(e => {
      options.push(<option value={e._id}>{e.name}</option>);
    });

    return options;
  };

  const postAdd = e => {
    if (name) e.preventDefault();
    else return;
    let url = process.config.apiUrl + "/admin/category/add";
    console.log({ name, parentId });
    axios.post(url, { name, parentId }, { headers: getHeader() }).then(res => {
      console.log(res);
      if (res.data.ok === 1)
        $.alert({
          title: "Thành công",
          content: res.data.message || "Thêm thành công",
          type: "green",
          animationSpeed: 100
        });
      else {
        $.alert({
          title: "Thất bại",
          content: res.data.message || "Có lỗi xảy ra, vui lòng thử lại sau!",
          type: "red",
          animationSpeed: 100
        });
      }
    });
  };

  return (
    <section className="content">
      <div className="box box-primary">
        <div className="box-header with-border">
          <h3 className="box-title">Thêm danh mục</h3>
        </div>
        {/* <!-- /.box-header --> */}
        {/* <!-- form start --> */}
        <form role="form">
          <div className="box-body">
            <div className="form-group">
              <label for="inputName">Tên</label>
              <input
                required
                type="text"
                className="form-control"
                id="inputName"
                name="name"
                placeholder="Nhập tên"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label for="inputName">Danh mục cha</label>
              <select
                name="parentId"
                value={parentId}
                onChange={handleInputChange}
                class="form-control"
              >
                {renderOptions()}
              </select>
            </div>
          </div>
          {/* <!-- /.box-body --> */}

          <div className="box-footer">
            <button type="submit" onClick={postAdd} className="btn btn-primary">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCategory;
