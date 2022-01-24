import { createStore } from 'redux';

const initialTableData = {
    tableData: {
        columns: [
            {
                label: 'Name',
                field: 'name',
                canSort: true,
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'Status',
                field: 'status',
                canSort: true,
                width: 270,
            },
            {
                label: 'Species',
                field: 'species',
                canSort: true,
                width: 200,
            },
            {
                label: 'image',
                field: 'image',
                width: 300,
            },
            {
                label: 'actions',
                field: 'actions',
                width: 100,
            },
        ],
        rows: Array<any>(),
        displayRows: Array<any>(),
        filter: ""
    }
}

const searchCharacters = (data: any, searchedWord: any) => {
    return data.filter((row: any) =>
        String(row.name.toLowerCase()).includes(searchedWord.toLowerCase()) ||
        String(row.status.toLowerCase()).includes(searchedWord.toLowerCase()) ||
        String(row.species.toLowerCase()).includes(searchedWord.toLowerCase())
    );
}
const tableData = (state = initialTableData, action: any) => {
    switch (action.type) {
        case "update":
            state.tableData.rows = action.data
            break;

        case "add":
            state.tableData.rows.push(action.data)
            break;

        case "delete":
            const filteredData = state.tableData.rows.filter((row) => row.id !== action.data)
            state.tableData.rows = filteredData;
            break;

        case "edit":

            const updatedCharacters = state.tableData.rows.map((row) => {
                if (row.id === action.data.index) {
                    return action.data.values
                }
                return row
            })
            state.tableData.rows = updatedCharacters;
            break;

        case "filter":
            state.tableData.filter = action.data;
            break;

        case "sort":
            state.tableData.rows = action.data;
            break;

    }

    if (state.tableData.filter) {
        state.tableData.displayRows = searchCharacters(state.tableData.rows, state.tableData.filter)
    }
    else {
        state.tableData.displayRows = state.tableData.rows
    }

    return { tableData: { ...state.tableData } };
}

const store = createStore(tableData);

export default store;