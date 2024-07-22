
import { backendUrl } from "../config";

const fetchQuestionsImp = async ({isLoggedIn, token, pending, tag}) => {
  let apiUrl = "";
 if(pending == false){
    apiUrl = `${backendUrl}/api/Questions/pagination?${tag?("tag="):("")}${tag}&SortBy=0&SortDirection=0&Page=1&PageSize=10`;
  }else{
    apiUrl = `${backendUrl}/api/Administrator/getPendingQuestionsWithPagination?${tag?("tag="):("")}${tag}&SortBy=0&SortDirection=0&Page=1&PageSize=10`;
  }
    
  return await fetchDataImp(isLoggedIn, token, apiUrl);
};

const fetchQuestionImp = async ({isLoggedIn, token, id, pending}) => {
  let apiUrl = '';
  if(pending){
    apiUrl = `${backendUrl}/api/Administrator/getPendingQuestion?QuestionId=${id}`;
  }else{
    apiUrl = `${backendUrl}/api/Questions?QuestionId=${id}`;
  }

  return await fetchDataImp(isLoggedIn, token, apiUrl);
};

const fetchDataImp = async (isLoggedIn, token, apiUrl) => {
  try {
    let requestOptions = {}
    if(isLoggedIn){
      requestOptions = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    }
    const res = await fetch(apiUrl, requestOptions);
    if(!res.ok){
      throw new Error("Network response was not ok"); 
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data ${error}`);
  }
};



const fetchPendingQuestions = async (isLoggedIn, token, tag) => await fetchQuestionsImp({isLoggedIn, token, pending: true, tag});

const fetchQuestionsByTag = async (isLoggedIn, token, tag) => await fetchQuestionsImp({isLoggedIn, token, pending:false, tag});

const fetchPendingQuestion = async (isLoggedIn, token, id) => await fetchQuestionImp({isLoggedIn, token, id, pending:true});

const fetchQuestion = async (isLoggedIn, token, id) => await fetchQuestionImp({isLoggedIn, token, id, pending:false});

export {
  fetchPendingQuestions,
  fetchQuestionsByTag,
  fetchPendingQuestion,
  fetchQuestion,
};