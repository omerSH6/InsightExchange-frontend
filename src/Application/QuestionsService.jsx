import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { fetchPendingQuestions, fetchQuestionsByTag, fetchPendingQuestion, fetchQuestion } from '../DAL/BackendAccess.jsx';

export function getQuestions({ tag = null, pending = false }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedQuestions = [];
        if (pending) {
          fetchedQuestions = await fetchPendingQuestions(isLoggedIn, token, tag);
        }else {
          fetchedQuestions = await fetchQuestionsByTag(isLoggedIn, token, tag);
        }
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tag, pending]);

  return {
    questions,
    loading,
  };
}

export function getQuestion({id, pending = false }) {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedQuestion = [];
        if (pending) {
          fetchedQuestion = await fetchPendingQuestion(isLoggedIn, token, id);
        }else {
          fetchedQuestion = await fetchQuestion(isLoggedIn, token, id);
        }
        setQuestion(fetchedQuestion);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pending]);

  return {
    question,
    loading,
  };
}