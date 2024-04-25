import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
      id: 1,
      title: "NodeJS Assignment",
      description: "Create a NodeJS server with ExpressJS",
      due: "2021-10-10",
      completed: false,
      score: 0
    });
    const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;

    const [module, setModule] = useState({
      id: "M1",
      name: "NodeJS",
      description: "NodeJS basics",
      course: "RS101"
    });
    const MODULE_URL = `${API_BASE}/a5/module`;

    const fetchAssignment = async () => {
      const response = await axios.get(`${ASSIGNMENT_URL}`);
      setAssignment(response.data);
    };
    const updateTitle = async () => {
      const response = await axios.get(
        `${ASSIGNMENT_URL}/title/${assignment.title}`
      );
      setAssignment(response.data);
    };
    useEffect(() => {
      fetchAssignment();
    }, []);

    return (
      <div>
        <h3>Working With Objects</h3>
        <h4>Retrieving Objects</h4>
        <a className="btn btn-primary" href={`${API_BASE}/a5/assignment`}>
          Get Assignment
        </a>
        <h4>Retrieving Properties</h4>
        <a className="btn btn-primary" href={`${API_BASE}/a5/assignment/title`}>
          Get Title
        </a>
        <a
          className="btn btn-primary ms-2"
          href={`${API_BASE}/a5/assignment/score`}
        >
          Get Score
        </a>
        <a
          className="btn btn-primary ms-2"
          href={`${API_BASE}/a5/assignment/completed`}
        >
          Get Completed Status
        </a>
        <h4>Modifying Properties</h4>
        <input
          type="text"
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
          value={assignment.title}
        />
        <button className="btn btn-primary ms-2 mb-2" onClick={updateTitle}>
          Update Title to: {assignment.title}
        </button>
        <a
          className="btn btn-primary ms-2 mb-2"
          href={`${ASSIGNMENT_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
        <br />
        <button className="btn btn-danger mb-2" onClick={fetchAssignment}>
          Fetch Assignment
        </button>
        <br />
        <input
          type="number"
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })
          }
          value={assignment.score}
        />
        <a
          className="btn btn-primary ms-2 mb-2"
          href={`${ASSIGNMENT_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
        <br />
        <input
          type="checkbox"
          id="completed"
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
          checked={assignment.completed}
        />
        <label htmlFor="completed">Completed</label>
        <a
          className="btn btn-primary ms-2"
          href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>

        <h4>Retrieving Module</h4>
        <a className="btn btn-primary" href={`${API_BASE}/a5/module`}>
          Get Module
        </a>
        <h4>Retrieving Module Name</h4>
        <a className="btn btn-primary" href={`${API_BASE}/a5/module/name`}>
          Get Module Name
        </a>
        <a
          className="btn btn-primary ms-2"
          href={`${API_BASE}/a5/module/description`}
        >
          Get Module Description
        </a>
        <h4>Modifying Module Properties</h4>
        <input
          type="text"
          onChange={(e) => setModule({ ...module, name: e.target.value })}
          value={module.name}
        />
        <a
          className="btn btn-primary ms-2 mb-2"
          href={`${MODULE_URL}/name/${module.name}`}
        >
          Update Module Name
        </a>
        <br />
        <input
          type="text"
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
          value={module.description}
        />
        <a
          className="btn btn-primary ms-2"
          href={`${MODULE_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
        <br />
        <br />
      </div>
    );
}
export default WorkingWithObjects;
