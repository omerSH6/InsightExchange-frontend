import QuestionListings from '../components/QuestionListings';
import { useSearchParams } from 'react-router-dom';
import QuestionsSearchBar from '../components/QuestionsSearchBar'

const QuestionsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  const pending = searchParams.get("pending");
  return (
    <section className='bg-blue-50 px-4 py-6'>
      {!pending?(<>
      <QuestionsSearchBar searchedTag={tag}/>
      </>):(<></>)}
      <QuestionListings tag={tag} pending={pending}/>
    </section>
  );
};
export default QuestionsPage;
