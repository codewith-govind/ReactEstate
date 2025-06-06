import React from "react";

interface UnitPhotosProps {
  photos: string[]; // array of image URLs
  onAddPhoto?: () => void;
  onRemovePhoto?: (index: number) => void;
}

const UnitPhotos: React.FC<UnitPhotosProps> = ({ photos, onAddPhoto, onRemovePhoto }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Photos</h3>
        {onAddPhoto && (
          <button
            onClick={onAddPhoto}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
          >
            Add Photo
          </button>
        )}
      </div>

      {photos.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No photos added yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {photos.map((url, i) => (
            <div key={i} className="relative group rounded overflow-hidden border border-gray-300 dark:border-gray-700">
              <img src={url} alt={`Unit photo ${i + 1}`} className="w-full h-32 object-cover" />
              {onRemovePhoto && (
                <button
                  onClick={() => onRemovePhoto(i)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-600 rounded-full p-1 text-white hover:bg-red-700 transition"
                  title="Remove photo"
                  type="button"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitPhotos;
