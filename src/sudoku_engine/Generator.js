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

            for (let i = 0; i < 9; i++)
                valuesList[i] = Array(9).fill('-');
        } catch (e) {
            console.error(e);
        }

        return valuesList;
    }

    generateVrp(vrpLevel) {
        let sudoku = Array(81).fill(0);
        let sudokuFormatted = [];
        let tempNumbers = [];

        try {
            do {
                this.init(sudoku);
                this.returnHiddenBlocks(sudoku, vrpLevel);
                for (let l = 0; l < 81; l++) {
                    tempNumbers.push(sudoku[l]);

                    if ((l + 1) % 9 === 0) {
                        sudokuFormatted.push(tempNumbers);
                        tempNumbers = [];
                    }
                }
            } while (!this.controller.controllFullResponse(sudokuFormatted))
        } catch (e) {
            // console.error('Stack Error: ', [e]); // Show me on debugg phases
            return this.generateVrp(vrpLevel);
        }

        return sudokuFormatted;
    }

    returnHiddenBlocks(sudoku, n) {
        let removable = Array(n).fill(null).map(n => this.randomNumber(81, 0));
        for (let i = 0; i < n; i++) {
            sudoku[removable[i]] = '-';
        }
    }

    returnRow(cell) {
        return Math.floor(cell / 9);
    }

    returnCol(cell) {
        return cell % 9;
    }

    returnBlock(cell) {
        return Math.floor(this.returnRow(cell) / 3) * 3 + Math.floor(this.returnCol(cell) / 3);
    }

    isPossibleRow(number, row, sudoku) {
        for (let i = 0; i <= 8; i++) {
            if (sudoku[row * 9 + i] === number) {
                return false;
            }
        }
        return true;
    }

    isPossibleCol(number, col, sudoku) {
        for (let i = 0; i <= 8; i++) {
            if (sudoku[col + 9 * i] === number) {
                return false;
            }
        }
        return true;
    }

    isPossibleBlock(number, block, sudoku) {
        for (let i = 0; i <= 8; i++) {
            if (sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)] === number) {
                return false;
            }
        }
        return true;
    }

    isPossibleNumber(cell, number, sudoku) {
        const row = this.returnRow(cell);
        const col = this.returnCol(cell);
        const block = this.returnBlock(cell);
        return this.isPossibleRow(number, row, sudoku) && this.isPossibleCol(number, col, sudoku) && this.isPossibleBlock(number, block, sudoku);
    }

    isCorrectRow(row, sudoku) {
        const rightSequence = Array(9).fill(null).map((_, i) => i + 1);
        let rowTemp = [];
        for (let i = 0; i <= 8; i++) {
            rowTemp[i] = sudoku[row * 9 + i];
        }
        rowTemp.sort();
        return rowTemp.join() === rightSequence.join();
    }

    isCorrectCol(col, sudoku) {
        const rightSequence = Array(9).fill(null).map((_, i) => i + 1);
        let colTemp = [];
        for (let i = 0; i <= 8; i++) {
            colTemp[i] = sudoku[col + i * 9];
        }
        colTemp.sort();
        return colTemp.join() === rightSequence.join();
    }

    isCorrectBlock(block, sudoku) {
        const rightSequence = Array(9).fill(null).map((_, i) => i + 1);
        let blockTemp = [];
        for (let i = 0; i <= 8; i++) {
            blockTemp[i] = sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)];
        }
        blockTemp.sort();
        return blockTemp.join() === rightSequence.join();
    }

    isSolvedSudoku(sudoku) {
        for (let i = 0; i <= 8; i++) {
            if (!this.isCorrectBlock(i, sudoku) || !this.isCorrectRow(i, sudoku) || !this.isCorrectCol(i, sudoku)) {
                return false;
            }
        }
        return true;
    }

    determinePossibleValues(cell, sudoku) {
        const possible = [];
        for (let i = 1; i <= 9; i++) {
            if (this.isPossibleNumber(cell, i, sudoku)) {
                possible.unshift(i);
            }
        }
        return possible;
    }

    determineRandomPossibleValue(possible, cell) {
        let randomPicked = Math.floor(Math.random() * possible[cell].length);
        return possible[cell][randomPicked];
    }

    scanSudokuForUnique(sudoku) {
        const possible = [];
        for (let i = 0; i <= 80; i++) {
            if (sudoku[i] === 0) {
                possible[i] = [];
                possible[i] = this.determinePossibleValues(i, sudoku);
                if (possible[i].length === 0) {
                    return false;
                }
            }
        }
        return possible;
    }

    removeAttempt(attemptArray, number) {
        let newArray = [];
        for (let i = 0; i < attemptArray.length; i++) {
            if (attemptArray[i] !== number) {
                newArray.unshift(attemptArray[i]);
            }
        }
        return newArray;
    }

    nextRandom(possible) {
        let max = 9;
        let minChoices = 0;
        for (let i = 0; i <= 80; i++) {
            if (possible[i] !== undefined) {
                if ((possible[i].length <= max) && (possible[i].length > 0)) {
                    max = possible[i].length;
                    minChoices = i;
                }
            }
        }
        return minChoices;
    }

    init(sudoku) {
        let saved = [];
        let savedSudoku = [];
        let nextMove;
        let whatToTry;
        let attempt;
        while (!this.isSolvedSudoku(sudoku)) {
            nextMove = this.scanSudokuForUnique(sudoku);
            if (nextMove === false) {
                nextMove = saved.pop();
                sudoku = savedSudoku.pop();
            }
            whatToTry = this.nextRandom(nextMove);
            attempt = this.determineRandomPossibleValue(nextMove, whatToTry);
            if (nextMove[whatToTry].length > 1) {
                nextMove[whatToTry] = this.removeAttempt(nextMove[whatToTry], attempt);
                saved.push(nextMove.slice());
                savedSudoku.push(sudoku.slice());
            }
            sudoku[whatToTry] = attempt;
        }

        return sudoku;
    }

}

export default Generator;

