import { Link } from 'react-router-dom';
import Card from './Card';
import { useAuth } from '../Services/AuthContextService';


const HomeCards = () => {
  const { userRole, userName } = useAuth();
  return (
    <section className='py-4'>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-4 p-4 rounded-lg'>
          {(userRole == "anonymousUser")?(<>
          
            <Card bg='bg-indigo-100'>
            <h2 className='text-2xl font-bold'>New User?</h2>
            <p className='mt-2 mb-4'>
              Create a user to ask questions, answer to questions and vote!
            </p>
            <Link
              to='/register'
              className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
            >
              Register
            </Link>
            </Card>
          
          
          </>):(<></>)}

          {(userRole == "Admin")?(<>
          
            <Card bg='bg-indigo-100'>
            <h2 className='text-2xl font-bold'>Wellcome Administrator!</h2>
            <p className='mt-2 mb-4'>
              Watch a list of pending questions to approve!
            </p>
            <Link
              to='/questions?pending=true'
              className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
            >
              Pending Questions
            </Link>
            </Card>
        
        
          </>):(<></>)}
          {(userRole == "User")?(<>
          
            <Card bg='bg-indigo-100'>
            <h2 className='text-2xl font-bold'>Wellcome back!</h2>
            <p className='mt-2 mb-4'>
              Good to see you {userName}!
            </p>
            </Card>
      
      
          </>):(<></>)}
          
        </div>
      </div>
    </section>
  );
};
export default HomeCards;
