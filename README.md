# Paroly - MusicStream

This is a web application for managing music tracks, built with Angular and NgRx. It allows users to add, view, and play music tracks, as well as upload cover images for the tracks.

## Features

- Add new music tracks with metadata (title, artist, description, category)
- Upload audio files and cover images
- View track details and play audio
- Navigate between tracks
- Adjust volume and track playback time

## Technologies Used

- Angular
- NgRx (for state management)
- IndexedDB (for storing audio files)
- Tailwind CSS (for styling)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v17)

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

4. Open your browser and navigate to `http://localhost:4200`.

## Project Structure

- `src/app/features/track/track-details/track-details.component.html`: HTML template for track details.
- `src/app/features/track/track-details/track-details.component.ts`: TypeScript component for track details.
- `src/app/features/track/track-form/track-form.component.html`: HTML template for adding new tracks.
- `src/app/features/track/track-form/track-form.component.ts`: TypeScript component for adding new tracks.
- `src/app/models/track.model.ts`: TypeScript models for track and audio file.
- `src/app/store/track.actions.ts`: NgRx actions for track management.
- `src/app/store/track.selectors.ts`: NgRx selectors for track management.
- `src/app/core/indexed-db.service.ts`: Service for interacting with IndexedDB.
- `src/app/services/audio.service.ts`: Service for handling audio playback.

## Usage

### Adding a New Track

1. Navigate to the "Add Track" page.
2. Fill in the track details (title, artist, description, category).
3. Upload an audio file (max 15MB).
4. Upload a cover image (optional, max 5MB).
5. Click "Save" to add the track.

### Viewing and Playing Tracks

1. Navigate to the "Track Details" page.
2. Use the play/pause button to control playback.
3. Adjust the volume using the volume slider.
4. Navigate between tracks using the previous/next buttons.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
