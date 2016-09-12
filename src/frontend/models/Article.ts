export class Article {
    constructor(private id: number, public name: string, public group: number) {
        this.id = id;
        this.name = name;
        this.group = group;
    }
}
