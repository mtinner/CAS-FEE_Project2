import { User } from './User';

export class Expense {
    constructor(
        public description: string,
        public amount: number,
        public year: number,
        public month: number,
        public day: number,
        public debitors: string[]) {
    }
}