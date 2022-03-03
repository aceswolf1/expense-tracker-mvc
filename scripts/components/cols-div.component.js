export class Cols {
    createCol(width, optionalClass) {
        const row = document.createElement('div');
        row.classList.add('mdl-cell');
        row.classList.add(`mdl-cell--${width}-col`);

        if (optionalClass) {
            row.classList.add(optionalClass);
        }

        return row;
    };
}