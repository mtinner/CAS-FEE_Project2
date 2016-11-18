import { User } from './User';

export class ExpenseOverviewEntry {
    constructor(
        public user: User,
        public amount: number,
        public percentage: number) {
    }
}