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
import QuestionPage from './pages/QuestionPage';
import AddQuestionPage from './pages/AddQuestionPage';
import LoginPage from "./pages/LoginPage";
import {AuthProvider}  from "./Services/AuthContextService"
import RegistrationPage from './pages/RegistrationPage';

const App = () => {

  const router = createBrowserRouter(
    
    createRoutesFromElements(
      
      <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegistrationPage />} />
      <Route path='/questions' element={<QuestionsPage />} />
      <Route path='/add-question' element={<AddQuestionPage />} />
  
      <Route path='/question/:id' element={<QuestionPage />}/>
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
