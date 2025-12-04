"use client"

import { Dialog, DialogContent } from '@/components/ui/dialog';
import EditBlogClient from './EditBlogClient';

interface EditBlogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogId: string | null;
  onSuccess?: () => void;
}

export default function EditBlogModal({ 
  open, 
  onOpenChange, 
  blogId,
  onSuccess 
}: EditBlogModalProps) {
  const handleSuccess = () => {
    onSuccess?.();
    onOpenChange(false);
  };

  if (!blogId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[100vh] w-full p-0 overflow-hidden bg-gray-50">
        <div className="overflow-y-auto max-h-[98vh]">
          <EditBlogClient 
            blogId={blogId} 
            onClose={() => onOpenChange(false)}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

