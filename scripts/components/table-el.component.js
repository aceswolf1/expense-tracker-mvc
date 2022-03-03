export class Table {
    constructor(tableClasses, tableId, tableTitles, data) {
        /* Table should have */
        /**
         * id<String>
         * classes<Array[String]>
         * header:htmlElement
         * body:HtmlElement
         * rows:HtmlElement
         * 
         * Methods:
         * private createHeader
         * private createBody
         * private createRow
         * public addFunctionality
         * 
         */
        this.tableClasses = tableClasses;
        this.tableId = tableId;
        this.header = this.setHeader(tableTitles);
        this.body = this.setBody();
        this.tableEl = this.setTableEl();
        this.rows = [];
    }

    setHeader(headerTitles) {
        const tableHeader = document.createElement('thead');
        const tableHeaderTitlesContainer = document.createElement('tr');

        if (headerTitles.length > 0) {
            headerTitles.forEach(title => {
                const titleEl = document.createElement('th');
                titleEl.textContent = title.text;

                if (title.classes.length > 0) {
                    title.classes.forEach(cl => {
                        titleEl.classList.add(cl);
                    })
                }

                tableHeaderTitlesContainer.append(titleEl);
            });

            const editionCol = document.createElement('th');
            editionCol.textContent = 'Edition';

            tableHeaderTitlesContainer.append(editionCol);
        }
        tableHeader.append(tableHeaderTitlesContainer);

        return tableHeader;
    }

    setBody(bodyClass) {
        const htmlBodyElement = document.createElement('tbody')
        if (bodyClass) htmlBodyElement.classList.add(bodyClass);
        return htmlBodyElement;
    }

    setRows(data) {
        this.body.innerHTML = '';

        if (data && data.length > 0) {
            data.forEach(row => {
                const rowEl = document.createElement('tr');
                rowEl.dataset.rowId = `${row.id}`;
                rowEl.innerHTML =
                    `
                    <td class="row-id mdl-data-table__cell--non-numeric">${row.id}</td>
                    <td class="table-col row-description mdl-data-table__cell--non-numeric">
                        <p class="expense-description-text">${row.description}</p>                
                        <div class="mdl-textfield mdl-js-textfield has-placeholder is-upgraded" data-upgraded=",MaterialTextfield" hidden>
                            <input class="edit-description-input mdl-textfield__input" type="text">
                        </div>
                    </td>
                    <td class="table-col row-value">
                        <p class="expense-value-text">${row.value}</p>                
                        <div class="mdl-textfield mdl-js-textfield has-placeholder is-upgraded" data-upgraded=",MaterialTextfield" hidden>
                            <input class="edit-value-input mdl-textfield__input" type="text">
                        </div>
                    </td>
                    <td class="table-col row-date ">${row.date}</td>
                    <td class="row-edition">
                        <div class="edition-container">
                            <button class="mdl-button mdl-js-button mdl-button--icon edit-btn">
                                <i class="material-icons">edit</i>
                            </button>
                            <button class="mdl-button mdl-js-button mdl-button--icon delete-btn">
                                <i class="material-icons">delete</i>
                            </button>
                        </div>
                        <div class="confirmation-container" hidden>
                            <button class="mdl-button mdl-js-button mdl-button--icon edit-confirm-btn">
                                <i class="material-icons">done</i>
                            </button>
                            <button class="mdl-button mdl-js-button mdl-button--icon edit-cancel-btn">
                                <i class="material-icons">cancel</i>
                            </button>
                        </div>
                        
                    </td>
                `;
                this.rows.push(rowEl);
                this.body.append(rowEl);
            });;
        } else {
            const p = document.createElement('p');
            p.textContent = 'No expenses to show';
            this.body.append(p);
        }
        this.tableEl.append(this.body);
    }

    setTableEl() {
        const tableEl = document.createElement('table');
        tableEl.id = this.tableId ? this.tableId : '';

        if (this.tableClasses.length > 0) {
            this.tableClasses.forEach(singleClass => {
                tableEl.classList.add(singleClass);
            })
        }

        if (this.header) {
            tableEl.append(this.header);
        }

        if (this.tableBody) {
            tableEl.append(this.tableBody);
            if (this.rows.lenght > 0) {
                tableEl.append(this.rows);
            }
        }

        return tableEl;
    }
}