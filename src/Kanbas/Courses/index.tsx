import { useState, useEffect } from "react";
import "./index.css";
import "../../Kanbas/style.css";
import db from "../../Kanbas/Database";
import {
  Navigate,
  Route,
  Routes,
  useParams,
  useLocation,
} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import Quizzes from "./Quizzes";
import axios from "axios";
import * as client from "../client";
import QuizDetail from "./Quizzes/Detail";
import QuizPreview from "./Quizzes/Preview";
import QuizEditor from "./Quizzes/QuizEditor";
import Editor from "./Quizzes/Editor";
import QuestionsList from "./Quizzes/QuestionsList";

const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");

  const COURSES_API = `${API_BASE}/api/courses`;

  const [course, setCourse] = useState<any>({ _id: "" });
  console.log(course);

  /*
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };
  */
  const findCourseById = async (courseId: any) => {
    const course = await client.findCourseById(courseId);
    setCourse(course);
  };

  // Build breadcrumbs dynamically based on pathArray
  const buildBreadcrumbs = () => {
    const elements = [];

    // Course number and name
    if (course && course.number && course.name) {
      elements.push(
        <li className="breadcrumb-item">
          <a href="#" className="breadcrumb-text text-danger">
            {course.number} {course.name}
          </a>
        </li>,
      );
    }

    // middle path elements
    pathArray.slice(4, pathArray.length - 1).forEach((segment) => {
      elements.push(
        <li className="breadcrumb-item">
          <a href="#" className="breadcrumb-text text-danger">
            {decodeURIComponent(segment)}
          </a>
        </li>,
      );
    });

    // Current page
    let currentSegment = pathArray[pathArray.length - 1];
    if (pathArray[pathArray.length - 2] === "Preview") {
      currentSegment = "Q" + currentSegment;
    }
    elements.push(
      <li className="breadcrumb-item active" aria-current="page">
        {decodeURIComponent(currentSegment).replace(/_/g, " ")}
      </li>,
    );

    return elements;
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  return (
    <div>
      <div className="breadcrumb-container">
        <nav aria-label="breadcrumb" className="d-flex justify-content-between">
          <ol className="breadcrumb">
            <li>
              <a href="#" className="text-danger icon-style">
                <HiMiniBars3 />
              </a>
            </li>
            {buildBreadcrumbs()}
          </ol>
          <button className="btn btn-secondary button-color float-end">
            <FaEye /> Student View
          </button>
        </nav>
        <hr />
      </div>
      <div className="d-flex">
        <CourseNavigation />
        <div className="col-lg-10">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Grades" element={<Grades />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId" element={<QuizDetail />} />
            <Route path="Quizzes/:quizId/Edit" element={<Editor />}>
              <Route path="Questions" element={<QuestionsList />} />
              <Route path="EditDetails" element={<QuizEditor />} />
            </Route>
            <Route
              path="Quizzes/:quizId/Preview/:questionNumber"
              element={<QuizPreview />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;
