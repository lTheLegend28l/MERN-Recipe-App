import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
} from "@mui/material";
import { CustomTextField } from "./CustomTextField";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const AuthForm = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
  error,
}) => {
  // MUI
  const theme = useTheme();

  return (
    <Container
      component="form"
      maxWidth="xs"
      textAlign="center"
      sx={{
        backgroundColor: theme.palette.customColor.light,
        boxShadow: "10",
        borderRadius: "20px",
        padding: "5vh 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">{label}</Typography>
        <Box
          textAlign="center"
          component="form"
          noValidate
          onSubmit={onSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {error && (
              <Grid item xs={12}>
                <Typography sx={{ color: theme.palette.error }} paragraph>
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <CustomTextField
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="customOutlined" type="submit" onClick={onSubmit}>
                {label}
              </Button>
              {label === "Login" ? (
                <Container>
                  <Typography mt={4}>Don't have an account?</Typography>
                  <Link to="/auth/register" style={{textDecoration: "none", color: "#fb5607"}}>
                    Register
                  </Link>
                </Container>
              ) : (
                <Container>
                  <Typography mt={4}>Already have an account?</Typography>
                  <Link to="/auth/login" style={{textDecoration: "none", color: "#fb5607"}}>
                    <Typography>Login</Typography>
                  </Link>
                </Container>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
