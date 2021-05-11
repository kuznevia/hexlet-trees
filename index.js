import _ from 'lodash';

import {
  mkfile, mkdir, isDirectory, isFile, map, getChildren, getName, getMeta
} from '@hexlet/immutable-fs-trees';

const originalTree = mkdir('/', [
  mkfile('one', { owner: 'Vasya' }),
  mkfile('two', { owner: 'Kolya' }),
  mkdir('three', [], { owner: 'Kirill' }),
], { owner: 'Vasya' });

const changeOwner = (tree, newOwner) => {
  const newName = getName(tree);
  const newMeta = _.cloneDeep(getMeta(tree));
  newMeta.owner = newOwner;
  if (isFile(tree)) {
    return mkfile(newName, newMeta);
  }
  const children = getChildren(tree);
  const newChildren = children.map((child) => changeOwner(child, newOwner));
  const newTree = mkdir(newName, newChildren, newMeta);
  return newTree;
}

console.log(originalTree.children);

const newTree = changeOwner(originalTree, 'Slava');

console.log(newTree.children);
console.log(originalTree.children);