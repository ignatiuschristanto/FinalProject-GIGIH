import axios, { AxiosRequestHeaders } from 'axios';
import { Playlist } from '../interface-types/playlist';
import {IResponseTracks} from '../interface-types/track';
import { UserData } from '../interface-types/user';

type THeaderConfig = (accessToken: string) => AxiosRequestHeaders;

const headerConfig: THeaderConfig = (accessToken) => {
    return {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  }
  
type TGetUserData = (accessToken: string) => Promise<UserData>;

export const getUserData: TGetUserData = async (accessToken) => {
    const headerData = {
        headers: headerConfig(accessToken),
    };
    const response = await axios.get(`https://api.spotify.com/v1/me`, headerData);

    return response.data;
}

type TSearchTrack = (accessToken: string, searchKey: string ) => Promise<IResponseTracks>;
export const searchTrack: TSearchTrack = async (accessToken, searchKey) => {
  const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: headerConfig(accessToken),
      params: {
          q: searchKey,
          type: "track",
      }
    });
  return response.data;

}

type TCreatePlaylist = (
  accessToken: string,
  playlistName: string,
  playlistDescription: string,
  userId: string | undefined,
) => Promise<Playlist>;

export const createPlaylist : TCreatePlaylist = async (accessToken, playlistName, playlistDescription, userId) => {
  const data = JSON.stringify({
      name: playlistName,
      description: playlistDescription,
      public: false,
      collaborative: false,
  });
  const headerData = {
    headers: headerConfig(accessToken),
};
  const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, data, headerData);
  return response.data.id;
}

type TAddTracksToPlaylist = (
  accessToken: string,
  playlistId: string,
  data: string,
) => Promise<string[]>;

export const addTracksToPlaylist: TAddTracksToPlaylist = async (accessToken, playlistId, data) => {
  const headerData = {
    headers: headerConfig(accessToken),
  };
  const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, data, headerData);

  return response.data;
}