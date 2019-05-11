import React, { useState, useEffect, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Axios from "axios";
import { getHeader } from "../../helpers/Auth";
import {Link} from 'react-router-dom';
var $ = window.$;

const Discount = props => {
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

  const onSearch = e => {
    if (e.keyCode === 13) {
      // search
      let value = e.target.value;
      setList([]);
      getList("all", "all", value);
    }
  };

  const onChangeStatus = (id, status) => {
    let ids = [id];
    $.confirm({
      title: "Chú ý",
      content: (status ? "block" : "unBlock") + " mã giảm giá này?",
      animationSpeed: 100,
      type: "orange",
      buttons: {
        ok: () => {
          let url = process.config.apiUrl + "/admin/discount/change-status";
          Axios.post(url, { ids, status }, { headers: getHeader() }).then(
            res => {
              console.log(res);
              if (res.data.ok === 1) {
                list.map(e => {
                  if (e._id == id) e.status = status;
                  return e;
                });
                setList([...list]);
                $.alertSuccess((status ? "block" : "unblock") + " thành công!");
              }
            }
          );
        },
        cancel: () => {
          return;
        }
      }
    });
  };

  const onBlockMultiple = status => {
    status = !status;
    let mark = list.filter(e => e.check);
    let ids = mark.map(e => e._id);
    // post block / unblock

    $.confirm({
      title: "Chú ý",
      content: (status ? "block" : "unBlock") + " toàn bộ?",
      animationSpeed: 100,
      type: "orange",
      buttons: {
        ok: () => {
          Axios.post(
            process.config.apiUrl + "/admin/discount/change-status",
            { ids, status },
            { headers: getHeader() }
          ).then(res => {
            if (res.data.ok == 1) $.alertSuccess("Thành công");
            setList([
              ...list.map(e => {
                if (ids.includes(e._id)) e.status = status;
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
  const getList = (product = "all", provider = "all", search = "all") => {
    if (search && search !== "all") search = search.split(" ").join("%20");
    console.log(search);
    let url =
      process.config.apiUrl +
      `/admin/discount/list/${
        list.length
      }-${page}-${product}-${provider}-${search}`;
    console.log(url);
    Axios.get(url, {
      headers: getHeader()
    }).then(result => {
      result.data.map(e => {
        e.check = false;
        // validate ngay thang
        e.startDate = new Date(e.startDate).toLocaleDateString();
        e.endDate = new Date(e.endDate).toLocaleDateString();
        return e;
      });
      console.log([...list, ...result.data]);
      setList([...list, ...result.data]);
      if (result.data == 0) window.$.alertWarning("Đã load hết dữ liệu");
    });
  };
  const onCheckAllChange = e => {
    let filter = [];
    let data = [...tableRef.current.getResolvedState().sortedData];
    data = data.map(e => e._original);
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
      Header: (
        <input type="checkbox" checked={checkall} onChange={onCheckAllChange} />
      ),
      Cell: v => {
        let row = v.row._original;
        return (
          <div style={{ textAlign: "center" }}>
            {" "}
            <input
              type="checkbox"
              checked={row.check}
              onChange={() => onCheckBoxChange(row._id)}
            />
          </div>
        );
      },
      width: 50,
      sortable: false
    },
    {
      Header: "Start Date",
      accessor: "startDate",
      style: { textAlign: "center" },
      filterable: true
    },
    {
      Header: "End Date",
      style: { textAlign: "center" },
      accessor: "endDate",
      filterable: true
    },
    {
      Header: "%",
      accessor: "type",
      Cell: v => {
        let row = v.row._original;
        return <div className="l-center">{row.value * 100}</div>;
      },
      width: 50
    },
    {
      Header: "Product",
      Cell: v => {
        let row = v.row._original;
        return (
          <div className="l-center form-group">
            <select className="form-control">
              {row.products.map(e => (
                <option>{e.name} </option>
              ))}
            </select>
          </div>
        );
      }
    },
    {
      Header: "Provider",
      Cell: v => {
        let row = v.row._original;
        return (
          <div className="l-center form-group">
            <select className="form-control">
              {row.providers.map(e => (
                <option>{e.info.name} </option>
              ))}
            </select>
          </div>
        );
      }
    },
    {
      Header: "Status",
      width: 50,
      Cell: v => {
        let row = v.row._original;
        return (
          <div style={{ textAlign: "center" }}>
            <i
              className={!row.status ? "btn fa fa-lock" : "btn fa fa-unlock"}
              style={{ color: !row.status ? "red" : "green" }}
              onClick={() => onChangeStatus(row._id, !row.status)}
            />
          </div>
        );
      }
    },
    {
      Header: "Edit",
      width: 50,
      Cell: v => {
        let row = v.row._original;
        return (
          <div style={{ textAlign: "center" }}>
            <Link
              className={"btn fa fa-edit"}
              style={{ color: "blue" }}
              to={'/admin/discount/edit?id=' + row._id}
            />
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
                <h3 className="box-title">Danh sách người dùng</h3>
                <div class="row">
                  <div class="col-md-6" style={{paddingTop: "8px"}}>

                    <input
                      type="text"
                      className="form-control"
                      id="ips"
                      placeholder="Product or Provider name ..."
                      onKeyDown={onSearch}
                    />
                  </div>
                  <div className="col-md-6" style={{paddingTop: "8px"}}>
                    <button
                      type="button"
                      className="btn btn-success pull-right"
                      onClick={() => getList()}
                    >
                      <i className="fa fa-refresh" /> Load more
                    </button>

                    {show && (
                      <button
                        style={{ marginRight: "2px" }}
                        type="button"
                        className="btn btn-warning pull-right"
                        onClick={() => onBlockMultiple(true)}
                      >
                        <i className="fa fa-lock" /> Block
                      </button>
                    )}

                    {show && (
                      <button
                        style={{ marginRight: "2px" }}
                        type="button"
                        onClick={() => onBlockMultiple(false)}
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

export default Discount;
