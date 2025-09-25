// @ts-nocheck
import { Box, TextField, Typography } from '@mui/material'
import React from 'react';
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PersonalInfo = ({ 
    currentStep,
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordStrength,
    strengthLabels }) => {
  return (
    <Box>
        {currentStep === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                fullWidth
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                }
                sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
                />

                <TextField
                fullWidth
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
                sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
                />

                <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                placeholder="+254 700 000 000"
                value={formData.phone}
                onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                }
                sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
                />

                <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
                sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        >
                        {showPassword ? (
                            <VisibilityOffIcon />
                        ) : (
                            <VisibilityIcon />
                        )}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                />
                {formData.password && (
                <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                    {[0, 1, 2, 3].map((i) => (
                        <Box
                        key={i}
                        sx={{
                            height: 8,
                            flex: 1,
                            borderRadius: 1,
                            bgcolor:
                            i < passwordStrength
                                ? passwordStrength === 1
                                ? "error.main"
                                : passwordStrength === 2
                                ? "warning.main"
                                : passwordStrength === 3
                                ? "warning.light"
                                : "success.main"
                                : "grey.200",
                        }}
                        />
                    ))}
                    </Box>
                    <Typography variant="body2" sx={{ color: "grey.600" }}>
                    Password strength:{" "}
                    {strengthLabels[passwordStrength - 1] || "Too weak"}
                    </Typography>
                </Box>
                )}

                <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                    })
                }
                sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        >
                        {showConfirmPassword ? (
                            <VisibilityOffIcon />
                        ) : (
                            <VisibilityIcon />
                        )}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                />
                {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                    <Typography variant="body2" sx={{ color: "error.main" }}>
                    Passwords do not match
                    </Typography>
                )}
            </Box>
        )}
    </Box>
  )
}

export default PersonalInfo
