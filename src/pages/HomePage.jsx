import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import NotificationListings from '../components/NotificationListings';
import QuestionListings from '../components/QuestionListings';
import ViewAllQuestions from '../components/ViewAllQuestions';
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { isLoggedIn, userRole, token } = useAuth();

  return (
    <>
      <Hero />
      <HomeCards />
      {isLoggedIn & userRole!='Admin' ? (
          <NotificationListings/>
        ) : (
          <></>
        )}
      <QuestionListings isHome={true}/>
      <ViewAllQuestions />
    </>
  );
};
export default HomePage;
