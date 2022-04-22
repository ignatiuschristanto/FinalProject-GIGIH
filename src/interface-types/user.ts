import { ExternalUrl } from './externalUrl';
import { Followers } from './followers';
import { Image } from './image';

export interface UserData {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrl;
  followers: Followers;
  href: string;
  id: string;
  images?: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}