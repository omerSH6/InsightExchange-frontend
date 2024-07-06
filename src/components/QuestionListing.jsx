import { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ListingMetadata from './ListingMetadata'


const QuestionListing = ({ question }) => {
  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4 flex items-center justify-between'>
        <div className='flex-1'>
          <h3 className='text-xl font-bold'>{question.title}</h3>
        </div>
        <div>
          <Link
            to={`/question/${question.id}`}
            className='bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm inline-block'
          >
            Read More
          </Link>
        </div>
      </div>

      <div className='p-4'>
        <div className='mb-5'>{question.previewContent}...</div>
        
      </div>
      <ListingMetadata listing={question} />
    </div>
  );
};

export default QuestionListing;
