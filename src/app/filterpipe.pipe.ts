import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value, articleId: number, foreignkey: number) {
    if (articleId === foreignkey) {
      return value;
    }
  }

}
