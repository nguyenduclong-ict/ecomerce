import React, { useState, useEffect } from "react";
import axios from "axios";
import { getHeader } from "../../helpers/Auth";
import { alertError, alertSuccess, alertWarning, showAlert } from "../../helpers/Alert";

const EditPayment = props => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [code, setCode] = useState();
  const handleInputChange = e => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "code":
        setCode(e.target.value);
        break;
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    let id = props.params.p3;
    let url = process.config.apiUrl + "/admin/payment/detail/" + id;
    console.log(url);
    axios.get(url, {headers : getHeader()}).then(res => {
      console.log(res);
      setName(res.data.name);
      setCode(res.data.code);
      setDescription(res.data.description);
    });
  };

  const postAdd = e => {
    if (name && code) e.preventDefault();
    let url = process.config.apiUrl + "/admin/payment/edit/" + props.params.p3;
    console.log({ name, description, code });
    axios
      .post(url, { name, description, code }, { headers: getHeader() })
      .then(res => {
        console.log(res);
        if (res.data.ok === 1)
          alertSuccess(res.data.message || "Thêm phương thức thanh toán thành công");
        else {
          alertError(res.data.message || "Có lỗi xảy ra, vui lòng thử lại sau!");
        }
      });
  };

  return (
    <section className="content">
      <div className="box box-primary">
        <div className="box-header with-border">
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
                placeholder="Nhập tên phương thức"
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label for="inputName">Code</label>
              <input
                required={true}
                type="text"
                className="form-control"
                id="inputName"
                name="code"
                placeholder="Nhập tên phương thức"
                value={code}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label for="inputDescription">Mô tả</label>
              <textarea
                rows="4"
                name="description"
                type="text"
                className="form-control"
                id="inputDescription"
                placeholder="Mô tả"
                value={description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* <!-- /.box-body --> */}

          <div className="box-footer">
            <button type="submit" onClick={postAdd} className="btn btn-primary">
              Lưu lại
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPayment;
