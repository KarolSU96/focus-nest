import styles from "./App.module.css";
import Navbar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Routes} from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import NotFound from "./components/PageNotFound";
import TaskCreateForm from "./pages/tasks/TaskCreateForm";
import HomeTasksPage from "./pages/tasks/HomeTasksPage";
import TaskDetailPage from "./pages/tasks/TaskDetailPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";


function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";


  return (
    <div className={styles.App}>
      <Navbar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<HomeTasksPage message="NNo matches found. Please refine your search terms."/>} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="tasks/create" element={<TaskCreateForm/>}/>
          <Route path="tasks/:id" element={<TaskDetailPage/>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
