import _ from 'lodash';

import {
  mkfile, mkdir, isDirectory, isFile, map, getChildren, getName, getMeta
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [
  mkfile('one'),
  mkfile('two'),
  mkdir('three'),
]);

const children = getChildren(tree);
const newChildren = children.filter(isDirectory);
console.log(newChildren);
const newMeta =  _.cloneDeep(getMeta(tree));
const tree2 = mkdir(getName(tree), newChildren, newMeta);
console.log(tree2);

