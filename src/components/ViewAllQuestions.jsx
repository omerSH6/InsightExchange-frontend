import { Link } from 'react-router-dom';

const ViewAllQuestions = () => {
  return (
    <section className='m-auto max-w-lg my-10 px-6'>
      <Link
        to='/questions'
        className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
      >
        View All Questions
      </Link>
    </section>
  );
};
export default ViewAllQuestions;
