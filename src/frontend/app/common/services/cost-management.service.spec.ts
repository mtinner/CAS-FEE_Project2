import {CostManagementService} from './cost-management.service';
import {Expense, ExpenseObj} from '../../../models/Expense';
import {User} from '../../../models/User';

describe('handleExpensesPerMonthsAgo in CostManagementService', () => {

    let service: CostManagementService;
    let user1 = new User('1', '1', '');
    let user2 = new User('2', '2', '');
    let user3 = new User('3', '3', '');

    beforeEach((() => {
        service = new CostManagementService(null);
    }));

    it('is defined', () => {
        expect(service.handleExpenses).toBeDefined();
    });

    it('set empty expenseOverview ', () => {
        service.handleExpensesPerMonthsAgo(new ExpenseObj([]), 0);
        expect(service.expenseOverview.length).toBe(0);
    });

    it('handles 2 users with 1 expense', () => {
        service.handleExpensesPerMonthsAgo(
            new ExpenseObj([
                new Expense('', 0, 0, 0, 0, user1, [user2], new Date())
            ]), 0);
        expect(service.expenseOverview.length).toBe(2);
    });

    it('handles 3 users with 3 expenses', () => {
        service.handleExpensesPerMonthsAgo(
            new ExpenseObj([
                new Expense('', 0, 0, 0, 0, user1, [user2], new Date()),
                new Expense('', 0, 0, 0, 0, user1, [user2, user3], new Date()),
                new Expense('', 0, 0, 0, 0, user2, [user1], new Date())
            ]), 0);
        expect(service.expenseOverview.length).toBe(3);
    });

    it('calculates 2 expenses with another debitor', () => {
        service.handleExpensesPerMonthsAgo(
            new ExpenseObj([
                new Expense('', 10, 0, 0, 0, user1, [user2], new Date()),
                new Expense('', 20, 0, 0, 0, user1, [user2], new Date())
            ]), 0);
        expect(service.expenseOverview.find(e => e.user === user1).amount).toBe(30);
        expect(service.expenseOverview.find(e => e.user === user2).amount).toBe(-30);
    });

    it('calculates 2 expenses with each other as debitors', () => {
        service.handleExpensesPerMonthsAgo(
            new ExpenseObj([
                new Expense('', 10, 0, 0, 0, user1, [user2], new Date()),
                new Expense('', 20, 0, 0, 0, user2, [user1], new Date())
            ]), 0);
        expect(service.expenseOverview.find(e => e.user === user1).amount).toBe(-10);
        expect(service.expenseOverview.find(e => e.user === user2).amount).toBe(10);
    });

    it('calculates 3 expenses with creditor as debitors', () => {
        service.handleExpensesPerMonthsAgo(
            new ExpenseObj([
                new Expense('', 10, 0, 0, 0, user1, [user1, user2], new Date()),
                new Expense('', 20, 0, 0, 0, user2, [user2, user1], new Date()),
                new Expense('', 30, 0, 0, 0, user3, [user3, user1], new Date())
            ]), 0);
        expect(service.expenseOverview.find(e => e.user === user1).amount).toBe(-20);
        expect(service.expenseOverview.find(e => e.user === user2).amount).toBe(5);
        expect(service.expenseOverview.find(e => e.user === user3).amount).toBe(15);
    });

    it('calculates 3 expenses from different users with multiple other debitors', () => {
        service.handleExpensesPerMonthsAgo(
            new ExpenseObj([
                new Expense('', 10, 0, 0, 0, user1, [user1, user2], new Date()),
                new Expense('', 20, 0, 0, 0, user2, [user2, user1], new Date()),
                new Expense('', 30, 0, 0, 0, user3, [user3, user1, user2], new Date())
            ]), 0);
        expect(service.expenseOverview.find(e => e.user === user1).amount).toBe(-15);
        expect(service.expenseOverview.find(e => e.user === user2).amount).toBe(-5);
        expect(service.expenseOverview.find(e => e.user === user3).amount).toBe(20);
    });
});