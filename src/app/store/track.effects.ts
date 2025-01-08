import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {TracksService} from '../features/services/tracks.service';
import * as TrackActions from './track.actions';
import {IndexedDbService} from "../core/indexed-db.service";

@Injectable()
export class TrackEffects {
  constructor(
    private actions$: Actions,
    private trackService: TracksService,
    private indexedDbService: IndexedDbService
  ) {
  }

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      mergeMap(() =>
        this.trackService.getAllTracks().pipe(
          map(tracks => TrackActions.loadTracksSuccess({tracks})),
          catchError(error => of(TrackActions.loadTracksFailure({error})))
        )
      )
    )
  );

  addTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.addTrack),
      mergeMap(action =>
        this.indexedDbService.addAudioFile(action.audioFile).pipe(
          mergeMap(audioFile =>
            this.indexedDbService.addTrack({ ...action.track, createdAt: new Date() }).pipe(
              map(track => TrackActions.addTrackSuccess({ track })),
              catchError(error => of(TrackActions.addTrackFailure({ error })))
            )
          )
        )
      )
    )
  );

  updateTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.updateTrack),
      mergeMap(action =>
        this.trackService.updateTrack(action.track).pipe(
          map(track => TrackActions.updateTrackSuccess({
            track: track as unknown as {
              id?: number;
              title: string;
              artist: string;
              description?: string;
              category: string;
              duration: number;
              createdAt: Date
            }
          })),
          catchError(error => of(TrackActions.updateTrackFailure({error})))
        )
      )
    )
  );

  deleteTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.deleteTrack),
      mergeMap(action =>
        this.trackService.deleteTrack(Number(action.trackId)).pipe(
          map(() => TrackActions.deleteTrackSuccess({trackId: action.trackId})),
          catchError(error => of(TrackActions.deleteTrackFailure({error})))
        )
      )
    )
  );
}
