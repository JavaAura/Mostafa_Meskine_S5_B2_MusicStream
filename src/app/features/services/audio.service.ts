import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext: AudioContext;
  audioElement: HTMLAudioElement;
  private track: MediaElementAudioSourceNode;
  private gainNode: GainNode;
  private panNode: StereoPannerNode;
  private playbackRate: number;

  constructor() {
    this.audioContext = new AudioContext();
    this.audioElement = new Audio();
    this.track = this.audioContext.createMediaElementSource(this.audioElement);
    this.gainNode = this.audioContext.createGain();
    this.panNode = this.audioContext.createStereoPanner();
    this.playbackRate = 1.0;

    this.track.connect(this.gainNode).connect(this.panNode).connect(this.audioContext.destination);
  }

  loadAudioFromBlob(blob: Blob): void {
    const url = URL.createObjectURL(blob);
    this.audioElement.src = url;
  }

  play(): void {
    this.audioElement.play();
  }

  pause(): void {
    this.audioElement.pause();
  }

  setVolume(volume: number): void {
    this.gainNode.gain.value = volume;
  }

  getCurrentTime(): number {
    return this.audioElement.currentTime;
  }

  setCurrentTime(time: number): void {
    this.audioElement.currentTime = time;
  }

  setPlaybackRate(rate: number): void {
    this.playbackRate = rate;
    this.audioElement.playbackRate = rate;
  }

  setPan(value: number): void {
    this.panNode.pan.value = value;
  }
}
