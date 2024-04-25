import React, { useEffect, useState } from "react";
import "./index.css";
import db from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules
} from "./modulesReducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function ModuleList() {
  const { courseId } = useParams();
  //const modulesList = db.modules.filter((module) => module.course === courseId);
  //const [moduleList, setModuleList] = useState(db.modules);
  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };
  const handleUpdateModule = () => {
    client.updateModule(module).then((status) => {
      dispatch(updateModule(module));
    })
  };

  useEffect(() => {
    client.findModulesForCourse(courseId).then((modules) =>
      dispatch(setModules(modules))
    );
  }, [courseId]);

  /*
  const [module, setModule] = useState({
    _id: "0",
    name: "New Module",
    description: "New Description",
    course: courseId || "",
    lessons: [{ _id: "0", name: "New Lesson", description: "New Lesson Description", module: "0" }]
  });
  const addModule = (module: any) => {
    const newModule = { ...module, _id: new Date().getTime().toString() };
    const newModuleList = [newModule, ...moduleList];
    setModuleList(newModuleList);
  };
  const deleteModule = (moduleId: string) => {
    const newModuleList = moduleList.filter(
      (module) => module._id !== moduleId
    );
    setModuleList(newModuleList);
  };
  const updateModule = () => {
    const newModuleList = moduleList.map((m) => {
      if (m._id === module._id) {
        return module;
      } else {
        return m;
      }
    });
    setModuleList(newModuleList);
  };
  */
  
  return (
    <div className="ms-3 col-lg-10">
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-1 button-color">
          Collapse All
        </button>
        <button className="btn btn-secondary me-1 button-color">
          View Progress
        </button>
        <select className="me-1 button-color dropdown">
          <option>Publish All</option>
          <option>Unpublish All</option>
        </select>
        <button className="btn btn-danger me-1 plus-icon">
          <FaPlus /> Module
        </button>
        <button className="btn btn-secondary me-1 button-color">
          <FaEllipsisV />
        </button>
      </div>
      <hr />
      <div>
        <input
          type="text"
          className="form-control mb-1"
          value={module.name}
          onChange={(e) =>
            dispatch(setModule({ ...module, name: e.target.value }))
          }
        />
        <textarea
          className="form-control mb-1"
          value={module.description}
          onChange={(e) =>
            dispatch(setModule({ ...module, description: e.target.value }))
          }
        />
        <button
          className="btn btn-warning float-end"
          style={{ width: "10%" }}
          onClick={handleUpdateModule}
        >
          Update
        </button>
        <button
          className="btn btn-primary float-end me-1"
          style={{ width: "10%" }}
          onClick={handleAddModule}
        >
          Add
        </button>
      </div>
      <br />
      <br />
      <ul className="list-group wd-modules">
        {moduleList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <button
                    className="btn btn-danger mb-1"
                    style={{ height: "25px", fontSize: "14px" }}
                    onClick={() => handleDeleteModule(module._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning mb-1 ms-2"
                    style={{ height: "25px", fontSize: "14px" }}
                    onClick={() => dispatch(setModule(module))}
                  >
                    Edit
                  </button>
                  <FaCheckCircle className="text-success ms-2" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {/* Wherever you call the selectedModule variable, you have to add a ? to indicate to the component 
              there's a possibility it might be undefined since modulesList is initialized as [] in the reducer. */}
              {selectedModule?._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson: any, index: number) => (
                    <li key={index} className="list-group-item">
                      <FaEllipsisV className="me-4" />
                      {lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ModuleList;
