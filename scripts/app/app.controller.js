export class AppController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        /* Binding */
        this.model.bindExpensesChanged(this.onDisplayExpenses);
        this.view.bindAddNewExpense(this.handlerAddNewExpense);

        /* Display Initial Expenses */
        this.onDisplayExpenses(this.model.expenses);
    }

    onDisplayExpenses = expenses => {
        this.view.displayExpenses(expenses);
        this.view.bindEditExpense(this.handlerEditExpense, this.handlerDeleteExpense);
    }

    handlerAddNewExpense = (description, value) => {
        this.model.addNewExpense(description, value);
    }

    handlerEditExpense = (id, description, value) => {
        this.model.editExpense(id, description, value);
    }

    handlerDeleteExpense = (id) => {
        this.model.deleteExpense(id);
    }
}