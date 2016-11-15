export class ExpenseInsert {
    constructor(public description: string,
                public amount: number,
                public year: number,
                public month: number,
                public day: number,
                public debitors: string[]) {
    }
}