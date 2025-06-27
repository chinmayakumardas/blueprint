import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authReducer from './features/authSlice';
import projectReducer from './features/projectSlice';
import clientReducer from './features/clientSlice'; // Import your client slice
import dashboardReducer from './features/dashboardSlice';

import taskReducer from './features/taskSlice';
import notificationReducer from './features/notificationSlice';
import bugReducer from './features/bugSlice';
import userReducer from './features/userSlice';
import dashReducer from './features/dashSlice';
import meetingReducer from './features/meetingSlice';
import contactReducer from './features/contactSlice';
import teamReducer from './features/teamSlice';
import momReducer from './features/momSlice';
import slotReducer from './features/master/slotMasterSlice';
import meetingCalendarReducer from './features/calender/meetingCalendarSlice';

import serviceReducer from './features/master/serviceMasterSlice';
const rootReducer = combineReducers({
  //shared
  auth: authReducer,
  user: userReducer,
  notifications: notificationReducer,

  //master
    slots: slotReducer,
    services: serviceReducer,

  //modules
  contact: contactReducer,
  client:clientReducer,
  meetings: meetingReducer,
  team: teamReducer,
  mom: momReducer,
  project:projectReducer,
  task:taskReducer,
  bugs: bugReducer,


 //dashboard
  dashboard:dashboardReducer,
  dash: dashReducer,

//other
  meetingCalendar: meetingCalendarReducer,




});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
