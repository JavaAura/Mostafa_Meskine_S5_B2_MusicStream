import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IndexedDbService} from "../../core/indexed-db.service";

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  constructor(private indexedDbService: IndexedDbService) {}

  addTrack(track: any): Observable<any> {
    return this.indexedDbService.addTrack(track);
  }

  getAllTracks(): Observable<any[]> {
    return this.indexedDbService.getAllTracks();
  }

  getTrackById(id: number): Observable<any> {
    return this.indexedDbService.getTrackById(id);
  }

  updateTrack(track: any): Observable<void> {
    return this.indexedDbService.updateTrack(track);
  }

  deleteTrack(id: number): Observable<void> {
    return this.indexedDbService.deleteTrack(id);
  }
}
