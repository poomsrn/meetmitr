import { Box, Paper, TextField, Select, MenuItem, Button } from "@mui/material";
import logo from "../resources/logo.svg";
import { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState(null);

  const registerHandler = () => {
    console.log(birthdate.getDate());
    var x = `${birthdate.getFullYear()}-${
      birthdate.getMonth() < 10
        ? `0${birthdate.getMonth()}`
        : `${birthdate.getMonth()}`
    }-${
      birthdate.getDate() < 10
        ? `0${birthdate.getDate()}`
        : `${birthdate.getDate()}`
    }`;
    var data = {
      firstName: name,
      lastName: surname,
      email: emailAddress,
      password: password,
      gender: gender,
      birthdate: x,
    };
    console.log(data);
    axios
      .post("http://35.213.155.144:4000/register", data)
      .then((res) => console.log(res));
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: "#FAF3E7" }}
    >
      <Paper style={{ width: "60%" }}>
        <Box padding="20px" alignItems="center">
          <Box display="flex" justifyContent="center" width="100%">
            <img
              alt="logo"
              src={logo}
              width="40px"
              style={{ marginRight: "20px" }}
            />
          </Box>
          <Box marginTop="20px" display="flex">
            <Box width="50%">
              <Box
                sx={{ fontSize: "20px", color: "#303B5B", marginLeft: "5px" }}
              >
                First Name
              </Box>
              <Box marginTop="3px">
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  sx={{ width: "95%" }}
                  size="small"
                />
              </Box>
            </Box>
            <Box width="50%">
              <Box
                sx={{ fontSize: "20px", color: "#303B5B", marginLeft: "5px" }}
              >
                Last Name
              </Box>
              <Box marginTop="3px">
                <TextField
                  onChange={(e) => setSurname(e.target.value)}
                  sx={{ width: "100%" }}
                  size="small"
                />
              </Box>
            </Box>
          </Box>
          <Box marginTop="20px" display="flex">
            <Box width="50%">
              <Box
                sx={{ fontSize: "20px", color: "#303B5B", marginLeft: "5px" }}
              >
                Password
              </Box>
              <Box marginTop="3px">
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  sx={{ width: "95%" }}
                  size="small"
                />
              </Box>
            </Box>
            <Box width="50%">
              <Box
                sx={{ fontSize: "20px", color: "#303B5B", marginLeft: "5px" }}
              >
                Confirm Password
              </Box>
              <Box marginTop="3px">
                <TextField
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  sx={{ width: "100%" }}
                  size="small"
                />
              </Box>
            </Box>
          </Box>
          <Box marginTop="20px" display="flex">
            <Box width="100%">
              <Box
                sx={{ fontSize: "20px", color: "#303B5B", marginLeft: "5px" }}
              >
                Email Address
              </Box>
              <Box marginTop="3px">
                <TextField
                  onChange={(e) => setEmailAddress(e.target.value)}
                  sx={{ width: "100%" }}
                  size="small"
                />
              </Box>
            </Box>
          </Box>
          <Box marginTop="20px" display="flex">
            <Box width="50%">
              <Box
                sx={{ fontSize: "20px", color: "#303B5B", marginLeft: "5px" }}
              >
                Birthdate
              </Box>
              <Box marginTop="3px">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={birthdate}
                    onChange={(newValue) => {
                      setBirthdate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        sx={{ width: "95%" }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box width="50%">
              <Box
                sx={{ fontSize: "20px", color: "#303B5B", marginLeft: "5px" }}
              >
                Gender
              </Box>
              <Box marginTop="3px">
                <Select
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  value={gender}
                  size="small"
                  style={{ width: "100%" }}
                >
                  <MenuItem value={"male"}>ชาย</MenuItem>
                  <MenuItem value={"female"}>หญิง</MenuItem>
                  <MenuItem value={"etc"}>อื่น ๆ</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
          <Box marginTop="20px" width="100%">
            <Link to="/">
              <Button
                onClick={registerHandler}
                variant="contained"
                style={{ width: "100%", backgroundColor: "#FFC229" }}
              >
                Register
              </Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
