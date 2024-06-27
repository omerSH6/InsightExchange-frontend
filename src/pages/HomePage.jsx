import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import QuestionListings from '../components/QuestionListings';
import ViewAllQuestions from '../components/ViewAllQuestions';

const HomePage = () => {
  
  return (
    <>
      <Hero />
      <HomeCards />
      <QuestionListings isHome={true} />
      <ViewAllQuestions />
    </>
  );
};
export default HomePage;
