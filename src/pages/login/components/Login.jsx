"use client";

import { useState } from "react";
// import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        p: 2,
        background: "linear-gradient(135deg, var(--background), var(--muted))",
        bgcolor: "primary.main2",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 80,
            left: 40,
            width: 288,
            height: 288,
            bgcolor: "primary.main",
            opacity: 0.05,
            borderRadius: "50%",
            filter: "blur(48px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 80,
            right: 40,
            width: 384,
            height: 384,
            bgcolor: "secondary.main",
            opacity: 0.05,
            borderRadius: "50%",
            filter: "blur(48px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            bgcolor: "accent.main",
            opacity: 0.03,
            borderRadius: "50%",
            filter: "blur(48px)",
          }}
        />
      </Box>

      <Box
        sx={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}
      >
        {/* Logo/Brand */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          {/* <Link href="/" passHref legacyBehavior> */}
            <a style={{ textDecoration: "none" }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                  fontSize: 32,
                }}
              >
                NipeNikupe
              </Typography>
            </a>
          {/* </Link> */}
          <Typography sx={{ color: "text.secondary" }}>
            Welcome back! Sign in to continue
          </Typography>
        </Box>

        {/* Login Card */}
        <Card
          sx={{
            boxShadow: 8,
            backdropFilter: "blur(6px)",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Sign In
              </Typography>
            }
            subheader={
              <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                Enter your credentials to access your account
              </Typography>
            }
            sx={{ pb: 0 }}
          />
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {/* Email Field */}
              <TextField
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                variant="outlined"
                size="medium"
                sx={{
                  backgroundColor: "background.paper",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />

              {/* Password Field */}
              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                variant="outlined"
                size="medium"
                sx={{
                  backgroundColor: "background.paper",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{
                          color: "text.secondary",
                          "&:hover": { color: "text.primary" },
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: -1 }}>
                <Link to="/forgot-password">
                  <a
                    style={{
                      fontSize: 14,
                      color: "primary.main",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    Forgot password?
                  </a>
                </Link>
              </Box>

              {/* Login Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  fontWeight: 600,
                  py: 1.5,
                  mt: 1,
                  boxShadow: 2,
                  textTransform: "none",
                  fontSize: 18,
                }}
                endIcon={<ArrowRightAltIcon sx={{ fontSize: 22 }} />}
              >
                Sign In
              </Button>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              flexDirection: "column",
              alignItems: "stretch",
              gap: 2,
              px: 2,
              pb: 2,
            }}
          >
            <Divider sx={{ my: 1 }}>Or</Divider>
            <Box sx={{ textAlign: "center", fontSize: 15 }}>
              <Typography
                component="span"
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Don't have an account?{" "}
              </Typography>
              <Link to="/register">
                <a
                  style={{
                    color: "var(--mui-palette-primary-main)",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 15,
                  }}
                >
                  Create Account
                  <ArrowRightAltIcon sx={{ fontSize: 18, ml: 0.5 }} />
                </a>
              </Link>
            </Box>
          </CardActions>
        </Card>

        {/* Trust Badge */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontSize: 12 }}
          >
            🔒 Your information is secure and encrypted
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
