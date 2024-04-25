import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [] as { _id: string; title: string; start: string; due: string; points: string }[],
  assignment: {
    title: "New Assignment",
    start: "2024-01-01",
    due: "2024-01-31",
    points: "100"
  },
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                action.payload,
                ...state.assignments,
            ];
            state.assignment = {
              title: "New Assignment",
              start: "2024-01-01",
              due: "2024-01-31",
              points: "100",
            };
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
            state.assignment = {
              title: "New Assignment",
              start: "2024-01-01",
              due: "2024-01-31",
              points: "100",
            };
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        },
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        }
    },
});

export const { addAssignment, deleteAssignment, 
                updateAssignment, setAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;