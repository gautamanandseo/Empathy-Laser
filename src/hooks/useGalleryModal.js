import { useState, useCallback } from 'react';

const useGalleryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  const openModal = useCallback((galleryImages, index = 0) => {
    setImages(galleryImages);
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Optional: clear images after close animation to prevent flickering if reopened quickly
    // setTimeout(() => setImages([]), 300); 
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previousImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return {
    isOpen,
    currentImage: images[currentIndex],
    openModal,
    closeModal,
    nextImage,
    previousImage,
    hasNext: images.length > 1,
    hasPrevious: images.length > 1,
    currentIndex,
    totalImages: images.length
  };
};

export default useGalleryModal;