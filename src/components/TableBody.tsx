import deleteIcon from "../icons/delete.svg"
import editeIcon from "../icons/edit.svg"
const TableBody = (props: any) => {
    const showCharacterDetails = (value: any) => {
        props.onShowCharacterDetails(value)
    }
    const editCharacters = (value: any) => {
        props.onEditCharacters(value)
    }
    const deleteCharacter = (value: any) => {
        props.onDeleteCharacter(value)
    }
    return <tbody>
        {props.dataForTable.displayRows.map((value: any, index: any) => (
            <tr key={`${index}-${value}`} >
                <td>{value.name}
                    {value.id < 15000 ?
                        <div className="flex flex-col text-left"><button className="text-left" role={"button-" + value.id} onClick={() => { showCharacterDetails(value.id) }}>See more info</button>
                        </div> : null}
                </td>
                <td>{value.status}</td>
                <td>{value.species}</td>
                <td><img className="max-w-xs" src={value.image ? value.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTucXstOLeXH173ZuCEInFtMQYURPlcF64TedwOreKHQNRKIMoRAiCXZZGVcKMJdzAb884&usqp=CAU"} alt="Character" /></td>
                {value.id ? <td><button role={"edit-" + value.id} onClick={() => { editCharacters(value.id) }}>
                    <img src={editeIcon} alt="edit" />
                </button></td> : null}
                <td><button onClick={() => { deleteCharacter(value.id) }}>
                    <img src={deleteIcon} alt="edit" />
                </button></td>
            </tr>
        ))
        }
    </tbody>
}
export default TableBody;