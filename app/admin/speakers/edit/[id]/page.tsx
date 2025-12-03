import EditSpeakerClient from './EditSpeakerClient';

// This is an admin page that requires authentication
// Admin pages should work dynamically, not be statically generated
// Note: Admin pages only work in development mode (npm run dev)
// For production, use npm run build:public to exclude admin pages

// Required for output: export config - returns empty array since admin pages shouldn't be pre-generated
export async function generateStaticParams() {
  return [];
}

// Allow dynamic params at runtime (for dev mode)
export const dynamicParams = true;

export default async function EditSpeakerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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

  return <EditSpeakerClient speakerId={id} />;
}
