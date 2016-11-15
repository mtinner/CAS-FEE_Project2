import { User } from './User';

export class ExpenseOverviewEntry {
    constructor(
        public creditor: User,
        public amount: number) {
    }
}