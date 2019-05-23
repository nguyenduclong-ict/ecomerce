import React, { useState, useEffect, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Axios from "axios";
import { getHeader } from "../../helpers/Auth";

const User = props => {
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

  const onChangeStatus = (id, isBlock) => {
    console.log(id, isBlock);
    window.$.confirm({
      title: "Chú ý",
      content: (isBlock ? "block" : "unBlock") + " tài khoản này?",
      animationSpeed: 100,
      type: "orange",
      buttons: {
        ok: () => {
          let url =
            process.config.apiUrl +
            "/admin/user/" +
            (isBlock ? "block/" : "unblock/") +
            id;
          Axios.post(url, {}, { headers: getHeader() }).then(res => {
            console.log(res);
            if (res.data.ok === 1) {
              list.map(e => {
                if (e._id == id) e.isBlock = res.data.isBlock;
                return e;
              });
              setList([...list]);
              window.$.alert({
                title: "Thanh cong",
                content: (isBlock ? "block" : "unblock") + " thành công!",
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

  const onBlockMultiple = isBlock => {
    let mark = list.filter(e => e.check);
    let ids = mark.map(e => e._id);
    // post block / unblock

    window.$.confirm({
      title: "Chú ý",
      content: (isBlock ? "block" : "unBlock") + " toàn bộ?",
      animationSpeed: 100,
      type: "orange",
      buttons: {
        ok: () => {
          Axios.post(
            process.config.apiUrl + "/admin/user/change-block",
            { ids: ids, isBlock: isBlock },
            { headers: getHeader() }
          ).then(res => {
            if (res.data.ok == 1) window.$.alert("Thành công");
            setList([
              ...list.map(e => {
                if (ids.includes(e._id)) e.isBlock = isBlock;
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
      process.config.apiUrl + `/admin/user/list/all-${list.length}-${page}`;
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
      Cell: v => (
        <div style={{ textAlign: "center" }}>
          {" "}
          <input
            type="checkbox"
            checked={v.row._original.check}
            onChange={() => onCheckBoxChange(v.row._original._id)}
          />
        </div>
      ),
      width: 50,
      sortable: false
    },
    {
      Header: "Email",
      accessor: "email",
      filterable: true
    },

    {
      Header: "Type",
      accessor: "type",
      width : 80
    },
    {
      Header: "Name",
      accessor: "info.name",
      filterable: true
    },
    {
      Header: "Address",
      accessor: "info.address",
      filterable: true
    },
    {
      Header: "Status",
      accessor: "isBlock",
      width: 50,
      Cell: v => { let row = v.row._original; return (
        <div style={{ textAlign: "center" }}>
          <i
            className={row.isBlock ? "btn fa fa-lock" : "btn fa fa-unlock"}
            style={{ color: row.isBlock ? "red" : "green" }}
            onClick={() => onChangeStatus(row._id, !row.isBlock)}
          />
        </div>
      ) }
    }
  ];
  return (
    <section className="content">
      <div className="row">
        <div className="col-md-12">
          <div className="box box-default">
            <div className="box-header">
              <div className="box-header with-border">
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

export default User;
