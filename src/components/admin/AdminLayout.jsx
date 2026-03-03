import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Image as Images, LogOut, Menu, X, Loader2, Snowflake, Sliders, Settings, Layout, Instagram, Upload, BookOpen, CreditCard, Cpu, Bot, FileText, Activity, Info, Zap, Sparkles, Eraser, Gauge, Video, PlayCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import VisibleDebugPanel from '@/components/admin/VisibleDebugPanel';
import AdminAIAssistant from '@/components/admin/AdminAIAssistant';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isAIOpen, setIsAIOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
      return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
      );
  }

  if (!isAuthenticated) return null;

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Sliders, label: 'Home Slider', path: '/admin/home-slider' },
    { icon: Menu, label: 'Menu Management', path: '/admin/menu-management' }, // New Menu Link
    { icon: Instagram, label: 'Instagram Feed', path: '/admin/instagram-feed' },
    { icon: Layout, label: 'Page Sections', path: '/admin/sections' },
    { icon: Info, label: 'About Us', path: '/admin/about-us' },
    { icon: Settings, label: 'Section Text', path: '/admin/transformation-section' },
    { icon: Video, label: 'Transformation Videos', path: '/admin/transformation-videos' }, 
    
    // Treatments Section
    { section: 'Treatments' },
    { icon: Zap, label: 'Acne Treatment', path: '/admin/acne-treatment' },
    { icon: Sparkles, label: 'Skin Rejuvenation', path: '/admin/skin-rejuvenation' },
    { icon: Eraser, label: 'Tattoo Removal', path: '/admin/tattoo-removal' },
    { icon: FileText, label: 'All Treatments', path: '/admin/treatments' },

    // Other Management
    { section: 'Management' },
    { icon: Settings, label: 'Services List', path: '/admin/services-management' },
    { icon: FileText, label: 'Service Details', path: '/admin/service-details' },
    { icon: Cpu, label: 'Advanced Tech', path: '/admin/advanced-technology' },
    { icon: Activity, label: 'Tech Mgmt', path: '/admin/advanced-technology-management' },
    { icon: BookOpen, label: 'Blog', path: '/admin/blog-management' },
    { icon: CreditCard, label: 'Pricing Plans', path: '/admin/pricing-management' },
    { icon: Images, label: 'Gallery Manager', path: '/admin/gallery' },
    { icon: Snowflake, label: 'CoolSculpting', path: '/admin/coolsculpting' },
    { icon: Zap, label: 'Image Optimization', path: '/admin/image-optimization' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      <VisibleDebugPanel />
      
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 shadow-xl lg:shadow-none flex flex-col`}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <span className="font-bold text-2xl text-gray-900 font-playfair tracking-tight">Admin<span className="text-[var(--color-vibrant-orange)]">Panel</span></span>
          <button className="lg:hidden p-1 hover:bg-gray-100 rounded text-gray-600" onClick={() => setIsSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        
        <div className="px-6 py-6 bg-gray-50 border-b border-gray-100">
           <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Current User</p>
           <p className="text-sm font-medium text-gray-900 truncate" title={user?.email}>{user?.email}</p>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item, index) => {
            if (item.section) {
               return (
                  <div key={index} className="px-4 py-2 mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                     {item.section}
                  </div>
               );
            }
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-[var(--color-vibrant-orange)] text-white shadow-md shadow-orange-200' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setIsSidebarOpen(false)} 
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2">
          <div className="flex gap-2">
             <button
               onClick={() => setIsAIOpen(true)}
               className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
             >
               <Bot className="w-4 h-4" />
               AI Assist
             </button>
          </div>
          <button 
            onClick={async () => { 
              await logout(); 
              navigate('/admin/login'); 
            }}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative bg-gray-50">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:hidden z-10 shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600 hover:text-gray-900 p-2">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-gray-900">Empathy Laser</span>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto pb-20">
            <Outlet />
          </div>
        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* AI Assistant Drawer */}
      <AdminAIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
};

export default AdminLayout;