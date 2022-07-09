// import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute, { RequireRoute } from "./routes";
// layout
import BaseLanding from "./layout/BaseLanding";
import Dashboard from "./layout/Dashboard";

// page
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CvView from "./pages/CvView";
import Index from "./pages/Index";
import AboutUs from "./pages/aboutus/AboutUs";
import PostDetail from "./pages/PostDetail";
import SeekerProfile from "./pages/SeekerProfile";
import SeekerProfileDetail from "./pages/SeekerProfileDetail";
import Company from "./pages/Company";
import CompanyDetail from "./pages/CompanyDetail";

// view
import Home from "./views/landing/Home";
import Message from "./views/dashboard/Message";
import Account from "./views/dashboard/Account";
import ChangePassword from "./views/dashboard/ChangePassword";

// ung vien
import SeekerManage from "./views/dashboard/seeker/SeekerManage";
import SeekerInfo from "./views/dashboard/seeker/SeekerInfo";
import Cv from "./views/dashboard/seeker/Cv";
import SaveJobPost from "./views/dashboard/seeker/SaveJobPost";
import AppliedJob from "./views/dashboard/seeker/AppliedJob";

// nha tuyen dung
import RecruiterManage from "./views/dashboard/recruiter/RecruiterManage";
import NewPost from "./views/dashboard/recruiter/NewPost";
import Posted from "./views/dashboard/recruiter/Posted";
import CompnanyInfo from "./views/dashboard/recruiter/CompanyInfo";
import CompnanyImage from "./views/dashboard/recruiter/CopanyImage";
import JobPostActivity from "./views/dashboard/recruiter/JobPostActivity";

import checkPermission from "./permissions/CheckPermission";
import UserRole from "./permissions/UserRole";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CardPageNotFound from "./components/commons/CardPageNotFound";
// redux
import getCities from "./store/actions/CityCreator";
import getCareers from "./store/actions/CareerCreator";
import getPositions from "./store/actions/PositionCreator";
import getSalaries from "./store/actions/SalaryCreator";
import getExperiences from "./store/actions/ExperienceCreator";
import getWorkingForms from "./store/actions/WorkingFormCreator";
import CustomizedSnackbars from "./components/cardcustoms/CustomizedSnackbars";
import { ConfirmProvider } from "material-ui-confirm";
import { DialogProvider } from "react-mui-dialog";
import RequestSeekerProfile from "./pages/RequestSeekerProfile";
import RequestRecruiterCompany from "./pages/RequestRecruiterCompany";
import Demo from "./demo/Demo";


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCities());
    dispatch(getCareers());
    dispatch(getPositions());
    dispatch(getSalaries());
    dispatch(getExperiences());
    dispatch(getWorkingForms());
  }, []);

  return (
    <ConfirmProvider>
      <DialogProvider>
        <BrowserRouter>
          <Routes>
            {/* allow any */}
            <Route
              path="/login/"
              element={
                <ProtectedRoute
                  isAllowed={user === null}
                  redirectPath="/"
                  children={<Login />}
                />
              }
            />
            <Route
              path="/register/"
              element={
                <ProtectedRoute
                  isAllowed={user === null}
                  redirectPath="/"
                  children={<Register />}
                />
              }
            />
            <Route path="view-cv/:jobSeekerProfileId/:typeId/" element={<CvView />} />
            <Route path="demo/" element={<Demo />} />
            <Route path="/" element={<BaseLanding />}>
              <Route
                path="seeker-profile/"
                element={
                  <ProtectedRoute
                    isAllowed={
                      user &&
                      checkPermission(user, UserRole.SEEKER) &&
                      user.job_seeker_profile === null
                    }
                    redirectPath="/"
                    children={<RequestSeekerProfile />}
                  />
                }
              />
              <Route
                path="recruiter-company/"
                element={
                  <ProtectedRoute
                    isAllowed={
                      user &&
                      checkPermission(user, UserRole.RECRUITER) &&
                      user.company === null
                    }
                    redirectPath="/"
                    children={<RequestRecruiterCompany />}
                  />
                }
              />

              <Route path="/" element={<Index />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="job-posts/:jobPostId/" element={<PostDetail />} />
              <Route path="job-seeker-profiles/" element={<SeekerProfile />} />
              <Route
                path="job-seeker-profiles/:jobSeekerProfileId/"
                element={<SeekerProfileDetail />}
              />
              <Route path="companies/" element={<Company />} />
              <Route path="companies/:companyId/" element={<CompanyDetail />} />
              <Route path="about-us/" element={<AboutUs />} />
              <Route path="" element={""} />
            </Route>
            {/* allow any */}
            {/* seeker permission */}
            <Route
              element={
                <ProtectedRoute
                  isAllowed={user && checkPermission(user, UserRole.SEEKER)}
                />
              }
            >
              {/* tao profile cua ung vien khi lan dau dang nhap */}
              <Route
                element={
                  <RequireRoute
                    isAllowed={user && user.job_seeker_profile}
                    redirectPath="/seeker-profile/"
                  />
                }
              >
                <Route path="/seeker" element={<Dashboard />}>
                  <Route
                    path="general-management/"
                    element={<SeekerManage />}
                  />
                  <Route path="seeker-profile/" element={<SeekerInfo />} />
                  <Route path="cv/" element={<Cv />} />
                  <Route path="applied-jobs/" element={<AppliedJob />} />
                  <Route path="save-jobs/" element={<SaveJobPost />} />
                  <Route path="tin-nhan-ntd/" element={<Message />} />
                  <Route path="account/" element={<Account />} />
                  <Route path="change-password/" element={<ChangePassword />} />
                  <Route
                    path="/seeker/"
                    element={
                      <Navigate to="/seeker/general-management/" replace />
                    }
                  />
                </Route>
              </Route>
            </Route>
            {/* seeker permission */}
            {/* recruiter permission */}
            <Route
              element={
                <ProtectedRoute
                  isAllowed={user && checkPermission(user, UserRole.RECRUITER)}
                />
              }
            >
              {/* tao company cua nha tuyen dung khi lan dau dang nhap */}
              <Route
                element={
                  <RequireRoute
                    isAllowed={user && user.company}
                    redirectPath="/recruiter-company/"
                  />
                }
              >
                <Route path="/recruiter" element={<Dashboard />}>
                  <Route
                    path="general-management/"
                    element={<RecruiterManage />}
                  />
                  <Route path="new-post/" element={<NewPost />} />
                  <Route path="posted/" element={<Posted />} />
                  <Route
                    path="job-post-activity/"
                    element={<JobPostActivity />}
                  />
                  <Route path="company-profile/" element={<CompnanyInfo />} />
                  <Route path="company-images/" element={<CompnanyImage />} />
                  <Route path="account/" element={<Account />} />
                  <Route path="change-password/" element={<ChangePassword />} />
                  <Route
                    path="/recruiter/"
                    element={
                      <Navigate to="/recruiter/general-management/" replace />
                    }
                  />
                </Route>
              </Route>
            </Route>
            {/* recruiter permission */}

            <Route path="*" element={<CardPageNotFound />} />
          </Routes>

          {/* alert notification */}
          <CustomizedSnackbars />
        </BrowserRouter>
      </DialogProvider>
    </ConfirmProvider>
  );
};

export default App;
