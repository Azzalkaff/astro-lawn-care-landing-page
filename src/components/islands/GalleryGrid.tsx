import { useState } from 'react';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
}

interface Props {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: Props) {
  const [filter, setFilter] = useState<string>('all');
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category)))];
  
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-primary-600 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <div 
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
              <div className="p-6">
                <span className="inline-block rounded-full bg-primary-500/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {image.category.charAt(0).toUpperCase() + image.category.slice(1).replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredImages.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No images found in this category.
        </div>
      )}
    </div>
  );
}
