import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { updateQuiz as updateQuizRedux } from "../Quizzes/quizzesReducer";
import { updateQuiz as updateQuizAPI } from "./client";
import { Editor } from "@tinymce/tinymce-react";

function QuizDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  // Single state object to handle all quiz fields
  const [quizData, setQuizData] = useState(quiz);

  // Update local state when the Redux state changes
  useEffect(() => {
    setQuizData(quiz);
  }, [quiz]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setQuizData((prevData: any) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedQuiz = await updateQuizAPI(quizData);
      dispatch(updateQuizRedux({ ...quizData }));
      // navigate back to quiz detail
      navigate(`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`);

    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleSaveAndPublish = async () => {
    try {
      const updatedQuizData = { ...quizData, published: true };
      const updatedQuiz = await updateQuizAPI(updatedQuizData);
      dispatch(updateQuizRedux({ ...quizData, published: true }));
      // navigate back to quiz list
      navigate(`/Kanbas/Courses/${quiz.course}/Quizzes`);
    } catch (error) {
      console.error("Error updating quiz and publish:", error);
    }
  };

  const handleCancel = () => {
    // navigate back to quiz list
    navigate(`/Kanbas/Courses/${quiz.course}/Quizzes`);
  };

  return (
    <form>
      <br />
      <div className="form-group">
        <div className="mb-3 row">
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleChange}
            className="form-control"
            style={{ width: "98%", marginLeft: "10px" }}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label>
          Quiz Instructions:
          <Editor
            apiKey="e1ioznczok5yus73u6oqwh6dbb6gszw6rln4i87qmz9y4hc2"
            value={quizData.description}
            onEditorChange={(content) =>
              setQuizData((prevData: any) => ({
                ...prevData,
                description: content,
              }))
            }
          />
        </label>
      </div>

      <br />
      <div className="mb-3 row">
        <label htmlFor="quizType" className="col-sm-2 col-form-label">
          Quiz Type:
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="quizType"
            name="type"
            value={quizData.type}
            onChange={handleChange}
          >
            <option value="GRADED QUIZ">Graded Quiz</option>
            <option value="PRACTICE QUIZ">Practice Quiz</option>
            <option value="GRADED SURVEY">Graded Survey</option>
            <option value="UNGRADED SURVEY">Ungraded Survey</option>
          </select>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="assignmentGroup" className="col-sm-2 col-form-label">
          Assignment Group:
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="assignmentGroup"
            name="assignment_group"
            value={quizData.assignment_group}
            onChange={handleChange}
          >
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECT">Project</option>
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="points" className="col-sm-2 col-form-label">
          Points:
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            id="points"
            name="points"
            value={quizData.points}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <h5>Options</h5>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="shuffleAnswers"
              name="shuffle"
              checked={quizData.shuffle}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <div className="form-group d-flex align-items-center">
            <label htmlFor="timeLimit" className="mb-0 mr-2">
              Time Limit:
            </label>
            <div className="input-group mr-2" style={{ width: "auto" }}>
              <input
                type="number"
                className="form-control"
                id="timeLimit"
                name="time_limit"
                value={quizData.time_limit}
                onChange={handleChange}
                style={{ width: "80px" }} // You can adjust the width as needed
              />
            </div>
            <span className="input-group-text">Minutes</span>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="multipleAttempts"
              name="multiple_attempts"
              checked={quizData.multiple_attempts}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="multipleAttempts">
              Allow Multiple Attempts
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="showCorrectAnswers"
              name="show_correct_answers"
              checked={quizData.show_correct_answers}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="showCorrectAnswers">
              Show Correct Answers
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <div className="form-group d-flex align-items-center">
            <label htmlFor="accessCode" className="mb-0 mr-2">
              Access Code:
            </label>
            <div className="input-group mr-2" style={{ width: "auto" }}>
              <input
                type="text"
                className="form-control"
                name="access_code"
                value={quizData.access_code}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="oneQuestionAtATime"
              name="one_question_at_a_time"
              checked={quizData.one_question_at_a_time}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="oneQuestionAtATime">
              One Question at a Time:
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="webcamRequired"
              name="webcam_required"
              checked={quizData.webcam_required}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="webcamRequired">
              Webcam Required:
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-2"></div>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="lockQuestionsAfterAnswering"
              name="lock_questions_after_answering"
              checked={quizData.lock_questions_after_answering}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="lockQuestionsAfterAnswering"
            >
              Lock Questions After Answering:
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-2 col-form-label">Assign</div>
        <div className="col-sm-10">
          <div className="mb-3">
            <label htmlFor="dueDate">Due</label>
            <input
              type="date"
              id="dueDate"
              className="form-control"
              name="due_date"
              value={quizData.due_date}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="mb-3 col-sm-6">
              <label htmlFor="availableDate">Available from</label>
              <input
                type="date"
                id="availableDate"
                className="form-control"
                name="available_date"
                value={quizData.available_date}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 col-sm-6">
              <label htmlFor="untilDate">Until</label>
              <input
                type="date"
                id="untilDate"
                className="form-control"
                name="until_date"
                value={quizData.until_date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="d-flex justify-content-end gap-1">
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSaveAndPublish}
          className="btn btn-secondary"
        >
          Save & Publish
        </button>
        <button type="button" onClick={handleSave} className="btn btn-danger">
          Save
        </button>
      </div>

      <hr />
    </form>
  );
}

export default QuizDetail;
