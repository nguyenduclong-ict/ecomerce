import React, { useState, useEffect, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Axios from "axios";
import { getHeader } from "../../helpers/Auth";
import {Link} from 'react-router-dom'
var $ = window.$;

const Category = () => {
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

  const onChangeStatus = (id, isShow) => {
    console.log(isShow);
    $.confirm({
      title: "Chú ý",
      content: (isShow ? "block" : "unBlock") + " danh mục này?",
      animationSpeed: 100,
      type: "orange",
      buttons: {
        ok: () => {
          let url = process.config.apiUrl + "/admin/category/set-show";
          Axios.post(
            url,
            { ids: [id], isShow: isShow },
            { headers: getHeader() }
          ).then(res => {
            console.log(res);
            if (res.data.ok === 1) {
              list.map(e => {
                if (e._id === id) e.isShow = res.data.isShow;
                return e;
              });
              console.log(list);
              setList([...list]);
              $.alert({
                title: "Thanh cong",
                content: (isShow ? "block" : "unblock") + " thành công!",
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

    $.confirm({
      title: "Chú ý",
      content: (isShow ? "UnBlock" : "Block") + " toàn bộ?",
      animationSpeed: 100,
      type: "orange",
      buttons: {
        ok: () => {
          Axios.post(
            process.config.apiUrl + "/admin/user/change-block",
            { ids: ids, isShow: isShow },
            { headers: getHeader() }
          ).then(res => {
            if (res.data.ok == 1) $.alert("Thành công");
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
    let url =
      process.config.apiUrl + `/admin/category/list/all-${list.length}-${page}`;
    Axios.get(url, {
      headers: getHeader()
    }).then(result => {
      result.data.map(e => {
        e.check = false;
        return e;
      });
      console.log(result.data);
      setList([...list, ...result.data]);
      if (result.data == 0) window.$.alert("Đã load hết dữ liệu");
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
      Header: "Name",
      accessor: "name",
      filterable: true
    },
    {
      Header: "Parent",
      accessor : 'parentId.name',
      filterable : true,
      Cell: v => {
        let row = v.row._original;
        if (row.parentId !== null) return row.parentId.name;
        else return "none";
      }
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
    }
  ];
  return (
    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="box box-default">
            <div className="box-header">
              <div className="box-header with-border">
                <h3 className="box-title">Danh sách danh mục</h3>
                <button
                  type="button"
                  className="btn btn-success pull-right"
                  onClick={() => getList()}
                >
                  <i className="fa fa-refresh" /> Load more
                </button>

                <Link
                style={{ marginRight: "2px" }}
                    to="/admin/category/add"
                  className="btn btn-success pull-right"
                >
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

export default Category;
