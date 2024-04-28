import { Button, Card, FormControl, TextField, Typography } from "@mui/material";
import Container from "../components/atoms/Container";
import { useContext, useState } from "react";
import apiCall from "../utils/apiUtils";
import API_ENUM from "../enum/API_ENUM";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setUserInfo } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (ev: any) => {
    setUsername(ev.target.value);
  };

  const handlePasswordChange = (ev: any) => {
    setPassword(ev.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = await apiCall(API_ENUM.LOGIN, { username, password });

      if (data?.success) {
        setUserInfo({
          userId: data.data.userId,
          username: data.data.username,
          email: data.data.email,
          phone: data.data.phone,
          type: data.data.type,
        });
        const { state } = location;
        const redirectTo = state?.from ? state.from : "/";

        if (redirectTo === "/login" || redirectTo === "/register") {
          if (state?.from === "/category") {
            navigate("/category");
          } else {
            navigate("/");
          }
        } else {
          navigate(redirectTo);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
      } else {
        console.error("An error occurred:", error);
      }
    }
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
              LOGIN
            </Typography>
            <TextField
              style={{ marginBottom: "10px" }}
              type="text"
              id="username-input"
              label="Username"
              variant="standard"
              autoComplete="current-username"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              type="password"
              id="password-input"
              label="Password"
              variant="standard"
              autoComplete="current-password"
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
              onClick={ handleSubmit }
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
