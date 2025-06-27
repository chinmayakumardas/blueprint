export const ENDPOINTS = {
  // 📌 AUTH
  LOGIN: '/auth/login',                          // POST – Login with credentials
  LOGOUT: '/auth/logout',                        // POST – Invalidate session/token
  ME: '/auth/me',                                // GET  – Get current user data

  // 📊 DASHBOARD
  DASHBOARD_SUMMARY: '/dashboard/summary',       // GET  – Cards/stats summary
  USER_ACTIVITY: '/dashboard/activity',          // GET  – Activity timeline

  // 👥 CLIENTS
  CLIENTS: '/clients',                           // GET  – List all clients
  CREATE_CLIENT: '/clients',                     // POST – Add a new client
  GET_CLIENT: (id) => `/clients/${id}`,          // GET  – View client by ID
  UPDATE_CLIENT: (id) => `/clients/${id}`,       // PUT  – Update client
  DELETE_CLIENT: (id) => `/clients/${id}`,       // DELETE – Remove client

  // 🧱 PROJECTS
  PROJECTS: '/projects',                         // GET  – List all projects
  CREATE_PROJECT: '/projects',                   // POST – Add new project
  GET_PROJECT: (id) => `/projects/${id}`,        // GET  – View project
  UPDATE_PROJECT: (id) => `/projects/${id}`,     // PUT  – Edit project
  DELETE_PROJECT: (id) => `/projects/${id}`,     // DELETE – Remove project

  // 📋 TASKS
  TASKS: '/tasks',                               // GET  – List tasks
  CREATE_TASK: '/tasks',                         // POST – Create task
  GET_TASK: (id) => `/tasks/${id}`,              // GET  – Task detail
  UPDATE_TASK: (id) => `/tasks/${id}`,           // PUT  – Update task
  DELETE_TASK: (id) => `/tasks/${id}`,           // DELETE – Delete task

  // 🧑‍💼 CONTACTS
  CONTACTS: '/contacts',                         // GET  – Contact list
  CREATE_CONTACT: '/contacts',                   // POST – Add contact
  GET_CONTACT: (id) => `/contacts/${id}`,        // GET  – View contact
  UPDATE_CONTACT: (id) => `/contacts/${id}`,     // PUT  – Update contact
  DELETE_CONTACT: (id) => `/contacts/${id}`,     // DELETE – Remove contact

  // 🐞 BUGS
  BUGS: '/bugs',                                 // GET  – All bugs
  CREATE_BUG: '/bugs',                           // POST – Report bug
  GET_BUG: (id) => `/bugs/${id}`,                // GET  – View bug detail
  UPDATE_BUG: (id) => `/bugs/${id}`,             // PUT  – Update bug
  DELETE_BUG: (id) => `/bugs/${id}`,             // DELETE – Delete bug

  // 🧑 USERS & ROLES
  USERS: '/users',                               // GET  – List users
  GET_USER: (id) => `/users/${id}`,              // GET  – User by ID
  ASSIGN_ROLE: (id) => `/users/${id}/role`,      // PATCH – Assign user role
};
