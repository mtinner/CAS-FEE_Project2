import {Pipe, PipeTransform} from '@angular/core';
import {Article} from '../../../../models/Article';

@Pipe({name: 'articlesByGroup', pure: false})
export class ArticlesByGroupPipe implements PipeTransform {
    transform(value: Array<Article>, id: number): Array<Article> {
        if (!(value && value.length && Number.isInteger(id))) {
            return [];
        }
        else if (id === 0) {
            return value;
        }
        return value.filter((item: Article) => {
            if (typeof item.articleGroup === 'undefined') {
                throw 'relationAttribute in not found';
            }
            return item.articleGroup === id;
        });
    }
}