import "./index.css";
import { FaBan, FaBell, FaBullhorn, FaBullseye, FaCalendar, FaCheckCircle, FaCircle, FaFileImport, FaRegChartBar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function Status() {
  return (
    <div className="flex-grow-0 me-2 d-none d-lg-block">
        <div className="status">
            <h5>Course Status</h5>
            <div className="button-group-1">
                <button className="btn btn-secondary button-color me-1">
                <FaBan /> Unpublish
                </button>
                <button className="btn btn-success">
                <FaCheckCircle /> Published
                </button>
            </div>
            <div className="button-group-2">
                <button className="btn btn-secondary button-color mt-3">
                <FaFileImport /> Import Existing Content
                </button>
                <br />
                <button className="btn btn-secondary button-color mt-1">
                <FaFileImport /> Import From Commons
                </button>
                <br />
                <button className="btn btn-secondary button-color mt-1">
                <FaBullseye /> Choose Home Page
                </button>
                <br />
                <button className="btn btn-secondary button-color mt-1">
                <FaRegChartBar /> View Course Stream
                </button>
                <br />
                <button className="btn btn-secondary button-color mt-1">
                <FaBullhorn /> New Announcement
                </button>
                <br />
                <button className="btn btn-secondary button-color mt-1">
                <FaRegChartBar /> New Analytics
                </button>
                <br />
                <button className="btn btn-secondary button-color mt-1 mb-4">
                <FaBell /> View Course Notifications
                </button>
                <br />
            </div>
            <div>
                <span>
                <b>To-Do</b>
                </span>
                <hr />
                <div>
                <FaCircle style={{ color: "red" }} />
                <a href="#" className="todo-link">
                    Grade A1 - ENV + HTML
                </a>
                <IoMdClose />
                <br />
                <div className="todo-due mb-4">100 points • Sep 18 at 11:59pm</div>
                </div>
            </div>
            <div>
                <span>
                <b>Coming Up</b>
                </span>
                <div className="float-end">
                <FaCalendar style={{ color: "red" }} />
                <a href="#" className="todo-link">
                    View Calendar
                </a>
                </div>
                <hr />
                <div>
                <FaCalendar style={{ color: "red" }} />
                <a href="#" className="todo-link">
                    Lecture
                </a>
                <br />
                <div className="todo-due mb-3">
                    CS4550.12631.202410
                    <br />
                    Sep 11 at 11:45am
                </div>
                </div>
                <div>
                <FaCalendar style={{ color: "red" }} />
                <a href="#" className="todo-link">
                    CS5610 06 SP23 Lecture
                </a>
                <br />
                <div className="todo-due mb-3">
                    CS4550.12631.202410
                    <br />
                    Sep 11 at 6pm
                </div>
                </div>
                <div>
                <FaCalendar style={{ color: "red" }} />
                <a href="#" className="todo-link">
                    CS5610 Web Development Summer 1 2023 - LECTURE
                </a>
                <br />
                <div className="todo-due mb-3">
                    CS4550.12631.202410
                    <br />
                    Sep 11 at 7pm
                </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Status;
