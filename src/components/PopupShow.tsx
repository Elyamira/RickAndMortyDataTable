import React from 'react'
import { url } from '../settings'
const PopUpShow = (props: any) => {
    const handleClick = () => {
        props.onExit()
    }
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClick}>x</span>
                <div className='flex mx-auto justify-center'>
                    <img src={props.dataForOneCharacter.image} alt={props.dataForOneCharacter.name}></img>
                </div>
                <div className='text-center pt-2'>
                    <h1>{props.dataForOneCharacter.name}</h1>
                    <p>Gender: {props.dataForOneCharacter.gender}</p>
                    <p>Location: {props.dataForOneCharacter.location.name}</p>
                    <p>Origin: {props.dataForOneCharacter.origin.name}</p>
                    <p>Appeared in episodes:</p>
                    <ul className="flex w-10/12 flex-wrap mx-auto justify-center">
                        {props.dataForOneCharacter.episode.map((ep: string, index: any) => {
                            let cutEpisode = ep.replace(url.episode, "")
                            return <li key={index}>{`⭐ ${cutEpisode}`}</li>
                        })}
                    </ul>
                </div>
            </div>

        </div>
    )
}
export default PopUpShow;
