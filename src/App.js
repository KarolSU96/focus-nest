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
import CompletedTasksPage from "./pages/tasks/CompletedTasksPage";
import TaskEditForm from "./pages/tasks/TaskEditForm";
import CollectionCreateForm from "./pages/collections/CollectionCreateForm";
import CollectionDetailPage from "./pages/collections/CollectionDetailPage";
import CollecitonsPage from "./pages/collections/ColectionsPage";
import CollectionEditForm from "./pages/collections/CollectionEditForm";
import ContactForm from "./pages/contact/ContactForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";


function App() {

  const user = useCurrentUser();

  return (
    <div className={styles.App}>
      <Navbar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<HomeTasksPage message="No matches found. Please refine your search terms or add tasks."/>} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          {user && (
          <>
          <Route path="tasks/create" element={<TaskCreateForm/>}/>
          <Route path="tasks/:id" element={<TaskDetailPage/>} />
          <Route path="tasks/:id/edit" element={<TaskEditForm/>}/>
          <Route path="completed/" element={<CompletedTasksPage message="No matches found. Please refine your search terms or add tasks."/>}/>
          <Route path="collections/create" element={<CollectionCreateForm/>}/>
          <Route path="collections/:id" element={<CollectionDetailPage message="No tasks found for this collection."/>}/>
          <Route path="collections/:id/edit" element={<CollectionEditForm/>} />
          <Route path="collections/" element={<CollecitonsPage message="No matches found. Please refine your search terms or add collections."/> } />
          <Route path="/profiles/:id" element={<ProfilePage/>}/>
          <Route path="profiles/:id/edit" element={<ProfileEditForm/>}/>
          </>
          )}
          <Route path="/contact/" element={<ContactForm/>}/>
          
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
