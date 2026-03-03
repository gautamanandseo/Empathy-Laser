import { galleryData as initialGalleryData } from '@/constants/coolsculptingData';

// Default Data Sets
const DEFAULT_SLIDERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935",
    title: "Advanced Laser Hair Removal",
    description: "Permanent reduction with minimal discomfort using FDA-approved technology.",
    link: "/laser-hair-removal"
  }
];

const DEFAULT_HERO = {
  headline: "Advanced Laser Hair Removal",
  subheadline: "Permanent reduction with minimal discomfort using FDA-approved technology.",
  cta: "Explore Treatment",
  link: "/laser-hair-removal",
  image: "https://images.unsplash.com/photo-1552693673-1bf958298935"
};

/**
 * Simple Data Manager
 * Handles direct LocalStorage operations and custom event dispatching
 */
export const simpleDataManager = {
  // --- Gallery Management ---
  getGalleryData: () => {
    try {
      const data = localStorage.getItem('beforeAfterGallery');
      return data ? JSON.parse(data) : initialGalleryData;
    } catch (e) {
      console.error("Error reading gallery data", e);
      return initialGalleryData;
    }
  },

  saveGalleryData: (data) => {
    try {
      localStorage.setItem('beforeAfterGallery', JSON.stringify(data));
      console.log("Gallery saved to localStorage");
      
      // Dispatch custom event for real-time updates
      const event = new CustomEvent('galleryUpdated', { detail: data });
      window.dispatchEvent(event);
      console.log("Event dispatched: galleryUpdated");
    } catch (e) {
      console.error("Error saving gallery data", e);
    }
  },

  // --- Slider Management ---
  getSliderData: () => {
    try {
      const data = localStorage.getItem('homeSlider');
      return data ? JSON.parse(data) : DEFAULT_SLIDERS;
    } catch (e) {
      console.error("Error reading slider data", e);
      return DEFAULT_SLIDERS;
    }
  },

  saveSliderData: (data) => {
    try {
      localStorage.setItem('homeSlider', JSON.stringify(data));
      console.log("Slider saved to localStorage");
      
      // Dispatch custom event
      const event = new CustomEvent('sliderUpdated', { detail: data });
      window.dispatchEvent(event);
      console.log("Event dispatched: sliderUpdated");
    } catch (e) {
      console.error("Error saving slider data", e);
    }
  },

  // --- Hero Section Management ---
  getHeroData: () => {
    try {
      const data = localStorage.getItem('heroSection');
      return data ? JSON.parse(data) : DEFAULT_HERO;
    } catch (e) {
      console.error("Error reading hero data", e);
      return DEFAULT_HERO;
    }
  },

  saveHeroData: (data) => {
    try {
      localStorage.setItem('heroSection', JSON.stringify(data));
      console.log("Hero saved to localStorage");
      
      // Dispatch custom event
      const event = new CustomEvent('heroUpdated', { detail: data });
      window.dispatchEvent(event);
      console.log("Event dispatched: heroUpdated");
    } catch (e) {
      console.error("Error saving hero data", e);
    }
  }
};