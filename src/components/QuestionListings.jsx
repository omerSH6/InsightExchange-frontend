import QuestionListing from './QuestionListing';
import Spinner from './Spinner';
import {getQuestions} from '../Services/QuestionsService'

const QuestionListings = ({ isHome = false, tag = null , pending = null}) => {
  const {questions, loading} = getQuestions({tag, pending});

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
            {questions? (<>
              {questions.map((question) => (
                <QuestionListing key={question.id} question={question} pending={pending} />
              ))}
            </>):(<></>)}
          </div>
        )}
      </div>
    </section>
  );
};
export default QuestionListings;
