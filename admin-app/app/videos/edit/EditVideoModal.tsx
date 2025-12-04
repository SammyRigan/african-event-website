"use client"

import { Dialog, DialogContent } from '@/components/ui/dialog';
import EditVideoClient from './EditVideoClient';

interface EditVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string | null;
  onSuccess?: () => void;
}

export default function EditVideoModal({ 
  open, 
  onOpenChange, 
  videoId,
  onSuccess 
}: EditVideoModalProps) {
  const handleSuccess = () => {
    onSuccess?.();
    onOpenChange(false);
  };

  if (!videoId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[100vh] w-full p-0 overflow-hidden bg-gray-50">
        <div className="overflow-y-auto max-h-[98vh]">
          <EditVideoClient 
            videoId={videoId} 
            onClose={() => onOpenChange(false)}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

