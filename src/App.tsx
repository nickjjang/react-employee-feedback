import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootState } from "./app/store";
import RequireAdmin from "./guards/RequireAdmin";
import AdminDashboard from "./views/Admin/Dashboard";
import AdminEmployees from "./views/Admin/Employees";
import AdminLogin from "./views/Admin/Login";
import AdminReviews from "./views/Admin/Reviews";
import AdminReview from "./views/Admin/Reviews/Show";
import Employees from "./views/Employees";
import Feedbacks from "./views/Employees/feedbacks";
import Intro from "./views/Intro";

function App() {
  const authAdmin = useSelector((state: RootState) => state.authAdmin);
  console.log(authAdmin);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<AdminEmployees />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/admin/reviews/:id" element={<AdminReview />} />
          </Route>
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<Feedbacks />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
