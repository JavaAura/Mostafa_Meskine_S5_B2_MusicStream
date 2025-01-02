import { Component, OnInit } from '@angular/core';
import {TracksService} from "../services/tracks.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  tracks: any[] = [];

  constructor(private tracksService: TracksService) {}

  ngOnInit() {
    this.fetchTracks();
  }

  fetchTracks() {
    this.tracksService.getAllTracks().subscribe((tracks) => {
      this.tracks = tracks;
    });
  }

  deleteTrack(id: number) {
    this.tracksService.deleteTrack(id).subscribe(() => {
      this.fetchTracks();
    });
  }
}
