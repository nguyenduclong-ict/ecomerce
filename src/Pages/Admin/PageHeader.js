import React from "react";
import { Link } from "react-router-dom";
const PageHeader = (props, { match }) => {
  let p = props.level.split("/");
  p.shift();

  const printLevel = () => {
    let result = [];
    let t = "/";
    for (let i = 0; i < p.length; i++) {
      t += p[i] + "/";
      let tmp = (
        <li className={i == p.length - 1 ? "active" : ""}>
          {(i !== p.length - 1) ? (
            <Link to={t}>
              {i == 0 ? <i class="fa fa-dashboard" /> : ""} {p[i]}
            </Link>
          ) : (
            p[i]
          )}
        </li>
      );
      result.push(tmp);
    }

    return result;
  };

  return (
    <section className="content-header">
      <h1>
        {props.header}
        <small>{props.subHeader}</small>
      </h1>
      <ol className="breadcrumb">{printLevel()}</ol>
    </section>
  );
};

export default PageHeader;
