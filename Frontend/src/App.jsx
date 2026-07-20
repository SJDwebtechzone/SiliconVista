import './App.css'
import {Routes , Route} from 'react-router-dom';
import { HashLink } from "react-router-hash-link";

import Navbar from './Components/Navbar.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import SitePopup from './Components/SitePopup.jsx';

import Home from './pages/Home.jsx';
import About from  './pages/About.jsx';
import Courses from './pages/Courses.jsx';
import Contact from './pages/Contact.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import { useLocation } from 'react-router-dom';

// Admin Components
import Login from './admin/Login.jsx';
import DashboardLayout from './admin/Dashboard.jsx';
import DashboardHome from './admin/DashboardHome.jsx';
import BannerManager from './admin/Banner/BannerManager.jsx';
import ReviewManager from './admin/Reviews/ReviewManager.jsx';
import CourseManager from './admin/Courses/CourseManager.jsx';
import PopupManager from './admin/Popup/PopupManager.jsx';
import BrochureManager from './admin/Brochure/BrochureManager.jsx';
import PartnerManager from './admin/Partners/PartnerManager.jsx';
import BlogManager from './admin/Blogs/BlogManager.jsx';
import GoogleReviewsManager from './admin/GoogleReviews/GoogleReviews.jsx';


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';
  const isPopupPage = ['/', '/about', '/courses'].includes(location.pathname);

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <ScrollToTop />}
      
      <Routes>
        {/* Public Routes */}
        <Route path = "/" element = {<Home />} />
        <Route path = "/about" element = {<About />} />
        <Route path = "/courses" element = {<Courses />} />
        <Route path = "/Contact" element = {<Contact />} />
        <Route path = "/blogs" element = {<Blogs />} />
        <Route path = "/blogs/:id" element = {<BlogDetail />} />
        
        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="banner" element={<BannerManager />} />
          <Route path="reviews" element={<ReviewManager />} />
          <Route path="courses" element={<CourseManager />} />
          <Route path="popup" element={<PopupManager />} />
          <Route path="brochure" element={<BrochureManager />} />
          <Route path="partners" element={<PartnerManager />} />
          <Route path="blogs" element={<BlogManager />} />
          <Route path="google-reviews" element={<GoogleReviewsManager />} />
        </Route>
      </Routes>


      {isPopupPage && <SitePopup key={location.pathname} />}
    </div>
  )
}

export default App
