// // @ts-nocheck
// import { FormControl, FormHelperText } from '@mui/material';
// import InputLabel from "@mui/material/InputLabel"
// import Select from "@mui/material/Select"
// import MenuItem from "@mui/material/MenuItem"
// import { Box, TextField } from '@mui/material'
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getAllCountiesAction } from '../../../common/state/CommonActions';

// const Location = ({ currentStep, formData, setFormData, errors, setErrors }) => {
//   const dispatch = useDispatch();

//   const { getAllCounties, getAllCountiesResp } = useSelector(
//     (state) => state.CommonReducer
//   );
//   console.log("getAllCountiesResp444444", getAllCountiesResp);

//   const countries = [
//     "Kenya",
//     "Uganda",
//     "Tanzania",
//     "Rwanda",
//     "Nigeria",
//     "Ghana",
//     "South Africa",
//     "Other",
//   ];

//   // Fetch countries if not already fetched
//   useEffect(() => {
//     dispatch(getAllCountiesAction());
//   }, [dispatch]);

//   return (
//     <Box>
//       {currentStep === 2 && (
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//           <FormControl
//             fullWidth
//             sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
//             error={!!errors.country}
//           >
//             <InputLabel>Country</InputLabel>
//             <Select
//               value={formData?.country}
//               label="Country"
//               onChange={(e) => {
//                 setFormData({ ...formData, country: e.target.value });
//                 if (errors.country && e.target.value) {
//                   setErrors({ ...errors, country: "" });
//                 }
//               }}
//             >
//               {countries.map((country) => (
//                 <MenuItem key={country} value={country}>
//                   {country}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.country && (
//               <FormHelperText>{errors.country}</FormHelperText>
//             )}
//           </FormControl>

//           <TextField
//             fullWidth
//             label="City/Town"
//             placeholder="Enter your city or town"
//             value={formData?.cityOrTown}
//             onChange={(e) => {
//               setFormData({ ...formData, cityOrTown: e.target.value });
//               if (errors.cityOrTown && e.target.value.trim()) {
//                 setErrors({ ...errors, cityOrTown: "" });
//               }
//             }}
//             error={!!errors.cityOrTown}
//             helperText={errors.cityOrTown}
//             sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
//           />

//           <TextField
//             fullWidth
//             label="Locality/Area"
//             placeholder="Enter your specific area or neighborhood"
//             value={formData?.localityOrArea}
//             onChange={(e) => {
//               setFormData({ ...formData, localityOrArea: e.target.value });
//               if (errors.localityOrArea && e.target.value.trim()) {
//                 setErrors({ ...errors, localityOrArea: "" });
//               }
//             }}
//             error={!!errors.localityOrArea}
//             helperText={errors.localityOrArea}
//             sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
//           />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Location


// @ts-nocheck
// import { 
//   FormControl, 
//   FormHelperText, 
//   InputLabel, 
//   Select, 
//   MenuItem, 
//   Box, 
//   TextField, 
//   CircularProgress 
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getAllCountiesAction } from "../../../common/state/CommonActions";

// const Location = ({ currentStep, formData, setFormData, errors, setErrors }) => {
//   const dispatch = useDispatch();

//   const { getAllCounties, getAllCountiesResp } = useSelector(
//     (state) => state.CommonReducer
//   );

//   const countries = [
//     "Kenya",
//     "Uganda",
//     "Tanzania",
//     "Rwanda",
//     "Nigeria",
//     "Ghana",
//     "South Africa",
//     "Other",
//   ];

//   const isKenyaSelected = formData?.country === "Kenya";

//   // Fetch counties on mount
//   useEffect(() => {
//     dispatch(getAllCountiesAction());
//   }, [dispatch]);

//   return (
//     <Box>
//       {currentStep === 2 && (
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//           {/* Country Dropdown */}
//           <FormControl
//             fullWidth
//             sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
//             error={!!errors.country}
//           >
//             <InputLabel>Country</InputLabel>
//             <Select
//               value={formData?.country}
//               label="Country"
//               onChange={(e) => {
//                 setFormData({ ...formData, country: e.target.value });
//                 if (errors.country && e.target.value) {
//                   setErrors({ ...errors, country: "" });
//                 }
//               }}
//             >
//               {countries.map((country) => (
//                 <MenuItem key={country} value={country}>
//                   {country}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.country && (
//               <FormHelperText>{errors.country}</FormHelperText>
//             )}
//           </FormControl>

//           {/* Counties Dropdown */}
//           <FormControl
//             fullWidth
//             sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
//             error={!!errors.county}
//             // disabled={getAllCounties}
//             disabled={!isKenyaSelected || getAllCounties}
//           >
//             <InputLabel>County</InputLabel>
//             <Select
//               value={formData?.cityOrTown || ""}
//               label="County"
//               onChange={(e) => {
//                 setFormData({ ...formData, cityOrTown: e.target.value });
//                 if (errors.cityOrTown && e.target.value) {
//                   setErrors({ ...errors, cityOrTown: "" });
//                 }
//               }}
//               renderValue={(selected) => selected || "Select County"}
//             >
//               {getAllCounties ? (
//                 <MenuItem disabled>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <CircularProgress size={20} />
//                     Loading counties...
//                   </Box>
//                 </MenuItem>
//               ) : (
//                 getAllCountiesResp?.map((county) => (
//                   <MenuItem key={county.countyId} value={county.name}>
//                     {county.name}
//                   </MenuItem>
//                 ))
//               )}
//             </Select>
//             {isKenyaSelected && errors.cityOrTown && (
//               <FormHelperText sx={{ color: "error.main" }}>{errors.cityOrTown}</FormHelperText>
//             )}
//           </FormControl>

//           {/* Locality/Area */}
//           <TextField
//             disabled={isKenyaSelected || !formData?.country}
//             fullWidth
//             label="Locality/Area"
//             placeholder="Enter specific city or town"
//             value={formData?.localityOrArea}
//             onChange={(e) => {
//               setFormData({ ...formData, localityOrArea: e.target.value });
//               if (errors.localityOrArea && e.target.value.trim()) {
//                 setErrors({ ...errors, localityOrArea: "" });
//               }
//             }}
//             error={!isKenyaSelected && !!errors.localityOrArea}
//             helperText={!isKenyaSelected && errors.localityOrArea}
//             sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
//           />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Location;


// @ts-nocheck
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountiesAction } from "../../../common/state/CommonActions";

const Location = ({ currentStep, formData, setFormData, errors, setErrors }) => {
  const dispatch = useDispatch();

  const { getAllCounties, getAllCountiesResp } = useSelector(
    (state) => state.CommonReducer
  );

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

  const isKenyaSelected = formData?.country === "Kenya";

  // Fetch counties on mount
  useEffect(() => {
    dispatch(getAllCountiesAction());
  }, [dispatch]);

  return (
    <Box>
      {currentStep === 2 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* COUNTRY DROPDOWN */}
          <FormControl
            fullWidth
            sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
            error={!!errors.country}
          >
            <InputLabel>Select your country</InputLabel>
            <Select
              value={formData?.country}
              label="Select your country"
              onChange={(e) => {
                const selectedCountry = e.target.value;

                setFormData({
                  ...formData,
                  country: selectedCountry,
                  cityOrTown: "", // reset when switching countries
                  localityOrArea: "",
                });

                if (errors.country && selectedCountry) {
                  setErrors({ ...errors, country: "" });
                }
              }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                {/* Select your country */}
              </MenuItem>
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

          {/* COUNTY DROPDOWN - SHOW ONLY IF KENYA */}
          {isKenyaSelected && (
            <FormControl
              fullWidth
              sx={{ bgcolor: "#E5F4E4", borderRadius: 2 }}
              error={!!errors.cityOrTown}
            >
              <Autocomplete
                value={formData?.cityOrTown || null}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, cityOrTown: newValue || "" });
                  if (errors.cityOrTown && newValue) {
                    setErrors({ ...errors, cityOrTown: "" });
                  }
                }}
                options={getAllCountiesResp?.map((county) => county.name) || []}
                getOptionLabel={(option) => option}
                filterOptions={(options, { inputValue }) => {
                  if (!inputValue) return options;

                  const searchTerm = inputValue.toLowerCase();
                  return options.filter((option) =>
                    option.toLowerCase().includes(searchTerm)
                  );
                }}
                disabled={getAllCounties}
                loading={getAllCounties}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select your county"
                    placeholder="Search county... (e.g., Nakuru)"
                    error={!!errors.cityOrTown}
                    helperText={errors.cityOrTown}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {getAllCounties ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#E5F4E4",
                      },
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                noOptionsText="No counties found"
                isOptionEqualToValue={(option, value) => option === value}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#E5F4E4",
                    borderRadius: 2,
                  },
                }}
              />
            </FormControl>
          )}

          {/* TOWN/CITY OUTSIDE KENYA - SHOW ONLY IF NOT KENYA */}
          {!isKenyaSelected && formData?.country && (
            <TextField
              fullWidth
              label="Type your Town/City"
              placeholder="e.g, Kigali, Dodoma, Kampala"
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
          )}
        </Box>
      )}
    </Box>
  );
};

export default Location;
