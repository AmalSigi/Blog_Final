import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'formatLinks'
})
export class FormatLinksPipe implements PipeTransform{
    transform(content: string): string {
        // Match [text](url) patterns in the content
        const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

        const modifiedContent = content.replace(linkPattern, (match, text, url) => {
            return `<a href="${url}" class="text-blue-600 underline">${text}</a>`;
        });

        return modifiedContent;
    }

}