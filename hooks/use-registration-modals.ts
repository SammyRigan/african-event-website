import { useState } from 'react'

export function useRegistrationModals() {
  const [participantModalOpen, setParticipantModalOpen] = useState(false)
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false)

  const openParticipantModal = () => setParticipantModalOpen(true)
  const closeParticipantModal = () => setParticipantModalOpen(false)
  
  const openExhibitorModal = () => setExhibitorModalOpen(true)
  const closeExhibitorModal = () => setExhibitorModalOpen(false)

  return {
    participantModalOpen,
    exhibitorModalOpen,
    openParticipantModal,
    closeParticipantModal,
    openExhibitorModal,
    closeExhibitorModal
  }
}
