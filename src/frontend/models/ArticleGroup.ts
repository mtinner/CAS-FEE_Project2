export class ArticleGroup {
    constructor(public id: number, public name: string) {
    }
}

export class ArticleGroupObj {
    constructor(public articleGroups: ArticleGroup[]) {
    }
}