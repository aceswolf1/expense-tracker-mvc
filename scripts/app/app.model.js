export class AppModel {
    constructor(expenses) {
        this.expenses = expenses;
    }

    bindExpensesChanged(callback) {
        this.onExpensesChange = callback;
    }

    get allExpenses() {
        return this.expenses;
    }

    addNewExpense(description, value) {
        const date = new Date();
        let month;
        if (date.getMonth() < 10) {
            month = '0' + (date.getMonth() + 1);
        } else {
            month = date.getMonth() + 1;
        }

        const formatedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;

        const newExpense = {
            id: this.expenses.length > 0 ? this.expenses[this.expenses.length - 1].id + 1 : 1,
            description: description,
            value: value,
            date: formatedDate
        }

        this.expenses.push(newExpense);
        this.onExpensesChange(this.expenses);
    }

    editExpense(id, newDescription, newValue) {
        const expenseToEditIndex = this.expenses.findIndex(expense => {
            const idInt = parseInt(id, 10);
            return expense.id === idInt;
        });

        const date = new Date();
        let month;

        if (date.getMonth() < 10) {
            month = '0' + (date.getMonth() + 1);
        } else {
            month = date.getMonth() + 1;
        }
        const formatedDate = `${date.getFullYear()}-${month}-${date.getDate()}`;
        this.expenses[expenseToEditIndex].description = newDescription;
        this.expenses[expenseToEditIndex].value = newValue;
        this.expenses[expenseToEditIndex].date = formatedDate;
        this.onExpensesChange(this.expenses);
    }

    deleteExpense(id) {
        this.expenses.splice(this.expenses.findIndex(expense => {
            const idInt = parseInt(id, 10);
            return expense.id === idInt;
        }), 1);
        this.onExpensesChange(this.expenses);
        console.log(this.expenses);
    }
}