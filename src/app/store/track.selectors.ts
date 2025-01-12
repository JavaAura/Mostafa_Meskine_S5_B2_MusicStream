import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackState } from './track.reducer';

export const selectTrackState = createFeatureSelector<TrackState>('tracks');

export const selectAllTracks = createSelector(
  selectTrackState,
  (state: TrackState) => state.tracks
);

export const selectTrackError = createSelector(
  selectTrackState,
  (state: TrackState) => state.error
);

export const selectTrackById = createSelector(
  selectAllTracks,
  (tracks: any[], props: { id: any; }) => tracks.find(track => track.id === props.id)
);
