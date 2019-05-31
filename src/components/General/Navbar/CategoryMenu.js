import React, { useState, useEffect } from "react";
import axios from "axios";
import Transfer from "../../../helpers/Transfer";
import chanel from "../../../helpers/chanel";
import { Link } from "react-router-dom";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  // lấy danh sách categories
  const getCategory = () => {
    let url = process.config.apiUrl + "/category/list";
    axios
      .get(url)
      .then(res => {
        console.log(res.data);
        setCategories([...res.data]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onMenuItemClick = (e, item) => {
    e.preventDefault();
    // filter by category
    let category = item._id;
    console.log(item._id);
    Transfer.pushMessage(chanel.FILTER_CHANEL, {
      type: "object",
      data: {
        category: category
      }
    });
  };

  return (
    <ul className="nav navbar-nav menu_nav ml-auto">
      {categories
        .filter(e => e.parentId == null)
        .splice(0, 5)
        .sort((a, b) => {
          return -(a.order - b.order);
        })
        .map(e2 => (
          // Category lv1
          <li className="nav-item submenu">
            <Link className="nav-link dropdown-toggle" to="/#list-filter" onClick={e=>onMenuItemClick(e, e2)}>
              {e2.name}
            </Link>

            {categories.filter(e3 => e3.parentId === e2._id).length > 0 ? (
              // Category lv2
              <ul className="dropdown-menu" id={e2._id}>
                {categories
                  .filter(e3 => e3.parentId === e2._id)
                  .sort((a, b) => {
                    return -(a.order - b.order);
                  })
                  .map(e4 => (
                    <li className="nav-item" onClick={e => onMenuItemClick(e, e4)}>
                      <Link className="nav-link" to="/#list-filter">
                        {e4.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            ) : null}
          </li>
        ))}

      {categories.filter(e => e.parentId == null).length > 5 ? (
        <li className="nav-item submenu dropdown">
          <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="/#list-filter">
            Thêm ...
          </Link>
          {/* // Category lv2 */}
          <ul className="dropdown-menu">
            {categories
              .filter(e => e.parentId === null)
              .filter((e, index) => index >= 5)
              .sort((a, b) => {
                return -(a.order - b.order);
              })
              .map(e4 => (
                <li className="nav-item" onClick={e => onMenuItemClick(e, e4)}>
                  <Link className="nav-link" to="/#list-filter">
                    {e4.name}
                  </Link>
                </li>
              ))}
          </ul>
        </li>
      ) : null}
    </ul>
  );
};

export default CategoryMenu;
