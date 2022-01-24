import { useState } from "react";

const PopUpInputBox = (props: any) => {
    const [editedCharacter, setEditedCharacter] = useState({
        name: "",
        status: "",
        species: "",
        image: ""
    });

    const handleClick = () => {
        props.onExit();
    }
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setEditedCharacter((prevValue: any) => {
            prevValue[name] = value;
            return { ...prevValue };
        })
    }
    const handleSubmit = (event: any) => {
        event.preventDefault()
        props.onSubmit(editedCharacter);
    }
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClick}>x</span>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input name="name" placeholder="name" aria-label="name" onChange={handleChange}></input>
                    <input name="status" placeholder="status" onChange={handleChange}></input>
                    <input name="species" placeholder="species" onChange={handleChange}></input>
                    <input name="image" placeholder="link to image" onChange={handleChange}></input>
                    <button name="popup-submit-btn" type="submit">Submit changes</button>
                </form>
            </div>
        </div>
    )
}
export default PopUpInputBox;
