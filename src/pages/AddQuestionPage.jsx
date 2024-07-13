import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backendUrl } from '../config';
import { useAuth } from "../contexts/AuthContext";

const AddQuestionPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const { isLoggedIn, token } = useAuth();

  const navigate = useNavigate();
  const addQuestion = async (title, description, tags) => {
    const requestBody = {
      title: title,
      content: description,
      tags: tags.split(',')
    };
  
    const res = await fetch(`${backendUrl}/api/Questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  };
  const submitForm = (e) => {
    e.preventDefault();

    addQuestion(title, description, tags)
    .then(()=>{
      toast.success('Question Created Successfully');
      return navigate(`/`);
    })
    .catch((error)=>{
      toast.error('Failed To Create Question');
      return;
    });
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Add Question</h2>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

           

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Tags
              </label>
              <input
                type='text'
                id='tags'
                name='tags'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'type='submit'>
                Add Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddQuestionPage;
