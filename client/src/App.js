import AdminLogin from './components/AdminLogin';
import AfterLoginPage from './components/AfterLoginPage';
import Home from './components/Home';
import Login from './components/Login';
import LoginOtp from './components/LoginOtp';
import Navbar from './components/Navbar';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route exact path="/showcomplaints" element={<AfterLoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
