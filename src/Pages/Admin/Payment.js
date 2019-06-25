import React, { useState, useEffect, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Axios from "axios";
import { getHeader } from "../../helpers/Auth";
import { Link } from "react-router-dom";
import { alertSuccess, showAlert } from "../../helpers/Alert";
import config from "../../helpers/config";
import http from "../../helpers/http";

const Payment = () => {
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
          let url = process.config.apiUrl + "/admin/payment/change-display";
          Axios.post(url, { ids: [id], isShow: isShow }, { headers: getHeader() }).then(res => {
            console.log(res);
            if (res.data.ok === 1) {
              list.map(e => {
                if (e._id === id) e.isShow = isShow;
                return e;
              });
              console.log(list);
              setList([...list]);
              alertSuccess({
                title: "Thành công",
                content: (isShow ? "unblock" : "block") + " thành công!",
                type: "green",
                animationSpeed: 100
              });
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
          Axios.post(
            process.config.apiUrl + "/admin/payment/change-display",
            { ids: ids, isShow: isShow },
            { headers: getHeader() }
          ).then(res => {
            if (res.data.ok == 1) alertSuccess("Thành công");
            setList([
              ...list.map(e => {
                if (ids.includes(e._id)) e.isShow = isShow;
                return e;
              })
            ]);
          });
        },
        cancel: () => {
          return;
        }
      }
    });
  };
  const getList = () => {
    let url = config.apiUrl + "/admin/payment/list";
    http.get(url).then(res => {
      let data = res.data;
      data = data.map(e => {
        e.check = false;
        return e;
      });
      console.log(data);
      setList(data);
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
      Header: "Name",
      accessor: "name",
      filterable: true
    },
    {
      Header: "Code",
      accessor: "code",
      filterable: true
    },
    {
      Header: "Description",
      accessor: "description",
      filterable: true
    },
    {
      Header: "Status",
      accessor: "isShow",
      width: 50,
      Cell: v => {
        let row = v.row._original;
        return (
          <div style={{ textAlign: "center" }}>
            <i
              className={!row.isShow ? "btn fa fa-lock" : "btn fa fa-unlock"}
              style={{ color: !row.isShow ? "red" : "green" }}
              onClick={() => onChangeStatus(row._id, !row.isShow)}
            />
          </div>
        );
      }
    },
    {
      Header: "Control",
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
              <div className="box-header with-border">
                <h3 className="box-title">Danh sách phương thức thanh toán</h3>
                <div className="row">
                  <div className="col-md-6 pull-right padding">
                    <button type="button" className="btn btn-success pull-right" onClick={() => getList()}>
                      <i className="fa fa-refresh" /> Load more
                    </button>

                    <Link style={{ marginRight: "2px" }} to="/admin/payment/add" className="btn btn-success pull-right">
                      <i className="fa fa-plus" /> Add
                    </Link>

                    {show && (
                      <button
                        style={{ marginRight: "2px" }}
                        type="button"
                        className="btn btn-warning pull-right"
                        onClick={() => onBlockMultiple(false)}
                      >
                        <i className="fa fa-lock" /> Block
                      </button>
                    )}

                    {show && (
                      <button
                        style={{ marginRight: "2px" }}
                        type="button"
                        onClick={() => onBlockMultiple(true)}
                        className="btn btn-primary pull-right"
                      >
                        <i className="fa fa-unlock" /> Unblock
                      </button>
                    )}
                  </div>
                </div>
              </div>
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

export default Payment;
