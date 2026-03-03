import React from 'react';
import { cn } from '@/lib/utils';
import { ImageOff, Sparkles, ZoomIn } from 'lucide-react';
import useGalleryModal from '@/hooks/useGalleryModal';
import ImageModal from '@/components/ui/ImageModal';

const BeforeAfterGallery = ({ items = [], className }) => {
  const { 
    isOpen, 
    currentImage, 
    openModal, 
    closeModal, 
    nextImage, 
    previousImage, 
    hasNext, 
    hasPrevious 
  } = useGalleryModal();

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-32 px-4 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center max-w-2xl mx-auto shadow-lg">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ImageOff className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 font-playfair">No results found</h3>
        <p className="text-gray-500 mt-2 text-lg">
          No before & after images found for this category yet.
        </p>
      </div>
    );
  }

  const prepareModalImages = () => {
    return items.flatMap(item => [
      { url: item.before_image_url, title: `${item.title} (Before)`, type: 'Before' },
      { url: item.after_image_url, title: `${item.title} (After)`, type: 'After' }
    ]);
  };

  const handleImageClick = (itemIndex, type) => {
    const flatIndex = itemIndex * 2 + (type === 'after' ? 1 : 0);
    openModal(prepareModalImages(), flatIndex);
  };

  return (
    <>
      <div className={cn("grid grid-cols-1 gap-16", className)}>
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 border border-gray-100 group flex flex-col"
            // Applied 3D Shadow
            style={{
                boxShadow: "0 4px 6px rgba(0,0,0,0.07), 0 10px 20px rgba(0,0,0,0.1), 0 15px 35px rgba(0,0,0,0.15)"
            }}
          >
            {/* Header */}
            <div className="px-8 py-8 border-b border-gray-50 bg-white relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                   <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 rounded-full uppercase tracking-widest border border-blue-100 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    {item.category || item.body_area || 'Treatment Result'}
                  </span>
                  {item.label && (
                     <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-gray-500 bg-gray-100 rounded-full uppercase tracking-widest">
                      {item.label}
                    </span>
                  )}
                </div>
                <h3 className="font-playfair font-bold text-gray-900 text-3xl md:text-4xl leading-tight group-hover:text-[var(--primary-red)] transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-500 text-lg mt-2 max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            {/* Images Container */}
            <div className="grid grid-cols-2 gap-1 bg-gray-100 relative h-[400px] sm:h-[500px] md:h-[600px]">
              {/* Before Image */}
              <div 
                className="relative h-full overflow-hidden cursor-zoom-in group/image"
                onClick={() => handleImageClick(index, 'before')}
              >
                <div className="absolute top-6 left-6 z-20 pointer-events-none">
                  <span className="bg-black/80 backdrop-blur-md text-white text-sm font-extrabold px-6 py-2 rounded-full uppercase tracking-widest shadow-2xl border border-white/10">
                    Before
                  </span>
                </div>
                <img 
                  src={item.before_image_url} 
                  alt={`${item.title} Before`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100">
                  <ZoomIn className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* After Image */}
              <div 
                className="relative h-full overflow-hidden cursor-zoom-in group/image"
                onClick={() => handleImageClick(index, 'after')}
              >
                <div className="absolute top-6 right-6 z-20 pointer-events-none">
                  <span className="bg-[var(--primary-red)] text-white text-sm font-extrabold px-6 py-2 rounded-full uppercase tracking-widest shadow-2xl shadow-red-900/30">
                    After
                  </span>
                </div>
                <img 
                  src={item.after_image_url} 
                  alt={`${item.title} After`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100">
                  <ZoomIn className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
              
              {/* Center Divider with Icon */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-white/40 backdrop-blur-sm z-10 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center pointer-events-none">
                   <div className="bg-white/90 p-2 rounded-full shadow-xl">
                      <Sparkles className="w-4 h-4 text-gray-400" />
                   </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ImageModal 
        isOpen={isOpen}
        imageUrl={currentImage?.url}
        altText={currentImage?.title}
        onClose={closeModal}
        onNext={nextImage}
        onPrevious={previousImage}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </>
  );
};

export default BeforeAfterGallery;