"use strict";

const SegmentTree = require('./SegmentTree');
const SummerTreeType = require('./TreesTypes/Summer.js');
const MultiplierTreeType = require('./TreesTypes/Multiplier.js');

let arr = [1, 2, 3, 4, 5];

// For pre-alpha-beta-sigma-gamma version we'll use our custom implementation of assert
const assert = (condition, message) => {
    if (!condition) {
        throw new Error(message ?? "Assertion failed");
    }
};

// Summer (or Adder) tree tests
{
    let copiedArr = arr.slice();
    let summerTree = new SegmentTree(copiedArr, SummerTreeType.mergeFunction, SummerTreeType.nodeFactory);
    assert(summerTree.extract(0, 5, resultNode => resultNode.value) === copiedArr.reduce((res, val) => res + val));
    summerTree.set(1, -12);
    copiedArr[1] = -12;
    assert(summerTree.extract(0, 5, resultNode => resultNode.value) === copiedArr.reduce((res, val) => res + val));
}

// Multiplier tree tests
{
    let copiedArr = arr.slice();
    let multiplierTree = new SegmentTree(copiedArr, MultiplierTreeType.mergeFunction, MultiplierTreeType.nodeFactory);
    assert(multiplierTree.extract(0, 5, resultNode => resultNode.value) === copiedArr.reduce((res, val) => res * val));
    multiplierTree.set(1, -1);
    copiedArr[1] = -1;
    assert(multiplierTree.extract(0, 5, resultNode => resultNode.value) === copiedArr.reduce((res, val) => res * val));
}
