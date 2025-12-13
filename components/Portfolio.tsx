import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, PlayCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Project, GalleryItem } from '../types';

const Portfolio: React.FC = () => {
  const { projects, galleryItems, generalSettings } = useData();
  const [filter, setFilter] = useState<'all' | 'food' | 'retail' | 'service' | 'cafe' | 'pameran'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | GalleryItem | null>(null); // State for modal
  const itemsPerPage = 6;

  // Data untuk marquee (digandakan agar loop mulus jika item sedikit)
  const displayGalleryItems = galleryItems.length > 0 
    ? [...galleryItems, ...galleryItems, ...galleryItems].slice(0, 15) 
    : [];

  // Reset page ke 1 setiap kali filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Logic Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'food', label: 'Kuliner' },
    { id: 'retail', label: 'Retail' },
    { id: 'service', label: 'Jasa' },
    { id: 'cafe', label: 'Cafe/Resto' },
    { id: 'pameran', label: 'Pameran' },
  ];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const gridElement = document.getElementById('portfolio-grid');
    if (gridElement) {
        gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- Modal / Lightbox Logic ---

  const openModal = (item: Project | GalleryItem) => {
    setSelectedProject(item);
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject) return;
    
    // Determine if we are navigating projects or gallery items
    const isProject = 'category' in selectedProject;
    
    if (isProject) {
        const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
        const nextIndex = (currentIndex + 1) % projects.length;
        setSelectedProject(projects[nextIndex]);
    } else {
        const currentIndex = galleryItems.findIndex(g => g.id === selectedProject.id);
        const nextIndex = (currentIndex + 1) % galleryItems.length;
        setSelectedProject(galleryItems[nextIndex]);
    }
  }, [selectedProject, projects, galleryItems]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject) return;

    const isProject = 'category' in selectedProject;

    if (isProject) {
        const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        setSelectedProject(projects[prevIndex]);
    } else {
        const currentIndex = galleryItems.findIndex(g => g.id === selectedProject.id);
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        setSelectedProject(galleryItems[prevIndex]);
    }
  }, [selectedProject, projects, galleryItems]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, handleNext, handlePrev]);

  // Helper to process Kapwing/YouTube URLs to Embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Kapwing Workspace to Embed
    if (url.includes('kapwing.com/w/')) {
        return url.replace('/w/', '/e/');
    }
    
    // YouTube Watch to Embed
    if (url.includes('youtube.com/watch?v=')) {
        return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
        return url.replace('youtu.be/', 'youtube.com/embed/');
    }

    return url;
  };

  // Helper to check if url is a video file or blob
  const isDirectVideo = (url: string) => {
      if (!url) return false;
      return url.endsWith('.mp4') || url.startsWith('blob:') || url.startsWith('data:video/');
  };

  return (
    <section id="portfolio" className="py-20 bg-white scroll-mt-24">
       <style>{`
        @keyframes marquee-img {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-img {
          animation: marquee-img 30s linear infinite;
        }
        .animate-marquee-img:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-orange-500 font-semibold tracking-wide uppercase mb-2">Portofolio</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800">Karya Terbaik Kami</h3>
          <p className="mt-4 text-slate-600">Lihat hasil pengerjaan booth, gerobak, dan interior yang telah kami selesaikan.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.id 
                  ? 'bg-orange-500 text-white shadow-lg scale-105' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 min-h-[400px]">
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => openModal(project)}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-slate-100 h-64 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                        <ZoomIn size={32} />
                    </div>
                </div>

                {/* Content Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
                  <span className="text-orange-400 font-medium text-xs mb-1 uppercase tracking-wider bg-black/60 w-fit px-2 py-1 rounded backdrop-blur-md">
                    {categories.find(c => c.id === project.category)?.label}
                  </span>
                  <h4 className="text-white text-xl font-bold">{project.title}</h4>
                  <p className="text-slate-300 text-sm mt-1 line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-400">
              <p>Tidak ada proyek ditemukan untuk kategori ini.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-20">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                            currentPage === page
                            ? 'bg-orange-500 text-white shadow-md transform scale-105'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* --- SHOWCASE SECTION --- */}
        <div className="mt-12 pt-12 border-t border-slate-100">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Kolom 1: Image Marquee (Galeri Pengerjaan) */}
              <div className="overflow-hidden relative group">
                 <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <ZoomIn className="text-orange-500" size={24} /> Galeri Pengerjaan
                 </h4>
                 {/* Gradient Fade */}
                 <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                 <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                 
                 {galleryItems.length > 0 ? (
                    <div className="flex animate-marquee-img w-max gap-4 py-4">
                        {displayGalleryItems.map((item, idx) => (
                        <div 
                            key={`mq-${item.id}-${idx}`} 
                            onClick={() => openModal(item)}
                            className="w-48 h-32 rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-transform hover:scale-105 border border-slate-100 flex-shrink-0 relative group/item"
                        >
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 translate-y-full group-hover/item:translate-y-0 transition-transform">
                                <p className="text-white text-[10px] text-center truncate">{item.title}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                 ) : (
                    <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                        Belum ada galeri foto.
                    </div>
                 )}
                 <p className="text-xs text-slate-400 mt-2 italic">*Klik gambar untuk memperbesar</p>
              </div>

              {/* Kolom 2: Video Showcase (Workshop Activity) */}
              <div className="relative">
                 <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <PlayCircle className="text-orange-500" size={24} /> Workshop Activity
                 </h4>
                 <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video group border border-slate-100">
                    {/* Prioritaskan Embed Iframe kecuali jika extension .mp4 atau blob */}
                    {isDirectVideo(generalSettings.workshopVideoUrl) ? (
                         <video 
                           key={generalSettings.workshopVideoUrl}
                           autoPlay 
                           loop 
                           muted 
                           playsInline
                           controls
                           className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                         >
                           <source src={generalSettings.workshopVideoUrl} type="video/mp4" />
                           Browser Anda tidak mendukung tag video.
                         </video>
                    ) : (
                        <iframe 
                            src={getEmbedUrl(generalSettings.workshopVideoUrl)}
                            className="w-full h-full border-none"
                            title="Workshop Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    )}
                 </div>
              </div>

           </div>
        </div>

      </div>

      {/* Lightbox / Image Popup Modal */}
      {selectedProject && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={closeModal}
        >
            <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            >
                <X size={32} />
            </button>

            {/* Nav Buttons */}
            <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 p-3 rounded-full backdrop-blur-sm transition-all z-50 hidden md:block"
            >
                <ChevronLeft size={40} />
            </button>
            <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 p-3 rounded-full backdrop-blur-sm transition-all z-50 hidden md:block"
            >
                <ChevronRight size={40} />
            </button>

            {/* Image Container */}
            <div 
                className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()} 
            >
                <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="max-h-[70vh] md:max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
                />
                
                <div className="mt-6 text-center text-white max-w-2xl">
                    {'category' in selectedProject && (
                        <span className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                            {categories.find(c => c.id === (selectedProject as Project).category)?.label}
                        </span>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedProject.title}</h3>
                    {'description' in selectedProject && (
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed">{(selectedProject as Project).description}</p>
                    )}
                </div>
                
                <p className="mt-4 text-xs text-slate-600 md:hidden">
                    Geser kiri/kanan untuk navigasi
                </p>
            </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;