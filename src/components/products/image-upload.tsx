import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

import styles from "./../image-upload.module.css";

interface ImageUploadProps {
  value: (string | File)[];
  onImageAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
}

export function ImageUpload({
  value = [],
  onImageAdd,
  onRemove,
}: ImageUploadProps) {
  const previews = useMemo(() => {
    return value.map((item) => {
      if (typeof item === "string") {
        return item;
      }
      return URL.createObjectURL(item);
    });
  }, [value]);

  return (
    <div className={styles.field}>
      <span className={styles.label}>Fotos do Produto</span>

      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        <label
          htmlFor="file-upload"
          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <ImagePlus className="h-6 w-6 text-gray-400" />
          <span className="mt-2 text-xs text-gray-500">Adicionar</span>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onImageAdd}
          />
        </label>

        {previews.map((url, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200"
          >
            <Image
              src={url}
              alt={`Preview ${index}`}
              className="object-cover"
              fill
              sizes="200px"
            />

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <p className={styles.helperText}>
        Você pode adicionar várias fotos. A primeira será a capa.
      </p>
    </div>
  );
}
