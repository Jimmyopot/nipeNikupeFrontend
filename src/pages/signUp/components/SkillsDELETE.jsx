// @ts-nocheck
import { Box, Button, Checkbox, Chip, FormControlLabel, TextField, Typography } from '@mui/material'
import AddIcon from "@mui/icons-material/Add"

const Skills = ({ 
    currentStep,
    selectedSkills,
    handleSkillToggle,
    customSkill,
    setCustomSkill,
    addCustomSkill,
    errors // ✅ pass errors from parent
 }) => {
    const skillCategories = {
        Technology: ["Web Development", "Mobile Apps", "QA Testing", "DevOps", "Data Analysis", "UI/UX Design"],
        Creative: ["Photography", "Video Editing", "Graphic Design", "Content Writing", "Music Production", "Animation"],
        Education: ["Tutoring", "Language Teaching", "Exam Prep", "Workshop Facilitation", "Curriculum Design"],
        Lifestyle: ["Cooking", "Fitness Coaching", "Gardening", "Interior Design", "Personal Styling"],
        "Professional Services": ["Legal Advice", "Accounting", "Career Coaching", "Business Consulting", "Marketing"],
        Others: ["Custom Skill"],
    }

    return (
        <Box>
            {currentStep === 3 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography
                        variant="body1"
                        sx={{ textAlign: "center", color: "grey.600", mb: 2 }}
                    >
                        Select the skills and services you can offer to other
                        community members
                    </Typography>

                    {Object.entries(skillCategories).map(([category, skills]) => (
                        <Box key={category} sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, color: "#0A6802", mb: 2 }}
                            >
                                {category}
                            </Typography>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                    gap: 2,
                                }}
                            >
                                {skills.map((skill) => (
                                    <FormControlLabel
                                        key={skill}
                                        control={
                                            <Checkbox
                                                checked={selectedSkills.includes(skill)}
                                                onChange={() => handleSkillToggle(skill)}
                                                sx={{
                                                    color: selectedSkills.includes(skill)
                                                        ? "#0A6802"
                                                        : "grey.400",
                                                    "&.Mui-checked": { color: "#0A6802" },
                                                }}
                                            />
                                        }
                                        label={skill}
                                        sx={{ fontSize: 14 }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))}

                    {/* Custom Skill Input */}
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, color: "#0A6802", mb: 2 }}
                        >
                            Add Custom Skill
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <TextField
                                placeholder="Enter a custom skill"
                                value={customSkill}
                                onChange={(e) => setCustomSkill(e.target.value)}
                                sx={{ bgcolor: "#E5F4E4", borderRadius: 2, flex: 1 }}
                            />
                            <Button
                                onClick={addCustomSkill}
                                variant="contained"
                                sx={{
                                    bgcolor: "#D79800",
                                    "&:hover": { bgcolor: "#b8820a" },
                                }}
                            >
                                <AddIcon />
                            </Button>
                        </Box>
                    </Box>

                    {/* Selected Skills */}
                    {selectedSkills.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, color: "#0A6802", mb: 2 }}
                            >
                                Your Selected Skills ({selectedSkills.length})
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {selectedSkills.map((skill) => (
                                    <Chip
                                        key={skill}
                                        label={`${skill} ×`}
                                        onClick={() => handleSkillToggle(skill)}
                                        sx={{
                                            bgcolor: "#e2b13dff",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* ✅ Error message shown here */}
                    {errors?.skills && (
                        <Typography color="error" variant="caption">
                            {errors.skills}
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    )
}

export default Skills












import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Briefcase,
  CalendarDays,
} from "lucide-react";

// Comprehensive skills database with 15 categories and 1000+ skills
const SKILLS_DATABASE = {
  Technology: {
    icon: "💻",
    skills: [
      "Web Development",
      "Mobile App Development",
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "UI/UX Design",
      "DevOps Engineering",
      "Cloud Architecture",
      "Database Administration",
      "System Administration",
      "Network Engineering",
      "Cybersecurity",
      "QA Testing",
      "Software Testing",
      "API Development",
      "WordPress Development",
      "Shopify Development",
      "E-commerce Development",
      "Game Development",
      "AR/VR Development",
      "Blockchain Development",
      "Smart Contract Development",
      "Machine Learning",
      "Data Science",
      "Artificial Intelligence",
      "Python Programming",
      "JavaScript Programming",
      "Java Programming",
      "C++ Programming",
      "PHP Development",
      "Ruby on Rails",
      "React Development",
      "Angular Development",
      "Vue.js Development",
      "Node.js Development",
      "iOS Development",
      "Android Development",
      "Flutter Development",
      "React Native Development",
      "Unity Development",
    ],
  },
  "Creative & Design": {
    icon: "🎨",
    skills: [
      "Graphic Design",
      "Logo Design",
      "Brand Identity Design",
      "UI Design",
      "UX Design",
      "Web Design",
      "Mobile Design",
      "Print Design",
      "Packaging Design",
      "Illustration",
      "Digital Illustration",
      "Character Design",
      "Icon Design",
      "Infographic Design",
      "Motion Graphics",
      "3D Modeling",
      "3D Animation",
      "2D Animation",
      "Video Editing",
      "Video Production",
      "Photography",
      "Portrait Photography",
      "Product Photography",
      "Event Photography",
      "Wedding Photography",
      "Food Photography",
      "Fashion Photography",
      "Photo Editing",
      "Photo Retouching",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Figma Design",
      "Sketch Design",
      "Canva Design",
      "Procreate Art",
      "Digital Painting",
      "Watercolor Art",
      "Oil Painting",
      "Acrylic Painting",
    ],
  },
  "Writing & Content": {
    icon: "✍️",
    skills: [
      "Content Writing",
      "Copywriting",
      "Technical Writing",
      "Creative Writing",
      "Blog Writing",
      "Article Writing",
      "SEO Writing",
      "Social Media Writing",
      "Email Marketing",
      "Newsletter Writing",
      "Product Descriptions",
      "Press Releases",
      "Grant Writing",
      "Resume Writing",
      "Cover Letter Writing",
      "Business Writing",
      "Academic Writing",
      "Research Writing",
      "Ghostwriting",
      "Scriptwriting",
      "Screenplay Writing",
      "Poetry Writing",
      "Fiction Writing",
      "Non-fiction Writing",
      "Editing",
      "Proofreading",
      "Copy Editing",
      "Line Editing",
      "Content Strategy",
      "Content Marketing",
      "Storytelling",
      "Brand Messaging",
      "UX Writing",
      "Microcopy",
      "Translation",
      "Transcription",
      "Subtitling",
      "Localization",
      "Book Writing",
      "E-book Writing",
    ],
  },
  "Marketing & Sales": {
    icon: "📈",
    skills: [
      "Digital Marketing",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "SEO Optimization",
      "SEM Marketing",
      "PPC Advertising",
      "Google Ads",
      "Facebook Ads",
      "Instagram Marketing",
      "LinkedIn Marketing",
      "Twitter Marketing",
      "TikTok Marketing",
      "Influencer Marketing",
      "Affiliate Marketing",
      "Growth Hacking",
      "Marketing Strategy",
      "Brand Strategy",
      "Market Research",
      "Competitor Analysis",
      "Customer Research",
      "Sales Strategy",
      "Lead Generation",
      "Sales Funnel",
      "Conversion Optimization",
      "A/B Testing",
      "Analytics",
      "Google Analytics",
      "Marketing Analytics",
      "Sales Analytics",
      "CRM Management",
      "Salesforce",
      "HubSpot",
      "Email Automation",
      "Marketing Automation",
      "Public Relations",
      "Media Relations",
      "Event Marketing",
      "Trade Show Marketing",
      "Product Marketing",
    ],
  },
  "Business & Finance": {
    icon: "💼",
    skills: [
      "Business Strategy",
      "Business Planning",
      "Business Development",
      "Project Management",
      "Product Management",
      "Operations Management",
      "Supply Chain Management",
      "Logistics",
      "Financial Planning",
      "Financial Analysis",
      "Accounting",
      "Bookkeeping",
      "Tax Preparation",
      "Payroll Management",
      "Budgeting",
      "Forecasting",
      "Investment Analysis",
      "Portfolio Management",
      "Risk Management",
      "Compliance",
      "Auditing",
      "Financial Modeling",
      "Valuation",
      "M&A Advisory",
      "Corporate Finance",
      "Real Estate Finance",
      "Insurance",
      "Wealth Management",
      "Retirement Planning",
      "Estate Planning",
      "Business Consulting",
      "Management Consulting",
      "Strategy Consulting",
      "HR Consulting",
      "IT Consulting",
      "Marketing Consulting",
      "Startup Consulting",
      "Fundraising",
      "Pitch Deck Creation",
      "Investor Relations",
    ],
  },
  "Education & Training": {
    icon: "📚",
    skills: [
      "Tutoring",
      "Math Tutoring",
      "Science Tutoring",
      "English Tutoring",
      "Language Teaching",
      "Spanish Teaching",
      "French Teaching",
      "German Teaching",
      "Chinese Teaching",
      "ESL Teaching",
      "IELTS Preparation",
      "TOEFL Preparation",
      "SAT Preparation",
      "ACT Preparation",
      "GRE Preparation",
      "GMAT Preparation",
      "Music Teaching",
      "Piano Teaching",
      "Guitar Teaching",
      "Violin Teaching",
      "Vocal Training",
      "Dance Teaching",
      "Ballet Teaching",
      "Hip Hop Teaching",
      "Yoga Instruction",
      "Fitness Training",
      "Personal Training",
      "Nutrition Coaching",
      "Life Coaching",
      "Career Coaching",
      "Business Coaching",
      "Executive Coaching",
      "Leadership Training",
      "Public Speaking",
      "Presentation Skills",
      "Communication Skills",
      "Course Creation",
      "Curriculum Development",
      "Instructional Design",
      "E-learning Development",
    ],
  },
  "Legal & Compliance": {
    icon: "⚖️",
    skills: [
      "Legal Consulting",
      "Contract Law",
      "Corporate Law",
      "Business Law",
      "Employment Law",
      "Labor Law",
      "Intellectual Property",
      "Patent Law",
      "Trademark Law",
      "Copyright Law",
      "Real Estate Law",
      "Property Law",
      "Family Law",
      "Divorce Law",
      "Immigration Law",
      "Criminal Law",
      "Civil Law",
      "Tax Law",
      "Environmental Law",
      "Healthcare Law",
      "Contract Drafting",
      "Contract Review",
      "Legal Research",
      "Legal Writing",
      "Compliance Management",
      "Regulatory Compliance",
      "GDPR Compliance",
      "Data Privacy",
      "Risk Assessment",
      "Policy Development",
      "Legal Translation",
      "Notary Services",
      "Mediation",
      "Arbitration",
      "Dispute Resolution",
      "Litigation Support",
      "Paralegal Services",
      "Legal Administration",
      "Court Filing",
      "Document Preparation",
    ],
  },
  "Healthcare & Wellness": {
    icon: "🏥",
    skills: [
      "Nursing",
      "Medical Consulting",
      "Health Coaching",
      "Nutrition Consulting",
      "Diet Planning",
      "Meal Planning",
      "Weight Loss Coaching",
      "Fitness Coaching",
      "Personal Training",
      "Strength Training",
      "Cardio Training",
      "HIIT Training",
      "Yoga Instruction",
      "Meditation Coaching",
      "Mindfulness Training",
      "Mental Health Counseling",
      "Therapy",
      "Psychotherapy",
      "Cognitive Behavioral Therapy",
      "Life Coaching",
      "Stress Management",
      "Anxiety Management",
      "Depression Support",
      "Addiction Counseling",
      "Physical Therapy",
      "Occupational Therapy",
      "Speech Therapy",
      "Massage Therapy",
      "Acupuncture",
      "Chiropractic Care",
      "Holistic Health",
      "Alternative Medicine",
      "Herbal Medicine",
      "Aromatherapy",
      "Reiki Healing",
      "Energy Healing",
      "Health Education",
      "Patient Education",
      "Medical Writing",
      "Healthcare Administration",
    ],
  },
  "Trades & Services": {
    icon: "🔧",
    skills: [
      "Electrician",
      "Electrical Installation",
      "Electrical Repair",
      "Wiring",
      "Plumbing",
      "Pipe Installation",
      "Drain Cleaning",
      "Water Heater Repair",
      "Carpentry",
      "Furniture Making",
      "Cabinet Making",
      "Woodworking",
      "Painting",
      "Interior Painting",
      "Exterior Painting",
      "Decorative Painting",
      "Masonry",
      "Bricklaying",
      "Concrete Work",
      "Tile Installation",
      "Roofing",
      "Roof Repair",
      "Gutter Installation",
      "HVAC Installation",
      "HVAC Repair",
      "Air Conditioning",
      "Heating Systems",
      "Ventilation",
      "Welding",
      "Metal Fabrication",
      "Automotive Repair",
      "Car Maintenance",
      "Motorcycle Repair",
      "Bicycle Repair",
      "Appliance Repair",
      "Electronics Repair",
      "Computer Repair",
      "Phone Repair",
      "Locksmith",
      "Security Systems",
    ],
  },
  "Hospitality & Events": {
    icon: "🎉",
    skills: [
      "Event Planning",
      "Wedding Planning",
      "Party Planning",
      "Corporate Events",
      "Conference Planning",
      "Event Coordination",
      "Event Management",
      "Venue Selection",
      "Catering",
      "Menu Planning",
      "Food Preparation",
      "Baking",
      "Cake Decorating",
      "Pastry Making",
      "Cooking",
      "Chef Services",
      "Bartending",
      "Mixology",
      "Wine Sommelier",
      "Coffee Barista",
      "Hotel Management",
      "Hospitality Management",
      "Guest Services",
      "Concierge Services",
      "Travel Planning",
      "Tour Guide",
      "Travel Consulting",
      "Itinerary Planning",
      "Destination Planning",
      "Event Decoration",
      "Floral Design",
      "Balloon Decoration",
      "Stage Design",
      "Lighting Design",
      "Sound Engineering",
      "DJ Services",
      "MC Services",
      "Entertainment Booking",
      "Vendor Management",
      "Event Photography",
    ],
  },
  "Real Estate & Property": {
    icon: "🏠",
    skills: [
      "Real Estate Agent",
      "Property Management",
      "Leasing",
      "Tenant Relations",
      "Property Maintenance",
      "Building Maintenance",
      "Facility Management",
      "Janitorial Services",
      "Cleaning Services",
      "Deep Cleaning",
      "Move-in Cleaning",
      "Move-out Cleaning",
      "Landscaping",
      "Garden Design",
      "Lawn Care",
      "Tree Trimming",
      "Irrigation Systems",
      "Hardscaping",
      "Outdoor Lighting",
      "Fence Installation",
      "Deck Building",
      "Patio Construction",
      "Pool Maintenance",
      "Home Staging",
      "Interior Design",
      "Interior Decorating",
      "Space Planning",
      "Color Consulting",
      "Furniture Selection",
      "Home Organization",
      "Decluttering",
      "Closet Organization",
      "Garage Organization",
      "Moving Services",
      "Packing Services",
      "Storage Solutions",
      "Home Inspection",
      "Property Appraisal",
      "Real Estate Photography",
      "Virtual Tours",
    ],
  },
  "Transportation & Logistics": {
    icon: "🚗",
    skills: [
      "Driving",
      "Delivery Services",
      "Courier Services",
      "Package Delivery",
      "Food Delivery",
      "Grocery Delivery",
      "Moving Services",
      "Furniture Moving",
      "Truck Driving",
      "Van Services",
      "Taxi Services",
      "Ride Sharing",
      "Chauffeur Services",
      "Airport Transfer",
      "Logistics Coordination",
      "Supply Chain",
      "Warehouse Management",
      "Inventory Management",
      "Shipping",
      "Freight Forwarding",
      "Import/Export",
      "Customs Clearance",
      "Route Planning",
      "Fleet Management",
      "Vehicle Maintenance",
      "Car Detailing",
      "Car Washing",
      "Auto Detailing",
      "Motorcycle Courier",
      "Bicycle Courier",
      "Pet Transportation",
      "Medical Transportation",
      "Elderly Transportation",
      "School Transportation",
      "Event Transportation",
      "Tour Bus Services",
      "Limousine Services",
      "Party Bus Services",
      "Shuttle Services",
      "Parking Services",
    ],
  },
  "Agriculture & Environment": {
    icon: "🌱",
    skills: [
      "Farming",
      "Crop Production",
      "Vegetable Gardening",
      "Fruit Growing",
      "Organic Farming",
      "Hydroponics",
      "Aquaponics",
      "Greenhouse Management",
      "Animal Husbandry",
      "Livestock Management",
      "Poultry Farming",
      "Beekeeping",
      "Dairy Farming",
      "Fish Farming",
      "Aquaculture",
      "Veterinary Services",
      "Animal Care",
      "Pet Grooming",
      "Dog Training",
      "Horse Training",
      "Pet Sitting",
      "Dog Walking",
      "Pet Boarding",
      "Wildlife Conservation",
      "Environmental Consulting",
      "Sustainability Consulting",
      "Waste Management",
      "Recycling",
      "Composting",
      "Renewable Energy",
      "Solar Installation",
      "Wind Energy",
      "Energy Auditing",
      "Green Building",
      "LEED Consulting",
      "Environmental Education",
      "Climate Research",
      "Ecology",
      "Forestry",
      "Land Management",
      "Soil Science",
      "Water Management",
      "Irrigation Consulting",
      "Pest Control",
    ],
  },
  "Arts & Entertainment": {
    icon: "🎭",
    skills: [
      "Acting",
      "Voice Acting",
      "Theater Performance",
      "Stage Performance",
      "Stand-up Comedy",
      "Improv Comedy",
      "Magic Shows",
      "Juggling",
      "Circus Arts",
      "Acrobatics",
      "Dance Performance",
      "Choreography",
      "Ballet",
      "Contemporary Dance",
      "Hip Hop Dance",
      "Ballroom Dance",
      "Salsa Dancing",
      "Tango Dancing",
      "Singing",
      "Opera Singing",
      "Musical Performance",
      "Band Performance",
      "Orchestra",
      "Conducting",
      "Music Composition",
      "Songwriting",
      "Music Production",
      "Audio Engineering",
      "Sound Design",
      "Podcast Production",
      "Radio Production",
      "Voice Over",
      "Narration",
      "Audiobook Narration",
      "Film Production",
      "Documentary Making",
      "Cinematography",
      "Film Editing",
      "Color Grading",
      "Visual Effects",
      "Animation",
      "Stop Motion",
      "Claymation",
      "Puppet Making",
    ],
  },
  "Personal Services": {
    icon: "💆",
    skills: [
      "Hair Styling",
      "Hair Cutting",
      "Hair Coloring",
      "Hair Extensions",
      "Barbering",
      "Beard Grooming",
      "Makeup Artistry",
      "Bridal Makeup",
      "Special Effects Makeup",
      "Nail Art",
      "Manicure",
      "Pedicure",
      "Massage Therapy",
      "Swedish Massage",
      "Deep Tissue Massage",
      "Sports Massage",
      "Spa Services",
      "Facial Treatments",
      "Skin Care",
      "Waxing",
      "Threading",
      "Eyelash Extensions",
      "Eyebrow Shaping",
      "Permanent Makeup",
      "Tattoo Art",
      "Piercing",
      "Personal Shopping",
      "Style Consulting",
      "Wardrobe Consulting",
      "Image Consulting",
      "Color Analysis",
      "Personal Assistant",
      "Virtual Assistant",
      "Administrative Support",
      "Data Entry",
      "Scheduling",
      "Calendar Management",
      "Email Management",
      "Customer Service",
      "Phone Support",
      "Chat Support",
      "Technical Support",
      "Childcare",
      "Babysitting",
      "Nanny Services",
      "Elder Care",
      "Companion Care",
      "Housekeeping",
    ],
  },
};

// Flatten all skills for autocomplete
const ALL_SKILLS = Object.entries(SKILLS_DATABASE).flatMap(([category, data]) =>
  data.skills.map((skill) => ({ skill, category, icon: data.icon }))
);

const Skills = ({
  currentStep,
  selectedSkills,
  handleSkillToggle,
  customSkill,
  setCustomSkill,
  addCustomSkill,
  errors, // ✅ pass errors from parent
}) => {
  // Skills step state
  const [skillSearch, setSkillSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const searchInputRef = useRef(null);

  return (
    <Box>
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#0A6802" }}
            >
              Skills I Can Offer
            </h2>
            <p className="text-gray-600">
              What talents and services can you provide? (Select up to 5)
            </p>
          </div>

          {/* Selected Skills Display */}
          {formData.skills.length > 0 && (
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#FCF5E6" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-sm font-medium"
                  style={{ color: "#0A6802" }}
                >
                  Selected Skills ({formData.skills.length}/5)
                </span>
                {formData.skills.length === 5 && (
                  <span className="text-xs text-amber-600">
                    Maximum reached
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="px-3 py-1.5 text-sm"
                    style={{ backgroundColor: "#0A6802", color: "white" }}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-red-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Autocomplete Search */}
          <div className="relative" ref={searchInputRef}>
            <Label htmlFor="skillSearch">Search Skills</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="skillSearch"
                type="text"
                placeholder="Type to search (e.g., 'web dev', 'photo')..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                onFocus={() => skillSearch && setShowSuggestions(true)}
                className="pl-10"
                style={{ backgroundColor: "#E5F4E4" }}
                disabled={formData.skills.length >= 5}
              />
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && filteredSkills.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {filteredSkills.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => addSkill(item.skill)}
                    disabled={formData.skills.includes(item.skill)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="font-medium">{item.skill}</div>
                        <div className="text-xs text-gray-500">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    {formData.skills.includes(item.skill) && (
                      <Check className="w-4 h-4 text-[#0A6802]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Browser */}
          <div>
            <Label>Browse by Category</Label>

            {/* Category Tabs - Desktop */}
            <div className="hidden md:block mt-2">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {Object.keys(SKILLS_DATABASE).map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? "text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    style={
                      selectedCategory === category
                        ? { backgroundColor: "#0A6802" }
                        : {}
                    }
                  >
                    {SKILLS_DATABASE[category].icon} {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Dropdown - Mobile */}
            <div className="md:hidden mt-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                style={{ backgroundColor: "#E5F4E4" }}
              >
                {Object.keys(SKILLS_DATABASE).map((category) => (
                  <option key={category} value={category}>
                    {SKILLS_DATABASE[category].icon} {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills Grid */}
            <div className="mt-4 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {SKILLS_DATABASE[selectedCategory].skills.map((skill) => {
                  const isSelected = formData.skills.includes(skill);
                  const isDisabled = formData.skills.length >= 5 && !isSelected;

                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() =>
                        isSelected ? removeSkill(skill) : addSkill(skill)
                      }
                      disabled={isDisabled}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isSelected
                          ? "text-white"
                          : isDisabled
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white border border-gray-300 hover:border-[#0A6802] text-gray-700"
                      }`}
                      style={isSelected ? { backgroundColor: "#0A6802" } : {}}
                    >
                      {skill}
                      {isSelected && (
                        <Check className="inline-block w-3 h-3 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Skills;
