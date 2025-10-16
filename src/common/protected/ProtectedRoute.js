// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";

// // export const ProtectedRoute = ({ children }) => {
// //     const navigate = useNavigate
// //     const { isAuthenticated, checkingAuth } = useSelector(
// //         (state) => state.LoginReducer
// //     );

// //     // Wait for checkAuthAction before deciding
// //     if (checkingAuth) return null;

// //     //   return isAuthenticated ? children : <Navigate to="/login" replace />;
// //         return isAuthenticated ? children : navigate("/login");
// // };

// // export const PublicRoute = ({ children }) => {
// //     const navigate = useNavigate();
// //     const { isAuthenticated, checkingAuth } = useSelector(
// //         (state) => state.LoginReducer
// //     );

// //     if (checkingAuth) return null;

// //     // Prevent logged-in users from visiting login/signup
// //     //   return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
// //         return !isAuthenticated ? children : navigate("/dashboard");
// // };


// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, checkingAuth } = useSelector(
//     (state) => state.LoginReducer
//   );

//   if (checkingAuth) return null;

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export const PublicRoute = ({ children }) => {
//   const { isAuthenticated, checkingAuth } = useSelector(
//     (state) => state.LoginReducer
//   );

//   if (checkingAuth) return null;

//   return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
// };
