export class Article {
    constructor(public id: number, public name: string, public group: number) {
    }
}

export class ArticleObj {
    constructor(public articles: Article[]) {
    }
}