import { AppBar, Toolbar, Box, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../resources/logo.svg";
import { useUserInfo } from "../context/UserInfoProvider";
import { useState } from "react";
import axios from "axios";
interface NavbarProps {
  title: string;
  home?: boolean;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const { state } = useUserInfo();
  const deleteAccountHandler = () => {
    console.log(state.userId);
    console.log(state.email);
    axios
      .post("http://35.213.155.144:4000/deleteAccount", {
        userId: state.userId,
      })
      .then((res) => console.log(res));
    setShowMenu(false);
    navigate("/");
  };
  return (
    <AppBar
      position="sticky"
      style={{ background: "linear-gradient(0,#FFD468 0%,#FFC229 100%)" }}
    >
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Link to="/event">
            <img src={logo} alt="logo" height="40px" />
          </Link>
          <Box
            display="flex"
            alignItems="center"
            color="black"
            fontSize="30px"
            fontWeight="bold"
          >
            {props.title}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            color="black"
            fontSize="30px"
            fontWeight="bold"
          >
            <Box
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setShowMenu(true);
              }}
            >{`${state.firstName}`}</Box>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={showMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => setShowMenu(false)}>Coin : 300</MenuItem>
              <MenuItem onClick={deleteAccountHandler}>Delete Account</MenuItem>
              <Link to="/">
                <MenuItem>Log Out</MenuItem>
              </Link>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
