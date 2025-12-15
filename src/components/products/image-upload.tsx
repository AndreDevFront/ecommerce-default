import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

import styles from "./../image-upload.module.css";

interface ImageUploadProps {
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function ImageUpload({
  preview,
  onImageChange,
  onRemove,
}: ImageUploadProps) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>Foto do Produto</span>

      {!preview ? (
        <label htmlFor="file-upload" className={styles.uploadArea}>
          <div className={styles.uploadContent}>
            <ImageIcon className={styles.uploadIcon} />

            <div className={styles.uploadTextContainer}>
              <span className={styles.uploadLink}>
                <span>Clique para enviar</span>
              </span>
            </div>

            <p className={styles.helperText}>PNG, JPG até 5MB</p>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={onImageChange}
            />
          </div>
        </label>
      ) : (
        <div className={styles.previewContainer}>
          <Image
            src={preview}
            alt="Preview"
            className={styles.previewImage}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <button
            type="button"
            onClick={onRemove}
            className={styles.removeButton}
            title="Remover imagem"
          >
            <X className={styles.removeIcon} />
          </button>
        </div>
      )}
    </div>
  );
}
