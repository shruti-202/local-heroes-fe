import { Button, Card, FormControl, TextField, Typography } from "@mui/material";
import Container from "../components/atoms/Container";
import React, { useContext } from "react";
import apiCall from "../utils/apiUtils";
import API_ENUM from "../enum/API_ENUM";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setUserInfo } = useContext(UserContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [redirectToHome, setRedirectToHome] = React.useState(false);

  if (redirectToHome) return <Navigate to={"/"} />;

  const handleUsernameChange = (ev: any) => {
    setUsername(ev.target.value);
  };

  const handlePasswordChange = (ev: any) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = async () => {
    const data = await apiCall(API_ENUM.LOGIN, { username, password });

    if (data?.success) {
      setUserInfo({
        userId: data.data.userId,
        username: data.data.username,
        email: data.data.email,
        phone: data.data.phone,
        type: data.data.type,
      });
      setRedirectToHome(true);
    }
  };

  return (
    <Container>
      <div style={{ display: "flex", height: "90vh" }}>
        <Card
          variant="outlined"
          sx={{ padding: "10px", margin: "auto", minWidth: "360px" }}
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
              LOGIN
            </Typography>
            <TextField
              style={{ marginBottom: "10px" }}
              type="text"
              id="username-input"
              label="Username"
              variant="standard"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              type="password"
              id="password-input"
              label="Password"
              variant="standard"
              value={password}
              onChange={handlePasswordChange}
            />
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
              Login
            </Button>
          </FormControl>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
