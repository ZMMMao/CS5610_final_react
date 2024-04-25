import React, { useEffect } from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import MultipleChoice from "./Editors/MultipleChoice";
import QuizEditor from "./QuizEditor";
import { useDispatch, useSelector } from "react-redux";

import { KanbasState } from "../../store";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import QuestionsList from "./QuestionsList";
import "./Editor.css";

import * as client from "./client";
import { setQuiz } from "./quizzesReducer";

function Editor() {
  const { quizId } = useParams();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizData = useSelector(
    (state: KanbasState) => state.quizzesReducer.quiz,
  );

  useEffect(() => {
    client
      .findQuizById(quizId)
      .then((quizData) => {
        dispatch(setQuiz(quizData));
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("This quiz has been deleted or does not exist.");
          navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        }
      });
  }, [quizId]);

  console.log(quizData);
  return (
    <div>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <h3 className="me-3">Points: {quizData.points}</h3>
        <h3 style={{ color: quizData.published ? "green" : "grey" }}>
          {quizData.published ? (
            <>
              <FaCheckCircle /> published
            </>
          ) : (
            <>
              <FaBan /> Not published
            </>
          )}
        </h3>
      </div>
      <hr />
      <nav className="nav nav-tabs mt-2">
        <NavLink
          to="EditDetails"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Details
        </NavLink>
        <NavLink
          to="Questions"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Questions
        </NavLink>
      </nav>

      <Routes>
        <Route index element={<Navigate replace to="EditDetails" />} />
        <Route path="EditDetails" element={<QuizEditor />} />
        <Route path="Questions" element={<QuestionsList />} />
      </Routes>
    </div>
  );
}

export default Editor;
