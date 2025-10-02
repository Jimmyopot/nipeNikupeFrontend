// @ts-nocheck
import { FormControl, FormHelperText } from '@mui/material';
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { Box, TextField } from '@mui/material'

const Location = ({ currentStep, formData, setFormData, errors, setErrors }) => {
  const countries = [
    "Kenya",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Nigeria",
    "Ghana",
    "South Africa",
    "Other",
  ];

  return (
    <Box>
      {currentStep === 2 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <FormControl
            fullWidth
            sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
            error={!!errors.country}
          >
            <InputLabel>Country</InputLabel>
            <Select
              value={formData?.country}
              label="Country"
              onChange={(e) => {
                setFormData({ ...formData, country: e.target.value });
                if (errors.country && e.target.value) {
                  setErrors({ ...errors, country: "" });
                }
              }}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
            {errors.country && (
              <FormHelperText>{errors.country}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="City/Town"
            placeholder="Enter your city or town"
            value={formData?.cityOrTown}
            onChange={(e) => {
              setFormData({ ...formData, cityOrTown: e.target.value });
              if (errors.cityOrTown && e.target.value.trim()) {
                setErrors({ ...errors, cityOrTown: "" });
              }
            }}
            error={!!errors.cityOrTown}
            helperText={errors.cityOrTown}
            sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
          />

          <TextField
            fullWidth
            label="Locality/Area"
            placeholder="Enter your specific area or neighborhood"
            value={formData?.localityOrArea}
            onChange={(e) => {
              setFormData({ ...formData, localityOrArea: e.target.value });
              if (errors.localityOrArea && e.target.value.trim()) {
                setErrors({ ...errors, localityOrArea: "" });
              }
            }}
            error={!!errors.localityOrArea}
            helperText={errors.localityOrArea}
            sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Location
