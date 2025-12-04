"use client"

import { Dialog, DialogContent } from '@/components/ui/dialog';
import EditPartnerClient from './EditPartnerClient';

interface EditPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerId: string | null;
  onSuccess?: () => void;
}

export default function EditPartnerModal({ 
  open, 
  onOpenChange, 
  partnerId,
  onSuccess 
}: EditPartnerModalProps) {
  const handleSuccess = () => {
    onSuccess?.();
    onOpenChange(false);
  };

  if (!partnerId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[100vh] w-full p-0 overflow-hidden bg-gray-50">
        <div className="overflow-y-auto max-h-[98vh]">
          <EditPartnerClient 
            partnerId={partnerId} 
            onClose={() => onOpenChange(false)}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

