import React, {useState, useEffect} from 'react'
import { getUserInfo, getHeader } from '../../helpers/Auth';
import axios from "axios";
import { alertSuccess, alertError } from '../../helpers/Alert';

const Profile = (props) => {
    const [user, setUser] = useState({});
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();

    useEffect(() => {
        getUserInfo().then(res => {
            setUser(res.data);
            setName(res.data.info.name);
            setAddress(res.data.info.address);
            setPhone(res.data.info.phone);
          });
        return;
    },[])

    const onNameChange = (e) => {
      setName(e.target.value);
    }

    const onAddressChange = (e) => {
      setAddress(e.target.value);
    }
    const onPhoneChange = (e)=>{
      setPhone(e.target.value);
    }

    const postEdit = e => {
    e.preventDefault();
    let url = process.config.apiUrl + "/token/edit";
    let body = { name , address, phone};
    console.log(url, body);
    axios
      .post(url, body, {   headers: getHeader() })
      .then(res => {
        console.log( res);
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
          <h3 className="box-title">Thông tin tài khoản</h3>
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
                onChange={e => onNameChange(e)}
              />
            </div>

            <div className="form-group">
              <label for="inputAddress">Địa chỉ</label>
              <input
                required
                type="text"
                className="form-control"
                id="inputAddress"
                address="address"
                placeholder="Nhập tên"
                value={address}
                onChange={(e) => onAddressChange(e)}
              />
            </div>
            <div className="form-group">
              <label for="inputPhone">Số điện thoại</label>
              <input
                required
                type="text"
                className="form-control"
                id="inputPhone"
                phone="phone"
                placeholder=""
                value={phone}
                onChange={(e) => onPhoneChange}
                
              />
            </div>

            <div className="form-group">
              <label for="inputEmail">Email</label>
              <input
                disabled
                required
                type="text"
                className="form-control"
                id="inputEmail"
                email="email"
                placeholder="Nhập tên"
                value={user.info ? user.email :  ""}
                />
                </div>
            
          </div>
          {/* <!-- /.box-body --> */}

          <div className="box-footer">
            <button type="submit" onClick={postEdit} className="btn btn-primary">
              Sửa
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Profile
 