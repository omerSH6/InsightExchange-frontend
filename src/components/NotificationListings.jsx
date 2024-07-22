import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { backendUrl } from '../config';
import { useAuth } from "../Services/AuthContextService";


const NotificationListings = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, userId } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
   
      const apiUrl = `${backendUrl}/api/Account/notifications?UserId=${userId}`;
      const requestOptions = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
      try {
        const res = await fetch(apiUrl, requestOptions);
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          Notifications
        </h2>
        {loading? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
            {notifications.map((notification) => (
                <div className="bg-white -100 p-4 rounded-lg flex">
            
                    <div className="flex text-gray-500 space-x-4">
                        <div>
                            <span className="font-semibold">Notification:</span> {notification.content}
                        </div>
                        <div>
                            <span className="font-semibold">at:</span> {new Date(notification.createdAt).toLocaleString()}
                        </div>
                    
                    </div>
                                                
                </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default NotificationListings;
