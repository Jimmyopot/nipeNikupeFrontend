import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Badge,
  IconButton,
  Grid,
  Container,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import {
  Search,
  LocationOn,
  Edit,
  Email,
  Phone,
  Star,
  Handshake,
  People,
  Notifications,
  TrendingUp,
  Chat,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import getFirstName from "../../../common/GetFirstName";
import stringAvatar from "../../../common/StringAvatar";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.LoginReducer);
    return (
        <Paper
            elevation={2}
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                backdropFilter: "blur(8px)",
                //   backgroundColor: 'rgba(255, 255, 255, 0.95)'
                backgroundColor: "primary.main2",
            }}
        >
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 2,
                }}
            >
            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                }}
                onClick={() => navigate("/")}
            >
                <Box
                    sx={{
                        p: 1,
                        bgcolor: "primary.main",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Handshake sx={{ color: "white", fontSize: "1.25rem" }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    NipeNikupe
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Badge badgeContent=" " color="primary" variant="dot">
                        <IconButton>
                            <Notifications />
                        </IconButton>
                    </Badge>
                    <Avatar
                        src={user?.profilePicture || "/placeholder.svg"}
                        alt={user?.fullName}
                        sx={{
                            width: 36,
                            height: 36,
                            cursor: "pointer",
                            border: "2px solid",
                            borderColor: "primary.light",
                        }}
                        onClick={() => navigate("/dashboard")}
                    >
                        {getFirstName(user?.fullName)}
                    </Avatar>
                </Box>
            </Box>
        </Container>
        </Paper>
    );
};

export default Navbar;
