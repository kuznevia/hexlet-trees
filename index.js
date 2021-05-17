import _ from 'lodash';

import {
  mkfile, mkdir, isDirectory, isFile, map, getChildren, getName, getMeta
} from '@hexlet/immutable-fs-trees';


const bind = function (context, fn) {
  return function (...args) { // упаковка входных данных в массив
    return fn.apply(context, args);
  };
};

const obj = { number: 5 };
const fn = function fn(number) {
  return number + this.number;
};
const fnWithContext = bind(obj, fn);
 
// Принимает столько же аргументов сколько и исходная функция
console.log(fnWithContext(13)); // 8