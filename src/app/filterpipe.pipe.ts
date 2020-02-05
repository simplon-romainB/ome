import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value, article_id: number, foreignkey: number) {
    if (article_id === foreignkey) {
      return value;
    }
  }

}
