"use client"

import EditGalleryImageClient from '../EditGalleryImageClient';

interface EditGalleryImageClientWrapperProps {
  imageId: string;
}

export default function EditGalleryImageClientWrapper({ imageId }: EditGalleryImageClientWrapperProps) {
  return <EditGalleryImageClient imageId={imageId} />;
}
