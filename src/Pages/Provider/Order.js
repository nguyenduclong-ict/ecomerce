import React, { useState, useEffect, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Axios from "axios";
import { getHeader } from "../../helpers/Auth";
import { Link } from "react-router-dom";
import { showAlert } from "../../helpers/Alert";
import { alertSuccess, alertError } from "../../helpers/Alert";
import http from "../../helpers/http";

const Order = () => {
  // URL
  const URL_GET_LIST = process.config.apiUrl + "/provider/order/list";
  const URL_BLOCK = process.config.apiUrl + "/provider/order/show";
  // State
  const [list, setList] = useState([]);
  const [checkall, setCheckall] = useState(false);
  const page = 100;
  const tableRef = useRef();
  const [show, setShow] = useState(false);

  const displayButton = () => {
    if (
      list.every(e => {
        return e.check == false;
      })
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // Thay doi trang thai
  const onChangeStatus = (id, isShow) => {
    console.log(isShow);
    window.$.confirm({
      title: "Chú ý",
      content: (isShow ? "Unblock" : "Block") + " mục này?",
      animationSpeed: 100,
      type: "orange",
      buttons: {
        ok: () => {
          Axios.post(URL_BLOCK, { ids: [id], isShow: isShow }, { headers: getHeader() }).then(res => {
            console.log(res);
            if (res.data.ok === 1) {
              list.map(e => {
                if (e._id === id) e.isShow = isShow;
                return e;
              });
              console.log(list);
              setList([...list]);
              alertSuccess((isShow ? "unblock" : "block") + " thành công!");
            }
          });
        },
        cancel: () => {
          return;
        }
      }
    });
  };

  const onBlockMultiple = isShow => {
    let mark = list.filter(e => e.check);
    let ids = mark.map(e => e._id);
    // post block / unblock

    window.$.confirm({
      title: "Chú ý",
      content: (isShow ? "UnBlock" : "Block") + " toàn bộ?",
      animationSpeed: 100,
      type: "orange",
      buttons: {
        ok: () => {
          Axios.post(URL_BLOCK, { ids: ids, isShow: isShow }, { headers: getHeader() }).then(res => {
            console.log(res.data);
            if (res.data.ok == 1) {
              alertSuccess("Thành công");
              setList([
                ...list.map(e => {
                  if (ids.includes(e._id)) e.isShow = isShow;
                  return e;
                })
              ]);
            } else alertError("Thất bại");
          });
        },
        cancel: () => {
          return;
        }
      }
    });
  };
  const getList = customerId => {
    let url = `${URL_GET_LIST}` + (customerId ? `?customerId=${customerId}` : "");
    http.get(url).then(res => {
      console.log(res.data);
      let data = res.data.map(e => {
        e.check = false;
        return e;
      });
    });
  };
  const onCheckAllChange = e => {
    let filter = [];
    let data = [...tableRef.current.getResolvedState().sortedData];
    data = data.map(e => e._original);
    console.log(data);
    for (let i = 0; i < data.length; i++) filter.push(data[i]._id);
    console.log(filter);

    list.map(el => {
      if (filter.includes(el._id)) {
        el.check = checkall ? false : true;
      }
      return el;
    });
    console.log(list);
    displayButton();
    setList([...list]);
    setCheckall(!checkall);
  };

  //   useEffect
  useEffect(() => {
    getList();
    displayButton();
  }, []);

  const onCheckBoxChange = id => {
    list.map(e => {
      if (e._id === id) e.check = !e.check;
      return e;
    });
    displayButton();
    setList([...list]);
  };

  const status = {
    0: "Chờ xác nhận",
    1: "Đã xác nhận",
    2: "Đang giao",
    3: "Hoàn thành",
    4: "Bị huỷ"
  };

  const columns = [
    {
      Header: <input type="checkbox" checked={checkall} onChange={onCheckAllChange} />,
      Cell: v => {
        let row = v.row._original;
        return (
          <div style={{ textAlign: "center" }}>
            {" "}
            <input type="checkbox" checked={row.check} onChange={() => onCheckBoxChange(row._id)} />
          </div>
        );
      },
      width: 50,
      sortable: false
    },
    {
      Header: "Khách hàng",
      accessor: "customerId.info.name",
      filterable: true
    },
    {
      Header: "Số điện thoại",
      accessor: "customerId.info.phone",
      filterable: true
    },
    {
      Header: "Trạng thái",
      accessor: "isShow",
      width: 100,
      Cell: v => {
        let row = v.row._original;
        return <div style={{ textAlign: "center" }}>{status[row.status]}</div>;
      }
    },
    {
      Header: "Tùy chọn",
      width: 70,
      Cell: v => {
        let row = v.row._original;
        return (
          <div style={{ textAlign: "center" }}>
            <Link to={"/admin/payment/edit/" + row._id}>
              <i className="btn fa fa-edit" />
            </Link>
          </div>
        );
      }
    }
  ];
  return (
    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="box box-default">
            <div className="box-header">
              <div className="box-header with-border" />
            </div>
            <div className="box-body">
              <ReactTable
                ref={tableRef}
                data={list}
                columns={columns}
                defaultPageSize={10}
                loadingText="Đang tải dữ liệu"
                style={{ backgroundColor: "white" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
