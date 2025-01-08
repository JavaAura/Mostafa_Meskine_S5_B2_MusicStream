import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { Observable, from } from 'rxjs';
import {MusicStreamDB, Track} from '../models/track.model';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private db!: IDBPDatabase<MusicStreamDB>;

  constructor() {
    this.initDB().then(r => console.log('DB initialized'));
  }

  private async initDB() {
    this.db = await openDB<MusicStreamDB>('MusicStreamDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('tracks')) {
          const trackStore = db.createObjectStore('tracks', { keyPath: 'id', autoIncrement: true });
          trackStore.createIndex('title', 'title', { unique: false });
          trackStore.createIndex('category', 'category', { unique: false });
        }
        if (!db.objectStoreNames.contains('audioFiles')) {
          db.createObjectStore('audioFiles', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  private async ensureDBInitialized(): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }
  }

  addTrack(track: Omit<MusicStreamDB['tracks']['value'], 'id'>): Observable<MusicStreamDB['tracks']['value']> {
    return from(
      this.db.put('tracks', track).then((id) => {
        return { ...track, id: id as number };
      })
    );
  }

  addAudioFile(audioFile: Omit<MusicStreamDB['audioFiles']['value'], 'id'>): Observable<MusicStreamDB['audioFiles']['value']> {
    return from(
      this.db.put('audioFiles', audioFile).then((id) => {
        return { ...audioFile, id: id as number };
      })
    );
  }

  getAllTracks(): Observable<MusicStreamDB['tracks']['value'][]> {
    return from(
      (async () => {
        await this.ensureDBInitialized();
        return this.db.getAll('tracks');
      })()
    );
  }

  getTrackById(id: number): Observable<MusicStreamDB['tracks']['value'] | undefined> {
    return from(this.db.get('tracks', id));
  }

  updateTrack(track: MusicStreamDB['tracks']['value']): Observable<void> {
    return from(this.db.put('tracks', track).then(() => {}));
  }

  deleteTrack(id: number): Observable<void> {
    return from(this.db.delete('tracks', id));
  }
}
