import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(value,article_id,foreignkey) {
    if (article_id == foreignkey) {
      return value
    }
  }

}
