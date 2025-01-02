import { Component } from '@angular/core';
import { TracksService } from '../tracks.service';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss'],
})
export class TrackDetailsComponent {
  track = {
    name: '',
    artist: '',
    description: '',
    addedDate: new Date(),
    duration: '',
    category: '',
  };

  constructor(private tracksService: TracksService) {}

  addTrack() {
    this.track.duration = '3:45'; // Example duration
    this.tracksService.addTrack(this.track).then(() => {
      alert('Track added!');
    });
  }
}
