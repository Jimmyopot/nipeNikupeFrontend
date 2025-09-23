import './App.css';
import { Routes, Route } from "react-router-dom";
import IndexPage from './pages/landingPage/IndexPage';
import SignUpPage from './pages/signUp/SignUpPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App
