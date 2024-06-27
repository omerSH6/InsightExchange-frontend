import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import QuestionsPage from './pages/QuestionsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/QuestionPage';
import AddQuestionPage from './pages/AddQuestionPage';
import LoginPage from "./pages/LoginPage";
import {AuthProvider}  from "./contexts/AuthContext"
import RegistrationPage from './pages/RegistrationPage';

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter(
    
    createRoutesFromElements(
      
      <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegistrationPage />} />
      <Route path='/questions' element={<QuestionsPage />} />
      <Route path='/add-question' element={<AddQuestionPage addJobSubmit={addJob} />} />
  
      <Route
        path='/question/:id'
        element={<JobPage deleteJob={deleteJob} />}
        loader={jobLoader}
      />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
export default App;
