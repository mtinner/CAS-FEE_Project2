export class Article {
    constructor(public id: number, public name: string, public articleGroup: number) {
    }
}

export class ArticleObj {
    constructor(public articles: Article[]) {
    }
}