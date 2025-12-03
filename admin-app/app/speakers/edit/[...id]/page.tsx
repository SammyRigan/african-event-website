import EditSpeakerClientWrapper from './EditSpeakerClientWrapper';

// Catch-all route for static export compatibility
// Handles /speakers/edit/[id] dynamically

// Required for static export - returns empty array since IDs are dynamic
export async function generateStaticParams() {
  return [];
}

export default function EditSpeakerPage({ params }: { params: { id: string[] | string } }) {
  const idArray = params?.id;
  const id = Array.isArray(idArray) ? idArray[0] : idArray;

  // Handle invalid IDs
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Speaker ID</h1>
          <p className="text-gray-600">Please navigate to the admin panel to edit speakers.</p>
        </div>
      </div>
    );
  }

  return <EditSpeakerClientWrapper speakerId={id} />;
}
