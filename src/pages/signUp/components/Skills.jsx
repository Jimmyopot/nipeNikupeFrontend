// @ts-nocheck
import { Box, Button, Checkbox, Chip, FormControlLabel, TextField, Typography } from '@mui/material'
import AddIcon from "@mui/icons-material/Add"

const Skills = ({ 
    currentStep,
    selectedSkills,
    handleSkillToggle,
    customSkill,
    setCustomSkill,
    addCustomSkill
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
                </Box>
            )}
        </Box>
    )
}

export default Skills