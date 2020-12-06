import {fetchCollection, saveCollection} from 'helpers/file-directory.helper';
import {mapVideoCollectionItemData} from 'mappers/video-item-data.mapper';
import { formatErrorMessage } from 'helpers/error-messages.helper';
import { ErrorMessages } from 'constants/error-messages.enum';
import { DbCollections } from 'constants/db-collections.enum';

export interface IVideoData {
  fileName: string;
  fileDescription: string;
}

export interface IVideoCollectionItemData {
  id: string;
  name: string;
  description: string;
  link: string;
  createdAt: Date;
}

export const uploadVideoData = async (videoData: IVideoData, fileHash: string) => {
  const videos: IVideoCollectionItemData[] = await fetchCollection(DbCollections.Videos);
  const videoCollectionItem = mapVideoCollectionItemData(videoData, fileHash);
  const updatedVideos = videos.concat(videoCollectionItem);

  try {
    await saveCollection(DbCollections.Videos, JSON.stringify(updatedVideos, null, 2));
  } catch (error) {
    throw new Error(formatErrorMessage(ErrorMessages.SAVE_COLLECTION_ERROR, error?.message));
  }
};
