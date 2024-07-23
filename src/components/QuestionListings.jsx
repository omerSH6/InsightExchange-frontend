import QuestionListing from './QuestionListing';
import Spinner from './Spinner';
import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext.jsx";
import { fetchPendingQuestions, fetchQuestionsByTag} from '../BackendAccess.jsx';

const QuestionListings = ({ isHome = false, tag = null , pending = null}) => {
  const [questions, setQuestions] = useState([]);
  const { isLoggedIn, token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedQuestions = [];
        if (pending) {
          fetchedQuestions = await fetchPendingQuestions(isLoggedIn, token, tag);
        }else {
          fetchedQuestions = await fetchQuestionsByTag(isLoggedIn, token, tag);
        }
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  },[loading, isLoggedIn, token]);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Questions' : `Browse ${pending?("Pending"):("")} Questions`}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
            {questions? (<>
              {questions.map((question) => (
                <QuestionListing key={question.id} question={question} pending={pending} />
              ))}
            </>):(<></>)}
          </div>
        )}
      </div>
    </section>
  );
};
export default QuestionListings;
