import React, { useState } from "react"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import LinearProgress from "@mui/material/LinearProgress"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import PersonIcon from "@mui/icons-material/Person"
import PlaceIcon from "@mui/icons-material/Place"
import WorkIcon from "@mui/icons-material/Work"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import AddIcon from "@mui/icons-material/Add"
import PersonalInfo from "./PersonalInfo"

const skillCategories = {
  Technology: ["Web Development", "Mobile Apps", "QA Testing", "DevOps", "Data Analysis", "UI/UX Design"],
  Creative: ["Photography", "Video Editing", "Graphic Design", "Content Writing", "Music Production", "Animation"],
  Education: ["Tutoring", "Language Teaching", "Exam Prep", "Workshop Facilitation", "Curriculum Design"],
  Lifestyle: ["Cooking", "Fitness Coaching", "Gardening", "Interior Design", "Personal Styling"],
  "Professional Services": ["Legal Advice", "Accounting", "Career Coaching", "Business Consulting", "Marketing"],
  Others: ["Custom Skill"],
}

const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Nigeria", "Ghana", "South Africa", "Other"]

const timeSlots = ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-10PM)", "Night (10PM-6AM)"]
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function NipeNikupeRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [availability, setAvailability] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    locality: "",
    skills: [],
    availability: {},
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleAvailabilityToggle = (day, timeSlot) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day]?.includes(timeSlot)
        ? prev[day].filter((slot) => slot !== timeSlot)
        : [...(prev[day] || []), timeSlot],
    }));
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F0FCF0" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        <Box sx={{ maxWidth: 700, mx: "auto" }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 1, color: "#0A6802" }}
            >
              Welcome to Nipe Nikupe
            </Typography>
            <Typography variant="h6" sx={{ color: "grey.600" }}>
              Join our community of skill exchangers and start bartering your
              talents today!
            </Typography>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#0A6802" }}
              >
                Step {currentStep} of {totalSteps}
              </Typography>
              <Typography variant="body2" sx={{ color: "grey.500" }}>
                {Math.round(progress)}% Complete
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 4, bgcolor: "#E5F4E4" }}
            />
          </Box>

          {/* Step Indicators */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            {[
              { step: 1, icon: PersonIcon, label: "Personal Info" },
              { step: 2, icon: PlaceIcon, label: "Location" },
              { step: 3, icon: WorkIcon, label: "Skills" },
              { step: 4, icon: CalendarTodayIcon, label: "Availability" },
            ].map(({ step, icon: IconComponent, label }) => (
              <Box
                key={step}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                    bgcolor: step <= currentStep ? "#0A6802" : "grey.200",
                    color: step <= currentStep ? "white" : "grey.500",
                  }}
                >
                  {step < currentStep ? (
                    <CheckCircleIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <IconComponent sx={{ fontSize: 20 }} />
                  )}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: "center",
                    fontWeight: step <= currentStep ? 500 : 400,
                    color: step <= currentStep ? "#0A6802" : "grey.500",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Form Card */}
          <Card sx={{ boxShadow: 6, borderRadius: 3 }}>
            <CardHeader sx={{ bgcolor: "#FCF5E6", textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#0A6802" }}
              >
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Your Location"}
                {currentStep === 3 && "Skills You Can Offer"}
                {currentStep === 4 && "Availability & Preferences"}
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.600", mt: 1 }}>
                {currentStep === 1 &&
                  "Let's start with some basic information about you"}
                {currentStep === 2 &&
                  "Help others find you by sharing your location"}
                {currentStep === 3 &&
                  "What talents and services can you provide to others?"}
                {currentStep === 4 &&
                  "When are you typically available for skill exchanges?"}
              </Typography>
            </CardHeader>
            <CardContent sx={{ p: 4 }}>
            
              {/* Step 1: Personal Information */}
              <PersonalInfo
                currentStep={currentStep}
                formData={formData}
                setFormData={setFormData}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                passwordStrength={passwordStrength}
                strengthLabels={strengthLabels}
              />

              {/* Step 2: Location */}
              <Location 
                currentStep={currentStep}
                formData={formData}
                setFormData={setFormData}
              />
            
              {/* Step 3: Skills */}
              <Skills 
                currentStep={currentStep}
                selectedSkills={selectedSkills}
                handleSkillToggle={handleSkillToggle}
                customSkill={customSkill}
                setCustomSkill={setCustomSkill}
                addCustomSkill={addCustomSkill}
              />
             
              {/* Step 4: Availability */}
              <Availability 
                currentStep={currentStep}
                availability={availability}
                handleAvailabilityToggle={handleAvailabilityToggle}
              />

              {/* Navigation Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 4,
                  pt: 3,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  sx={{ borderRadius: 2 }}
                >
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      borderRadius: 2,
                      bgcolor: "#0A6802",
                      "&:hover": { bgcolor: "#085a01" },
                    }}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      bgcolor: "#0A6802",
                      "&:hover": { bgcolor: "#085a01" },
                    }}
                  >
                    Complete Registration
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Motivational Message */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" sx={{ color: "grey.600" }}>
              {currentStep === 1 &&
                "Just getting started! This will only take a few minutes."}
              {currentStep === 2 &&
                "Great progress! Let's add your location details."}
              {currentStep === 3 &&
                "Almost there! Tell us about your amazing skills."}
              {currentStep === 4 &&
                "Final step! Set your availability and you're done! 🎉"}
            </Typography>
            <Typography
              variant="overline"
              sx={{
                color: "grey.600",
                display: "flex",
                justifyContent: "center",
                gap: 0.5,
                textTransform: "none",
              }}
            >
              Already have an account?
              <Typography
                variant="overline"
                sx={{
                  textTransform: "none",
                  textDecoration: "underline",
                  color: "secondary.main",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Login
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
