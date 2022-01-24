import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import PopUpShow from "./components/PopupShow";
import PopUpInputBox from "./components/PopUpInputBox";
import { url } from "./settings";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";
enum TableMode {
    Display = 1,
    Add,
    Edit,
    Showcase
}

function TableData({ dataForTable }: any) {
    const dispatch = useDispatch();

    const [mode, setMode] = useState(TableMode.Display);
    const [editableItem, setEditableItem] = useState("");
    const [sortBtn, setSortBtn] = useState("");
    const [dataForOneCharacter, setDataForOneCharacter] = useState({
        name: "",
        gender: "",
        location: {
            name: "",
        },
        origin: { name: "" },
        episode: [],
        imagage: "",

    });
    const getApiData = async (id: any) => {

        const response = await fetch(`${url.character}/${id}`)
        const data = await response.json()
        setDataForOneCharacter(data)
        return data;
    }
    const [sortConfig, setSortConfig] = useState({
        key: "",
        direction: "",
    });
    const tableData = useSelector((state: any) => state.tableData);

    const sortTable = (sortConf: any) => {
        if (sortConf.direction === '') {
            return tableData.rows;
        }

        var sortedRows = [...tableData.rows];
        return sortedRows.sort((a: any, b: any) => {
            if (a[sortConf.key] < b[sortConf.key]) {
                return sortConf.direction === 'ascending' ? -1 : 1;
            }

            if (a[sortConf.key] > b[sortConf.key]) {
                return sortConf.direction === 'ascending' ? 1 : -1;
            }

            return 0;
        });

    }
    const requestSort = (header: any) => {
        if (header.canSort !== true) {
            return;
        }
        let key = header.field;
        let direction = 'ascending';
        setSortBtn("desc")
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') {
                direction = 'descending';
                setSortBtn("asc")
            }

        }
        const sortConf = { key, direction };
        setSortConfig(sortConf);
        dispatch({ type: 'sort', data: sortTable(sortConf) })
    }
    const addNewCharacter = () => {
        setMode(TableMode.Add);
    }
    const editCharacters = (index: any) => {
        setEditableItem(index)
        setMode(TableMode.Edit);

    }
    const deleteCharacter = (id: any) => {
        dispatch({ type: 'delete', data: id })
    }
    const submitEditions = (editedCharacter: any) => {
        editedCharacter.id = Math.floor(100000 + Math.random() * 900000);
        const valuesForEditedUser = { index: editableItem, values: editedCharacter }
        dispatch({ type: 'edit', data: valuesForEditedUser })
        setMode(TableMode.Display);
    }
    const submitNewCharacter = (editedCharacter: any) => {
        editedCharacter.id = Math.floor(100000 + Math.random() * 900000);
        dispatch({ type: 'add', data: editedCharacter })
        setMode(TableMode.Display);
    }
    const showCharacterDetails = (charId: any) => {
        setMode(TableMode.Showcase);
        getApiData(charId)
    }

    const setFilter = (event: any) => {
        dispatch({ type: 'filter', data: event.target.value })
    }

    return (
        <div>
            <div className="flex justify-center mx-auto w-3/12 my-3">
                <input type="text" aria-label="search" className="search form-control" placeholder="search" onChange={setFilter} />
            </div>
            <div className="form-group pull-right w-3/12 ">
                <button className="btn btn-success my-3" onClick={addNewCharacter}>add a new character</button>
                {mode === TableMode.Add ?
                    <PopUpInputBox onExit={() => { setMode(TableMode.Display) }} onSubmit={submitNewCharacter} /> : null}
            </div>
            <div className="table-responsive">
                <table className="table table-success table-striped">
                    <TableHead dataForTable={dataForTable}
                        sortConfig={sortConfig}
                        sortBtn={sortBtn}
                        onRequestSort={(value: any) => requestSort(value)} />
                    <TableBody
                        dataForTable={tableData}
                        onEditCharacters={(value: any) => editCharacters(value)}
                        onDeleteCharacter={(value: any) => deleteCharacter(value)}
                        onShowCharacterDetails={(value: any) => showCharacterDetails(value)}
                    />
                </table>
                {mode === TableMode.Edit ?
                    <PopUpInputBox onExit={() => { setMode(TableMode.Display) }} onSubmit={submitEditions} /> : null}
                {dataForOneCharacter && mode === TableMode.Showcase ?
                    <PopUpShow dataForOneCharacter={dataForOneCharacter} onExit={() => setMode(TableMode.Display)} />
                    : null}
            </div>
        </div >
    )
}
export default TableData;