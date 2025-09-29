// @ts-nocheck
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

const Availability = ({ 
    currentStep,
    availability,
    handleAvailabilityToggle
 }) => {
    const timeSlots = ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-10PM)", "Night (10PM-6AM)"]
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
        <Box>
            {currentStep === 4 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography
                    variant="body1"
                    sx={{ textAlign: "center", color: "grey.600", mb: 2 }}
                    >
                    Select your preferred time slots for each day of the week
                    </Typography>

                    <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                    {weekDays.map((day) => (
                        <Box key={day} sx={{ mb: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: "#0A6802", mb: 1 }}
                        >
                            {day}
                        </Typography>
                        <Box
                            sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                            gap: 1,
                            }}
                        >
                            {timeSlots.map((timeSlot) => (
                            <FormControlLabel
                                key={`${day}-${timeSlot}`}
                                control={
                                <Checkbox
                                    checked={
                                    availability[day]?.includes(timeSlot) ||
                                    false
                                    }
                                    onChange={() =>
                                    handleAvailabilityToggle(day, timeSlot)
                                    }
                                    sx={{
                                    color: availability[day]?.includes(timeSlot)
                                        ? "#0A6802"
                                        : "grey.400",
                                    "&.Mui-checked": { color: "#0A6802" },
                                    }}
                                />
                                }
                                label={timeSlot}
                                sx={{ fontSize: 14 }}
                            />
                            ))}
                        </Box>
                        </Box>
                    ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default Availability