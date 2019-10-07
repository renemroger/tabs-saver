import { printLine } from './modules/print';
import { printGroups } from './modules/funcionalHelpers';
import { getAllTabs } from './modules/tabsHelpers';
import {
  saveData,
  setStorageData,
  getStorageData,
} from './modules/storageHelpers';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine('Using a function from the Print Module');
