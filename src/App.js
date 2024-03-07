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
import CompletedTasksPage from "./pages/tasks/CompletedTasksPage";
import TaskEditForm from "./pages/tasks/TaskEditForm";
import CollectionCreateForm from "./pages/collections/CollectionCreateForm";
import CollectionDetailPage from "./pages/collections/CollectionDetailPage";
import CollecitonsPage from "./pages/collections/ColectionsPage";
import CollectionEditForm from "./pages/collections/CollectionEditForm";
import ContactForm from "./pages/contact/ContactForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";


function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";


  return (
    <div className={styles.App}>
      <Navbar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<HomeTasksPage message="No matches found. Please refine your search terms."/>} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="tasks/create" element={<TaskCreateForm/>}/>
          <Route path="tasks/:id" element={<TaskDetailPage/>} />
          <Route path="tasks/:id/edit" element={<TaskEditForm/>}/>
          <Route path="completed/" element={<CompletedTasksPage/>}/>
          <Route path="collections/create" element={<CollectionCreateForm/>}/>
          <Route path="collections/:id" element={<CollectionDetailPage/>}/>
          <Route path="collections/:id/edit" element={<CollectionEditForm/>} />
          <Route path="collections/" element={<CollecitonsPage/>} />
          <Route path="/contact/" element={<ContactForm/>}/>
          <Route path="/profiles/:id" element={<ProfilePage/>}/>
          <Route path="profiles/:id/edit" element={<ProfileEditForm/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
