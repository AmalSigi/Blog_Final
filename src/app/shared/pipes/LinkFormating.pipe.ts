import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'formatLinks',
})
export class FormatLinksPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}
  transform(content: string): string {
    // Match [text](url) patterns in the content
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

    const modifiedContent = content.replace(
      linkPattern,
      (_match, text, url) => {
        return `<a href="${url}" target="_blank" class="linkcss  ">${text}</a>`;
      }
    );

    return modifiedContent;
  }
}
