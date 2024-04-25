import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { setQuiz } from "../quizzesReducer";
import { BsExclamationCircle, BsQuestionCircle } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import "./index.css";
import DOMPurify from "dompurify";

function QuizPreview() {
  const { quizId } = useParams();
  const { courseId } = useParams();
  const { questionNumber } = useParams();

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function getCurrentDateTime() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "America/New_York",
    });
    const [datePart, timePart] = formattedDate.split(", "); // Split date and time
    const [time, ampm] = timePart.split(" "); // Split time and AM/PM
    const formattedTime = `${time}${ampm.toLowerCase()}`; // Convert AM/PM to lowercase
    return { datePart, formattedTime };
  }

  const handleQuestionClick = (index: number) => {
    setSelectedQuestionIndex(index);
  };

  const handleNextQuestion = () => {
    const nextIndex = selectedQuestionIndex + 1;
    setSelectedQuestionIndex(nextIndex);
    // Navigate to the next question, nextIndex + 1 should match the question number being displayed
    navigate(
      `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview/${nextIndex + 1}`,
    );
  };

  const handlePreviousQuestion = () => {
    const previousIndex = selectedQuestionIndex - 1;
    setSelectedQuestionIndex(previousIndex);
    // Navigate to the previous question, previousIndex + 1 should match the question number being displayed
    navigate(
      `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview/${previousIndex + 1}`,
    );
  };

  const createMarkup = (htmlContent: string) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  useEffect(() => {
    client.findQuizById(quizId).then((quiz) => {
      dispatch(setQuiz(quiz));
    });
  }, [quizId, questionNumber]);

  return (
    <div className="ms-5 col-lg-10">
      <div>
        <h3>{quiz?.title}</h3>
        <div className="notification-background">
          <p style={{ color: "red" }}>
            <BsExclamationCircle />
            &nbsp; This is a preview of the{" "}
            {quiz?.published ? "published" : "unpublished"} version of the quiz
          </p>
        </div>
        <h6>
          Started: {getCurrentDateTime().datePart} at{" "}
          {getCurrentDateTime().formattedTime}
        </h6>
        <h3 style={{ paddingTop: "10px" }}>Quiz Instructions</h3>
        <p dangerouslySetInnerHTML={createMarkup(quiz?.description)} />
        <hr />
      </div>
      <div>
        <div className="question-block">
          {/* Display only the selected question */}
          <h6 className="question-header-block">
            <b>
              Question {selectedQuestionIndex + 1} -{" "}
              {quiz?.questions[selectedQuestionIndex]?.type}
            </b>
            <b className="float-end">
              {quiz?.questions[selectedQuestionIndex]?.points} pts
            </b>
          </h6>
          <p
            className="question-content"
            dangerouslySetInnerHTML={createMarkup(
              quiz?.questions[selectedQuestionIndex]?.question_content,
            )}
          />
          <hr />
          <ul
            style={{
              listStyleType:
                quiz?.questions[selectedQuestionIndex]?.choices.length !== 0
                  ? "none"
                  : "decimal",
            }}
          >
            {quiz?.questions[selectedQuestionIndex]?.choices.length !== 0
              ? // Render radio buttons if choices exist
                quiz?.questions[selectedQuestionIndex]?.choices.map(
                  (choice: any, choiceIndex: number) => (
                    <li key={choiceIndex} className="question-choice">
                      <input
                        id={`${quiz?.questions[selectedQuestionIndex]?.title}_${choiceIndex}`}
                        type="radio"
                        name={quiz?.questions[selectedQuestionIndex]?.title}
                        checked={
                          quiz?.questions[selectedQuestionIndex]?.answers[0]
                            ?.content === choice.content
                        }
                      />
                      <label
                        htmlFor={`${quiz?.questions[selectedQuestionIndex]?.title}_${choiceIndex}`}
                      >
                        &nbsp;&nbsp;{choice.content}
                      </label>
                    </li>
                  ),
                )
              : // Render input fields for fill-in-the-blank questions
                quiz?.questions[selectedQuestionIndex]?.answers.map(
                  (answer: any, blankIndex: number) => (
                    <li
                      key={blankIndex}
                      style={{ width: "200px" }}
                      className="question-choice"
                    >
                      <input
                        id={`${quiz?.questions[selectedQuestionIndex]?.title}_${blankIndex}`}
                        className="form-control mb-1"
                        type="text"
                        value={answer.content}
                      />
                    </li>
                  ),
                )}
          </ul>
        </div>
        <div
          className="d-flex justify-content-end"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          {selectedQuestionIndex > 0 && (
            <button
              className="btn btn-secondary preview-button-color"
              onClick={handlePreviousQuestion}
            >
              <GoTriangleLeft /> Previous
            </button>
          )}
          {selectedQuestionIndex < quiz?.questions.length - 1 && (
            <button
              className="btn btn-secondary preview-button-color ms-2"
              onClick={handleNextQuestion}
            >
              Next <GoTriangleRight />
            </button>
          )}
        </div>
      </div>
      <div className="submit-button-background d-flex justify-content-end">
        <p className="quiz-saved-at">
          Quiz saved at {getCurrentDateTime().formattedTime}
        </p>
        <button className="btn btn-danger">Submit Quiz</button>
      </div>
      <br />
      <br />
      <Link
        to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`}
        className="edit-link-setup"
      >
        <div className="edit-button-background">
          <FaPencilAlt style={{ transform: "rotate(270deg)" }} /> Keep Editing
          This Quiz
        </div>
      </Link>
      <br />
      <div>
        <h5 style={{ marginTop: "20px" }}>Questions</h5>
        <div style={{ marginTop: "5px" }}>
          <ul style={{ listStyleType: "none" }}>
            {quiz?.questions.map((question: any, index: number) => (
              <li
                key={index}
                onClick={() => handleQuestionClick(index)}
                style={{ padding: "2px" }}
              >
                <Link
                  to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview/${index + 1}`}
                  className={
                    selectedQuestionIndex === index
                      ? "question-link-selected-setup"
                      : "question-link-unselected-setup"
                  }
                >
                  <BsQuestionCircle /> Question {index + 1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QuizPreview;
