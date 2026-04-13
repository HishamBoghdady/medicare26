// Hooks from React
import { Routes, Route } from "react-router-dom";
//components/layout
import MainLayout from "./components/layout/MainLayout";
//components/shared
import Error from "./components/shared/Error"
import Intro from "./components/shared/Intro"
import Loading from "./components/shared/Loading"
import Navbar from "./components/shared/Navbar"
//pages
import DashboardData from "./pages/DashboardData";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import Money from "./pages/Money";
import Reports from "./pages/Reports";
import Sessions from "./pages/Sessions";

import Unauthorized from "./components/shared/Unauthorized";

import CreatePage from "./components/ui/@User/CreateUser";
import UsersManager from "./components/ui/@User/UserManger";
import MyAccount from "./components/ui/@User/MyAccount";

import ProtectedRoute from "./guards/protectroute";
function App() {

  console.log("App Rendered");

  return (
    <>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Unauthorized" element={<Unauthorized />} />

        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Intro />} />
          <Route path='newpatient' element={<DashboardData />} />

            <Route path='session' element={<Sessions />} />
          {/* <Route path="session" element={
                <ProtectedRoute roles={["manager"]}>
                  <Sessions />
                </ProtectedRoute>
          }/> */}

          <Route path='money' element={<Money />} />
          <Route path='searsh' element={<Reports />} />
          <Route path='about' element={<Intro />} />


          <Route path='create' element={<CreatePage />} />
          <Route path='UsersManager' element={<UsersManager />} />
          <Route path="MyAccount" element={<MyAccount/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
