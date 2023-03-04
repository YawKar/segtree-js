const summerNodeFactory = (value, leftNode, rightNode) => ({
  left: leftNode ?? null,
  right: rightNode ?? null,
  value: value ?? 0,
});

function summerMergeFunction(nodeFactory, leftNode, rightNode) {
  return nodeFactory(leftNode.value + rightNode.value, leftNode, rightNode);
}

module.exports = {
  nodeFactory: summerNodeFactory,
  mergeFunction: summerMergeFunction,
};
