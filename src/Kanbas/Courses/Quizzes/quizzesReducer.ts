import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as {
    _id: string;
    title: string;
    type: string;
    assignment_group: string;
    shuffle: boolean;
    time_limit: number;
    multiple_attempts: boolean;
    show_correct_answers: string;
    access_code: string;
    one_question_at_a_time: boolean;
    webcam_required: boolean;
    lock_questions_after_answering: boolean;
    due_date: string;
    available_date: string;
    until_date: string;
    points: string;
    published: boolean;
  }[],
  quiz: {
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
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
      state.quiz = {
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
        due_date: "2024-01-01",
        available_date: "2024-01-31",
        until_date: "2024-01-31",
        points: "100",
        published: false,
        questions: [],
      };
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload,
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;

