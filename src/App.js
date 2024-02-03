import styles from "./App.module.css";
import Navbar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";

function Home() {
  return <h1>Home page</h1>;
}

function SignIn() {
  return <h1>Sign in</h1>;
}


function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element= {<SignUpForm/>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
