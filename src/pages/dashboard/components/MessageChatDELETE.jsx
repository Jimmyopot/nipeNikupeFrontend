import * as React from "react";
import {
  Box,
  Drawer,
  Avatar,
  AppBar,
  Toolbar,
  List,
  ListItem,
  Paper,
  Typography,
  Divider,
  IconButton,
  Button,
  Stack,
  TextField,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useTheme } from "@mui/material/styles";
import { useState, useRef, useEffect } from "react";

const currentUser = {
  id: "current-user",
  fullName: "Jane Doe",
  profilePicture: "/professional-woman-smiling.png",
};

const chatPartner = {
  id: 1,
  name: "John Kamau",
  location: "Nairobi, Kilimani",
  profilePicture: "/professional-man-smiling.png",
  skillsOffered: ["Plumbing", "Electrical Work"],
  skillsNeeded: ["Web Development", "Digital Marketing"],
  rating: 4.8,
  completedTrades: 12,
  isOnline: true,
};

const mockMessages = [
  {
    id: 1,
    sender: "partner",
    text: "Hi Jane! I saw your profile and think we could make a great match. I need web development help for my business website.",
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
  {
    id: 2,
    sender: "current",
    text: "Hi John! That's great. I'd love to help with your website. What kind of site are you looking for?",
    timestamp: new Date(Date.now() - 3300000),
    read: true,
  },
  {
    id: 3,
    sender: "partner",
    text: "I need an e-commerce site for my plumbing supplies. I can offer plumbing repairs or electrical work in exchange for your web dev services.",
    timestamp: new Date(Date.now() - 3000000),
    read: true,
  },
  {
    id: 4,
    sender: "current",
    text: "That sounds perfect! I actually need some electrical work done at my office. Would that work for you?",
    timestamp: new Date(Date.now() - 2700000),
    read: true,
  },
  {
    id: 5,
    sender: "partner",
    text: "Let's formalize this. Should we create a trade request?",
    timestamp: new Date(Date.now() - 2400000),
    read: true,
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatTime(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function MessageChat({ open, toggleDrawer }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeForm, setTradeForm] = useState({
    skillOffering: "",
    skillRequesting: "",
    message: "",
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: "current",
      text: newMessage,
      timestamp: new Date(),
      read: false,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleSendTradeRequest = () => {
    if (!tradeForm.skillOffering || !tradeForm.skillRequesting) {
      alert("Please select both skills");
      return;
    }

    const tradeMessage = {
      id: messages.length + 1,
      sender: "current",
      text: `📋 Trade Request: I'm offering "${
        tradeForm.skillOffering
      }" in exchange for "${tradeForm.skillRequesting}". ${
        tradeForm.message ? `Message: ${tradeForm.message}` : ""
      }`,
      timestamp: new Date(),
      read: false,
      isTradeRequest: true,
    };

    setMessages((prev) => [...prev, tradeMessage]);
    setIsTradeModalOpen(false);
    setTradeForm({ skillOffering: "", skillRequesting: "", message: "" });
    inputRef.current?.focus();
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: isMobile ? "100vw" : "70vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        {/* Header */}
        <AppBar
          position="sticky"
          color="default"
          elevation={1}
          sx={{ bgcolor: "background.paper" }}
        >
          {/* <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              aria-label="back to dashboard"
              onClick={() => {
                toggleDrawer(false)();
                // window.location.href = "/dashboard";
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "primary.light" }}>
                {getInitials(chatPartner.name)}
              </Avatar>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
                  {chatPartner.name}
                </Typography>
                <Typography
                  variant="caption"
                  color={
                    chatPartner.isOnline ? "success.main" : "text.secondary"
                  }
                >
                  {chatPartner.isOnline ? "Online" : "Offline"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ width: 56 }} />
          </Toolbar> */}

          <Paper variant="outlined" square sx={{ p: 2, borderRadius: 0 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
          <IconButton
              edge="start"
              aria-label="back to dashboard"
              onClick={() => {
                toggleDrawer(false)();
                // window.location.href = "/dashboard";
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.light" }}>
              {getInitials(chatPartner.name)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {chatPartner.name}
                </Typography>
                <Chip label={`★ ${chatPartner.rating}`} size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                📍 {chatPartner.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {chatPartner.completedTrades} trades completed
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsTradeModalOpen(true)}
              startIcon={<EmojiEmotionsIcon />}
            >
              Request Trade
            </Button>
          </Box>
        </Paper>
        </AppBar>

        {/* Chat Info */}
        {/* <Paper variant="outlined" square sx={{ p: 2, borderRadius: 0 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Avatar sx={{ width: 48, height: 48, bgcolor: "primary.light" }}>
              {getInitials(chatPartner.name)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {chatPartner.name}
                </Typography>
                <Chip label={`★ ${chatPartner.rating}`} size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                📍 {chatPartner.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {chatPartner.completedTrades} trades completed
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsTradeModalOpen(true)}
              startIcon={<EmojiEmotionsIcon />}
            >
              Request Trade
            </Button>
          </Box>
        </Paper> */}

        {/* Messages area */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {messages.map((message) => {
              const isCurrent = message.sender === "current";
              return (
                <ListItem
                  key={message.id}
                  sx={{
                    display: "flex",
                    justifyContent: isCurrent ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      // Make bubble size to content but limit maximum width for readability
                      width: "auto",
                      maxWidth: { xs: "85%", sm: "70%", md: 600 },
                    }}
                  >
                    <Paper
                      sx={{
                        display: "inline-block",
                        p: 1.5,
                        bgcolor: isCurrent ? "primary.main" : "grey.100",
                        color: isCurrent
                          ? "primary.contrastText"
                          : "text.primary",
                        // prevent overflow with long words
                        wordBreak: "break-word",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {message.text}
                      </Typography>
                    </Paper>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        mt: 0.5,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(message.timestamp)}
                      </Typography>
                      {isCurrent && (
                        <Typography variant="caption" color="text.secondary">
                          {message.read ? "✓✓" : "✓"}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        {/* Input */}
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton onClick={() => alert("Emoji picker - coming soon")}>
              <EmojiEmotionsIcon />
            </IconButton>
            <TextField
              inputRef={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!newMessage.trim()}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Stack>
        </Box>

        {/* Trade Dialog */}
        <Dialog
          open={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Request Trade</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Formalize your skill exchange with {chatPartner.name}
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="skill-offering-label">
                Skill I'm Offering
              </InputLabel>
              <Select
                labelId="skill-offering-label"
                value={tradeForm.skillOffering}
                label="Skill I'm Offering"
                onChange={(e) =>
                  setTradeForm((s) => ({ ...s, skillOffering: e.target.value }))
                }
              >
                <MenuItem value="">Select a skill</MenuItem>
                <MenuItem value="Web Development">Web Development</MenuItem>
                <MenuItem value="Graphic Design">Graphic Design</MenuItem>
                <MenuItem value="Photography">Photography</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="skill-requesting-label">Skill I Want</InputLabel>
              <Select
                labelId="skill-requesting-label"
                value={tradeForm.skillRequesting}
                label="Skill I Want"
                onChange={(e) =>
                  setTradeForm((s) => ({
                    ...s,
                    skillRequesting: e.target.value,
                  }))
                }
              >
                <MenuItem value="">Select a skill</MenuItem>
                {chatPartner.skillsOffered.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    {skill}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Describe the scope or timeline..."
              value={tradeForm.message}
              onChange={(e) =>
                setTradeForm((s) => ({
                  ...s,
                  message: e.target.value.slice(0, 200),
                }))
              }
              sx={{ mb: 1 }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "right" }}
            >
              {tradeForm.message.length}/200
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsTradeModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSendTradeRequest}>
              Send Request
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Drawer>
  );
}
