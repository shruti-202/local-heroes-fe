import { useState } from "react";
import { Button, Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Container from "../components/atoms/Container";
import apiCall from "../utils/apiUtils";
import API_ENUM from "../enum/API_ENUM";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleNameChange = (ev: any) => {
    setName(ev.target.value);
  };

  const handleEmailChange = (ev: any) => {
    setEmail(ev.target.value);
  };

  const handlePhoneChange = (ev: any) => {
    setPhone(ev.target.value);
  };

  const handleUsernameChange = (ev: any) => {
    setUsername(ev.target.value);
  };

  const handlePasswordChange = (ev: any) => {
    setPassword(ev.target.value);
  };

  const handleUserTypeChange = (ev: any) => {
    setUserType(ev.target.value);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setUsername("");
    setPassword("");
    setUserType("");
  };

  const handleSubmit = async () => {
    const data = await apiCall(API_ENUM.SIGNUP, {
      name,
      email,
      phone,
      username,
      password,
      userType,
    });
    if (data?.success) resetForm();
  };

  return (
    <Container>
      <div style={{ display: "flex", height: "90vh" }}>
        <Card
          variant="outlined"
          sx={{ padding: "10px", margin: "auto", width: "330px" }}
        >
          <FormControl fullWidth>
            <Typography
              sx={{
                marginBottom: "7px",
                fontSize: "bold",
                fontWeight: "500",
                paddingBottom: "5px",
                textAlign: "center",
              }}
              variant="h5"
            >
              SIGN UP
            </Typography>
            <TextField
              style={{ marginBottom: "10px" }}
              type="text"
              id="standard-basic"
              label="Full Name"
              variant="standard"
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              type="email"
              id="standard-basic"
              label="Email"
              variant="standard"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              type="number"
              id="standard-basic"
              label="Phone No."
              variant="standard"
              value={phone}
              onChange={handlePhoneChange}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              type="text"
              id="standard-basic"
              label="Username"
              variant="standard"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              type="password"
              id="standard-basic"
              label="Password"
              variant="standard"
              value={password}
              onChange={handlePasswordChange}
            />
            <FormLabel id="demo-controlled-radio-buttons-group">
              Signup As
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={userType}
              onChange={handleUserTypeChange}
              style={{ marginBottom: "10px" }}
            >
              <FormControlLabel
                value="PROVIDER"
                control={<Radio />}
                label="Provider"
              />
              <FormControlLabel
                value="CLIENT"
                control={<Radio />}
                label="Client"
              />
            </RadioGroup>
            <Button
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--ternary-color)",
                "&:hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
              onClick={handleSubmit}
              variant="contained"
            >
              SIGN UP
            </Button>
            <div style={{marginTop:"10px",textAlign:"center"}}>
          Already have an account ? {""}
          <Link to="/login" className="login-link">
            <span style={{textDecoration:"underline"}}>LOGIN</span>
          </Link>
        </div>
          </FormControl>
        </Card>
      </div>
    </Container>
  );
};

export default Register;
