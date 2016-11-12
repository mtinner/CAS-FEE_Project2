export class ExpenditureMember {
    constructor(public email: string, public username: string, public checked: boolean) {
    }
}


export class ExpenditureMemberObj {
    constructor(public members: ExpenditureMember[]) {
    }
}