export class Group {
    constructor(public id: number, public name: string, public isActiveGroup?: boolean) {
    }
}


export class GroupObj {
    constructor(public groups: Group[]) {
    }
}