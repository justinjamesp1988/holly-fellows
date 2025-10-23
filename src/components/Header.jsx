import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../firebase/config.js';
import {setUser} from '../store/usersSlice.js';
import { useDispatch } from "react-redux";

function Header({pageTitle}) {

  const dispatch = useDispatch();

  const handleSignOut = () => {

    if(confirm('Are you sure you want to logout ?')) {
      signOut(auth).then(() => {
        dispatch(setUser(null));
      }).catch((error) => {
        console.log(error);
      });
    }
  }

    return (
      <div className="header-width">
        {/* <img src={'/Header/header.jpg'} /> */}
      </div>
    )
  }
  
  export default Header
  