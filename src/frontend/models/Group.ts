export class Group {
    constructor(public id: number, public name: string) {
    }
}

export class GroupObj {
    constructor(public groups: Group[]) {
    }
}