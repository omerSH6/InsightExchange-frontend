import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendUrl } from "../config";
import { useAuth } from "../context/AuthContext";


const QuestionApprovalForm = ({id}) => {
    const [approve, setApprove] = useState(null);
    const navigate = useNavigate();
    const { token } = useAuth();

    const approveQuestion = async (questionId, shouldApprove) => {
        let questionState = 2;
        if(shouldApprove == true){
          questionState = 0;
        }
        if(shouldApprove == false){
          questionState = 1;
        }
    
        const requestBody = {
          questionId: questionId,
          questionState: questionState
        };
    
        const res = await fetch(`${backendUrl}/api/administrator/editQuestionState`, {
          method: "PUT",
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
    
    const submitApproveForm = (e) => {
        e.preventDefault();
        const shouldApprove = approve == true? true:false;
        const wasApproved = shouldApprove? "Approved":"Disapproved";
        approveQuestion(id, shouldApprove)
        .then(() => {
            toast.success(`Question ${wasApproved} Successfully`);
            return navigate("/questions?pending=true");
        })
        .catch((error) => {
            toast.error(`Failed To ${wasApproved} Question`);
            return;
        })
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={submitApproveForm}>
                <div className="flex space-x-3">
                    <button className="bg-green-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit" onClick={()=>setApprove(true)}>
                    Approve
                    </button>
                    <button className="bg-red-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit" onClick={()=>setApprove(false)}>
                    Disapprove
                    </button>
                </div>
            </form> 
        </div>
  );
};
export default QuestionApprovalForm;
