import { ReactNode, useRef, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

export const imagePayloadSchema = z.object({
  file: z.instanceof(File).nullable(),
  previewUrl: z.string(),
});

export type ImagePayload = z.infer<typeof imagePayloadSchema>;

type ImageUploaderProps = {
  images?: ImagePayload[];
  onImagesChange?: (images: ImagePayload[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  render?: (props: {
    images: ImagePayload[];
    isUploadingFromLocal: boolean;
    triggerFileInput: () => void;
    disabled?: boolean;
    readOnly?: boolean;
  }) => ReactNode;
};

/**
 * A headless image uploader component that allows users to upload images.
 */
export function ImageUploader({
  images,
  onImagesChange,
  render,
  multiple,
  disabled,
  readOnly,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<ImagePayload[]>(images ?? []);
  const [isUploadingFromLocal, setIsUploadingFromLocal] = useState(false);

  const handleFileInputChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    // TODO: Check file size and dimensions if needed

    setIsUploadingFromLocal(true);
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const previewImageElem = new Image();
      const previewUrl = fileReader.result?.toString() || '';

      previewImageElem.addEventListener('load', (e) => {
        const { src } = e.currentTarget as HTMLImageElement;
        const newUploadedImages: ImagePayload[] = multiple
          ? [
              ...uploadedImages,
              {
                file,
                previewUrl: src,
              },
            ]
          : [{ file, previewUrl: src }];

        setUploadedImages(newUploadedImages);
        onImagesChange?.(newUploadedImages);
      });
      previewImageElem.src = previewUrl;
      setIsUploadingFromLocal(false);
    });
    fileReader.readAsDataURL(file);
  };

  return (
    <>
      {render?.({
        images: uploadedImages,
        isUploadingFromLocal,
        triggerFileInput: () => {
          if (disabled || readOnly) return;
          fileInputRef.current?.click();
        },
        disabled,
        readOnly,
      })}
      <input
        ref={fileInputRef}
        multiple={multiple}
        disabled={disabled}
        readOnly={readOnly}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={(e) => Array.from(e.target.files ?? []).forEach(handleFileInputChange)}
      />
    </>
  );
}
