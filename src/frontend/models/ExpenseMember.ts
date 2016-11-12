export class ExpenseMember {
    constructor(
        public id: string,
        public email: string,
        public username: string,
        public checked: boolean) {
    }
}


export class ExpenseMemberObj {
    constructor(public members: ExpenseMember[]) {
    }
}