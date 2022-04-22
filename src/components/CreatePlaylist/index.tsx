import { ChangeEventHandler, FormEventHandler } from "react";

type TInput = {
    playlistTitle:string,
    playlistDesc:string
}

interface TPlaylistForm {
    createPlaylist: FormEventHandler<HTMLFormElement>;
    handleInput: ChangeEventHandler<HTMLInputElement>;
    input: TInput;
    
}


const CreatePlayListForm:React.FC<TPlaylistForm> = (props): JSX.Element => {
    const {handleInput, input, createPlaylist} = props
    return (
        <>
            <h3>Create Playlist</h3>
            <div className='playlist-form'>
                <form className='create-playlist' onSubmit = {createPlaylist}>
                    <div> 
                        <input 
                            id ="playlistTitle"
                            type="text" 
                            name="playlistTitle" 
                            className="input-title"
                            placeholder="Input Your Playlist Name..." 
                            value = {input.playlistTitle}
                            required 
                            onChange={handleInput}
                        /> 
                    </div>
                    <br />  
                    <div>
                        <input 
                            id = "playlistDesc"
                            name = "playlistDesc"
                            type = "text-area" 
                            className="input-desc"
                            placeholder = "Input Playlist Description..."  
                            value={input.playlistDesc}
                            onChange={handleInput}></input>
                    </div>
                    <button type="submit" className="new-btn">Create</button>
                    <br /> 
                    <br /> 
                </form>
            </div>
        </>
    )
}

export default CreatePlayListForm;