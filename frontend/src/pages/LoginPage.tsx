import { Box, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoYellow from "../resources/logoYellow.svg";
import axios from "axios";

import { useUserInfo } from "../context/UserInfoProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { setState } = useUserInfo();
  const loginHandler = () => {
    console.log(emailAddress);
    console.log(password);
    axios
      .post("http://35.213.155.144:4000/", {
        email: emailAddress,
        password: password,
      })
      .then((res: any) => {
        if (res.data !== "login fail") {
          console.log(res);
          console.log(res.data.userId);
          setState(res.data);
          navigate("/event");
        }
      });
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      style={{ backgroundColor: "#FAF3E7" }}
    >
      <Box alignItems="center" display="flex" width="50%">
        <Box width="100%" textAlign="center" paddingX="10%">
          <img width="100px" src={LogoYellow} alt="logo" />
          <h1>MeetMitr</h1>
          <hr />
          <h4>
            A platform that aims to give opportunities for people to meet new
            friends who have similar interests and bond through various
            activities.
          </h4>
        </Box>
      </Box>
      <Box alignItems="center" display="flex" width="50%">
        <Box width="100%" textAlign="center" paddingX="10%">
          <Paper>
            <Box paddingY="1%">
              <Box fontSize={40} fontWeight="bold">
                {"เข้าสู่ระบบ"}
              </Box>
              <TextField
                label="Email Address"
                onChange={(e) => setEmailAddress(e.target.value)}
                style={{ width: "80%", marginTop: "15px" }}
              />
              <TextField
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "80%", marginTop: "15px" }}
              />
              <Box marginY="15px">
                <Button
                  size="large"
                  variant="contained"
                  onClick={loginHandler}
                  style={{ backgroundColor: "#303B5B", width: "80%" }}
                >
                  <Box marginX="30px" fontWeight="bold">
                    Login
                  </Box>
                </Button>
              </Box>
              <Box
                marginLeft="10%"
                style={{ backgroundColor: "gray" }}
                width="80%"
                height="2px"
              />
              <Box marginY="15px">
                <Link to="/register">
                  <Button
                    size="large"
                    variant="contained"
                    style={{ backgroundColor: "#FFC229", width: "80%" }}
                  >
                    <Box marginX="30px" fontWeight="bold">
                      Create Account
                    </Box>
                  </Button>
                </Link>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
