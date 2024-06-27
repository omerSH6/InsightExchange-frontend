import { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const QuestionListing = ({ question: question }) => {
  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4'>
        <div className='mb-6'>
          <h3 className='text-xl font-bold'>{question.title}</h3>
        </div>

        <div className='mb-5'>{question.previewContent}...</div>
        <div className='text-gray-400 my-3 mb-2'>Created By: {question.user.userName}</div>
        <div className='text-gray-400 my-3 mb-2'>Created At: {question.createdAt}</div>
        <div className='text-gray-400 my-3 mb-2'>Tags: {question.tags.map(tag=>tag.name+" ")}</div>
        <div className='text-gray-400 my-3 mb-2'>Votes: {question.totalVotes}</div>
        <div className='text-gray-400 my-3 mb-2'>Answers: {question.totalAnswers}</div>


        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <Link
            to={`/question/${question.id}`}
            className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default QuestionListing;
