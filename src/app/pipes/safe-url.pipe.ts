import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: Blob): SafeUrl {
    const url = URL.createObjectURL(value);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
