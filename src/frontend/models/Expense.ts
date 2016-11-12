import { User } from './User';

export class Expense {
    constructor(
        public description: string,
        public amount: number,
        public debitors: string[]) {
    }
}