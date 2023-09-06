import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'formatLinks',
})
export class FormatLinksPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}
  transform(contentWithStyles: string): string {
    console.log(contentWithStyles);
    const modifiedContent = contentWithStyles.replace(/<([\w-]+)([^>]*)style="([^"]*)"([^>]*)>/g, (match, tag, beforeStyle, styles, afterStyle) => {
      const stylePairs = styles.split(';').filter(Boolean);
      
      console.log(stylePairs)
      const stylesObj: { [key: string]: string } = {};
      stylePairs.forEach((pair:any) => {
        const [property, value] = pair.split(':').map((part:any) => part.trim("'"));
        stylesObj[property] = value;
        console.log(value)
        const font=value.split(',')
        console.log(font[0])
      });
      
      const styleString = Object.keys(stylesObj).map(property => `${property}: ${stylesObj[property]};`).join(' ');
    console.log(styleString);

      return `<${tag}${beforeStyle} style="${styleString}"${afterStyle}>`;

    });
    console.log(modifiedContent);

    return modifiedContent;
  }
}
