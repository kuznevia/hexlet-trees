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
    mkdir('consul', [
      mkfile('config.json'),
      mkdir('data'),
    ]),
  ]),
  mkdir('logs'),
  mkfile('hosts'),
]);

const findEmptyDirPaths = (tree, maxDepth = Infinity) => {
  // Внутренняя функция, которая может передавать аккумулятор
  // В качестве аккумулятора выступает depth, переменная, содержащая текущую глубину

    const name = getName(tree);
    const children = getChildren(tree);

    // Если директория пустая, то добавляем ее в список
    if (children.length === 0) {
      return name;
    }

    // Если это второй уровень вложенности, и директория не пустая
    // то не имеет смысла смотреть дальше
    if (maxDepth === 2) {
      // Почему возвращается именно пустой массив?
      // Потому что снаружи выполняется flat
      // Он раскрывает пустые массивы
      return [];
    }

    // Оставляем только директории
    const emptydirNames = children.filter(isDirectory)
      // Не забываем увеличивать глубину
      .flatMap((child) => findEmptyDirPaths(child, maxDepth + 1));


  // Начинаем с глубины 0
  return emptydirNames
};

console.log(findEmptyDirPaths(tree, 1)); 