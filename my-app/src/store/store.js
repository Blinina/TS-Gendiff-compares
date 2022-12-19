import { configureStore } from '@reduxjs/toolkit';
import formReduser from './formSlice';
import errorReduser from './errorSice'

export default configureStore({
  reducer: {
    files: formReduser,
    errors: errorReduser,
  },
});