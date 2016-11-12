export class ExpenseMember {
    constructor(public email: string, public username: string, public checked: boolean) {
    }
}


export class ExpenseMemberObj {
    constructor(public members: ExpenseMember[]) {
    }
}