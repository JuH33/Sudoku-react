import Controller from './Controller';
class Generator {
    randomNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    buildResponseArray() {
        let valuesList;
        this.controller = new Controller();

        try {
            valuesList = Array(9);

            for (var i = 0; i < 9; i++)
                valuesList[i] = Array(9).fill('-');
        } catch (e) {
            console.error(e);
        }

        return this.generateVrp(valuesList);
    }

    generateVrp(valuesList) {
        let numberPerSub = Array(9).fill(9);
        let indexes = Array(9).fill(null);

        for (let i = 0; i < indexes.length; i++) {
            let numbers = [];
            indexes[i] = Array(numberPerSub[i]).fill(null);

            indexes[i] = indexes[i].map((n) => {
                let newInt = null;

                do {
                    newInt = this.randomNumber(9, 1);
                } while (numbers.includes(newInt));

                numbers.push(newInt);

                return newInt;
            });
        }

        valuesList = this._insertInSubGrid(valuesList, indexes);

        return valuesList;
    }

    _insertInSubGrid(valuesList, valuesToInsert = null) {
        if (valuesToInsert == null)
            return valuesList;

        let index = 0;
        let colum = 0;
        let baseCol = 0;
        let indexInsert = 0;

        for (let j = 0; j < 9; j++) {

            for (let i = 0; i < 9; i++) {
                let columns = this.controller.transpose(valuesList);
                let insertion = valuesToInsert[indexInsert][valuesToInsert[indexInsert].length - 1];

                if (columns[colum].includes(insertion) || valuesList[index].includes(insertion))
                    valuesToInsert[indexInsert][valuesToInsert[indexInsert].length - 1] = '-';

                valuesList[index][colum] = valuesToInsert[indexInsert].pop();
                colum++;

                if ((i + 1) % 3 === 0)
                    colum = 0 + baseCol;

                if ((i + 1) % 3 === 0)
                    index++;
            }

            if ((j + 1) % 3 === 0) {
                index = 0;
                baseCol += 3;
            }

            indexInsert++;
            colum = 0 + baseCol;
        }
        
        return valuesList;
    }
}

export default Generator;