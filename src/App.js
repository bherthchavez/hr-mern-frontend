import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
// import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from './config/roles'
import { ToastProvider } from 'react-toast-notifications';
function App() {
  return (
    <div className="min-h-screen transition duration-200 bg-gray-50 dark:bg-slate-900">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />

          {/* <Route path="login" element={<Login />} /> */}

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>

                  <Route index element={<Welcome />} />

                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                    <Route path="users">

                      <Route index element={
                        <ToastProvider autoDismiss
                          autoDismissTimeout={6000}
                          placement="bottom-center">
                          <UsersList />
                        </ToastProvider>} />

                      <Route path=":id" element={
                        <ToastProvider autoDismiss
                          autoDismissTimeout={6000}
                          placement="bottom-center">
                          <EditUser />
                        </ToastProvider>} />

                      <Route path="new" element={
                    
                      <ToastProvider autoDismiss
                          autoDismissTimeout={6000}
                          placement="bottom-center">
                           <NewUserForm />
                        </ToastProvider>} />
                    
                    
                    </Route>
                  </Route>

                  <Route path="notes">
                    <Route index element={<NotesList />} />
                    <Route path=":id" element={<EditNote />} />
                    <Route path="new" element={<NewNote />} />
                  </Route>

                </Route>{/* End Dash */}
              </Route>
            </Route>
          </Route>{/* End Protected Routes */}

          <Route path='*' element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
