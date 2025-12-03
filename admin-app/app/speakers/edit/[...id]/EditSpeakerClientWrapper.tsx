"use client"

import EditSpeakerClient from '../EditSpeakerClient';

interface EditSpeakerClientWrapperProps {
  speakerId: string;
}

export default function EditSpeakerClientWrapper({ speakerId }: EditSpeakerClientWrapperProps) {
  return <EditSpeakerClient speakerId={speakerId} />;
}
