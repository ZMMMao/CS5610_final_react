import { useState } from "react";
import { Link } from "react-router-dom";
import db from "../Database";
import "./index.css";

function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
  }[];
  course: {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
  };
  setCourse: (course: {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
  }) => void;
  addNewCourse: () => void;
  deleteCourse: (_id: string) => void;
  updateCourse: () => void;
}) {
  return (
    <div className="p-4">
      <h1>Dashboard</h1> <hr />
      <h2>Published Courses ({courses.length})</h2> <hr />
      <div className="add-course">
        <input
          value={course.name}
          className="form-control"
          placeholder="Course Name"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <input
          value={course.number}
          className="form-control"
          placeholder="Course Number"
          onChange={(e) => setCourse({ ...course, number: e.target.value })}
        />
        <input
          value={course.startDate}
          className="form-control"
          type="date"
          onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
        />
        <input
          value={course.endDate}
          className="form-control"
          type="date"
          onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
        />
        <button className="btn btn-primary" onClick={addNewCourse}>
          Add
        </button>
        <button className="btn btn-warning" onClick={updateCourse}>
          Update
        </button>
      </div>
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <div className="card">
                <img
                  src={`/images/${course.image}`}
                  className="card-img-top"
                  style={{ height: "150px" }}
                />
                <div className="card-body">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card-title card-title-style">
                      {course.number} {course.name}{" "}
                    </div>
                    <p className="card-text card-text-style">{course.name}</p>
                    <div>
                      <button className="btn btn-primary"> Go </button>
                      <div className="float-end">
                        <button
                          className="btn btn-secondary me-1"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
