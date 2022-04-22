import { useState } from 'react';
import './index.css';
interface TracksProps{
    url: string;
    name: string;
    artists: string;
    toggleSelect: () => void;
    duration_ms: number;
}

const Tracks: React.FC<TracksProps> = (props): JSX.Element =>{
    const {url, name, artists, toggleSelect, duration_ms} = props
    const [isSelected,setIsSelected] = useState(false);
    
    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    }
    const date = new Date(duration_ms);
    const duration = `${date.getMinutes()}:${date.getSeconds()<10? '0' + date.getSeconds(): date.getSeconds()}`;


    return (
        <>
        <div className="song-wrapper">
            <div className="image-wrapper">
            <img src= {url} height={180} width={180} alt="album-img"></img>
            </div>
            <div className='text-wrapper'>
            <p className='song-title'>{name}</p>
            <p className='song-artist'>{artists}</p>
            <p className='song-duration'>{duration}</p>
            <button onClick={handleSelect}>{isSelected? 'Deselect' : 'Select'}</button>
            </div>            
        </div>
        </>
    )
}


export default Tracks;