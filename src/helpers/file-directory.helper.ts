import { existsSync, promises as fsPromises } from 'fs';
import path from 'path';

import config from 'config';
import { formatErrorMessage } from 'helpers/error-messages.helper';
import { ErrorMessages } from 'constants/error-messages.enum';
import { DbCollections } from 'constants/db-collections.enum';

const collectionsDirectory = path.resolve(__dirname, '..', '..', config.dbFolder, config.collectionsFolder);
const defaultCollectionData: Array<void> = [];
export const videosDirectory = path.resolve(__dirname, '..', '..', config.dbFolder, config.dataFolder, config.videoFolder);
export const thumbnailsDirectory = path.resolve(__dirname, '..', '..', config.dbFolder, config.dataFolder, config.thumbnailFolder);

export const checkDirectoryExisting = async (directoryPath: string) => {
  if (!existsSync(directoryPath)) {
    try {
      await fsPromises.mkdir(directoryPath);
    } catch (error) {
      throw new Error(formatErrorMessage(ErrorMessages.CREATE_COLLECTION_FOLDER_ERROR, error?.message));
    }
  }
};

export const checkCollectionExisting = async (collectionName: DbCollections) => {
  const collectionPath = path.resolve(collectionsDirectory, collectionName);

  if (!existsSync(collectionPath)) {
    try {
      await fsPromises.writeFile(collectionPath, JSON.stringify(defaultCollectionData, null, 2));
    } catch (error) {
      throw new Error(formatErrorMessage(ErrorMessages.CREATE_COLLECTION_FILE_ERROR, error?.message));
    }
  }
};

export const fetchCollection = async (collectionName: DbCollections) => {
  const collectionPath = path.resolve(collectionsDirectory, collectionName);

  await checkDirectoryExisting(collectionsDirectory);
  await checkCollectionExisting(collectionName);

  const collectionData = await fsPromises.readFile(collectionPath, 'utf8');

  return JSON.parse(collectionData);
};

export const saveCollection = async (collectionName: string, collection: string) => {
  const collectionPath = path.resolve(collectionsDirectory, collectionName);

  return await fsPromises.writeFile(collectionPath, collection);
};
