import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../config";


const Vote = ({ initialVotes, wasVotedByCurrentUser, voteType, id}) => {
  const { isLoggedIn, token, userRole } = useAuth();
  const navigate = useNavigate();

  const handleDelete = () => {
    DeleteImp(voteType, id)
      .then(() => {
        toast.success(`Successfully deleted ${voteType}`);
        setTimeout(() => {
          if(voteType == 'question'){
            navigate("/")
          }
          navigate(0)
     }, 1000);
      })
      .catch((error) => {
        toast.error(`Failed delete ${voteType}`);
        return;
      });
  };

  const handleUpVote = () => {
    if(IsValidVote()){
      Vote(true);
    }
  };

  const handleDownVote = () => {
    if(IsValidVote()){
      Vote(false);
    }
  };

  const IsValidVote = () => {
    if(!isLoggedIn){
      toast.error("Log in to vote!");
      return false;
    }

    if(wasVotedByCurrentUser){
      toast.error(`You already voted for this ${voteType}`);
      return false;
    }

    return true;
  }

  const Vote = (isPositiveVote) => {
    VoteImp(isPositiveVote, voteType, id)
      .then(() => {
        toast.success(`Successfully voted for ${voteType}`);
        setTimeout(() => {
          navigate(0)
     }, 1000);
      })
      .catch((error) => {
        toast.error(`Failed to vote for ${voteType}`);
        return;
      });
  };

  const VoteImp = async (isPositiveVote, voteType, id) => {
    let requestBody = {
      isPositiveVote: isPositiveVote,
    };
    requestBody[`${voteType}Id`] = id;
    const res = await fetch(`${backendUrl}/api/Votes/${voteType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },

      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  };

  const DeleteImp = async (voteType, id) => {
    let requestBody = {};
    requestBody[`${voteType}Id`] = id;
    let apiUrl= "";
    if(voteType == 'question'){
      apiUrl = `${backendUrl}/api/Administrator/deleteQuestion`;
    }else{
      apiUrl = `${backendUrl}/api/Administrator/deleteAnswer`;
    }
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },

      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
  };



  return (
    <div className="flex flex-col items-center">
      <button onClick={handleUpVote} className="text-gray-400 hover:text-indigo-800">
        <FaArrowUp />
      </button>
      <span className="text-gray-500 my-2">{initialVotes}</span>
      <button onClick={handleDownVote} className="text-gray-400 hover:text-indigo-800">
        <FaArrowDown />
      </button>
        {isLoggedIn & userRole=='Admin'? (
          <button onClick={handleDelete} className="bg-red-500 hover:bg-indigo-600 text-white font-bold py-1 px-1 rounded-full w-full focus:outline-none focus:shadow-outline">Delete {voteType}</button>
        ) : (
          <></>
        )}
    </div>
  );
};

export default Vote;