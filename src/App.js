import styles from "./App.module.css";
import Navbar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes} from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import NotFound from "./components/PageNotFound";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";


function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" render={() => <h1>Home page</h1>} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="tasks/create" element={TaskCreateForm}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
