import React, { useState, useEffect, useRef } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Axios from "axios";
import { getHeader } from "../../helpers/Auth";
import {Link} from 'react-router-dom'
var $ = window.$;

const Log = () => {
  const [list, setList] = useState([]);
  const page = 100;
  const tableRef = useRef();



  const getList = () => {
    let url =
      process.config.apiUrl + `/admin/log`;
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
 
  //   useEffect
  useEffect(() => {
    getList();
  }, []);



  const columns = [
    {
        Header: "Tiêu đề",
        accessor: "title",
      filterable: true
    },
    {
        Header: "Nội dung",
        accessor: "content",
      filterable: true
    },
    {
        Header: "Loại",
        accessor: "type",
      filterable: true
    },
    {
        Header: "Created",
        accessor: "created",
        filterable: true
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

export default Log;
