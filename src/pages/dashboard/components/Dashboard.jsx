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

const KENYAN_COUNTIES = [
  "All Counties",
  "Nairobi",
  "Kiambu",
  "Mombasa",
  "Nakuru",
  "Kisumu",
  "Machakos",
  "Kajiado",
  "Meru",
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("All Counties");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

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
        //   background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      {/* Header */}
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
                src={currentUser.profilePicture || "/placeholder.svg"}
                alt={currentUser.fullName}
                sx={{
                  width: 36,
                  height: 36,
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "primary.light",
                }}
                onClick={() => navigate("/dashboard")}
              >
                {getInitials(currentUser.fullName)}
              </Avatar>
            </Box>
          </Box>
        </Container>
      </Paper>

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
                Welcome back, {currentUser.fullName.split(" ")[0]}! 👋
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Start your skill exchange journey here
              </Typography>
            </Box>

            <Card
              elevation={isSearchFocused ? 8 : 4}
              sx={{
                // border: 2,
                // borderColor: isSearchFocused ? 'primary.main' : 'primary.light',
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
                  {/* <TextField
                    fullWidth
                    placeholder="Search a skill to barter... (e.g., plumbing, web design, photography)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search color="action" />
                        </InputAdornment>
                      ),
                      sx: {
                        height: 64,
                        fontSize: "1.125rem",
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderWidth: 2,
                          },
                          "& fieldset": {
                            border: 1,
                            borderColor: "red", // 🔴 Default border color
                          },
                        },
                      },
                    }}
                  /> */}
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search a skill to barter... (e.g., plumbing, web design, photography)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      // style the outlined root (controls the fieldset border)
                      "& .MuiOutlinedInput-root": {
                        height: 64, // control overall height
                        fontSize: "1.125rem",

                        // default border
                        "& fieldset": {
                          borderColor: "primary.main",
                          borderWidth: 1,
                        },

                        // on hover
                        "&:hover fieldset": {
                          borderColor: "darkred",
                        },

                        // on focus
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.main",
                          borderWidth: 2,
                        },
                      },

                      // ensure input text is vertically centered
                      "& .MuiInputBase-input": {
                        padding: "16px 14px",
                        height: "100%",
                        boxSizing: "border-box",
                      },
                    }}
                  />

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
                      >
                        {KENYAN_COUNTIES.map((county) => (
                          <MenuItem key={county} value={county}>
                            {county}
                          </MenuItem>
                        ))}
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
                            handleSearch();
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

          <Grid container spacing={3}>
            {/* Left Column - User Profile */}
            <Grid item xs={12} lg={4}>
              <Stack spacing={3}>
                {/* Profile Card */}
                <Card elevation={3}>
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6">My Profile</Typography>
                    <Button
                      variant="text"
                      size="small"
                      startIcon={<Edit sx={{ fontSize: "1rem" }} />}
                      sx={{ minWidth: "auto", px: 1 }}
                    >
                      Edit
                    </Button>
                  </Box>
                  <CardContent sx={{ pt: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Avatar
                        src={currentUser.profilePicture || "/placeholder.svg"}
                        alt={currentUser.fullName}
                        sx={{
                          width: 96,
                          height: 96,
                          mb: 2,
                          border: "4px solid",
                          borderColor: "primary.light",
                          fontSize: "1.5rem",
                        }}
                      >
                        {getInitials(currentUser.fullName)}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {currentUser.fullName}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mt: 0.5,
                        }}
                      >
                        <LocationOn
                          sx={{ fontSize: "0.875rem", color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {currentUser.locality}, {currentUser.county}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <Divider sx={{ mb: 2 }} />
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                          }}
                        >
                          <Email
                            sx={{
                              fontSize: "1rem",
                              color: "text.secondary",
                              mt: 0.5,
                            }}
                          />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Email
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ wordBreak: "break-all" }}
                            >
                              {currentUser.email}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                          }}
                        >
                          <Phone
                            sx={{
                              fontSize: "1rem",
                              color: "text.secondary",
                              mt: 0.5,
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Phone
                            </Typography>
                            <Typography variant="body2">
                              {currentUser.phoneNumber}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <Divider sx={{ mb: 2 }} />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Star
                          sx={{ fontSize: "1rem", color: "primary.main" }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Skills I Offer
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {currentUser.skillsOffered.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: "primary.main2",
                              color: "primary.dark",
                              "& .MuiChip-label": { fontWeight: 500 },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ pt: 2 }}>
                      <Divider sx={{ mb: 2 }} />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Handshake
                          sx={{ fontSize: "1rem", color: "primary.main" }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Skills I Need
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {currentUser.skillsNeeded.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            variant="outlined"
                            size="small"
                            sx={{
                              borderColor: "primary.main",
                              color: "primary.main",
                              "& .MuiChip-label": { fontWeight: 500 },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card elevation={3}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Quick Stats</Typography>
                  </Box>
                  <CardContent sx={{ pt: 0 }}>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <TrendingUp
                            sx={{ fontSize: "1rem", color: "primary.main" }}
                          />
                          <Typography variant="body2">Active Trades</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          3
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <People
                            sx={{ fontSize: "1rem", color: "primary.main" }}
                          />
                          <Typography variant="body2">Completed</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          8
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Star
                            sx={{ fontSize: "1rem", color: "primary.main" }}
                          />
                          <Typography variant="body2">Rating</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          4.9
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            {/* Right Column - Search Results */}
            <Grid item xs={12} lg={8}>
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
                                alt={user.name}
                                sx={{
                                  width: 64,
                                  height: 64,
                                  border: "2px solid",
                                  borderColor: "primary.light",
                                }}
                              >
                                {getInitials(user.name)}
                              </Avatar>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 600, mb: 0.5 }}
                                >
                                  {user.name}
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
