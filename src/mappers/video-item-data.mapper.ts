import { IVideoCollectionItemData, IVideoData } from 'services/upload-video.service';
import config from 'config';

export const mapVideoCollectionItemData = (videoData: IVideoData, fileHash: string): IVideoCollectionItemData => ({
  id: fileHash,
  name: videoData.fileName,
  description: videoData.fileDescription,
  link: `${ config.dataFolder }/${ fileHash }`,
  createdAt: new Date(),
});
