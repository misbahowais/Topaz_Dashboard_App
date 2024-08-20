import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class GuuidGen{
    standard(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r: number = Math.random() * 16 | 0;
        const v: number = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    short(): string {
      return 'xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r: number = Math.random() * 16 | 0;
        const v: number = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }