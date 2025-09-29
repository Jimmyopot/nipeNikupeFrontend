import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  IconButton 
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  Add as PlusIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setAvailableDate, setAvailableTime } from '../state/SignUpSlice';

const Availability = ({ 
    currentStep,
    availability,
    handleAvailabilityToggle
 }) => {
    const dispatch = useDispatch();
    // State for calendar navigation
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState({ hour: '', minute: '', period: 'AM' });
    const [availabilitySlots, setAvailabilitySlots] = useState([]);

    const { availableDate, availableTime } = useSelector((state) => state.SignUpReducer);

    const timeSlots = ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-10PM)", "Night (10PM-6AM)"];
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Helper functions
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();
    
    const isDateDisabled = (date) => {
        const today = new Date();
        const selectedDateObj = new Date(currentYear, currentMonth, date);
        return selectedDateObj < today.setHours(0, 0, 0, 0);
    };

    const formatDate = (date) => {
        return new Date(currentYear, currentMonth, date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const navigateMonth = (direction) => {
        if (direction === 'prev') {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        } else {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
            } else {
                setCurrentMonth(currentMonth + 1);
            }
        }
        setSelectedDate(null); // Reset selected date when changing months
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime({ hour: '', minute: '', period: 'AM' });
    };

    const handleTimeAdd = () => {
        if (selectedDate && selectedTime.hour && selectedTime.minute) {
            const timeString = `${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`;
            const dateTimeString = `${formatDate(selectedDate)} at ${timeString}`;
            
            if (!availabilitySlots.includes(dateTimeString)) {
                setAvailabilitySlots([...availabilitySlots, dateTimeString]);
            }
            
            // Reset time selection
            setSelectedTime({ hour: '', minute: '', period: 'AM' });
        }
    };

    const removeAvailabilitySlot = (slotToRemove) => {
        setAvailabilitySlots(availabilitySlots.filter(slot => slot !== slotToRemove));
    };

    return (
      <Box>
        {currentStep === 4 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography variant="body1" sx={{ color: "grey.600" }}>
                Select specific dates and times when you're available for skill
                exchanges
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 4,
                mb: 4,
              }}
            >
              {/* Calendar Section */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#0A6802",
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <CalendarIcon sx={{ mr: 1, fontSize: 20 }} />
                  Select Date
                </Typography>

                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 3,
                    backgroundColor: "#FCF5E6",
                  }}
                >
                  {/* Calendar Header */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <IconButton
                      onClick={() => navigateMonth("prev")}
                      size="small"
                      sx={{
                        p: 1,
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                    >
                      <ChevronLeftIcon sx={{ fontSize: 16 }} />
                    </IconButton>

                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: "#0A6802" }}
                    >
                      {new Date(currentYear, currentMonth).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </Typography>

                    <IconButton
                      onClick={() => navigateMonth("next")}
                      size="small"
                      sx={{
                        p: 1,
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                    >
                      <ChevronRightIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>

                  {/* Calendar Grid */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <Box
                          key={day}
                          sx={{
                            textAlign: "center",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            color: "grey.500",
                            p: 1,
                          }}
                        >
                          {day}
                        </Box>
                      )
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: 0.5,
                    }}
                  >
                    {/* Empty cells for days before month starts */}
                    {Array.from({
                      length: getFirstDayOfMonth(currentMonth, currentYear),
                    }).map((_, index) => (
                      <Box key={`empty-${index}`} sx={{ p: 1 }}></Box>
                    ))}

                    {/* Calendar days */}
                    {Array.from({
                      length: getDaysInMonth(currentMonth, currentYear),
                    }).map((_, index) => {
                      const date = index + 1;
                      const isDisabled = isDateDisabled(date);
                      const isSelected = selectedDate === date;

                      return (
                        <Button
                          key={date}
                          onClick={() => handleDateSelect(date)}
                          disabled={isDisabled}
                          sx={{
                            p: 1,
                            fontSize: "0.875rem",
                            borderRadius: 1,
                            minWidth: "auto",
                            minHeight: "auto",
                            aspectRatio: "1",
                            transition: "all 0.2s",
                            backgroundColor: isSelected
                              ? "#0A6802"
                              : "transparent",
                            color: isSelected
                              ? "white"
                              : isDisabled
                              ? "grey.300"
                              : "grey.700",
                            fontWeight: isSelected ? 600 : 400,
                            "&:hover": {
                              backgroundColor: isSelected
                                ? "#0A6802"
                                : isDisabled
                                ? "transparent"
                                : "rgba(255, 255, 255, 0.7)",
                              transform: isDisabled ? "none" : "scale(1.05)",
                              cursor: isDisabled ? "not-allowed" : "pointer",
                            },
                            "&:disabled": {
                              color: "grey.300",
                              cursor: "not-allowed",
                            },
                          }}
                          aria-label={`Select ${formatDate(date)}`}
                        >
                          {date}
                        </Button>
                      );
                    })}
                  </Box>
                </Box>
              </Box>

              {/* Time Picker Section */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ClockIcon sx={{ mr: 1, fontSize: 20 }} />
                  Select Time
                </Typography>

                {selectedDate ? (
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      p: 3,
                      backgroundColor: "#E5F4E4",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "grey.600", mb: 2 }}
                    >
                      Selected date:{" "}
                      <Typography component="span" sx={{ fontWeight: 500 }}>
                        {formatDate(selectedDate)}
                      </Typography>
                    </Typography>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      {/* Hour Selector */}
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 500, display: "block", mb: 1 }}
                        >
                          Hour
                        </Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            value={selectedTime.hour}
                            onChange={(e) =>
                              setSelectedTime({
                                ...selectedTime,
                                hour: e.target.value,
                              })
                            }
                            displayEmpty
                          >
                            <MenuItem value="">--</MenuItem>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(
                              (hour) => (
                                <MenuItem
                                  key={hour}
                                  value={hour.toString().padStart(2, "0")}
                                >
                                  {hour.toString().padStart(2, "0")}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Box>

                      {/* Minute Selector */}
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 500, display: "block", mb: 1 }}
                        >
                          Minute
                        </Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            value={selectedTime.minute}
                            onChange={(e) =>
                              setSelectedTime({
                                ...selectedTime,
                                minute: e.target.value,
                              })
                            }
                            displayEmpty
                          >
                            <MenuItem value="">--</MenuItem>
                            {[
                              "00",
                              "05",
                              "10",
                              "15",
                              "20",
                              "25",
                              "30",
                              "35",
                              "40",
                              "45",
                              "50",
                              "55",
                            ].map((minute) => (
                              <MenuItem key={minute} value={minute}>
                                {minute}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>

                      {/* AM/PM Selector */}
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 500, display: "block", mb: 1 }}
                        >
                          Period
                        </Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            value={selectedTime.period}
                            onChange={(e) =>
                              setSelectedTime({
                                ...selectedTime,
                                period: e.target.value,
                              })
                            }
                          >
                            <MenuItem value="AM">AM</MenuItem>
                            <MenuItem value="PM">PM</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleTimeAdd}
                      disabled={!selectedTime.hour || !selectedTime.minute}
                      startIcon={<PlusIcon />}
                      sx={{
                        backgroundColor: "#D79800",
                        color: "white",
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "#C68A00",
                        },
                      }}
                    >
                      Add Time Slot
                    </Button>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      p: 6,
                      textAlign: "center",
                      backgroundColor: "#F8F9FA",
                    }}
                  >
                    <CalendarIcon
                      sx={{ fontSize: 48, color: "grey.400", mb: 2 }}
                    />
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                      Please select a date first
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Selected Availability Slots */}
            {availabilitySlots.length > 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#0A6802" }}
                >
                  Your Availability ({availabilitySlots.length} slots)
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gap: 1,
                    maxHeight: 200,
                    overflowY: "auto",
                  }}
                >
                  {availabilitySlots.map((slot, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderRadius: 2,
                        border: "1px solid #ddd",
                        backgroundColor: "#FCF5E6",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {slot}
                      </Typography>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => removeAvailabilitySlot(slot)}
                        sx={{
                          color: "error.main",
                          minWidth: "auto",
                          p: 0.5,
                          "&:hover": {
                            backgroundColor: "error.light",
                            color: "error.dark",
                          },
                        }}
                      >
                        ×
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
}

export default Availability