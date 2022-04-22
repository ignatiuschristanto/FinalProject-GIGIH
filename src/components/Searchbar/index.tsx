import { ChangeEventHandler, FormEventHandler } from "react";
import { ITrack } from "../../interface-types/track";
import Tracks from "../Tracks";
import './index.css';

type TInput = {
    searchKey:string
}

interface SearchProps{
    getTracks: FormEventHandler<HTMLFormElement>;
    handleInput: ChangeEventHandler<HTMLInputElement>;
    tracks: ITrack[];
    toggleSelect: (track : ITrack) => void;
    input: TInput;
}   

const SearchBar: React.FC<SearchProps> = (props): JSX.Element => {
    const {getTracks, handleInput, tracks, toggleSelect, input} = props
    return (
        <>
        <form className="search-form" onSubmit={getTracks}>
          <input 
              id = "searchKey"
              name = "searchKey"
              type= "text" 
              placeholder="Search Songs" 
              className="input-search" 
              value={input.searchKey}
              required 
              onChange={handleInput} />
          <button type="submit" className="new-btn search">Search</button>
        </form>
        <div className="content">
              {tracks.map(song => (
                  <Tracks 
                      key={song.id}
                      url={song.album.images[1].url}
                      name={song.name}
                      artists={song.artists[0].name}
                      duration_ms={song.duration_ms}
                      toggleSelect = {() =>toggleSelect(song)}
                  />
              ))}
        </div>
        </>
    )
}

export default SearchBar;