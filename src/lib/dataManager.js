import { galleryData as initialGalleryData } from '@/constants/coolsculptingData';

// Keys for LocalStorage
export const STORAGE_KEYS = {
  GALLERY: 'gallery_data',
  SLIDERS: 'admin_sliders_data',
  SERVICES: 'admin_services_data',
  TESTIMONIALS: 'admin_testimonials_data',
  TEAM: 'admin_team_data',
  BLOG: 'admin_blog_data',
  CONTACT: 'admin_contact_data',
  ABOUT: 'admin_about_data',
  FAQ: 'admin_faq_data',
  PRICING: 'admin_pricing_data',
  SETTINGS: 'admin_settings_data',
  AUTH: 'admin_auth_session'
};

// --- Initial Data Sets (Fallbacks) ---
const defaults = {
  sliders: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1655655367617-ffe4910a34a9",
      title: "Light Sheer Desire",
      description: "The Gold Standard in Laser Hair Removal",
      link: "/lightsheer-desire"
    }
  ],
  services: [
    { id: 1, name: "CoolSculpting", description: "Non-invasive fat reduction", price: "Contact for Quote" }
  ],
  contact: {
    phone: "+91 98111 57787",
    email: "info@empathylaserclinic.com",
    address: "Pitampura, New Delhi"
  }
};

export const dataManager = {
  // --- Generic Helpers ---
  getData: (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  setData: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`[DataManager] setData for ${key}:`, data);
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  },

  // --- Specific Data Accessors ---
  getGallery: () => dataManager.getData(STORAGE_KEYS.GALLERY, initialGalleryData),
  saveGallery: (data) => dataManager.setData(STORAGE_KEYS.GALLERY, data),

  getSliders: () => dataManager.getData(STORAGE_KEYS.SLIDERS, defaults.sliders),
  saveSliders: (data) => dataManager.setData(STORAGE_KEYS.SLIDERS, data),

  getServices: () => dataManager.getData(STORAGE_KEYS.SERVICES, defaults.services),
  saveServices: (data) => dataManager.setData(STORAGE_KEYS.SERVICES, data),

  getTestimonials: () => dataManager.getData(STORAGE_KEYS.TESTIMONIALS, []),
  saveTestimonials: (data) => dataManager.setData(STORAGE_KEYS.TESTIMONIALS, data),

  getTeam: () => dataManager.getData(STORAGE_KEYS.TEAM, []),
  saveTeam: (data) => dataManager.setData(STORAGE_KEYS.TEAM, data),

  getBlog: () => dataManager.getData(STORAGE_KEYS.BLOG, []),
  saveBlog: (data) => dataManager.setData(STORAGE_KEYS.BLOG, data),

  getContact: () => dataManager.getData(STORAGE_KEYS.CONTACT, defaults.contact),
  saveContact: (data) => dataManager.setData(STORAGE_KEYS.CONTACT, data),
  
  getAbout: () => dataManager.getData(STORAGE_KEYS.ABOUT, {}),
  saveAbout: (data) => dataManager.setData(STORAGE_KEYS.ABOUT, data),

  getFAQ: () => dataManager.getData(STORAGE_KEYS.FAQ, []),
  saveFAQ: (data) => dataManager.setData(STORAGE_KEYS.FAQ, data),

  getPricing: () => dataManager.getData(STORAGE_KEYS.PRICING, []),
  savePricing: (data) => dataManager.setData(STORAGE_KEYS.PRICING, data),
  
  getSettings: () => dataManager.getData(STORAGE_KEYS.SETTINGS, { siteTitle: 'Empathy Laser Clinic' }),
  saveSettings: (data) => dataManager.setData(STORAGE_KEYS.SETTINGS, data),

  // --- Auth Operations ---
  login: (email, password) => {
    if (email === 'admin@empathy.com' && password === 'admin123') {
      const session = { user: email, token: 'demo-token-' + Date.now() };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(session));
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    window.location.href = '/admin/login';
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH);
  }
};