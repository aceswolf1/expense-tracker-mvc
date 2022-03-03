import { WrapperContainer } from '../components/wrapper-div.component.js';
import { Cols } from '../components/cols-div.component.js';
import { Table } from '../components/table-el.component.js';
import { Operations } from '../utils/operations.js';


export class AppView {
    constructor() {
        /* Get the #root element as a father element for the app*/
        this.app = this.getElement('#root');

        /* Create Title for the app */
        this.title = this.createElement('h1', 'main-title');
        this.title.textContent = 'Tracker Expenses';

        /* Create wrapper container for content*/
        const wrappercontainer = new WrapperContainer();
        this.mainContainer = wrappercontainer.createWrapper();

        /* Create col for title */
        const cols = new Cols();
        this.titleContainer = cols.createCol('12', 'title-section');

        /* Create col for form */
        this.formContainer = cols.createCol('12', 'form-section');

        /* Create col for table */
        this.tableContainer = cols.createCol('12', 'table-section');

        /* Create Table */
        const tableClasses = ['mdl-data-table', 'mdl-js-data-table', 'mdl-shadow--2dp'];
        const tableID = 'main-table';
        const tableHeaderTitles = [
            {
                text: 'ID',
                classes: ['mdl-data-table__cell--non-numeric']
            },
            {
                text: 'Description',
                classes: ['mdl-data-table__cell--non-numeric']
            },
            {
                text: 'Value',
                classes: []
            },
            {
                text: 'Date',
                classes: []
            }
        ];
        this.table = new Table(tableClasses, tableID, tableHeaderTitles);

        /* Create form where the user will input the expenses */
        this.form = this.createElement('form', 'expenses-form');

        /* Create input for expense description */
        this.descriptionInput = this.createElement('input', 'mdl-textfield__input');
        this.descriptionInput.type = 'text';
        this.descriptionInput.placeholder = 'Add a description';

        /* Create input for expense value */
        this.valueInput = this.createElement('input', 'mdl-textfield__input');
        this.valueInput.type = 'text';
        this.valueInput.placeholder = 'How much did you expend?';

        /* Create submit button */
        this.submitBtn = this.createElement('button', 'mdl-button')
        this.submitBtn.classList.add('mdl-js-button');
        this.submitBtn.classList.add('mdl-button--raised');
        this.submitBtn.classList.add('mdl-button--colored');
        this.submitBtn.type = 'submit';
        this.submitBtn.textContent = 'Add Expense';

        /* Create container for the inputs */
        this.descInputContainer = this.createElement('div', 'mdl-textfield');
        this.descInputContainer.classList.add('mdl-js-textfield');

        /* Create container for the inputs */
        this.valueInputContainer = this.createElement('div', 'mdl-textfield');
        this.valueInputContainer.classList.add('mdl-js-textfield');

        /* Create container for the inputs */
        this.submitButtonContainer = this.createElement('div', 'mdl-textfield');
        this.submitButtonContainer.classList.add('mdl-js-textfield');

        /* Add button to button container */
        this.submitButtonContainer.append(this.submitBtn);

        /* Add inputs to inputs container */
        this.descInputContainer.append(this.descriptionInput);
        this.valueInputContainer.append(this.valueInput);

        /* Add inputs container to form */
        this.form.append(this.descInputContainer, this.valueInputContainer, this.submitButtonContainer);

        /* Add title to its container */
        this.titleContainer.append(this.title);

        /* Add form to its container */
        this.formContainer.append(this.form);

        /* Add table to its container */

        /* Add title,form and table container to main container */
        this.mainContainer.append(
            this.titleContainer,
            this.formContainer,
            this.tableContainer);

        /* Add main container to root app container */
        this.app.append(this.mainContainer);
    }

    displayExpenses(expenses) {
        this.table.setRows(expenses);
        this.tableContainer.append(this.table.tableEl);
    }

    bindAddNewExpense(handler) {
        
        this.valueInput.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                e.target.value = this.formatNumber(e.target.value);
            }
        });

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const description = this.descriptionInput.value;
            const value = this.valueInput.value;

            if (description && value) {
                handler(description, value);
            }

        })
    };

    bindEditExpense(handlerEdit, handlerDelete) {
        this.table.rows.forEach(row => {
            /* Add edition functionality */
            const editBtn = row.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                /* Get buttons containers */
                const editionContainer = row.querySelector('.edition-container');
                const confirmationcontainer = row.querySelector('.confirmation-container');

                /* Get edition container */
                const approvedEditionBtn = row.querySelector('.edit-confirm-btn');
                const cancelEditBtn = row.querySelector('.edit-cancel-btn');

                /* Get inputs containers */
                const descInputContainer = row.querySelector('.row-description .mdl-textfield');
                const valueInputContainer = row.querySelector('.row-value .mdl-textfield');

                /* Get inputs */
                const descInput = descInputContainer.querySelector('.edit-description-input');
                const valueInput = valueInputContainer.querySelector('.edit-value-input');

                /* Add Input listener to format numbers */
                valueInput.addEventListener('input', (e) => {
                    if (e.target.value.length > 0) {
                        e.target.value = this.formatNumber(e.target.value);
                    }
                });

                /* Get currentValues */
                const descText = row.querySelector('.expense-description-text');
                const valueText = row.querySelector('.expense-value-text');

                /* Show and hide containers */
                editionContainer.hidden = true;
                confirmationcontainer.hidden = false;

                /* Set value of inputs */
                descInput.value = descText.textContent;
                valueInput.value = valueText.textContent;

                /* Show inputs and hide text */
                descInputContainer.hidden = false;
                valueInputContainer.hidden = false;
                descText.hidden = true;
                valueText.hidden = true;
                row.classList.add('on-edition');

                /* Add confirmation function */
                approvedEditionBtn.addEventListener('click', () => {
                    const id = row.dataset.rowId;
                    const description = descInput.value;
                    const value = valueInput.value;

                    handlerEdit(id, description, value);
                });

                /* Add cancel function */
                cancelEditBtn.addEventListener('click', () => {
                    /* Hide and hide containers */
                    editionContainer.hidden = false;
                    confirmationcontainer.hidden = true;

                    /* Set value of inputs */
                    descInput.value = descText.textContent;
                    valueInput.value = valueText.textContent;

                    /* Hide inputs and hide text */
                    descInputContainer.hidden = true;
                    valueInputContainer.hidden = true;
                    descText.hidden = false;
                    valueText.hidden = false;
                    row.classList.remove('on-edition');
                });
            });

            /* Add deletion functionality */
            const deleteBtn = row.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                const rowId = row.dataset.rowId;
                console.log(rowId);
                handlerDelete(rowId);
            });
        })
    };

    createElement(label, optionalClass) {
        const element = document.createElement(label);

        if (optionalClass) element.classList.add(optionalClass);

        return element;
    };

    getElement(selector) {
        return document.querySelector(selector);
    };

    formatNumber(string) {
        let stringToNum = Operations.addComasToNumbers(string);

        if (stringToNum) {
            stringToNum = '$' + stringToNum;
            return stringToNum;
        } else {
            return '';
        }

    };
}