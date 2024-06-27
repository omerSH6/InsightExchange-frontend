import { useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { backendUrl } from '../config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';


const QuestionPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const question = useLoaderData();
  const [answer, setAnswer] = useState('');

  const addAnswer = async (answer) => {
    const requestBody = {
      content: answer,
      questionId: id
    };
  
    const res = await fetch(`${backendUrl}/api/Answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  };

  const submitAddAnswerForm = (e) => {
    e.preventDefault();
    addAnswer(answer)
    .then(()=>{
      toast.success('Answer Added Successfully');
      setAnswer("");
      return navigate(`/question/${id}`);
    })
    .catch((error)=>{
      toast.error('Failed To Add Answer');
      return;
    });
  };

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/questions'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Questions Listings
          </Link>
        </div>
      </section>

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 w-full gap-6'>

            {/* <!-- Question --> */}
            <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
              <div className='text-gray-500 mb-4'>type</div>
              <h1 className='text-3xl font-bold mb-4'>{question.title}</h1>
              <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                <FaMapMarker className='text-orange-700 mr-1' />
                <p className='text-orange-700'>location</p>
              </div>

              <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                Question Description
              </h3>

              <p className='mb-4'>{question.content}</p>

              <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                Question Details
              </h3>
              <div className='text-gray-400 my-3 mb-2'>Created By: {question.user.userName}</div>
              <div className='text-gray-400 my-3 mb-2'>Created At: {question.createdAt}</div>
              <div className='text-gray-400 my-3 mb-2'>Tags: {question.tags.map(tag=>tag.name+" ")}</div>
              <div className='text-gray-400 my-3 mb-2'>Votes: {question.totalVotes}</div>
              <div className='text-gray-400 my-3 mb-2'>Answers: {question.answers.length}</div>
            </div>
            
            {/* <!-- Answers --> */}
            <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
              {question.answers.map((answer) => (
                  <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                  <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                    Answer Description
                  </h3>

                  <p className='mb-4'>{answer.content}</p>

                  <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                    Answer Details
                  </h3>
                  <div className='text-gray-400 my-3 mb-2'>Created By: {answer.user.userName}</div>
                  <div className='text-gray-400 my-3 mb-2'>Created At: {answer.createdAt}</div>
                  <div className='text-gray-400 my-3 mb-2'>Votes: {question.totalVotes}</div>
                </div>
                ))}
            </div>

            {isLoggedIn? (<>
                {/* <!-- Add Answer --> */}
                <div className='bg-white p-6 rounded-lg shadow-md'>
                  <form onSubmit={submitAddAnswerForm}>
                  
                    <div className='mb-4'>
                      <label
                        htmlFor='answer'
                        className='block text-gray-700 font-bold mb-2'>
                        Answer
                      </label>
                      <textarea
                        id='answer'
                        name='answer'
                        className='border rounded w-full py-2 px-3'
                        rows='4'
                        placeholder='Add Answer...'
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <button className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'type='submit'>
                        Add Answer
                      </button>
                    </div>
                  </form>
                </div>
            </>): <></>}
            
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`${backendUrl}/api/Questions?Id=${params.id}`);
  const data = await res.json();
  return data;
};

export { QuestionPage as default, jobLoader };
