import { useState, useEffect } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { backendUrl } from "../config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import AnswerListing from "../components/AnswerListing";
import ListingMetadata from "../components/ListingMetadata";
import Vote from "../components/Vote"
import Spinner from '../components/Spinner';
import { useSearchParams } from 'react-router-dom';

const QuestionPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoggedIn, token } = useAuth();
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [approve, setApprove] = useState(null);
  const [answer, setAnswer] = useState("");
  const pending = searchParams.get("pending") == "true"? true: false;

  useEffect(() => {
    const fetchQuestion = async () => {
      let apiUrl = '';
      if(pending){
        apiUrl = `${backendUrl}/api/Administrator/getPendingQuestion?Id=${id}`;
      }else{
        apiUrl = `${backendUrl}/api/Questions?Id=${id}`;
      }
      
      try {
        let requestOptions = {}
        if(isLoggedIn){
          requestOptions = {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        }
        const res = await fetch(apiUrl,requestOptions);
        const data = await res.json();
        setQuestion(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, []);


  const addAnswer = async (answer) => {
    const requestBody = {
      content: answer,
      questionId: id,
    };

    const res = await fetch(`${backendUrl}/api/Answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },

      body: JSON.stringify(requestBody),
    });
    console.log(token);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  };

  const submitAddAnswerForm = (e) => {
    e.preventDefault();
    addAnswer(answer)
      .then(() => {
        toast.success("Answer Created Successfully");
        setAnswer("");
        return navigate(0);
      })
      .catch((error) => {
        toast.error("Failed To Create Answer");
        return;
      });
  };


  const approveQuestion = async (questionId, shouldApprove) => {
    let questionState = 2;
    if(shouldApprove == true){
      questionState = 0;
    }
    if(shouldApprove == false){
      questionState = 1;
    }

    const requestBody = {
      questionId: questionId,
      questionState: questionState
    };

    const res = await fetch(`${backendUrl}/api/administrator/editQuestionState`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },

      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  };

  const submitApproveForm = (e) => {
    e.preventDefault();
    const shouldApprove = approve == true? true:false;
    const wasApproved = shouldApprove? "Approved":"Disapproved";
    console.log(`question id ${id}`);
    approveQuestion(id, shouldApprove)
      .then(() => {
        toast.success(`Question ${wasApproved} Successfully`);
      })
      .catch((error) => {
        toast.error(`Failed To ${wasApproved} Question`);
        return;
      }).finally(() => {
        return navigate("/questions?pending=true");
      })
  };

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
                  {/* <!-- Add Answer --> */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={submitAddAnswerForm}>
                      <div className="mb-4">
                        <label
                          htmlFor="answer"
                          className="block text-gray-700 font-bold mb-2"
                        >
                          Answer
                        </label>
                        <textarea
                          id="answer"
                          name="answer"
                          className="border rounded w-full py-2 px-3"
                          rows="4"
                          placeholder="Add Answer..."
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Add Answer
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <></>
              )}

              {isLoggedIn & pending ? (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={submitApproveForm}>
                        <div className="flex space-x-3">
                          <button className="bg-green-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit" onClick={()=>setApprove(true)}>
                            Approve
                          </button>
                          <button className="bg-red-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit" onClick={()=>setApprove(false)}>
                            Disapprove
                          </button>
                        </div>
                    </form> 
                  </div>
                </>
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
