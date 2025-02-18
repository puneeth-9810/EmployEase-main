import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from "./containers/Navbar";
import About from "./containers/About";
import Features from "./containers/Features";
import Review from "./containers/Review";
import Trybox from "./containers/Trybox";
import Motionbox from "./containers/Motionbox";
import Foot from "./containers/Foot";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import FAQ from "./pages/FAQ";
import SignIn from "./pages/Signin";
import TandC from "./pages/TandC";
import Privacy from './pages/Privacy';
import Aboutus from './pages/Aboutus';
import Contactus from "./pages/Contactus";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import EmpDashboard from "./pages/EmpDashboard";
import Info from "./pages/Info";
import ForgotPassword from './pages/Forgotpassword';
import FindJob from './pages/findjob';
import FindEmployee from './pages/findEmployee';
import FindCandidate from './pages/findCandidate';
import MyJobs from './pages/myjobs';
import JobApplications from './pages/jobApplications';
import JobApplicants from './pages/applicants';
import ResetPassword from './pages/ResetPassword';
import PostJob from './pages/postJob';
import ApplyJob from './pages/apply';

function App() {
  return (
    <div>
      <Router>
        <div id="root">
        <Navbar />
          <div className="content">
            <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employeedashboard" element={<EmpDashboard />} />
            <Route path="/info" element={<Info />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/T&C" element={<TandC />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/findjob" element={<FindJob />} />
              <Route path="/findemployee" element={<FindEmployee />} />
              <Route path="/findcandidate" element={<FindCandidate />} />
              <Route path="/myjobs" element={<MyJobs />} />
              <Route path="/applications" element={<JobApplications />} />
              <Route path="/:jobId/applicants" element={<JobApplicants />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="/postjobs" element={<PostJob />} />
              <Route path="/:jobId/apply" element={<ApplyJob />} />

              <Route
                path="/"
                element={
                  <>
                    <About/>
                    <Features/>
                    <Motionbox/>
                    <Review/>  
                    <Trybox/>                  
                  </>
                }
              />
            </Routes>
          </div>
          <Foot />
        </div>
      </Router>
    </div>
  );
}

export default App;