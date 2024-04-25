import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./index.css";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaClipboard,
  FaBan,

} from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import db from "../../Database";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "./quizzesReducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";

function Quizzes() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes,
  ).filter((quiz) => quiz.course === courseId);

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const newQuizPage = () => {
    const newQuiz = {
      title: "New Quiz",
      type: "GRADED QUIZ",
      assignment_group: "QUIZZES",
      shuffle: true,
      time_limit: 20,
      multiple_attempts: false,
      show_correct_answers: "AFTER DEADLINE",
      access_code: "",
      one_question_at_a_time: true,
      webcam_required: false,
      lock_questions_after_answering: false,
      due_date: "2024-01-31",
      available_date: "2024-01-01",
      until_date: "2024-01-31",
      points: "100",
      published: false,
      questions: [],
    };
    client.createQuiz(courseId, newQuiz).then((quiz) => {
      console.log(quiz);
      dispatch(addQuiz(quiz));
      dispatch(setQuiz(quiz));
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
    });
    console.log("Navigate to new quiz page");
  };

  const navigateEditButton = (quiz: any) => {
    dispatch(setQuiz(quiz));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
  };

  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // month - 1 because month in Date object is 0-based
  };

  const getQuizAvailabilityStatus = (quiz: any) => {
    const currentDate = new Date();
    const availableDate = parseDate(quiz.available_date);
    const untilDate = parseDate(quiz.until_date);

    if (currentDate > untilDate) {
      return <b>Closed</b>;
    } else if (currentDate >= availableDate && currentDate <= untilDate) {
      return <b>Available</b>;
    } else {
      return (
        <>
          <b>Not available until</b> {quiz.available_date}
        </>
      );
    }
  };
  // Use a state to store the correct quiz id to be deleted.
  // Otherwise, the deletion dialog Modal will use the wrong quiz id
  // (which is always the last quiz id in the quiz list executed).
  const [quizIdToDelete, setQuizIdToDelete] = useState(null);
  const [dialogShow, setDialogShow] = useState(false);

  const [visibleDropdowns, setVisibleDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const handleDropdownToggle = (quizId: string) => {
    setVisibleDropdowns((prevVisibleDropdowns) => ({
      ...prevVisibleDropdowns,
      [quizId]: !prevVisibleDropdowns[quizId],
    }));
  };


  const handleDialogClose = () => setDialogShow(false);

  const handleDeleteClick = (quizId: any) => {
    dispatch(setQuiz({ _id: quizId }));
    console.log(quiz);
    setQuizIdToDelete(quizId);
    setDialogShow(true);
  };

  const handleDeleteConfirmation = () => {
    client.deleteQuiz(quizIdToDelete).then((status) => {
      dispatch(deleteQuiz(quizIdToDelete));
      console.log(quizIdToDelete);
      handleDialogClose();
    });
  };


  const handleListPagePublish = (quiz: any) => {
    const newPublished = !quiz.published;
    const updatedQuiz = {
      ...quiz,
      published: newPublished,
    };
    dispatch(setQuiz(updatedQuiz));
    client.updateQuiz(updatedQuiz).then((status) => {
      dispatch(updateQuiz(updatedQuiz));
    });
  };


  useEffect(() => {
    client.findQuizzesForCourse(courseId).then((quizzes) => {
      dispatch(setQuizzes(quizzes));
      console.log(quizzes);
    });
  }, [courseId]);

  return (
    <div className="ms-3 col-lg-10">
      <div className="d-flex justify-content-between">
        <div className="me-2">
          <input
            type="text"
            className="form-control ms-1"
            placeholder="Search for Quiz"
            id="search-quiz"
          />
        </div>
        <div className="float-end">
          <button className="btn btn-danger me-1" onClick={newQuizPage}>
            <FaPlus /> Quiz
          </button>
          <button className="btn btn-secondary me-1 button-color button-size">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> QUIZZES
          </div>
          <ul className="list-group">
            {quizList.map((quiz) => (
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>
                    <FaEllipsisV className="me-2" />
                    <FaClipboard className="me-4" style={{ color: "green" }} />
                    <Link
                      to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}

                      className="quiz-setup"
                      onClick={() => dispatch(setQuiz(quiz))}
                    >
                      <b>{quiz.title}</b> <br />
                      <p className="due-info">
                        <table className="fixed">
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td>{getQuizAvailabilityStatus(quiz)}</td>
                              <td>
                                <b>Due</b> {quiz.due_date} at 11:59pm
                              </td>
                              <td>{quiz.points}pts</td>
                              <td>{quiz.questions.length} Questions</td>
                            </tr>
                          </tbody>
                        </table>

                      </p>
                    </Link>
                  </div>
                  <div className="float-end">
                    {quiz.published ? (
                      <FaCheckCircle
                        className="ms-2 text-success me-2"
                        onClick={() => {
                          handleListPagePublish(quiz);
                        }}
                      />
                    ) : (
                      <FaBan
                        className="ms-2 text-secondary me-2"
                        onClick={() => {
                          handleListPagePublish(quiz);
                        }}
                      />
                    )}
                    <div className="float-end">
                      <FaEllipsisV
                        onClick={() => handleDropdownToggle(quiz._id)}
                      />
                      {visibleDropdowns[quiz._id] && (
                        <ul className="list-group">
                          <li className="list-group-item">
                            <button
                              className="btn btn-secondary"
                              style={{ height: "30px", fontSize: "14px" }}
                              onClick={() => navigateEditButton(quiz)}
                            >
                              Edit
                            </button>
                          </li>
                          <li className="list-group-item">
                            <button
                              className="btn btn-danger"
                              style={{ height: "30px", fontSize: "14px" }}
                              onClick={() => handleDeleteClick(quiz._id)}
                            >
                              Delete
                            </button>
                          </li>
                          <li className="list-group-item">
                            <button
                              className={`btn ${
                                quiz.published ? "btn-danger" : "btn-success"
                              } me-1 button-size`}
                              style={{ height: "30px", fontSize: "14px" }}
                              onClick={() => handleListPagePublish(quiz)}
                            >
                              {quiz.published ? "Unpublish" : "Publish"}
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>

                  </div>
                  <Modal show={dialogShow} onHide={handleDialogClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Quiz?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to delete this quiz?</Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-danger"
                        onClick={handleDeleteConfirmation}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleDialogClose}
                      >
                        Cancel
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Quizzes;
