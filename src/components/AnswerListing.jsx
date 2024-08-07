import Vote from './Vote'
import ListingMetadata from './ListingMetadata'
import { useAuth } from "../context/AuthContext";


const AnswerListing = ({ answer }) => {
    const { isLoggedIn } = useAuth();
    return (
        <div className="bg-white rounded-lg shadow-md mt-6">
            <div className="p-6  flex">
                    {isLoggedIn? (<>
                        <div className="mr-6">
                            <Vote initialVotes={answer.totalVotes} wasVotedByCurrentUser={answer.wasVotedByCurrentUser} voteType="answer" id={answer.id}/>
                        </div>
                    </>):(<></>)}
                    

                    <div className="flex-1">
                        <h3 className="text-indigo-800 text-lg font-bold mb-6">
                            Answer:
                        </h3>
                        <p className="mb-4">{answer.content}</p>
                        
                       
                    </div>
                    
            </div>
            <ListingMetadata listing = {answer} />
        </div>
      
    );
  };
  
  export default AnswerListing;