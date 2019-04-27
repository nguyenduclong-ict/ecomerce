import React , {useState}  from "react";
import { Link } from "react-router-dom";

function UserPanel(props)  {
  const [status, setStatus] = useState(props.status || 0);
  const [avatar, setAvatar] = useState(props.avatar || "dist/img/user.png");
  const [name, setName] = useState(props.name || "No name");
  const [url, setUrl] = useState(props.url || '#');
  return (
    <div className="user-panel">
        <div className="pull-left image">
          <img
            src={avatar || "dist/img/user.png"}
            className="img-circle"
          />
        </div>

        <div className="pull-left info">
          <p>{name}</p>
          <Link to={url}>
            <i className={"fa fa-circle" + status === 1 ? "text-success" : "text-white"} /> 
              { status === 1 ? "Online" : "Offline"}
          </Link>
        </div>
      </div>
  )
}

export default UserPanel
