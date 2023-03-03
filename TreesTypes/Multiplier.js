"use strict";

const nodeFactory = (value, leftNode, rightNode) => ({
    left: leftNode ?? null,
    right: rightNode ?? null,
    value: value ?? 1
});

const mergeFunction = (nodeFactory, leftNode, rightNode) => nodeFactory(leftNode.value * rightNode.value, leftNode, rightNode);

module.exports = {
    nodeFactory,
    mergeFunction
};
