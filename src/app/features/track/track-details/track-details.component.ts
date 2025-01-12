import {Component, OnInit, Renderer2} from '@angular/core';
import { Observable } from 'rxjs';
import { AudioFile, Track } from '../../../models/track.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTrackById, selectAllTracks } from '../../../store/track.selectors';
import { IndexedDbService } from '../../../core/indexed-db.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss'],
})
export class TrackDetailsComponent implements OnInit {
  track$: Observable<Track | undefined> = new Observable<Track | undefined>();
  audioFile$: Observable<AudioFile | undefined> = new Observable<AudioFile | undefined>();
  tracks$: Observable<Track[]> = new Observable<Track[]>();
  currentTrackIndex: number = 0;
  isPlaying: boolean = false;
  currentTime: number = 0;
  volume: number = 0.5;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private indexedDbService: IndexedDbService,
    protected audioService: AudioService,
    private renderer: Renderer2
  ) {
    const stringTrackId = this.route.snapshot.paramMap.get('id');
    const trackId = stringTrackId ? parseInt(stringTrackId, 10) : null;
    if (trackId) {
      this.track$ = this.store.select(selectTrackById, { id: trackId });
      this.tracks$ = this.store.select(selectAllTracks);
      this.track$.subscribe(track => {
        if (track && track.id) {
          this.audioFile$ = this.indexedDbService.getAudioFileById(track.id);
          this.audioFile$.subscribe(audioFile => {
            if (audioFile) {
              this.audioService.loadAudioFromBlob(audioFile.fileBlob);
              this.currentTrackIndex = track.id ? track.id - 1 : 0;
              this.audioService.audioElement.ontimeupdate = () => {
                this.currentTime = this.audioService.getCurrentTime();
              };
            }
          });
        }
      });
    } else {
      console.error('Track ID is null');
    }
  }

  ngOnInit(): void {}

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  previousTrack(): void {
    this.tracks$.subscribe(tracks => {
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
        const previousTrack = tracks[this.currentTrackIndex];
        this.loadTrack(previousTrack);
      }
    });
  }

  nextTrack(): void {
    this.tracks$.subscribe(tracks => {
      if (this.currentTrackIndex < tracks.length - 1) {
        this.currentTrackIndex++;
        const nextTrack = tracks[this.currentTrackIndex];
        this.loadTrack(nextTrack);
      }
    });
  }

  loadTrack(track: Track): void {
    this.track$ = this.store.select(selectTrackById, { id: track.id });
    this.track$.subscribe(track => {
      if (track && track.id) {
        this.audioFile$ = this.indexedDbService.getAudioFileById(track.id);
        this.audioFile$.subscribe(audioFile => {
          if (audioFile) {
            this.audioService.loadAudioFromBlob(audioFile.fileBlob);
            this.audioService.play();
            this.isPlaying = true;
          }
        });
      }
    });
  }

  setVolume(value: string): void {
    const volume = parseFloat(value);
    this.volume = volume;
    this.audioService.setVolume(volume);
  }

  onTimeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const time = parseFloat(input.value);
    this.audioService.setCurrentTime(time);
  }

  protected readonly HTMLInputElement = HTMLInputElement;
  protected readonly console = console;
}
