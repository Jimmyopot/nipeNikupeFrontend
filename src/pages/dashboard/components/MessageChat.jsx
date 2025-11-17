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
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useTheme } from "@mui/material/styles";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import useSignalR from "../../../services/useSignalR";
import { config } from "../../../utils/config";

const currentUser = {
  id: "current-user",
  fullName: "Jane Doe",
  profilePicture: "/professional-woman-smiling.png",
};

const chatPartner = {
  id: "35fa2db2-5cab-4a10-9da8-bc267f72ec03", // Use GUID format to match backend
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

export default function MessageChat({ open, toggleDrawer, selectedUser }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Create chatPartner from selectedUser prop or use fallback
  const chatPartner = selectedUser
    ? {
        id: selectedUser.userId || selectedUser.id, // Try userId first, then fall back to id
        name: selectedUser.name || selectedUser.fullName,
        location: selectedUser.location || `${selectedUser.cityOrTown}, ${selectedUser.country || "Kenya"}`,
        profilePicture: selectedUser.profilePicture,
        skillsOffered: selectedUser.skillsOffered || [],
        skillsNeeded: selectedUser.skillsNeeded || [],
        rating: selectedUser.rating || 0,
        completedTrades: selectedUser.completedTrades || 0,
        isOnline: true, // Default to online for now
      }
    : {
        id: "35fa2db2-5cab-4a10-9da8-bc267f72ec03",
        name: "Select a user",
        location: "No location",
        profilePicture: "/default-avatar.png",
        skillsOffered: [],
        skillsNeeded: [],
        rating: 0,
        completedTrades: 0,
        isOnline: false,
      };

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeForm, setTradeForm] = useState({
    skillOffering: "",
    skillRequesting: "",
    message: "",
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  // session awareness - default to null (direct chat)
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Get auth state from Redux
  const authState = useSelector((state) => state.LoginReducer);

  // derive user id & token from Redux state or localStorage fallback
  // Use the actual user ID from auth state, which should be a GUID
  const myUserId =
    authState.user?.userId ||
    authState.user?.id ||
    localStorage.getItem("userId") ||
    "2952da01-2354-4f24-87d1-9481e11f6a77";

  const getToken = () => {
    // First try Redux state, then localStorage with correct key
    const token = authState.token || localStorage.getItem("authToken");

    return token;
  };

  // Early return if drawer is open but no user is selected
  if (open && !selectedUser) {
    return (
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: isMobile ? "100vw" : "70vw",
            p: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Please select a user to start messaging
          </Typography>
        </Box>
      </Drawer>
    );
  }

  // Backend API configuration
  // const backendUrl =
  //   import.meta.env.VITE_BACKEND_URL || "http://localhost:5043";
  // const hubUrl =
  //   import.meta.env.VITE_SIGNALR_HUB_URL || `${backendUrl}/hubs/chat`;

  // Create stable handlers using useCallback to prevent unnecessary SignalR reconnections
  const handleReceiveMessage = useCallback(
    (msg) => {
      const mapped = mapServerMessage(msg);
      if (!mapped) return;

      // Check if this message is relevant to current chat
      const isRelevantMessage = currentSessionId
        ? (msg.skillExchangeSessionId || msg.SkillExchangeSessionId) ===
          currentSessionId
        : msg.senderId === chatPartner.id || msg.receiverId === myUserId;

      if (isRelevantMessage) {
        setMessages((prev) => {
          // Check if message already exists to prevent duplicates
          const exists = prev.some(
            (m) => m.id === mapped.id || m.raw?.id === msg.id
          );
          if (exists) {
            return prev;
          }
          return [...prev, mapped];
        });
      }
    },
    [currentSessionId, chatPartner.id, myUserId]
  );

  const handleMessageSent = useCallback((msg) => {
    const mapped = mapServerMessage(msg);
    if (!mapped) return;

    // Replace optimistic message with real message from server
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id && m.id.startsWith("temp-")) {
          return mapped;
        }
        return m;
      })
    );
  }, []);

  const handleConnected = useCallback(() => {
  }, []);

  const handleDisconnected = useCallback((err) => {
  }, []);

  const handleReconnected = useCallback(async () => {
    try {
      if (currentSessionId) {
        await fetchHistory({ sessionId: currentSessionId });
      } else {
        await fetchHistory({ withUserId: chatPartner.id });
      }
    } catch (err) {
      console.error("Failed to refetch history on reconnect:", err);
    }
  }, [currentSessionId, chatPartner.id]);

  const signalRHandlers = useMemo(
    () => ({
      onReceiveMessage: handleReceiveMessage,
      onMessageSent: handleMessageSent,
      onConnected: handleConnected,
      onDisconnected: handleDisconnected,
      onReconnected: handleReconnected,
    }),
    [
      handleReceiveMessage,
      handleMessageSent,
      handleConnected,
      handleDisconnected,
      handleReconnected,
    ]
  );

  const {
    start,
    stop,
    sendMessage: signalrSendMessage,
    joinSession,
    leaveSession,
    markAsRead,
    connectionState,
  } = useSignalR({
    hubUrl: config.VITE_SIGNALR_HUB_URL,
    getAccessToken: getToken,
    handlers: signalRHandlers,
  });

  // Fetch chat history on component mount
  useEffect(() => {
    (async () => {
      try {
        // Always fetch history first, regardless of SignalR status
        if (currentSessionId) {
          await fetchHistory({ sessionId: currentSessionId });
        } else {
          await fetchHistory({ withUserId: chatPartner.id });
        }
      } catch (err) {
        console.warn("Failed to fetch initial chat history:", err);
      }
    })();
  }, [currentSessionId]);

  // start SignalR on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await start();
        // join session if present
        if (currentSessionId) {
          await joinSession(currentSessionId);
        }
      } catch (err) {
        console.warn("SignalR start error:", err);
      }
    })();

    return () => {
      mounted = false;
      stop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, stop, currentSessionId]);

  // map server -> client message shape
  function mapServerMessage(msg) {
    if (!msg) return null;
    const id = msg.id || msg.Id || msg.messageId || `${Date.now()}`;
    const senderId = msg.senderId || msg.SenderId || msg.sender || null;
    const receiverId = msg.receiverId || msg.ReceiverId || msg.receiver || null;
    const text = msg.text || msg.Text || msg.message || "";
    const timestamp =
      msg.timestampUtc ||
      msg.TimestampUtc ||
      msg.timestamp ||
      new Date().toISOString();
    const isRead =
      typeof msg.isRead !== "undefined" ? msg.isRead : msg.IsRead || false;
    return {
      id,
      sender: senderId === myUserId ? "current" : "partner",
      text,
      timestamp: new Date(timestamp),
      read: !!isRead,
      raw: msg,
    };
  }

  async function fetchHistory({ sessionId = null, withUserId = null } = {}) {
    try {
      setIsLoadingHistory(true);
      const token = getToken();
      let url = `${config.VITE_BACKEND_URL}/api/chat/history`;
      if (sessionId) url += `?sessionId=${encodeURIComponent(sessionId)}`;
      else if (withUserId)
        url += `?withUserId=${encodeURIComponent(withUserId)}`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          `History request failed: ${res.status} ${res.statusText}`,
          errorText
        );
        throw new Error(`History request failed: ${res.status}`);
      }

      const data = await res.json();
      const mapped = (data || []).map(mapServerMessage).filter(Boolean);
      setMessages(mapped);
    } catch (err) {
      console.error("Failed to fetch chat history", err);
      // Keep empty array on error instead of showing mock data
      setMessages([]);
    } finally {
      setIsLoadingHistory(false);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const text = newMessage.trim();
    const token = getToken();

    // Check if user is authenticated
    if (!token) {
      alert("You must be logged in to send messages. Please login first.");
      return;
    }

    // optimistic UI
    const optimistic = {
      id: `temp-${Date.now()}`,
      sender: "current",
      text,
      timestamp: new Date(),
      read: false,
    };
    setMessages((prev) => [...prev, optimistic]);
    setNewMessage("");
    inputRef.current?.focus();

    (async () => {
      try {
        // Primary: Send via REST API (as it saves to database)
        const sendUrl = `${config.VITE_BACKEND_URL}/api/chat/send`;
        const payload = {
          receiverId: chatPartner.id,
          text: text,
          skillExchangeSessionId: currentSessionId,
        };

        const response = await fetch(sendUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Send API failed: ${response.status} ${response.statusText}`
          );
          console.error("Error details:", errorText);

          // Remove optimistic message on failure
          setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));

          // Show user-friendly error
          if (response.status === 401) {
            alert("Authentication failed. Please login again.");
          } else if (response.status === 400) {
            alert("Invalid message data. Please try again.");
          } else {
            alert(
              `Failed to send message: ${response.status} ${response.statusText}`
            );
          }
          throw new Error(`Send API failed: ${response.status}`);
        }

        const result = await response.json();

        // Replace optimistic message with real message from server
        setMessages((prev) =>
          prev.map((m) =>
            m.id === optimistic.id ? mapServerMessage(result) : m
          )
        );

        // Secondary: Also send via SignalR for real-time notification
        try {
          await signalrSendMessage(chatPartner.id, text, currentSessionId);
        } catch (signalRError) {
          console.warn(
            "SignalR send failed (message still saved):",
            signalRError
          );
        }
      } catch (err) {
        console.error("Send failed:", err);
      }
    })();
  };

  // mark inbound unread messages as read when visible
  useEffect(() => {
    (async () => {
      try {
        const unreadIds = messages
          .filter(
            (m) =>
              m.raw &&
              (m.raw.receiverId === myUserId ||
                m.raw.ReceiverId === myUserId) &&
              !m.read
          )
          .map((m) => m.id || m.raw.id || m.raw.Id)
          .filter(Boolean);
        if (unreadIds.length && markAsRead) {
          await markAsRead(unreadIds);
          setMessages((prev) =>
            prev.map((m) =>
              unreadIds.includes(m.id) ? { ...m, read: true } : m
            )
          );
        }
      } catch (e) {
        // ignore
      }
    })();
  }, [messages, markAsRead, myUserId]);

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
        {/* Debug Panel (remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <Paper sx={{ m: 1, p: 1, bgcolor: "grey.100" }}>
            <Typography variant="caption" display="block">
              Debug: User ID: {myUserId} | Token:{" "}
              {getToken() ? "Present" : "Missing"} | Connection:{" "}
              {connectionState}
            </Typography>
          </Paper>
        )}
        {/* Messages area */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {isLoadingHistory ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Loading chat history...
              </Typography>
            </Box>
          ) : messages.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No messages yet. Start a conversation!
              </Typography>
            </Box>
          ) : (
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
          )}
        </Box>{" "}
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
