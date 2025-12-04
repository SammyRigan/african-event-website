"use client"

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import EditGalleryImageClient from './EditGalleryImageClient';

interface EditGalleryImageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageId: string | null;
  onSuccess?: () => void;
}

export default function EditGalleryImageModal({ 
  open, 
  onOpenChange, 
  imageId,
  onSuccess 
}: EditGalleryImageModalProps) {
  const handleSuccess = () => {
    onSuccess?.();
    onOpenChange(false);
  };

  if (!imageId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[100vh] w-full p-0 overflow-hidden bg-gray-50">
        <div className="overflow-y-auto max-h-[98vh]">
          <EditGalleryImageClient 
            imageId={imageId} 
            onClose={() => onOpenChange(false)}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

