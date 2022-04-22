import { ExternalUrl } from './externalUrl';
import { Followers } from './followers';
import { Image } from './image';
import { ITrack } from './track';

export interface Owner {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Playlist {
  collaborative: boolean;
  description: null;
  external_urls: ExternalUrl;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: ITrack;
  type: string;
  uri: string;
}