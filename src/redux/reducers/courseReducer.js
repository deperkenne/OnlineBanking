import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.title !== action.payload);
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) => {
        if (course.title === action.newcourse.title) {
          return action.newcourse;
        } else {
          return course;
        }
      });

    case types.LOAD_COURSES_SUCCESS:
      return action.course;

    default:
      return state;
  }
}
