import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AnswerListing from "../components/AnswerListing";
import ListingMetadata from "../components/ListingMetadata";
import Vote from "../components/Vote"
import Spinner from '../components/Spinner';
import { useSearchParams } from 'react-router-dom';
import QuestionApprovalForm from '../components/QuestionApprovalForm'
import { useParams} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AddAnswerForm from '../components/AddAnswerForm'
import { fetchPendingQuestion, fetchQuestion} from '../BackendAccess.jsx';
import { useState, useEffect } from 'react';



const QuestionPage = () => {
  const [searchParams] = useSearchParams();
  const pending = searchParams.get("pending") == "true"? true: false;
  const { isLoggedIn, userRole, token } = useAuth();
  const { id } = useParams();
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchData = async () =>{
      try {
        let fetchedQuestion = [];
        if (pending) {
          fetchedQuestion = await fetchPendingQuestion(isLoggedIn, token, id);
        }else {
          fetchedQuestion = await fetchQuestion(isLoggedIn, token, id);
        }
        setQuestion(fetchedQuestion);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  },[pending]);

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          {pending?(<>
              <Link to='/questions?pending=true' className="text-indigo-500 hover:text-indigo-600 flex items-center">
                <FaArrowLeft className="mr-2" /> Back to Pending Questions Listings
              </Link>
            </>):(<>
              <Link to='/questions' className="text-indigo-500 hover:text-indigo-600 flex items-center">
                <FaArrowLeft className="mr-2" /> Back to Questions Listings
              </Link>
            </>)}
        </div>
      </section>
      {loading ? (
          <Spinner loading={loading} />
        ) : (
          <section className="bg-indigo-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 w-full gap-6">
              {/* <!-- Question --> */}
              <div className="bg-white rounded-xl shadow-md">
                <div className="p-4 flex">
                  <div className="mr-6">
                  {isLoggedIn & !pending ? (
                    <>
                    <Vote initialVotes={question.totalVotes} wasVotedByCurrentUser={question.wasVotedByCurrentUser} voteType="question" id={question.id}/>
                    </>
                  ): (
                    <></>
                  )}
                    
                  </div> 
                  <div className="relative">
                        <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
                        
                        <p>{question.content}</p>
                  </div>  
                </div>
  
                <ListingMetadata listing={question} />
              </div>
  
              {/* <!-- Answers --> */}
              <div className="ml=6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {question.answers.map((answer) => (
                    <AnswerListing key={answer.id} answer={answer} />
                  ))}
                </div>
              </div>
              
  
              {isLoggedIn & !pending ? (
                <>
                 <AddAnswerForm questionId={id} />
                </>
              ) : (
                <></>
              )}

              {isLoggedIn & userRole=='Admin' &pending ? (
                <QuestionApprovalForm id={id} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
          
        )}
      
    </>
  );
};

export default QuestionPage;
