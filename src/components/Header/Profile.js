import React, {useState, useEffect} from 'react'
import { getUserInfo, getAuthInfo } from '../../helpers/Auth';
import {logout} from '../../helpers/Auth'

const Profile = (props) => {
    const [avatar, setAvatar] = useState(props.avatar || "dist/img/user.png");
    const [name, setName] = useState(props.name || "No Name");
    const [status, setStatus] = useState(props.status || 0);

    useEffect(() => {
        getUserInfo().then(res => {
            setStatus(1);
            setName(res.data.info.name);
            
          })
        return;
    },[])

    const signOut = (e) => {
        e.preventDefault();
        logout();
        props.history.push('/login');
    }
    
    const proFile = (e) => {
        e.preventDefault();
        let {role }  = getAuthInfo();
        props.history.push(`/${role}/profile`)
    }

  return (
      <li className="dropdown user user-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img src={avatar} className="user-image" alt="User Image" />
              <span className="hidden-xs">{name || "No name"}</span>
            </a>
            <ul className="dropdown-menu">

              <li className="user-footer">
                <div className="pull-left">
                  <a href="#" className="btn btn-default btn-flat" onClick={proFile}> Profile</a>
                </div>  
                <div className="pull-right">
                  <a href="" className="btn btn-default btn-flat" onClick={signOut}> Sign out</a>
                </div>
              </li>
            </ul>
          </li>
  )
}

export default Profile
