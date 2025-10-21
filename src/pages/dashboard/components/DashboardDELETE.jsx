import { useState, useEffect, useRef } from "react";
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
  Grid,
  Container,
  Divider,
  Stack,
  Paper,
  Fade,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  LocationOn,
  Star,
  Handshake,
  People,
  Chat,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./Profile";
import stringAvatar from "../../../common/StringAvatar";
import Navbar from "./Navbar";
import { getSkillsGroupedByCategoryAction, getAllCountiesAction } from "../../../common/state/CommonActions";
import { CATEGORY_ICONS } from "../../../common/CategoryIcons";

// Mock user data (in a real app, this would come from authentication/database)
const currentUser = {
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  phoneNumber: "+254 712 345 678",
  county: "Nairobi",
  locality: "Westlands",
  skillsOffered: ["Web Development", "Graphic Design", "Photography"],
  skillsNeeded: ["Plumbing", "Fitness Training"],
  profilePicture: "/professional-woman-smiling.png",
};

// Mock user matches data
const mockUsers = [
  {
    id: 1,
    name: "John Kamau",
    location: "Nairobi, Kilimani",
    county: "Nairobi",
    profilePicture: "/professional-man-smiling.png",
    skillsOffered: ["Plumbing", "Electrical Work"],
    skillsNeeded: ["Web Development", "Digital Marketing"],
    rating: 4.8,
    completedTrades: 12,
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    location: "Nairobi, Karen",
    county: "Nairobi",
    profilePicture: "/professional-woman-teacher.png",
    skillsOffered: ["Fitness Training", "Nutrition Counseling"],
    skillsNeeded: ["Photography", "Video Editing"],
    rating: 4.9,
    completedTrades: 18,
  },
  {
    id: 3,
    name: "David Omondi",
    location: "Nairobi, CBD",
    county: "Nairobi",
    profilePicture: "/professional-man-glasses.png",
    skillsOffered: ["Carpentry", "Painting"],
    skillsNeeded: ["Graphic Design", "Content Creation"],
    rating: 4.7,
    completedTrades: 9,
  },
  {
    id: 4,
    name: "Sarah Akinyi",
    location: "Nairobi, Parklands",
    county: "Nairobi",
    profilePicture: "/professional-woman-laptop.png",
    skillsOffered: ["Tutoring", "Language Teaching"],
    skillsNeeded: ["Web Development", "Mobile Apps"],
    rating: 5.0,
    completedTrades: 15,
  },
  {
    id: 5,
    name: "Peter Mwangi",
    location: "Kiambu, Ruaka",
    county: "Kiambu",
    profilePicture: "/professional-man-suit.png",
    skillsOffered: ["Accounting", "Business Planning"],
    skillsNeeded: ["Photography", "Graphic Design"],
    rating: 4.6,
    completedTrades: 7,
  },
];



export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("All Counties");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const suggestionsPaperRef = useRef(null);

  const { user } = useSelector((state) => state.LoginReducer);

  const { getSkillsGroupedByCategoryResp, getAllCounties, getAllCountiesResp } = useSelector(
    (state) => state.CommonReducer
  );

  console.log("Authenticated User:", user);

  // Transform API data to match component structure
  const SKILLS_DATABASE = getSkillsGroupedByCategoryResp || {};

  // Flatten all skills for autocomplete
  const ALL_SKILLS = Object.entries(SKILLS_DATABASE).flatMap(
    ([category, skills]) =>
      (skills || []).map((skillObj) => ({
        skill: skillObj.name,
        category: category,
        icon: CATEGORY_ICONS[category] || "🔹",
        id: skillObj.id,
      }))
  );

  // Filter users based on search query and location
  const handleSearch = () => {
    let results = mockUsers;

    // Filter by county
    if (selectedCounty !== "All Counties") {
      results = results.filter((user) => user.county === selectedCounty);
    }

    // Filter by search query (skills offered)
    if (searchQuery.trim()) {
      results = results.filter((user) =>
        user.skillsOffered.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredUsers(results);
  };

  // Filter skills based on search for autocomplete
  useEffect(() => {
    if (searchQuery.trim() && isSearchFocused) {
      const filtered = ALL_SKILLS.filter((item) =>
        item.skill.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8); // Limit suggestions
      setFilteredSkills(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSkills([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, isSearchFocused]);

  // Load skills and counties data on component mount
  useEffect(() => {
    dispatch(getSkillsGroupedByCategoryAction());
    dispatch(getAllCountiesAction());
  }, [dispatch]);

  // Handle clicks outside of search area to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        suggestionsPaperRef.current &&
        !suggestionsPaperRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle skill selection from autocomplete
  const handleSkillSelect = (skillName) => {
    // Immediately hide suggestions and set search query
    setShowSuggestions(false);
    setIsSearchFocused(false);
    setSearchQuery(skillName);

    // Use setTimeout to ensure state updates are processed
    setTimeout(() => {
      // Perform search with the selected skill
    let results = mockUsers;

    // Filter by county
    if (selectedCounty !== "All Counties") {
      results = results.filter((user) => user.county === selectedCounty);
    }

    // Filter by the selected skill
    results = results.filter((user) =>
      user.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(skillName.toLowerCase())
      )
    );

    setFilteredUsers(results);

      // Blur the input after selection
      if (searchInputRef.current) {
        const input = searchInputRef.current.querySelector("input");
        if (input) {
          input.blur();
        }
      }
    }, 10); // Small delay to ensure state updates
  };

  // Handle clearing the search query
  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    setFilteredUsers(mockUsers); // Reset to show all users
    setSelectedCounty("All Counties"); // Reset county filter
    if (searchInputRef.current) {
      const input = searchInputRef.current.querySelector("input");
      if (input) {
        input.focus(); // Keep focus on input after clearing
      }
    }
  };

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <Box sx={{ py: 4, bgcolor: "primary.main2" }}>
        <Container>
          <Box sx={{ mb: 6, maxWidth: "100%", mx: "auto" }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Welcome, {user?.fullName.split(" ")[0]}! 👋
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Start your skill exchange journey here
              </Typography>
            </Box>

            <Card
              elevation={isSearchFocused ? 8 : 4}
              sx={{
                transition: "all 0.3s ease",
                transform: isSearchFocused ? "scale(1.02)" : "scale(1)",
                boxShadow: isSearchFocused
                  ? "0 20px 40px rgba(25, 118, 210, 0.2)"
                  : undefined,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      bgcolor: "primary.main2",
                      mb: 2,
                      opacity: 0.8,
                    }}
                  >
                    <Search sx={{ fontSize: "2rem", color: "primary.main" }} />
                  </Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Find Your Perfect Skill Match
                  </Typography>
                  <Typography color="text.secondary">
                    Search for the skills you need and connect with talented
                    individuals in your community
                  </Typography>
                </Box>

                <Stack spacing={3}>
                  <Box ref={searchInputRef} sx={{ position: "relative" }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search a skill to barter... (e.g., plumbing, web design, photography)"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchFocused(true);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      onFocus={() => {
                        setIsSearchFocused(true);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: searchQuery && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClearSearch}
                              edge="end"
                              size="small"
                              sx={{
                                color: "action.active",
                                "&:hover": {
                                  backgroundColor: "action.hover",
                                },
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: 64,
                          fontSize: "1.125rem",
                          "& fieldset": {
                            borderColor: "primary.main",
                            borderWidth: 1,
                          },
                          "&:hover fieldset": {
                            borderColor: "darkred",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                            borderWidth: 2,
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "16px 14px",
                          height: "100%",
                          boxSizing: "border-box",
                        },
                      }}
                    />

                    {/* Autocomplete Suggestions */}
                    {showSuggestions && filteredSkills.length > 0 && (
                      <Fade in={showSuggestions}>
                        <Paper
                          ref={suggestionsPaperRef}
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
                            <Box
                              key={index}
                              onClick={() => {
                                handleSkillSelect(item.skill);
                              }}
                              sx={{
                                px: 2,
                                py: 1.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                borderBottom:
                                  index < filteredSkills.length - 1
                                    ? "1px solid"
                                    : "none",
                                borderColor: "divider",
                                "&:hover": {
                                  backgroundColor: "grey.100",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Typography variant="h6" component="span">
                                  {item.icon}
                                </Typography>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    fontWeight="medium"
                                  >
                                    {item.skill}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {item.category}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Paper>
                      </Fade>
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <FormControl sx={{ flex: 1, minWidth: 200 }}>
                      <InputLabel>County</InputLabel>
                      <Select
                        value={selectedCounty}
                        onChange={(e) => setSelectedCounty(e.target.value)}
                        label="County"
                        startAdornment={
                          <InputAdornment position="start">
                            <LocationOn color="primary" />
                          </InputAdornment>
                        }
                        sx={{ height: 56 }}
                        disabled={getAllCounties}
                      >
                        <MenuItem value="All Counties">
                          All Counties
                        </MenuItem>
                        
                        {getAllCounties ? (
                          <MenuItem disabled>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <CircularProgress size={20} />
                              Loading counties...
                            </Box>
                          </MenuItem>
                        ) : (
                          getAllCountiesResp?.map((county) => (
                            <MenuItem key={county.countyId} value={county.name}>
                              {county.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                    <Button
                      onClick={handleSearch}
                      variant="contained"
                      size="large"
                      startIcon={<Search />}
                      sx={{
                        height: 56,
                        px: 4,
                        fontSize: "1rem",
                        fontWeight: 600,
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Search Skills
                    </Button>
                  </Box>

                  <Box sx={{ pt: 2 }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, textAlign: "center" }}
                    >
                      Popular searches:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        justifyContent: "center",
                      }}
                    >
                      {[
                        "Plumbing",
                        "Web Development",
                        "Graphic Design",
                        "Fitness Training",
                        "Photography",
                      ].map((skill) => (
                        <Button
                          key={skill}
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setSearchQuery(skill);
                            setShowSuggestions(false);
                            // Perform search immediately
                            let results = mockUsers;
                            if (selectedCounty !== "All Counties") {
                              results = results.filter(
                                (user) => user.county === selectedCounty
                              );
                            }
                            results = results.filter((user) =>
                              user.skillsOffered.some((s) =>
                                s.toLowerCase().includes(skill.toLowerCase())
                              )
                            );
                            setFilteredUsers(results);
                          }}
                          sx={{
                            transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "white",
                            },
                          }}
                        >
                          {skill}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              gap: 2,
              mt: 2,
            }}
          >
            <Box sx={{ width: { xs: "100%", md: "35%" } }}>
              <Profile />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "65%" } }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {searchQuery || selectedCounty !== "All Counties"
                      ? "Search Results"
                      : "Suggested Matches"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {filteredUsers.length} users found
                  </Typography>
                </Box>

                {filteredUsers.length === 0 ? (
                  <Card elevation={3}>
                    <CardContent sx={{ py: 6, textAlign: "center" }}>
                      <People
                        sx={{
                          fontSize: "3rem",
                          color: "text.secondary",
                          mb: 2,
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        No matches found
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                      >
                        Try adjusting your search criteria or location filter
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCounty("All Counties");
                          setFilteredUsers(mockUsers);
                        }}
                      >
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Stack spacing={2}>
                    {filteredUsers.map((user) => (
                      <Card
                        key={user.id}
                        elevation={2}
                        sx={{
                          transition: "box-shadow 0.3s ease",
                          "&:hover": {
                            boxShadow: (theme) => theme.shadows[8],
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", md: "row" },
                              gap: 3,
                            }}
                          >
                            {/* User Avatar & Info */}
                            <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
                              <Avatar
                                src={user.profilePicture || "/placeholder.svg"}
                                {...stringAvatar(user?.name)}
                                alt={user?.name}
                                sx={{
                                  width: 64,
                                  height: 64,
                                  border: "2px solid",
                                  borderColor: "primary.light",
                                }}
                              />
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 600, mb: 0.5 }}
                                >
                                  {user?.name}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    mb: 1,
                                  }}
                                >
                                  <LocationOn
                                    sx={{
                                      fontSize: "0.875rem",
                                      color: "text.secondary",
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {user.location}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    <Star
                                      sx={{
                                        fontSize: "1rem",
                                        color: "primary.main",
                                      }}
                                    />
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 500 }}
                                    >
                                      {user.rating}
                                    </Typography>
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {user.completedTrades} trades completed
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            {/* Skills */}
                            <Box sx={{ flex: 1 }}>
                              <Stack spacing={2}>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ mb: 1, display: "block" }}
                                  >
                                    Offers
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {user.skillsOffered.map((skill) => (
                                      <Chip
                                        key={skill}
                                        label={skill}
                                        size="small"
                                        sx={{
                                          bgcolor: "primary.main2",
                                          color: "primary.dark",
                                          fontSize: "0.75rem",
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ mb: 1, display: "block" }}
                                  >
                                    Needs
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {user.skillsNeeded.map((skill) => (
                                      <Chip
                                        key={skill}
                                        label={skill}
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                          borderColor: "primary.main",
                                          color: "primary.main",
                                          fontSize: "0.75rem",
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              </Stack>
                            </Box>

                            {/* Actions */}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: { xs: "row", md: "column" },
                                gap: 1,
                                justifyContent: { md: "center" },
                              }}
                            >
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<Handshake />}
                                sx={{ flex: { xs: 1, md: "none" } }}
                              >
                                Request Trade
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Chat />}
                                sx={{ flex: { xs: 1, md: "none" } }}
                              >
                                Message
                              </Button>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}