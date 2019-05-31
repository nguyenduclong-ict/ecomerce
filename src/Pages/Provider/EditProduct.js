import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getHeader } from "../../helpers/Auth";
import Gallery from "react-grid-gallery";

const AddProduct = () => {
  const fileInput = useRef();
  const URL_UPLOAD_FILES = process.config.apiUrl + "/upload/files";
  const URL_UPLOAD_FILE = process.config.apiUrl + "/upload/file";
  const URL_UPDATE_FILES = process.config.apiUrl + "/upload/update-multiple";

  // State
  const [name, setName] = useState();
  const [categoryId, setCategoryId] = useState();
  const [list, setList] = useState([{ _id: -1, name: "None" }]); // List category
  const [price, setPrice] = useState(0);
  const [isSale, setisSale] = useState(false);
  const [sale, setSale] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [maxOrder, setMaxOrder] = useState(1);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isShow, setisShow] = useState(true);
  const [files, setFiles] = useState([]);
  const handleInputChange = e => {
    console.log(e.target);
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "categoryId":
        setCategoryId(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "isSale":
        setisSale(e.target.value);
        break;
      case "sale":
        setSale(e.target.value);
        break;
      case "quantity":
        setQuantity(e.target.value);
        break;
      case "maxOrder":
        setMaxOrder(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "isShow":
        setisShow(e.target.value);
        break;
      case "images":
        let f = [];
        e.target.files.forEach(e => f.push(e));
        setFiles([...f]);
        break;
    }
  };

  const getList = () => {
    let url = process.config.apiUrl + "/category/list";
    axios.get(url, { headers: getHeader() }).then(res => {
      console.log(res.data);
      setList([{ _id: -1, name: "None" }, ...res.data]);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const renderOptions = options => {
    let result = [];

    options.forEach(e => {
      result.push(<option value={e._id}>{e.name}</option>);
    });

    return result;
  };

  const postAdd = e => {
    if (name) e.preventDefault();
    else return;
    let url = process.config.apiUrl + "/admin/payment/edit/";
    let data = { name, categoryId, list, price, isSale, sale : Number(sale) / 100, quantity, maxOrder, description, isShow };
    axios.post(url, data, { headers: getHeader() }).then(res => {
      console.log(res);
      if (res.data.ok === 1 && images.length > 0) {
        // THêm ảnh cho sản phẩm
        let productId = res.data.data._id;
        let subOwner = [productId];
        let filename = images.map(e => e.filename);
        let tags = [];
        let isPublic = true;
        let data  = {productId, subOwner, filename, tags, isPublic};
        let headers = getHeader();
        axios.post(URL_UPDATE_FILES, data, {headers})
          .then(res => {
            console.log(res);
            window.$.alertSuccess('Thêm sản phẩm thành công');
          })
      } else if (res.data.ok == 0) {
        window.$.alertError("Có lỗi xảy ra, vui lòng thử lại sau!");
      } else if (res.data.ok == 1 && images.length < 1) {
        window.$.alertSuccess("Thêm thành công");
      }
    });
  };

  const input = (label, name, value, onChange, type) => {
    return (
      <div className="form-group">
        <label for="inputName">{label}</label>
        <input
          required
          type={type || "text"}
          className="form-control"
          name={name}
          placeholder={"Nhập " + label.toLowerCase()}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };

  const inputFile = (label, name, onChange, ref, onDelete, onUpload) => {
    return (
      <div className="row">
        <div className="col-md-1 col-xs-1">
          <label for="inputName col">{label}</label>
        </div>
        <div className="col-md-4 col-xs-4 input-group">
          <input type="file" name={name} onChange={onChange} className="form-control" multiple="multiple" />

          <span className="input-group-btn">
            <button type="button" className="btn btn-info btn-flat" onClick={onUpload}>
              Upload
            </button>
          </span>

          {images.some(e => e.isSelected) ? (
            <span className="input-group-btn">
              <button type="button" className="btn btn-danger btn-flat" onClick={onDelete}>
                Xóa
              </button>
            </span>
          ) : null}
        </div>
      </div>
    );
  };

  const deleteFile = () => {
    let imgs = images.filter(e => !e.isSelected);
    setImages([...imgs]);
  };

  const uploadFile = () => {
    let form = new FormData();
    for (let file of files) {
      form.append("files", file, file.name);
    }
    console.log(form);
    let headers = getHeader();
    headers["Content-Type"] = "multipart/form-data";
    console.log(headers);
    axios.post(URL_UPLOAD_FILES, form, { headers }).then(res => {
      console.log(res.data);
      res.data.map(e => {
        e.src = process.config.apiUrl + "/file?filename=" + e.filename;
        e.thumbnail = process.config.apiUrl + "/file?filename=" + e.filename;
        e.isSelected = false;
        return e;
      });
      console.log(res.data);
      setImages([...images, ...res.data]);
    });
  };

  const select = (label, name, value, onChange, options, onFocus) => {
    return (
      <div className="form-group">
        <label for="inputName">{label}</label>
        <select name={name} value={value} onChange={onChange} class="form-control" onFocus={onFocus}>
          {renderOptions(options)}
        </select>
      </div>
    );
  };

  const onSelectImage = (index, image) => {
    // console.log(index, image, images);
    images[index].isSelected = !images[index].isSelected;
    console.log(images);
    setImages([...images]);
  };

  return (
    <section className="content">
      <div className="box box-primary">
        <form role="form" className="was-validated">
          <div className="box-body">
            {input("Tên", "name", name, handleInputChange)}
            {select("Danh mục", "categoryId", categoryId, handleInputChange, list, null)}
            {input("Giá", "price", price, handleInputChange, "number")}
            {select("Giảm giá", "isSale", isSale, handleInputChange, [
              { _id: true, name: "Có" },
              { _id: false, name: "Không" }
            ])}
            {input("% giảm giá", "sale", sale, handleInputChange, "number")}
            {input("Số lượng", "quantity", quantity, handleInputChange, "number")}
            {input("Số lượng đặt tối đa", "maxOrder", maxOrder, handleInputChange, "number")}
            {input("Mô tả", "description", description, handleInputChange)}
            {select("Hiển thị", "isShow", isShow, handleInputChange, [
              { _id: true, name: "Có" },
              { _id: false, name: "Không" }
            ])}
            {inputFile("Thêm ảnh", "images", handleInputChange, fileInput, deleteFile, uploadFile)}
            <div className="margin">
              <Gallery images={images} onSelectImage={onSelectImage} />
            </div>
          </div>

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

export default AddProduct;
