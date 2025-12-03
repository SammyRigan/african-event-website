import EditGalleryImageClientWrapper from './EditGalleryImageClientWrapper';

// Catch-all route for static export compatibility
// Handles /gallery/edit/[id] dynamically

// Required for static export - returns empty array since IDs are dynamic
export async function generateStaticParams() {
  return [];
}

export default function EditGalleryImagePage({ params }: { params: { id: string[] | string } }) {
  const idArray = params?.id;
  const id = Array.isArray(idArray) ? idArray[0] : idArray;

  // Handle invalid IDs
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Image ID</h1>
          <p className="text-gray-600">Please navigate to the admin panel to edit gallery images.</p>
        </div>
      </div>
    );
  }

  return <EditGalleryImageClientWrapper imageId={id} />;
}
