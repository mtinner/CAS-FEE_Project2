export class Member {
    constructor(public email: string, public username: string) {
    }
}


export class MemberObj {
    constructor(public members: Member[]) {
    }
}