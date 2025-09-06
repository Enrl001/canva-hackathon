import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email?: string;
  [key: string]: any;
}

interface Course {
  id: string;
  name: string;
  category: 'Core' | 'Major' | 'Sub-major' | 'Elective';
  major?: string;
  subMajor?: string;
}

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  university: string;
  degree: string;
  major: string;
  subMajor: string;
  courses: Course[];
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  university: '',
  degree: '',
  major: '',
  subMajor: '',
  courses: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      Object.assign(state, initialState);
    },
    setUniversity(state, action: PayloadAction<string>) {
      state.university = action.payload;
    },
    setDegree(state, action: PayloadAction<string>) {
      state.degree = action.payload;
    },
    setMajor(state, action: PayloadAction<string>) {
      state.major = action.payload;
    },
    setSubMajor(state, action: PayloadAction<string>) {
      state.subMajor = action.payload;
    },
    setCourses(state, action: PayloadAction<Course[]>) {
      state.courses = action.payload;
    },
  },
});

export const { login, logout, setUniversity, setDegree, setMajor, setSubMajor, setCourses } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
