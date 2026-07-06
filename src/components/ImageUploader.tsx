import React, { useState, useRef } from 'react';
import { Camera, RotateCcw, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  imageKey: 'hero' | 'market' | 'contact';
  defaultImage: string;
  customImage: string | null;
  onUpdateImage: (key: 'hero' | 'market' | 'contact', base64: string | null) => void;
  alt: string;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageKey,
  defaultImage,
  customImage,
  onUpdateImage,
  alt,
  className = '',
  imgClassName = '',
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayImage = customImage || defaultImage;

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).");
      return;
    }

    // Limit size check (e.g., 4MB) to stay within safe browser/state limits
    if (file.size > 4 * 1024 * 1024) {
      alert("Cette image est trop volumineuse (maximum 4 Mo). Veuillez utiliser une image compressée pour une meilleure expérience.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        onUpdateImage(imageKey, base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Voulez-vous restaurer la photo d'origine ?")) {
      onUpdateImage(imageKey, null);
    }
  };

  return (
    <div
      className={`relative group overflow-hidden select-none ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Invisible file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Main Image */}
      <img
        src={displayImage}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${imgClassName} ${
          isDragging ? 'scale-105 blur-sm brightness-75' : ''
        }`}
        referrerPolicy="no-referrer"
      />

      {/* Indicator overlay for custom images */}
      {customImage && (
        <div className="absolute top-4 left-4 z-20 bg-amber-500 text-indigo-950 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-950 animate-pulse"></span>
          Ma Photo active
        </div>
      )}

      {/* Interactive premium hover action controls */}
      <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 z-10 backdrop-blur-[2px]">
        <button
          type="button"
          onClick={triggerUpload}
          className="bg-white hover:bg-amber-500 text-stone-900 hover:text-indigo-950 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all duration-200 cursor-pointer scale-95 group-hover:scale-100"
        >
          <Camera className="w-4 h-4" />
          Remplacer par ma photo
        </button>

        {customImage && (
          <button
            type="button"
            onClick={handleReset}
            className="bg-stone-900/80 hover:bg-rose-600 text-white px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurer l'origine
          </button>
        )}

        <p className="text-[10px] text-stone-200 font-mono mt-1 opacity-75">
          Ou glissez-déposez votre photo ici
        </p>
      </div>

      {/* Dragging state overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30 border-4 border-dashed border-amber-500 rounded-3xl m-2">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-indigo-950 flex items-center justify-center animate-bounce">
            <ImageIcon className="w-6 h-6" />
          </div>
          <span className="text-white font-medium text-sm">Déposez votre photo pour l'utiliser !</span>
          <span className="text-stone-300 text-xs">Fichiers acceptés : JPG, PNG, WebP (max 4Mo)</span>
        </div>
      )}

      {/* Original absolute child overlays (e.g. badges, gradients) */}
      {children}
    </div>
  );
};
