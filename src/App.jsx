import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { ButtonCustomizationProvider } from '@/contexts/ButtonCustomizationContext';
import { DarkModeProvider } from '@/contexts/DarkModeContext';
import Navigation3D from '@/components/Navigation3D'; 
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorBoundary from '@/components/ErrorBoundary';
import ScrollToTop from '@/components/ScrollToTop';

// Public Pages
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import PricingPage from '@/pages/PricingPage';
import ContactPage from '@/pages/ContactPage';
import SocialMediaPage from '@/pages/SocialMediaPage';
import CoolsculptingPage from '@/pages/CoolsculptingPage';
import LightSheerDesirePage from '@/pages/LightSheerDesirePage';
import SopranoTitaniumPage from '@/pages/SopranoTitaniumPage';
import LaserHairRemovalPage from '@/pages/LaserHairRemovalPage';
import AcneTreatmentPage from '@/pages/AcneTreatmentPage';
import SkinRejuvenationPage from '@/pages/SkinRejuvenationPage';
import AntiAgingPage from '@/pages/AntiAgingPage';
import TattooRemovalPage from '@/pages/TattooRemovalPage';
import ChemicalPeelsPage from '@/pages/ChemicalPeelsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import BlogPage from '@/pages/BlogPage';
import BlogPost from '@/pages/BlogPost';
import AboutUsPage from '@/pages/AboutUsPage';
import FloatingContactWidget from '@/components/FloatingContactWidget';
import SocialMediaSidebar from '@/components/SocialMediaSidebar';
import FloatingActionButton from '@/components/ui/FloatingActionButton';

// Admin Pages
import AdminLayout from '@/components/admin/AdminLayout';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminGalleryPage from '@/pages/admin/AdminGalleryPage';
import AdminServicesPage from '@/pages/admin/AdminServicesPage';
import AdminHomeSliderPage from '@/pages/admin/AdminHomeSliderPage';
import AdminCoolsculptingPage from '@/pages/admin/AdminCoolsculptingPage';
import AdminSectionsPage from '@/pages/admin/AdminSectionsPage';
import AdminInstagramFeedPage from '@/pages/admin/AdminInstagramFeedPage';
import AdminInstagramUpload from '@/pages/admin/AdminInstagramUpload';
import AdminAdvancedTechnologyPage from '@/pages/admin/AdminAdvancedTechnologyPage';
import AdminServicesManagementPage from '@/pages/admin/AdminServicesManagementPage';
import AdminServiceDetailsPage from '@/pages/admin/AdminServiceDetailsPage';
import AdminBlogManagementPage from '@/pages/admin/AdminBlogManagementPage';
import AdminPricingManagementPage from '@/pages/admin/AdminPricingManagementPage';
import AdminTestimonialsManager from '@/pages/admin/AdminTestimonialsManager';
import AdminAdvancedTechnologyManagementPage from '@/pages/admin/AdminAdvancedTechnologyManagementPage';
import AdminServicePagesManagement from '@/pages/admin/AdminServicePagesManagement';
import AdminAboutUsPage from '@/pages/admin/AdminAboutUsPage';
import AdminButtonCustomizerPage from '@/pages/admin/AdminButtonCustomizerPage';
import AdminTreatmentsPage from '@/pages/admin/AdminTreatmentsPage';
import AdminAcneTreatmentManager from '@/pages/admin/AdminAcneTreatmentManager';
import AdminSkinRejuvenationManager from '@/pages/admin/AdminSkinRejuvenationManager';
import AdminTattooRemovalManager from '@/pages/admin/AdminTattooRemovalManager';
import AdminImageOptimizationPage from '@/pages/admin/AdminImageOptimizationPage';
import AdminTransformationManager from '@/components/admin/AdminTransformationManager'; 
import AdminTransformationVideosPage from '@/pages/admin/AdminTransformationVideosPage';
import AdminSecurityDiagnosticsPage from '@/pages/admin/AdminSecurityDiagnosticsPage'; 
import AdminMenuManagerPage from '@/pages/admin/AdminMenuManagerPage';

// Wrapper for public routes to show Header/Footer
const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-transparent text-gray-900 font-sans antialiased">
    <Navigation3D />
    <SocialMediaSidebar />
    <FloatingContactWidget />
    <FloatingActionButton />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

// Wrapper for Admin to include Navigation
const AdminWrapper = ({ children }) => (
    <div className="bg-[#E8E3D8] min-h-screen">
        <Navigation3D />
        <div className="pt-[80px]"> {/* Push content below fixed nav */}
             {children}
        </div>
    </div>
);

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <ButtonCustomizationProvider>
            <ScrollToTop />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              
              <Route path="/admin" element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <AdminWrapper>
                      <AdminLayout />
                    </AdminWrapper>
                  </ProtectedRoute>
                </ErrorBoundary>
              }>
                <Route index element={<AdminDashboardPage />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="security-diagnostics" element={<AdminSecurityDiagnosticsPage />} />
                <Route path="gallery" element={<AdminGalleryPage />} />
                <Route path="services" element={<AdminServicesPage />} />
                <Route path="services-management" element={<AdminServicesManagementPage />} />
                <Route path="service-details" element={<AdminServiceDetailsPage />} />
                <Route path="sliders" element={<AdminHomeSliderPage />} />
                <Route path="home-slider" element={<AdminHomeSliderPage />} />
                <Route path="sections" element={<AdminSectionsPage />} />
                <Route path="coolsculpting" element={<AdminCoolsculptingPage />} />
                <Route path="instagram-feed" element={<AdminInstagramFeedPage />} />
                <Route path="instagram-upload" element={<AdminInstagramUpload />} />
                <Route path="advanced-technology" element={<AdminAdvancedTechnologyPage />} />
                <Route path="advanced-technology-management" element={<AdminAdvancedTechnologyManagementPage />} />
                <Route path="blog-management" element={<AdminBlogManagementPage />} />
                <Route path="pricing-management" element={<AdminPricingManagementPage />} />
                <Route path="testimonials-management" element={<AdminTestimonialsManager />} />
                <Route path="service-pages" element={<AdminServicePagesManagement />} />
                <Route path="about-us" element={<AdminAboutUsPage />} />
                <Route path="button-customizer" element={<AdminButtonCustomizerPage />} />
                <Route path="treatments" element={<AdminTreatmentsPage />} />
                <Route path="acne-treatment" element={<AdminAcneTreatmentManager />} />
                <Route path="skin-rejuvenation" element={<AdminSkinRejuvenationManager />} />
                <Route path="tattoo-removal" element={<AdminTattooRemovalManager />} />
                <Route path="image-optimization" element={<AdminImageOptimizationPage />} />
                <Route path="transformation-section" element={<AdminTransformationManager />} />
                <Route path="transformation-videos" element={<AdminTransformationVideosPage />} />
                <Route path="menu-management" element={<AdminMenuManagerPage />} />
              </Route>

              {/* Public Routes */}
              <Route path="*" element={
                <PublicLayout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/services/:slug" element={<ServiceDetailPage />} />
                    
                    {/* SEO 301 Redirects - Old to New */}
                    <Route path="/laser-hair-removal" element={<Navigate to="/laser-hair-removal-delhi-ncr" replace />} />
                    <Route path="/coolsculpting" element={<Navigate to="/coolsculpting-delhi-ncr" replace />} />
                    <Route path="/coolsculpting-detail" element={<Navigate to="/coolsculpting-delhi-ncr" replace />} />
                    <Route path="/acne-treatment" element={<Navigate to="/acne-treatment" replace />} />
                    <Route path="/skin-rejuvenation" element={<Navigate to="/skin-rejuvenation" replace />} />
                    <Route path="/anti-aging" element={<Navigate to="/anti-aging-delhi-ncr" replace />} />
                    <Route path="/tattoo-removal" element={<Navigate to="/tattoo-removal" replace />} />
                    <Route path="/chemical-peels" element={<Navigate to="/chemical-peels-delhi-ncr" replace />} />
                    <Route path="/lightsheer-desire" element={<Navigate to="/lightsheer-desire-delhi-ncr" replace />} />
                    <Route path="/soprano-titanium" element={<Navigate to="/soprano-titanium-delhi-ncr" replace />} />
                    
                    {/* New SEO-Friendly Routes */}
                    <Route path="/coolsculpting-delhi-ncr" element={<CoolsculptingPage />} />
                    <Route path="/lightsheer-desire-delhi-ncr" element={<LightSheerDesirePage />} />
                    <Route path="/soprano-titanium-delhi-ncr" element={<SopranoTitaniumPage />} />
                    <Route path="/laser-hair-removal-delhi-ncr" element={<LaserHairRemovalPage />} />
                    <Route path="/acne-treatment-delhi-ncr" element={<AcneTreatmentPage />} />
                    <Route path="/skin-rejuvenation-delhi-ncr" element={<SkinRejuvenationPage />} />
                    <Route path="/anti-aging-delhi-ncr" element={<AntiAgingPage />} />
                    <Route path="/tattoo-removal-delhi-ncr" element={<TattooRemovalPage />} />
                    <Route path="/chemical-peels-delhi-ncr" element={<ChemicalPeelsPage />} />
                    
                    {/* New Dynamic Treatment Routes requested by User */}
                    <Route path="/acne-treatment" element={<AcneTreatmentPage />} />
                    <Route path="/skin-rejuvenation" element={<SkinRejuvenationPage />} />
                    <Route path="/tattoo-removal" element={<TattooRemovalPage />} />
                    
                    <Route path="/testimonials" element={<TestimonialsPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/social-media" element={<SocialMediaPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </PublicLayout>
              } />
            </Routes>
            <Toaster />
          </ButtonCustomizationProvider>
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;