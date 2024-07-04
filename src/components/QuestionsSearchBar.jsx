import React, { useState } from 'react';
import { createSearchParams, useNavigate } from "react-router-dom";



const QuestionsSearchBar = ({searchedTag}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchedTag);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate({
        pathname: "/questions",
        search: createSearchParams({
            tag: query
        }).toString()
    });
    navigate(0);
  };

  return (
    
    <section className='bg-indigo-50'>
    <div className='container m-auto'>
      <div className='bg-white shadow-md rounded-md border m-4 md:m-0'>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
            

                <div className='mb-4'>
                <input
                type='text'
                id='query'
                name='query'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Search For Tag...'
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
                </div>

                <div>
                    <button
                    className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type='submit'
                    >
                    Search
                    </button>
                </div>
            </div>
          
          
        </form>
      </div>
    </div>
  </section>
    
  );
};

export default QuestionsSearchBar;