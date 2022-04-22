import {Box} from '@mui/material';
import { useState, useEffect, FormEventHandler, ChangeEventHandler } from 'react';
import CreatePlayListForm from '../components/CreatePlaylist';
import Layout from '../components/Layout';
import SearchBar from '../components/Searchbar';
import { addTracksToPlaylist, createPlaylist, searchTrack } from '../config/fetchAPI';
import {ITrack, IResponseTracks} from '../interface-types/track';
import { useTypedSelector } from '../redux/store';


const Home : React.FC = () => {
    const [input, setInput] = useState ({
        playlistTitle: '',
        playlistDesc: '',
        searchKey: ''
    });
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const [selectedTracksUri, setSelectedTracksUri] = useState<string[]>([]);
    //const [selectedTracks, setSelectedTracks] = useState<ITrack[]>([]);
    const [isSearched, setIsSearched] = useState(false);
    const token : string = useTypedSelector((state)=> state.authToken.accessToken);
    const userId : string | undefined = useTypedSelector((state) => state.authToken.user?.id)
    useEffect (()=> {
        if(!isSearched){
            const _selectedTracks = tracks.filter((track) => selectedTracksUri.includes(track.uri));
            setTracks(_selectedTracks);
        }
    }, [tracks, isSearched, selectedTracksUri]);

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const getTracks: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();
        try{
            const searchData: IResponseTracks = await searchTrack(token, input.searchKey);
            setIsSearched(true);
            const trackData: ITrack[] = searchData.tracks.items;
            const selectedTracks = tracks.filter((track)=>selectedTracksUri.includes(track.uri));
            const searchedTracks = trackData.filter((track)=> !selectedTracksUri.includes(track.uri));

            setTracks([...selectedTracks, ...searchedTracks]);
        }catch(e){
            alert(e);
        }
    }

    const toggleSelect : (track : ITrack) => void = (track) =>{
        const uri: string = track.uri;
        if (selectedTracksUri.includes(uri)) {
            setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
        } else {
            setSelectedTracksUri([...selectedTracksUri, uri]);
        }
    }

    const createNewPlaylist = async () =>{
        const playlistId= await createPlaylist(token, input.playlistTitle, input.playlistDesc, userId)
        return playlistId;
    }

    const addTrackToNewPlaylist = async (playListId: string ) => {
        let uris = selectedTracksUri;
        const data = JSON.stringify({
            uris
        });
        await addTracksToPlaylist(token, playListId, data);
    }

    const createAndAddToPlaylist: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();
        if(input.playlistTitle.length < 10 || !input.playlistDesc){
            alert("Playlist name must be 10 or more characters and description must be filled");
        }
            const playListId:any = await createNewPlaylist();
            await addTrackToNewPlaylist(playListId);
            alert("Playlist Created");
        
    }

    return (
        <Box>
            <Layout>
                <div className='main-container'>
                    <h1>Welcome to This-Idk-Spotify-Wannabe</h1>
                    <h2>Start making your own playlist and pray that it works just fine.</h2>
                    <SearchBar
                        handleInput = {handleInput}
                        getTracks = {getTracks}
                        tracks = {tracks}
                        toggleSelect = {toggleSelect}
                        input = {input}
                    />
                    <div className='playlist-container'>
                        <CreatePlayListForm
                            handleInput = {handleInput}
                            input = {input}
                            createPlaylist = {createAndAddToPlaylist}
                             />
                    </div>
                </div>
            
            </Layout>
        </Box>
    )
}

export default Home;