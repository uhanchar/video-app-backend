import { fetchCollection } from 'helpers/file-directory.helper';
import { DbCollections } from 'constants/db-collections.enum';
import { IVideoCollectionItemData } from 'services/upload-video.service';

export const fetchSelectedVideo = async (videoId: string): Promise<IVideoCollectionItemData> => {
  const videos = await fetchCollection(DbCollections.Videos);
  const selectedVideo = videos.find((video: IVideoCollectionItemData) => video.id === videoId);

  return selectedVideo;
};
