import "./index.css";
import { FaFilter, FaGear } from "react-icons/fa6";
import db from "../../Database";
import { useParams } from "react-router-dom";
import { FaFileExport, FaFileImport } from "react-icons/fa";

function Grades() {
  const { courseId } = useParams();
  const as = db.assignments.filter((assignment) => assignment.course === courseId);
  const es = db.enrollments.filter((enrollment) => enrollment.course === courseId);
  //console.log("as", as);
  //console.log("es", es);

  return (
    <div>
      <div className="ms-4 me-2">
        <div className="mb-3 row">
          <div>
            <button className="btn btn-secondary button-color button-size float-end">
              <FaGear />
            </button>
            <button className="btn btn-secondary button-color float-end me-1">
              <FaFileExport /> Export
            </button>
            <button className="btn btn-secondary button-color float-end me-1">
              <FaFileImport /> Import
            </button>
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-6">
            <label htmlFor="student-name">Student Names</label>
            <input
              type="text"
              id="student-name"
              className="form-control"
              placeholder="Search Students"
            />
          </div>

          <div className="col-6">
            <label htmlFor="assignment-name">Assignment Names</label>
            <input
              type="text"
              id="assignment-name"
              className="form-control"
              placeholder="Search Assignments"
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div>
            <button className="btn btn-secondary button-color button-style">
              <FaFilter /> Apply Filters
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-secondary">
                <th>Student Name</th>
                {as.map((assignment) => (
                  <th style={{ textAlign: "center" }}>{assignment.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {es.map((enrollment) => {
                const user = db.users.find((user) => user._id === enrollment.user);
                return (
                  <tr>
                    <td className="text-danger">
                      {user?.firstName} {user?.lastName}
                    </td>
                    {as.map((assignment) => {
                      const grade = db.grades.find(
                        (grade) =>
                          grade.student === enrollment.user &&
                          grade.assignment === assignment._id
                      );
                      return (
                        <td className="number-align">{grade?.grade || ""}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Grades;
