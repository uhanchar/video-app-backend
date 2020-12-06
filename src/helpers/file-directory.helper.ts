import { existsSync, promises as fsPromises } from 'fs';
import path from 'path';

import { formatErrorMessage } from 'helpers/error-messages.helper';
import { ErrorMessages } from 'constants/error-messages.enum';
import { DbCollections } from 'constants/db-collections.enum';

const collectionsDirectory = path.resolve(__dirname, '..', '..', 'db', 'collections');
const defaultCollectionData: Array<void> = [];

export const checkCollectionsDirectoryExisting = async () => {
  if (!existsSync(collectionsDirectory)) {
    try {
      await fsPromises.mkdir(collectionsDirectory);
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

  await checkCollectionsDirectoryExisting();
  await checkCollectionExisting(collectionName);

  const collectionData = await fsPromises.readFile(collectionPath, 'utf8');

  return JSON.parse(collectionData);
};

export const saveCollection = async (collectionName: string, collection: string) => {
  const collectionPath = path.resolve(collectionsDirectory, collectionName);

  return await fsPromises.writeFile(collectionPath, collection);
};
