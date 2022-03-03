export class Operations {
    static addComasToNumbers(string) {
        const regex = /[0-9.]/gm;

        if (string.match(regex)) {
            let noLettersAndCharacters = string.match(regex).join('');
            return noLettersAndCharacters.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}