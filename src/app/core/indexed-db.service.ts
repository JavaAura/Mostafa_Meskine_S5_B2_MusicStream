import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { Observable, from } from 'rxjs';

interface Track {
  id: number;
  name: string;
  artist: string;
  description?: string;
  addedDate: Date;
  duration: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private db!: IDBPDatabase;

  constructor() {
    this.initDB();
  }

  private async initDB() {
    this.db = await openDB('MusicStreamDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('tracks')) {
          const store = db.createObjectStore('tracks', { keyPath: 'id', autoIncrement: true });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('category', 'category', { unique: false });
        }
      },
    });
  }

  // Add a new track (Observable)
  addTrack(track: Omit<Track, 'id'>): Observable<Track> {
    return from(
      this.db.add('tracks', { ...track, id: undefined }).then((id) => {
        return { ...track, id: id as number };
      })
    );
  }

  // Get all tracks (Observable)
  getAllTracks(): Observable<Track[]> {
    return from(this.db.getAll('tracks'));
  }

  // Get a single track by ID (Observable)
  getTrackById(id: number): Observable<Track | undefined> {
    return from(this.db.get('tracks', id));
  }

  // Update a track (Observable)
  updateTrack(track: Track): Observable<void> {
    return from(this.db.put('tracks', track).then(() => {}));
  }

  // Delete a track (Observable)
  deleteTrack(id: number): Observable<void> {
    return from(this.db.delete('tracks', id));
  }
}
