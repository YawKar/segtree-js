const multiplierNodeFactory = (value, leftNode, rightNode) => ({
  left: leftNode ?? null,
  right: rightNode ?? null,
  value: value ?? 1,
});

function multiplierMergeFunction(nodeFactory, leftNode, rightNode) {
  return nodeFactory(leftNode.value * rightNode.value, leftNode, rightNode);
}

module.exports = {
  nodeFactory: multiplierNodeFactory,
  mergeFunction: multiplierMergeFunction,
};
