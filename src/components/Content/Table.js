import React, { useEffect } from "react";
import "./Table.css";

const Table = props => {
  const style = () => {
    // window.$("#example1").DataTable();
    window.$(".dataTables_filter label").addClass("pull-right");
  };
  useEffect(() => {
    style();
  });

  const printTHead = () => {
    let header = [];

    if (props.header)
      props.header.forEach(element => {
        header.push(
          <th
            className="sorting_asc"
            tabindex="0"
            aria-controls={props.id}
            rowspan="1"
            colspan="1"
            aria-sort="ascending"
            aria-label="Rendering engine: activate to sort column descending"
            style={{ width: "85px" }}
          >
            {element}
          </th>
        );
      });

    return header;
  };

  const printTBody = () => {};

  return (
    <div className="box">
      <div className="box-header">
        <h3 className="box-title">Data Table With Full Features</h3>
      </div>
      <div className="box-body">
        <div
          id={props.id + "_wrapper"}
          className="dataTables_wrapper form-inline dt-bootstrap"
        >
          {/* Table Tool */}
          <div className="row">
            <div className="col-sm-12">
              <table
                id={props.id}
                className="table table-bordered table-striped dataTable"
                role="grid"
                aria-describedby={props.id + "_info"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
