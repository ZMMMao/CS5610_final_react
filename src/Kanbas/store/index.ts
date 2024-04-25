import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import quizzesReducer from "../Courses/Quizzes/quizzesReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };

  assignmentsReducer: {
    assignments: any[];
    assignment: any;
  };

  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  };

  questionsReducer: {
    questions: any[];
    question: any;
  };  
}

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    quizzesReducer,
  },
});

export default store;
