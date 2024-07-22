import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuth } from '../Services/AuthContextService';

const Navbar = () => {
  const { isLoggedIn, userName, logout } = useAuth();
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';
  const loginLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-md px-3 py-2'
      : 'bg-blue-500 text-white hover:bg-blue-700 hover:text-white rounded-md px-3 py-2';
  const registerLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-green-600 text-white hover:bg-green-700 hover:text-white rounded-md px-3 py-2'
      : 'bg-green-500 text-white hover:bg-green-700 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className='bg-indigo-700 border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='Insight Exchange' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
              Insight Exchange
              </span>
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
                <NavLink to='/' className={linkClass}>
                  Home
                </NavLink>
                <NavLink to='/questions' className={linkClass}>
                  Questions
                </NavLink>
               

                
                {isLoggedIn ? (
                  <>
                  <NavLink to='/add-question' className={linkClass}>
                    Add Question
                  </NavLink>
                  <button className='bg-blue-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline' onClick={logout}>
                    Log out From: {userName}
                  </button>
                  </>
                    ) : (
                      <><NavLink to='/login' className={loginLinkClass}>
                      Login
                    </NavLink><NavLink to='/register' className={registerLinkClass}>
                        Register
                      </NavLink></>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
