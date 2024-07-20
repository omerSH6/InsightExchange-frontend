import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { backendUrl } from "../config";
import { useAuth } from "../contexts/AuthContext";


const AddAnswerForm = ({questionId}) => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("");
    const { token } = useAuth();


    const addAnswer = async (answer) => {
        const requestBody = {
          content: answer,
          questionId: questionId,
        };
    
        const res = await fetch(`${backendUrl}/api/Answers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
    
          body: JSON.stringify(requestBody),
        });
        console.log(token);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
    };

    const submitAddAnswerForm = (e) => {
        e.preventDefault();
        addAnswer(answer)
          .then(() => {
            toast.success("Answer Created Successfully");
            setAnswer("");
            setTimeout(() => {
                navigate(0)
           }, 1000);
          })
          .catch((error) => {
            toast.error("Failed To Create Answer");
            return;
          });
    };

    return (
         <div className="bg-white p-6 rounded-lg shadow-md">
         <form onSubmit={submitAddAnswerForm}>
           <div className="mb-4">
             <label
               htmlFor="answer"
               className="block text-gray-700 font-bold mb-2"
             >
               Answer
             </label>
             <textarea
               id="answer"
               name="answer"
               className="border rounded w-full py-2 px-3"
               rows="4"
               placeholder="Add Answer..."
               value={answer}
               onChange={(e) => setAnswer(e.target.value)}
             ></textarea>
           </div>
           <div>
             <button
               className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
               type="submit"
             >
               Add Answer
             </button>
           </div>
         </form>
       </div>
  );
};
export default AddAnswerForm;
