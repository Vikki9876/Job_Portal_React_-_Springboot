import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import ApplyJobPage from "./ApplyJobPage"
import CompanyPage from "./CompanyPage"
import FindJobPage from "./FindJobPage"
import FindTalentPage from "./FindTalentPage"
import HomePage from "./HomePage"
import JobDescPage from "./JobDescPage"
import JobHistoryPage from "./JobHistoryPage"
import PostedJobPage from "./PostedJobPage"
import PostJobPage from "./PostJobPage"
import ProfilePage from "./ProfilePage"
import SignUpPage from "./SignUpPage"
import TalentProfilePage from "./TalentProfilePage"
import ProtectedRoute from "../Services/ProtectedRoute"
import PublicRoute from "../Services/PublicRoute"


const AppRoutes=()=>{
    
    return <BrowserRouter>
      <div className='relative'>
      <Header/> 
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/find-jobs' element={  <ProtectedRoute allowedRoles={['APPLICANT']} >   <FindJobPage/> </ProtectedRoute> } />
        <Route path='/jobs/:id' element={<JobDescPage/>}/>
        <Route path='/apply-job/:id' element={<ApplyJobPage/>}/>
        <Route path='/find-talent' element={ <ProtectedRoute allowedRoles={['APPLICANT']} >  <FindTalentPage/> </ProtectedRoute>   }/>        
        <Route path='/company/:name' element={<CompanyPage/>}/>
        <Route path='/posted-job/:id' element={ <ProtectedRoute allowedRoles={['EMPLOYER']} > <PostedJobPage/> </ProtectedRoute> }/>
        <Route path='/job-history' element= { <ProtectedRoute allowedRoles={['APPLICANT']} >  <JobHistoryPage/> </ProtectedRoute> }/>
        <Route path='/talent-profile/:id' element={<TalentProfilePage/>}/>
        <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']} > <PostJobPage/>  </ProtectedRoute>} />
        <Route path='/signup' element={  <PublicRoute> <SignUpPage/> </PublicRoute> } />
        <Route path='/login' element={ <PublicRoute> <SignUpPage/> </PublicRoute> } />
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='*' element={<HomePage/>}/>
      </Routes>
      <Footer/>
      </div>
      </BrowserRouter>
}
export default AppRoutes ;