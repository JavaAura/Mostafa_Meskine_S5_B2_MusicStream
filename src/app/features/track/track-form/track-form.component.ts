import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track } from '../../../models/track.model';
import * as TrackActions from '../../../store/track.actions';

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss'],
})
export class TrackFormComponent {
  track: Partial<Track> = {};
  selectedFile: File | null = null;
  selectedCoverImage: File | null = null;

  constructor(private store: Store) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size <= 15 * 1024 * 1024) { // 15MB limit
        this.selectedFile = file;
      } else {
        alert('File size exceeds 15MB limit.');
      }
    }
  }

  onCoverImageSelected(event: Event): void { // Add this method
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        this.selectedCoverImage = file;
      } else {
        alert('Cover image size exceeds 5MB limit.');
      }
    }
  }

  addTrack() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const audioData = reader.result as ArrayBuffer;
        const audioBlob = new Blob([audioData], { type: this.selectedFile!.type });
        const audioElement = new Audio(URL.createObjectURL(audioBlob));
        audioElement.onloadedmetadata = () => {
          const duration = audioElement.duration;
          const audioFile = {
            fileName: this.selectedFile!.name,
            fileBlob: audioBlob,
            fileType: this.selectedFile!.type,
            fileSize: this.selectedFile!.size,
            createdAt: new Date()
          };
          this.track.duration = duration;

          if (this.selectedCoverImage) {
            const coverReader = new FileReader();
            coverReader.onload = () => {
              const coverBlob = new Blob([coverReader.result as ArrayBuffer], { type: this.selectedCoverImage!.type });
              if (coverBlob) {
                this.track.coverImage = coverBlob;
                this.store.dispatch(TrackActions.addTrack({ track: this.track as Track, audioFile }));
              }
            };
            coverReader.readAsArrayBuffer(this.selectedCoverImage);
          } else {
            this.store.dispatch(TrackActions.addTrack({ track: this.track as Track, audioFile }));
          }
        };
      };
      reader.readAsArrayBuffer(this.selectedFile);
    }
  }
}
