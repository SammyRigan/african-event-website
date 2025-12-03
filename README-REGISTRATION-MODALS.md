# Registration Modal Components

This document explains how to use the reusable registration modal components that can be imported and used on any page.

## Components Available

### 1. ParticipantRegistrationModal
A modal for event attendees to register for the Creatives Connect Afrika Festival & Forum 2025.

### 2. ExhibitorRegistrationModal
A modal for exhibitors to register for the event.

## How to Use

### Step 1: Import the Components

```tsx
import ParticipantRegistrationModal from "@/components/ParticipantRegistrationModal"
import ExhibitorRegistrationModal from "@/components/ExhibitorRegistrationModal"
```

### Step 2: Add State Variables

```tsx
const [participantModalOpen, setParticipantModalOpen] = useState(false)
const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false)
```

### Step 3: Add the Modal Components

```tsx
{/* Registration Modals */}
<ParticipantRegistrationModal
  open={participantModalOpen}
  onOpenChange={setParticipantModalOpen}
  onSuccess={() => {
    // Handle successful registration
    console.log('Participant registration successful')
  }}
  onError={(error) => {
    // Handle registration error
    console.error('Registration error:', error)
  }}
/>

<ExhibitorRegistrationModal
  open={exhibitorModalOpen}
  onOpenChange={setExhibitorModalOpen}
  onSuccess={() => {
    // Handle successful registration
    console.log('Exhibitor registration successful')
  }}
  onError={(error) => {
    // Handle registration error
    console.error('Registration error:', error)
  }}
/>
```

### Step 4: Add Buttons to Open Modals

```tsx
<Button 
  onClick={() => setParticipantModalOpen(true)}
  className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white"
>
  Register to Attend Event
</Button>

<Button 
  onClick={() => setExhibitorModalOpen(true)}
  className="bg-[#E91F28] hover:bg-[#D10F1F] text-white"
>
  Register as Exhibitor
</Button>
```

## Complete Example

Here's a complete example of how to implement the registration modals on a page:

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ParticipantRegistrationModal from "@/components/ParticipantRegistrationModal"
import ExhibitorRegistrationModal from "@/components/ExhibitorRegistrationModal"

export default function MyPage() {
  const [participantModalOpen, setParticipantModalOpen] = useState(false)
  const [exhibitorModalOpen, setExhibitorModalOpen] = useState(false)

  return (
    <div>
      <h1>My Page</h1>
      
      {/* Registration Buttons */}
      <div className="space-y-4">
        <Button 
          onClick={() => setParticipantModalOpen(true)}
          className="bg-[#E19D2B] hover:bg-[#D18A1A] text-white"
        >
          Register to Attend Event
        </Button>
        
        <Button 
          onClick={() => setExhibitorModalOpen(true)}
          className="bg-[#E91F28] hover:bg-[#D10F1F] text-white"
        >
          Register as Exhibitor
        </Button>
      </div>

      {/* Registration Modals */}
      <ParticipantRegistrationModal
        open={participantModalOpen}
        onOpenChange={setParticipantModalOpen}
        onSuccess={() => {
          console.log('Participant registration successful')
          // Add your success handling here
        }}
        onError={(error) => {
          console.error('Registration error:', error)
          // Add your error handling here
        }}
      />

      <ExhibitorRegistrationModal
        open={exhibitorModalOpen}
        onOpenChange={setExhibitorModalOpen}
        onSuccess={() => {
          console.log('Exhibitor registration successful')
          // Add your success handling here
        }}
        onError={(error) => {
          console.error('Registration error:', error)
          // Add your error handling here
        }}
      />
    </div>
  )
}
```

## Features

### ParticipantRegistrationModal
- Personal information collection
- Organization details
- Visa support requirements
- Future updates preferences
- Consent agreement

### ExhibitorRegistrationModal
- Organization information
- Exhibition details
- Booth requirements
- Additional services needed
- Accommodation and shipping assistance

## Props

Both modals accept the following props:

- `open`: boolean - Controls whether the modal is open
- `onOpenChange`: function - Called when the modal should open/close
- `onSuccess`: function (optional) - Called when registration is successful
- `onError`: function (optional) - Called when registration fails

## Styling

The modals use the existing design system and maintain consistency with:
- Black and gold color scheme (`#E19D2B`)
- Rounded-none design
- Responsive layout
- Proper form validation

## Dependencies

The modals depend on:
- `@/components/ui/*` - UI components from shadcn/ui
- `@/lib/firebaseService` - Firebase integration for form submission
- React Hook Form for form state management
