"use strict";

const SegmentTree = require('./SegmentTree');
const SummerTreeType = require('./TreesTypes/Summer.js');

let arr = [1, 2, 3, 4, 5];

let segTree = new SegmentTree(arr, SummerTreeType.mergeFunction, SummerTreeType.nodeFactory);

segTree.extract(0, 5, resultNode => {
    console.log(resultNode)
});

segTree.set(1, -12);

segTree.extract(0, 5, resultNode => {
    console.log(resultNode);
});
