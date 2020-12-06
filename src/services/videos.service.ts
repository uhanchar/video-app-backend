import { IVideoCollectionItemData } from 'services/upload-video.service';
import { fetchCollection } from 'helpers/file-directory.helper';
import { DbCollections } from 'constants/db-collections.enum';

export const fetchVideos = async (): Promise<IVideoCollectionItemData[]> => {
  return fetchCollection(DbCollections.Videos);
};
