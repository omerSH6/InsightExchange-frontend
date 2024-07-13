
// Utility function for random color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  

const Metadata = ({ listing: data }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg flex">
          
            <div className="flex text-gray-500 space-x-4">
                        {data.user?.userName && (
                        <div>
                            <span className="font-semibold">Created By:</span> {data.user.userName}
                        </div>
                        )}
                        {data.createdAt && (
                        <div>
                            <span className="font-semibold">Created At:</span> {new Date(data.createdAt).toLocaleString()}
                        </div>
                        )}
                        {typeof data.totalVotes === 'number' && (
                        <div>
                            <span className="font-semibold">Votes:</span> {data.totalVotes}
                        </div>
                        )}
                        {typeof data.totalAnswers === 'number' && (
                        <div>
                            <span className="font-semibold">Answers:</span> {data.totalAnswers}
                        </div>
                        )}
                        {data.tags?.length > 0 && (
                            <div className="flex space-x-3">
                            {data.tags.map((tag, index) => (
                                <span
                                key={index}
                                className="px-2 py-1 rounded-full text-white text-sm"
                                style={{ backgroundColor: getRandomColor() }}
                                >
                                {tag.name}
                                </span>
                            ))}
                            </div>
                        )}
            </div>
          
        </div>
    );
  };
  
  export default Metadata;