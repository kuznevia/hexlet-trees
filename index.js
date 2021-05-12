import _ from 'lodash';

import {
  mkfile, mkdir, isDirectory, isFile, map, getChildren, getName, getMeta
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf'),
    ]),
  ]),
  mkdir('consul', [
    mkfile('config.json'),
    mkfile('file.tmp'),
    mkdir('data'),
  ]),
  mkfile('hosts'),
  mkfile('resolve'),
]);

const getFilesCount = (node) => {
  if (isFile(node)) {
    return 1;
  }

  const children = getChildren(node);
  const descendantCounts = children.map(getFilesCount);
  return _.sum(descendantCounts);
};

const getSubdirectoriesInfo = (tree) => {
  const children = getChildren(tree);
  const result = children
    // Нас интересуют только директории
    .filter(isDirectory)
    // Запускаем подсчёт для каждой директории
    .map((child) => [getName(child), getFilesCount(child)]);

    console.log(children);

  return result;
};

console.log(getSubdirectoriesInfo(tree));