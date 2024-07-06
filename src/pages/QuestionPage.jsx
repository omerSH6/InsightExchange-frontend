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

const QuestionPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token } = useAuth();
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      const apiUrl =`${backendUrl}/api/Questions?Id=${id}`;
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
        toast.success("Answer Added Successfully");
        setAnswer("");
        return navigate(`/question/${id}`);
      })
      .catch((error) => {
        toast.error("Failed To Add Answer");
        return;
      });
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/questions"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Questions Listings
          </Link>
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
                    <Vote initialVotes={question.totalVotes} wasVotedByCurrentUser={question.wasVotedByCurrentUser} voteType="question" id={question.id}/>
                  </div> 
                  <div className="relative">
                        <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
                        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                          <FaMapMarker className="text-orange-700 mr-1" />
                          <p className="text-orange-700">location</p>
                        </div>
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
              
  
              {isLoggedIn ? (
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
            </div>
          </div>
        </section>
          
        )}
      
    </>
  );
};

export default QuestionPage;
