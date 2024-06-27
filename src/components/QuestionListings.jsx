import { useState, useEffect } from 'react';
import QuestionListing from './QuestionListing';
import Spinner from './Spinner';
import { backendUrl } from '../config';

const QuestionListings = ({ isHome = false }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const apiUrl = isHome ? `${backendUrl}/api/Questions/pagination?SortBy=0&SortDirection=0&Page=1&PageSize=10` : `${backendUrl}/api/Questions/pagination?SortBy=0&SortDirection=0&Page=1&PageSize=10`;
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Questions' : 'Browse Questions'}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
            {questions.map((question) => (
              <QuestionListing key={question.id} question={question} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default QuestionListings;
