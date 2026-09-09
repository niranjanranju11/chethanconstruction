import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { ProjectMediaItem } from '../types';

interface LightboxModalProps {
  mediaList: ProjectMediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  mediaList,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentMedia = mediaList[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + mediaList.length) % mediaList.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % mediaList.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, mediaList.length, onClose, onNavigate]);

  if (!currentMedia) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-wider text-slate-300">
            {currentIndex + 1} / {mediaList.length}
          </span>
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-amber-600 text-white uppercase tracking-wider">
            {currentMedia.stage} Stage
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Display */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {mediaList.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex - 1 + mediaList.length) % mediaList.length)}
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="max-w-5xl max-h-[80vh] flex items-center justify-center">
          {currentMedia.mediaType === 'VIDEO' ? (
            <video
              src={currentMedia.publicUrl}
              controls
              autoPlay
              className="max-h-[80vh] max-w-full rounded-lg shadow-2xl"
            />
          ) : (
            <img
              src={currentMedia.publicUrl}
              alt={currentMedia.originalFilename || 'Project photo'}
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
          )}
        </div>

        {mediaList.length > 1 && (
          <button
            onClick={() => onNavigate((currentIndex + 1) % mediaList.length)}
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all hover:scale-105"
            aria-label="Next item"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {mediaList.length > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 max-w-4xl mx-auto scrollbar-thin">
          {mediaList.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onNavigate(idx)}
              className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex ? 'border-amber-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={item.publicUrl}
                alt=""
                className="w-full h-full object-cover"
              />
              {item.mediaType === 'VIDEO' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                  <Play className="w-3.5 h-3.5 fill-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
