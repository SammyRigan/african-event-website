"use client"

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import EditSpeakerClient from './EditSpeakerClient';

interface EditSpeakerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  speakerId: string | null;
  onSuccess?: () => void;
}

export default function EditSpeakerModal({ 
  open, 
  onOpenChange, 
  speakerId,
  onSuccess 
}: EditSpeakerModalProps) {
  const handleSuccess = () => {
    onSuccess?.();
    onOpenChange(false);
  };

  if (!speakerId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[100vh] w-full p-0 overflow-hidden bg-gray-50">
        <div className="overflow-y-auto max-h-[98vh]">
          <EditSpeakerClient 
            speakerId={speakerId} 
            onClose={() => onOpenChange(false)}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

