// @ts-nocheck
import { FormControl } from '@mui/material';
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { Box, TextField } from '@mui/material'

const Location = ({ 
    currentStep,
    formData,
    setFormData,
 }) => {
    const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Nigeria", "Ghana", "South Africa", "Other"]

    return (
        <Box>
            {currentStep === 2 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <FormControl
                    fullWidth
                    sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
                    >
                    <InputLabel>Country</InputLabel>
                    <Select
                        value={formData.country}
                        label="Country"
                        onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                        }
                    >
                        {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                            {country}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>

                    <TextField
                    fullWidth
                    label="City/Town"
                    placeholder="Enter your city or town"
                    value={formData.city}
                    onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                    }
                    sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
                    />

                    <TextField
                    fullWidth
                    label="Locality/Area"
                    placeholder="Enter your specific area or neighborhood"
                    value={formData.locality}
                    onChange={(e) =>
                        setFormData({ ...formData, locality: e.target.value })
                    }
                    sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default Location
