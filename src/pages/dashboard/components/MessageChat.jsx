import * as React from "react";
import {
  Box,
  Drawer,
  Avatar,
  AppBar,
  Paper,
  Typography,
  List,
  ListItem,
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

  // Create chatPartner from selectedUser prop - STABLE reference using useMemo
  const chatPartner = useMemo(() => {
    if (!selectedUser) return null;
    return {
      id: selectedUser.userId || selectedUser.id,
      name: selectedUser.name || selectedUser.fullName,
      location: selectedUser.location || `${selectedUser.cityOrTown}, ${selectedUser.country || "Kenya"}`,
      profilePicture: selectedUser.profilePicture,
      skillsOffered: selectedUser.skillsOffered || [],
      skillsNeeded: selectedUser.skillsNeeded || [],
      rating: selectedUser.rating || 0,
      completedTrades: selectedUser.completedTrades || 0,
      isOnline: true,
    };
  }, [selectedUser]);

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
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Get auth state from Redux
  const authState = useSelector((state) => state.LoginReducer);

  // STABLE user ID - use useMemo to prevent recalculation
  const myUserId = useMemo(() => {
    return (
      authState.user?.userId ||
      authState.user?.id ||
      localStorage.getItem("userId") ||
      "2952da01-2354-4f24-87d1-9481e11f6a77"
    );
  }, [authState.user?.userId, authState.user?.id]);

  // STABLE token getter - use useCallback
  const getToken = useCallback(() => {
    return authState.token || localStorage.getItem("authToken");
  }, [authState.token]);

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

  // Map server message to client format - STABLE with proper dependencies
  const mapServerMessage = useCallback(
    (msg) => {
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
    },
    [myUserId]
  );

  // CRITICAL FIX: Fetch history with proper dependencies
  const fetchHistory = useCallback(
    async ({ sessionId = null, withUserId = null } = {}) => {
      try {
        setIsLoadingHistory(true);
        const token = getToken();
        let url = `${config.VITE_BACKEND_URL}/api/chat/history`;
        if (sessionId) url += `?sessionId=${encodeURIComponent(sessionId)}`;
        else if (withUserId)
          url += `?withUserId=${encodeURIComponent(withUserId)}`;

        console.log("Fetching history from:", url);

        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error(`History request failed: ${res.status}`, errorText);
          throw new Error(`History request failed: ${res.status}`);
        }

        const data = await res.json();
        console.log("History data received:", data);
        const mapped = (data || []).map(mapServerMessage).filter(Boolean);
        setMessages(mapped);
      } catch (err) {
        console.error("Failed to fetch chat history", err);
        setMessages([]);
      } finally {
        setIsLoadingHistory(false);
      }
    },
    [getToken, mapServerMessage] // Only depend on stable functions
  );

  // Create stable handlers
  const handleReceiveMessage = useCallback(
    (msg) => {
      console.log("Handler: ReceiveMessage called", msg);
      const mapped = mapServerMessage(msg);
      if (!mapped) return;

      // Check if this message is relevant to current chat
      const isRelevantMessage = currentSessionId
        ? (msg.skillExchangeSessionId || msg.SkillExchangeSessionId) ===
          currentSessionId
        : msg.senderId === chatPartner?.id || msg.receiverId === myUserId;

      console.log("Is relevant message:", isRelevantMessage, {
        currentSessionId,
        msgSessionId: msg.skillExchangeSessionId || msg.SkillExchangeSessionId,
        msgSenderId: msg.senderId,
        chatPartnerId: chatPartner?.id,
        myUserId,
      });

      if (isRelevantMessage) {
        setMessages((prev) => {
          const exists = prev.some(
            (m) => m.id === mapped.id || m.raw?.id === msg.id
          );
          if (exists) {
            console.log("Message already exists, skipping");
            return prev;
          }
          console.log("Adding new message to state");
          return [...prev, mapped];
        });
      }
    },
    [currentSessionId, chatPartner?.id, myUserId, mapServerMessage]
  );

  const handleMessageSent = useCallback(
    (msg) => {
      console.log("Handler: MessageSent called", msg);
      const mapped = mapServerMessage(msg);
      if (!mapped) return;

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id && m.id.startsWith("temp-")) {
            return mapped;
          }
          return m;
        })
      );
    },
    [mapServerMessage]
  );

  const handleConnected = useCallback(() => {
    console.log("Handler: Connected");
  }, []);

  const handleDisconnected = useCallback((err) => {
    console.log("Handler: Disconnected", err);
  }, []);

  const handleReconnected = useCallback(
    async (connectionId) => {
      console.log("Handler: Reconnected - refetching history", connectionId);
      try {
        if (currentSessionId) {
          await fetchHistory({ sessionId: currentSessionId });
        } else if (chatPartner?.id) {
          await fetchHistory({ withUserId: chatPartner.id });
        }
      } catch (err) {
        console.error("Failed to refetch history on reconnect:", err);
      }
    },
    [currentSessionId, chatPartner?.id, fetchHistory] // Now fetchHistory is stable
  );

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

  // CRITICAL FIX: Use chatPartner.id as dependency instead of chatPartner object
  // This prevents re-running when chatPartner object reference changes
  useEffect(() => {
    if (!open || !chatPartner?.id) return;

    let mounted = true;
    let isInitialized = false; // Prevent double initialization

    (async () => {
      if (isInitialized) return;
      isInitialized = true;

      try {
        console.log("Starting SignalR connection...");
        await start();

        if (!mounted) return;

        // Join session if present
        if (currentSessionId) {
          console.log("Joining session:", currentSessionId);
          await joinSession(currentSessionId);
        }

        // Now fetch history after SignalR is connected
        console.log("Fetching chat history...");
        if (currentSessionId) {
          await fetchHistory({ sessionId: currentSessionId });
        } else {
          await fetchHistory({ withUserId: chatPartner.id });
        }
      } catch (err) {
        console.error("Setup error:", err);
      }
    })();

    return () => {
      mounted = false;
      console.log("Cleanup: stopping SignalR");
      stop?.();
    };
  }, [
    open,
    chatPartner?.id, // ONLY depend on the ID, not the whole object
    currentSessionId,
    start,
    stop,
    joinSession,
    fetchHistory,
  ]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(
    (e) => {
      e?.preventDefault();
      if (!newMessage.trim()) return;

      const text = newMessage.trim();
      const token = getToken();

      if (!token) {
        alert("You must be logged in to send messages. Please login first.");
        return;
      }

      // Optimistic UI
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
          console.log("Sending message via REST API...");
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
            console.error(`Send API failed: ${response.status}`, errorText);

            setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));

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
          console.log("Message sent successfully:", result);

          // Replace optimistic message with real message
          setMessages((prev) =>
            prev.map((m) =>
              m.id === optimistic.id ? mapServerMessage(result) : m
            )
          );

          // Also send via SignalR for real-time delivery
          try {
            await signalrSendMessage(chatPartner.id, text, currentSessionId);
            console.log("Message sent via SignalR");
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
    },
    [
      newMessage,
      getToken,
      chatPartner?.id,
      currentSessionId,
      mapServerMessage,
      signalrSendMessage,
    ]
  );

  // Mark unread messages as read
  useEffect(() => {
    if (!markAsRead || messages.length === 0) return;

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

        if (unreadIds.length > 0) {
          console.log("Marking messages as read:", unreadIds);
          await markAsRead(unreadIds);
          setMessages((prev) =>
            prev.map((m) =>
              unreadIds.includes(m.id) ? { ...m, read: true } : m
            )
          );
        }
      } catch (e) {
        console.error("Failed to mark messages as read:", e);
      }
    })();
  }, [messages, markAsRead, myUserId]);

  const handleSendTradeRequest = useCallback(() => {
    if (!tradeForm.skillOffering || !tradeForm.skillRequesting) {
      alert("Please select both skills");
      return;
    }

    const tradeMessage = {
      id: `trade-${Date.now()}`,
      sender: "current",
      text: `📋 Trade Request: I'm offering "${tradeForm.skillOffering}" in exchange for "${tradeForm.skillRequesting}". ${
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
  }, [tradeForm]);

  if (!chatPartner) return null;

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
          <Paper variant="outlined" square sx={{ p: 2, borderRadius: 0 }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <IconButton edge="start" onClick={toggleDrawer(false)}>
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

        {/* Debug Panel */}
        {process.env.NODE_ENV === "development" && (
          <Paper sx={{ m: 1, p: 1, bgcolor: "grey.100" }}>
            <Typography variant="caption" display="block">
              Debug: User ID: {myUserId} | Token:{" "}
              {getToken() ? "Present" : "Missing"} | Connection:{" "}
              {connectionState} | Messages: {messages.length}
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
                          wordBreak: "break-word",
                        }}
                      >
                        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
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
              <InputLabel>Skill I'm Offering</InputLabel>
              <Select
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
              <InputLabel>Skill I Want</InputLabel>
              <Select
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