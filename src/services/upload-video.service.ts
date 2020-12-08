import ffmpeg from 'ffmpeg-static';
import genThumbnail from 'simple-thumbnail';
import path from 'path';

import {
  fetchCollection,
  saveCollection,
  videosDirectory,
  thumbnailsDirectory,
  checkDirectoryExisting
} from '../helpers/file-directory.helper';
import { mapVideoCollectionItemData } from '../mappers/video-item-data.mapper';
import { formatErrorMessage } from '../helpers/error-messages.helper';
import { ErrorMessages } from '../constants/error-messages.enum';
import { DbCollections } from '../constants/db-collections.enum';

export interface IVideoData {
  fileName: string;
  fileDescription: string;
}

export interface IVideoCollectionItemData {
  id: string;
  name: string;
  description: string;
  link: string;
  thumbnailLink: string;
  createdAt: Date;
}

const createVideoThumbnail = async (fileHash: string) => {
  await checkDirectoryExisting(thumbnailsDirectory);

  try {
    await genThumbnail(`${ path.resolve(videosDirectory, fileHash) }`, `${ path.resolve(thumbnailsDirectory, fileHash) }.png`, '600x?', {
      path: ffmpeg,
    });
  } catch (error) {
    throw new Error(formatErrorMessage(ErrorMessages.CREATE_VIDEO_THUMBNAIL_ERROR, error?.message));
  }
};

export const uploadVideoData = async (videoData: IVideoData, fileHash: string): Promise<void> => {
  const videos: IVideoCollectionItemData[] = await fetchCollection(DbCollections.Videos);
  const videoCollectionItem = mapVideoCollectionItemData(videoData, fileHash);
  const updatedVideos = videos.concat(videoCollectionItem);

  await createVideoThumbnail(fileHash);

  try {
    await saveCollection(DbCollections.Videos, JSON.stringify(updatedVideos, null, 2));
  } catch (error) {
    throw new Error(formatErrorMessage(ErrorMessages.SAVE_COLLECTION_ERROR, error?.message));
  }
};
