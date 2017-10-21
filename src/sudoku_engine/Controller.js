class Controller {
    constructor(grid) {
        if (typeof grid === 'object')
            this.grid = grid;
    }

    transpose = (grid) => {
        return grid[0].map(
            (_, c) => grid.map(
                (row) => row[c]
            )
        )
    }

    expandSubGrids = (grid) => {
        var three = Math.sqrt(grid.length);

        return grid[0].map(
            (_, i) => grid[0].map(
                (_, j) => grid[(i / three | 0) * three + j / three | 0][i % three * three + j % three]
            )
        );
    }

    checkRow = (row) => {
        var count = [];

        for (var cell of row) {
            if (cell !== '-') {
                if (count[cell])
                    return false;
                count[cell] = 1;
            }
        }
        
        return true;
    }

    controllFullResponse(vrp) {
        return vrp.every(this.checkRow) && this.transpose(vrp).every(this.checkRow) && this.expandSubGrids(vrp).every(this.checkRow);
    }
}

export default Controller;


