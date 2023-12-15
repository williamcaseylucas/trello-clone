"use client";

import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[]> | undefined;
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus(); // gives us form state without having to pass it in
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Grabbed id from actual collection that trello uses
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result?.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log("Failed to get images from unsplash");
        }
      } catch (error) {
        console.log(error + ", setting images to defaultImages...");
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((img) => (
          <div
            key={img.id}
            className={`cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted ${
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            }`}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(img.id);
            }}
          >
            {/* we passed id from form-popover into this */}
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === img.id}
              disabled={pending}
              value={`${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`}
            />
            <Image
              fill
              alt="Unsplash image"
              className="object-cover rounded-sm"
              src={img.urls.thumb}
            />
            {selectedImageId === img.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            {/* Whenever we hover on top div, this becomes visible */}
            <Link
              href={img.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {img.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};

export default FormPicker;
