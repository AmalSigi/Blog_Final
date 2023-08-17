import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OffsetService {
  public offset = signal(0);
  public searchInput = signal(undefined);
  public pageSize = 5;
  public nextPage(currentPage: number) {
    // const offset=+this.pageSize;
    this.offset.update((offset) => offset + this.pageSize);
  }
  public previousPage(currentPage: number) {
    this.offset.update((offset) => offset - this.pageSize);
  }
  public togglePage(currentPage: number) {
    this.offset.set((currentPage - 1) * this.pageSize);
  }
  public toggleInputData(inputValue: any) {
    this.searchInput.set(inputValue);
    console.log(inputValue);
  }
}
