import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat',
  standalone: true
})
export class DateformatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let date = new Date(value)
    return date.toLocaleString();
  }

}
