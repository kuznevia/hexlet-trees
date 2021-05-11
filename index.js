import _ from 'lodash';

import {
  mkfile, mkdir, isDirectory, isFile, map, getChildren, getName, getMeta
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [
  mkdir('etc', [
    mkfile('bashrc'),
    mkfile('consul.cfg'),
  ]),
  mkfile('hexletrc'),
  mkdir('bin', [
    mkfile('ls'),
    mkfile('cat'),
  ]),
  mkfile('slava'),
]);

// В реализации используем рекурсивный процесс,
// чтобы добраться до самого дна дерева.
const getNodesCount = (tree) => {
  if (isFile(tree)) {
    // Возвращаем 1 для учёта текущего файла
    return 1;
  }

  // Если узел — директория, получаем его детей
  const children = getChildren(tree);
  console.log(children);
  // Самая сложная часть
  // Считаем количество потомков для каждого из детей,
  // вызывая рекурсивно нашу функцию getNodesCount
  const descendantCounts = children.map((child) => getNodesCount(child));
  console.log(descendantCounts);
  console.log(1 + _.sum(descendantCounts));
  // Возвращаем 1 (текущая директория) + общее количество потомков
  return 1 + _.sum(descendantCounts);
};

getNodesCount(tree);