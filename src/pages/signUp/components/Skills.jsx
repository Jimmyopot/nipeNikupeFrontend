import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Fade,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Check as CheckIcon,
  Search as SearchIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getSkillsGroupedByCategoryAction } from "../../../common/state/CommonActions";



const Skills = ({
  currentStep,
  formData = { skills: [] },
  setFormData = () => {},
  errors = {},
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { getSkillsGroupedByCategoryResp, loading } = useSelector(
    (state) => state.CommonReducer
  );

  console.log("Skills Data44444444444:", getSkillsGroupedByCategoryResp);

  // Category icons mapping
  const CATEGORY_ICONS = {
    "AfricanMarket": "🌍",
    "ArtsCrafts": "🎨",
    "BusinessEntrepreneurship": "💼",
    "Certifications": "📜",
    "CreativeArtistic": "🎭",
    "DigitalOnline": "💻",
    "EducationTeaching": "📚",
    "EmergingTechnology": "🚀",
    "Engineering": "⚙️",
    "EnvironmentalSustainability": "🌱",
    "HealthWellness": "🏥",
    "HomePractical": "🏠",
    "LanguageCommunication": "💬",
    "LegalRegulatory": "⚖️",
    "LifestyleLeisure": "🎯",
    "ManagementLeadership": "👔",
    "MarketingBranding": "📈",
    "MiscellaneousUnique": "🔧",
    "MusicPerforming Arts": "🎵",
    "PersonalDevelopment": "🌟",
    "ProfessionalBusiness": "💼",
    "SalesCustomer Service": "🛒",
    "ScienceResearch": "🔬",
    "SportsOutdoor": "⚽",
    "TechnicalIT": "💻",
    "WritingContent": "✍️"
  };

  // Transform API data to match component structure
  const SKILLS_DATABASE = getSkillsGroupedByCategoryResp || {};

  // Flatten all skills for autocomplete
  const ALL_SKILLS = Object.entries(SKILLS_DATABASE).flatMap(
    ([category, skills]) =>
      (skills || []).map((skillObj) => ({ 
        skill: skillObj.name, 
        category: category, 
        icon: CATEGORY_ICONS[category] || "🔹",
        id: skillObj.id
      }))
  );

  // Skills step state
  const [skillSearch, setSkillSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(SKILLS_DATABASE)[0] || "AfricanMarket"
  );
  const [filteredSkills, setFilteredSkills] = useState([]);
  const searchInputRef = useRef(null);

  // Helper functions
  const addSkill = (skill) => {
    if (formData.skills.length < 5 && !formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
    setSkillSearch("");
    setShowSuggestions(false);
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  // Filter skills based on search
  useEffect(() => {
    if (skillSearch.trim()) {
      const filtered = ALL_SKILLS.filter((item) =>
        item.skill.toLowerCase().includes(skillSearch.toLowerCase())
      ).slice(0, 8); // Limit suggestions
      setFilteredSkills(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSkills([]);
      setShowSuggestions(false);
    }
  }, [skillSearch]);

  // Handle category change for tabs
  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  useEffect(() => {
    dispatch(getSkillsGroupedByCategoryAction());
  }, [dispatch]);

  return (
    <Box>
      {currentStep === 3 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <Typography
              variant="h4"
              component="h2"
              sx={{ color: "#0A6802", fontWeight: "bold", mb: 1 }}
            >
              Skills I Can Offer
            </Typography>
            <Typography variant="body1" color="text.secondary">
              What talents and services can you provide? (Select up to 5)
            </Typography>
          </Box>

          {/* Selected Skills Display */}
          {formData.skills.length > 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: "#FCF5E6",
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#0A6802", fontWeight: "medium" }}
                >
                  Selected Skills ({formData.skills.length}/5)
                </Typography>
                {formData.skills.length === 5 && (
                  <Typography variant="caption" sx={{ color: "warning.main" }}>
                    Maximum reached
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {formData.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => removeSkill(skill)}
                    deleteIcon={<CloseIcon />}
                    sx={{
                      backgroundColor: "#0A6802",
                      color: "white",
                      "& .MuiChip-deleteIcon": {
                        color: "rgba(255, 255, 255, 0.7)",
                        "&:hover": {
                          color: "rgba(255, 255, 255, 0.9)",
                        },
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          )}

          {/* Autocomplete Search */}
          <Box ref={searchInputRef} sx={{ position: "relative" }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "medium" }}>
              Search Skills
            </Typography>
            <TextField
              id="skillSearch"
              fullWidth
              placeholder="Type to search (e.g., 'web dev', 'photo')..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              onFocus={() => skillSearch && setShowSuggestions(true)}
              disabled={formData.skills.length >= 5}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#E5F4E4",
                },
              }}
            />

            {/* Autocomplete Suggestions */}
            {showSuggestions && filteredSkills.length > 0 && (
              <Fade in={showSuggestions}>
                <Paper
                  elevation={3}
                  sx={{
                    position: "absolute",
                    zIndex: 10,
                    width: "100%",
                    mt: 0.5,
                    maxHeight: 256,
                    overflowY: "auto",
                    borderRadius: 2,
                  }}
                >
                  {filteredSkills.map((item, index) => (
                    <Button
                      key={index}
                      fullWidth
                      onClick={() => addSkill(item.skill)}
                      disabled={formData.skills.includes(item.skill)}
                      sx={{
                        px: 2,
                        py: 1.5,
                        textAlign: "left",
                        justifyContent: "space-between",
                        textTransform: "none",
                        color: "text.primary",
                        borderBottom:
                          index < filteredSkills.length - 1
                            ? "1px solid"
                            : "none",
                        borderColor: "divider",
                        borderRadius: 0,
                        "&:hover": {
                          backgroundColor: "grey.50",
                        },
                        "&:disabled": {
                          opacity: 0.5,
                        },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography variant="h6" component="span">
                          {item.icon}
                        </Typography>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {item.skill}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.category}
                          </Typography>
                        </Box>
                      </Box>
                      {formData.skills.includes(item.skill) && (
                        <CheckIcon sx={{ color: "#0A6802" }} />
                      )}
                    </Button>
                  ))}
                </Paper>
              </Fade>
            )}
          </Box>

          {/* Category Browser */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "medium" }}>
              Browse by Category
            </Typography>

            {/* Category Tabs - Desktop */}
            <Box sx={{ display: { xs: "none", md: "block" }, mt: 1 }}>
              <Tabs
                value={selectedCategory}
                onChange={handleCategoryChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#0A6802",
                  },
                }}
              >
                {Object.keys(SKILLS_DATABASE).map((category) => (
                  <Tab
                    key={category}
                    label={`${CATEGORY_ICONS[category] || "🔹"} ${category}`}
                    value={category}
                    sx={{
                      textTransform: "none",
                      minHeight: 40,
                      color:
                        selectedCategory === category
                          ? "#0A6802"
                          : "text.primary",
                      "&.Mui-selected": {
                        color: "#0A6802",
                        fontWeight: "medium",
                      },
                    }}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Category Dropdown - Mobile */}
            <Box sx={{ display: { xs: "block", md: "none" }, mt: 1 }}>
              <FormControl fullWidth>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{
                    backgroundColor: "#E5F4E4",
                  }}
                >
                  {Object.keys(SKILLS_DATABASE).map((category) => (
                    <MenuItem key={category} value={category}>
                      {CATEGORY_ICONS[category] || "🔹"} {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Skills Grid */}
            <Paper
              variant="outlined"
              sx={{
                mt: 2,
                p: 2,
                maxHeight: 384,
                overflowY: "auto",
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {SKILLS_DATABASE[selectedCategory] ? SKILLS_DATABASE[selectedCategory].map((skillObj) => {
                  const skillName = skillObj.name;
                  const isSelected = formData.skills.includes(skillName);
                  const isDisabled = formData.skills.length >= 5 && !isSelected;

                  return (
                    <Chip
                      key={skillObj.id}
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {skillName}
                          {isSelected && (
                            <CheckIcon sx={{ fontSize: 14, ml: 0.5 }} />
                          )}
                        </Box>
                      }
                      onClick={() =>
                        isSelected ? removeSkill(skillName) : addSkill(skillName)
                      }
                      disabled={isDisabled}
                      variant={isSelected ? "filled" : "outlined"}
                      color={isSelected ? "primary" : "default"}
                      sx={{
                        backgroundColor: isSelected ? "#0A6802" : "transparent",
                        color: isSelected ? "white" : "text.primary",
                        borderColor: isSelected ? "#0A6802" : "grey.300",
                        "&:hover": {
                          backgroundColor: isSelected ? "#0A6802" : "grey.50",
                          borderColor: isSelected ? "#0A6802" : "#0A6802",
                        },
                        "&:disabled": {
                          backgroundColor: "grey.100",
                          color: "grey.400",
                          cursor: "not-allowed",
                        },
                        cursor: "pointer",
                      }}
                    />
                  );
                }) : []}
              </Box>
            </Paper>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Skills;
