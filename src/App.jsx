import './App.css';
import { Routes, Route } from "react-router-dom";
import IndexPage from './pages/landingPage/IndexPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        {/* <Route path="/products" element={<Products />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App
