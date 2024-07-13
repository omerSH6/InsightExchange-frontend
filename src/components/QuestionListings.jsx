import { useState, useEffect } from 'react';
import QuestionListing from './QuestionListing';
import Spinner from './Spinner';
import { backendUrl } from '../config';
import { useAuth } from "../contexts/AuthContext";


const QuestionListings = ({ isHome = false, tag = null , pending = null}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, token, userRole } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      let apiUrl = "";
      let requestOptions = {}
      console.log(pending)
      if(isHome){
        apiUrl = `${backendUrl}/api/Questions/pagination?SortBy=0&SortDirection=0&Page=1&PageSize=10`;
      }else if(pending == null){
        apiUrl = `${backendUrl}/api/Questions/pagination?${tag?("tag="):("")}${tag}&SortBy=0&SortDirection=0&Page=1&PageSize=10`;
      }else{
        apiUrl = `${backendUrl}/api/Administrator/getPendingQuestionsWithPagination?${tag?("tag="):("")}${tag}&SortBy=0&SortDirection=0&Page=1&PageSize=10`;
        if(isLoggedIn){
          requestOptions = {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        }
      }
        
      try {
        const res = await fetch(apiUrl, requestOptions);
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
          {isHome ? 'Recent Questions' : `Browse ${pending?("Pending"):("")} Questions`}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
            {questions.map((question) => (
              <QuestionListing key={question.id} question={question} pending={pending} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default QuestionListings;
