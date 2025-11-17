// Temporary authentication setup for testing
// Remove this file in production

export function setupTestAuth() {
  // Set test user ID (matches your Postman sender)
  localStorage.setItem("userId", "2952da01-2354-4f24-87d1-9481e11f6a77");

  // You need to set a valid JWT token here
  // Get this token from your login API or from Postman after successful login
  // localStorage.setItem("token", "your-jwt-token-here");

  console.log(
    "Test auth setup complete. User ID:",
    localStorage.getItem("userId")
  );
  console.log("Token present:", !!localStorage.getItem("token"));
}

// Call this function in your browser console or add it to your app startup
// setupTestAuth();

export function clearAuth() {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  console.log("Auth cleared");
}

export function checkAuthStatus() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  console.log("=== Auth Status ===");
  console.log("User ID:", userId);
  console.log("Token present:", !!token);
  console.log("Token length:", token?.length || 0);

  if (token) {
    try {
      // Try to decode JWT payload (just for debugging)
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Token payload:", payload);
    } catch (e) {
      console.log("Could not decode token");
    }
  }
}
