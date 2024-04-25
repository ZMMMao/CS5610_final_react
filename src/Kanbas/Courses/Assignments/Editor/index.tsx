import "./index.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import db from "../../../Database";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { 
  addAssignment, 
  deleteAssignment, 
  updateAssignment, 
  setAssignment 
} from "../assignmentsReducer";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";

function AssignmentEditor() {
    const { assignmentId } = useParams();
    const assignmentList = useSelector(
      (state: KanbasState) => state.assignmentsReducer.assignments
    );
    const assignment = useSelector(
      (state: KanbasState) => state.assignmentsReducer.assignment
    );
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSave = () => {
      if (assignmentId === "New") {
        //dispatch(addAssignment({ ...assignment, course: courseId }));
        client.createAssignment(courseId, assignment).then((assignment) => {
          dispatch(addAssignment(assignment));
        });
      } else {
        //dispatch(updateAssignment({ ...assignment, _id: assignmentId, course: courseId }));
        client.updateAssignment(assignment).then((status) => {
          dispatch(updateAssignment(assignment));
        });
      }
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
        console.log("New assignment created");
    };
    const handleCancel = () => {
        dispatch(setAssignment({
          ...assignment,
          title: "New Assignment",
          start: "2024-01-01",
          due: "2024-01-31",
          points: "100",
        }));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
        console.log("New assignment canceled");
    };

    return (
      <div className="ms-3 me-2" style={{ width: "90%" }}>
        <div className="row">
          <div>
            <button className="btn btn-secondary button-color float-end">
              <FaEllipsisV />
            </button>
            <div className="float-end me-3 mt-1">
              <FaCheckCircle className="circle-icon" />
              <span className="publish-text">Published</span>
            </div>
          </div>
        </div>
        <hr />

        <div className="mb-3 row">
          <label htmlFor="assignment-name">Assignment Name</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="assignment-name"
              value={assignment?.title}
              onChange={(e) =>
                dispatch(
                  setAssignment({ ...assignment, title: e.target.value })
                )
              }
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div>
            <textarea
              className="form-control"
              onChange={(e) =>
                dispatch(
                  setAssignment({ ...assignment, description: e.target.value })
                )
              }
            >
              This is the assignment description.
            </textarea>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="points" className="col-sm-2 col-form-label">
            Points
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="points"
              value={assignment?.points}
              onChange={(e) =>
                dispatch(
                  setAssignment({ ...assignment, points: e.target.value })
                )
              }
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="assignment-group" className="col-sm-2 col-form-label">
            Assignment Group
          </label>
          <div className="col-sm-10">
            <select id="assignment-group" className="form-control">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="display-grad" className="col-sm-2 col-form-label">
            Display Grade as
          </label>
          <div className="col-sm-10">
            <select id="display-grad" className="form-control">
              <option>Percentage</option>
              <option>Whole Points</option>
              <option>Letter Grade</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-2"></div>
          <div className="col-8">
            <input
              type="checkbox"
              name="do-not-count"
              id="count-final"
              style={{ marginRight: "5px" }}
            />
            Do not count this assignment towards final grade
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-sm-2 col-form-label">Submission Type</div>
          <div className="col-sm-10 submission-border submission-spacing">
            <select id="submission-type" className="form-control">
              <option>Online</option>
              <option>In Person</option>
            </select>
            <div className="mt-3">Online Entry Options</div>
            <div className="mt-3">
              <input type="checkbox" name="online-entry-options" /> Text Entry
              <br />
              <input type="checkbox" name="online-entry-options" /> Website URL
              <br />
              <input type="checkbox" name="online-entry-options" /> Media
              Recordings
              <br />
              <input type="checkbox" name="online-entry-options" /> Student
              Annotation
              <br />
              <input type="checkbox" name="online-entry-options" /> File Uploads
              <br />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-2 col-form-label">Assign</div>
          <div className="col-sm-10 submission-border submission-spacing">
            <div className="mb-3">
              <label htmlFor="assign">Assign to</label>
              <select id="assign" className="form-control">
                <option>Everyone</option>
                <option>Sections</option>
                <option>Groups</option>
                <option>Individuals</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="assign">Due</label>
              <input
                type="date"
                id="assign"
                className="form-control"
                value={assignment?.due}
                onChange={(e) =>
                  dispatch(
                    setAssignment({ ...assignment, due: e.target.value })
                  )
                }
              />
            </div>

            <div className="row">
              <div className="mb-3 col-6">
                <label htmlFor="assign">Available from</label>
                <input
                  type="date"
                  id="assign"
                  className="form-control"
                  value={assignment?.start}
                  onChange={(e) =>
                    dispatch(
                      setAssignment({ ...assignment, start: e.target.value })
                    )
                  }
                />
              </div>

              <div className="mb-3 col-6">
                <label htmlFor="assign">Until</label>
                <input
                  type="date"
                  id="assign"
                  className="form-control"
                  value={assignment?.due}
                  onChange={(e) =>
                    dispatch(
                      setAssignment({ ...assignment, title: e.target.value })
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col-2"></div>
          <div className="col-10">
            <button className="btn btn-secondary button-color add-button form-control">
              <i className="fa fa-plus"></i> Add
            </button>
          </div>
        </div>
        <hr />

        <div className="mb-3 row">
          <div className="col-6">
            <input
              type="checkbox"
              name="notify"
              id="notify-user"
              style={{ marginRight: "5px" }}
            />
            Notify users that this content has changed
          </div>
          <div className="col-6">
            <button onClick={handleSave} className="btn btn-danger float-end">
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn btn-secondary button-color float-end me-1"
            >
              Cancel
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
}

export default AssignmentEditor;
