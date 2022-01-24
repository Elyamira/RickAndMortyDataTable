import sortUpIcon from "../icons/sort-up.svg"
import sortDownIcon from "../icons/sort-down.svg"
import sortIcon from "../icons/sort.svg"
const TableHead = (props: any) => {
    const handleClick = (value: any) => {
        props.onRequestSort(value)
    }

    return <thead>
        <tr>
            {props.dataForTable.columns.map((value: any, index: any) => (
                <th key={`${index}-${value}`} scope="col" role={"header-" + value.field} onClick={() => handleClick(value)}>
                    {value.field} {" "}
                    {props.sortConfig.key === value.field ?
                        <div>
                            {props.sortBtn === "desc" ?
                                <img src={sortDownIcon} alt="sort down" />
                                : <img src={sortUpIcon} alt="sort up" />}
                        </div>
                        :
                        <div>
                            {value.canSort ?
                                <img src={sortIcon} alt="sort" />
                                : null}
                        </div>}
                </th>
            ))
            }
        </tr>
    </thead>
}
export default TableHead;