import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [] as { _id: string; name: string; description: string }[],
  module: {
    name: "New Module 123",
    description: "New Description",
    lessons: [
      {
        id: "0",
        name: "New Lesson",
        description: "New Lesson Description",
        module: "0",
      },
    ],
  },
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action) => {
      state.modules = [
        action.payload,
        ...state.modules,
      ];
      state.module = {
        name: "New Module 123",
        description: "New Description",
        lessons: [
          {
            id: "0",
            name: "New Lesson",
            description: "New Lesson Description",
            module: "0",
          },
        ],
      };
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
      state.module = {
        name: "New Module 123",
        description: "New Description",
        lessons: [
          {
            id: "0",
            name: "New Lesson",
            description: "New Lesson Description",
            module: "0",
          },
        ],
      };
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
    setModules: (state, action) => {
      state.modules = action.payload;
    }
  },
});

export const { addModule, deleteModule,
                updateModule, setModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;