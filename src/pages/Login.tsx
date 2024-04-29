import { Button, Card, FormControl, TextField, Typography } from "@mui/material";
import Container from "../components/atoms/Container";
import { useContext, useState } from "react";
import apiCall from "../utils/apiUtils";
import API_ENUM from "../enum/API_ENUM";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

type Credentials = {
  username: string;
  password: string;
};

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
  
  const guestCredential = {
    username: "Sami12345",
    password: "Sami@12345",
  };

  const handleSubmit = async (credentials: Credentials) => {
    try {
      const data = await apiCall(API_ENUM.LOGIN, credentials);
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

  const handleGuestLogin = () => {
    setUsername(guestCredential.username);
    setPassword(guestCredential.password);
    handleSubmit(guestCredential);
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
              onClick={() => handleSubmit({ username, password })}
              variant="contained"
            >
              Login
            </Button>
            <Button
              sx={{
                backgroundColor: "var(--light-grey)",
                border:"1px solid var(--primary-color) ",
                color: "var(--dark-black)",
                "&:hover": {
                  backgroundColor: "var(--lighter-grey)",
                },
                marginTop: "10px",
              }}
              onClick={handleGuestLogin}
              variant="contained"
            >
              Guest Login
            </Button>
            <div style={{marginTop:"10px",textAlign:"center"}}>
            Don't have an Account ? {""}
          <Link to="/register" className="signin-link">
            <span style={{textDecoration:"underline"}}>SIGN UP</span>
          </Link>
        </div>
          </FormControl>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
