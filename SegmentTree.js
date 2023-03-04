






const rangesIntersect = (l1, r1, l2, r2) => {
  const maxLeft = Math.max(l1, l2);
  const minRight = Math.min(r1, r2);
  return maxLeft < minRight;
};

class SegmentTree {
  /**
     * Creates new segment-tree out of the given array
     * @param {Array<any>} array - the given array to build segment tree
     */
  constructor(array, mergeFunction, nodeGenerator) {
    this.length = array.length;
    this.mergeFunction = mergeFunction;
    this.nodeGenerator = nodeGenerator;
    this.root = this.build(array, 0, this.length);
  }

  set(index, value) {
    this.root = this.setByRoot(this.root, 0, this.length, index, value);
  }

  extract(l, r, extractor) {
    return extractor(this.getRangeMergedNode(this.root, 0, this.length, l, r));
  }

  build(arr, l, r) {
    if (r - l === 1) {
      return this.nodeGenerator(arr[l]);
    }
    const m = (Math.floor((l + r) / 2));
    return this.mergeFunction(
      this.nodeGenerator,
      this.build(arr, l, m),
      this.build(arr, m, r),
    );
  }

  setByRoot(root, l, r, idx, val) {
    if (r - l === 1) {
      return this.nodeGenerator(val);
    }
    const m = (Math.floor((l + r) / 2));
    if (idx >= m) {
      return this.mergeFunction(
        this.nodeGenerator,
        root.left,
        this.setByRoot(root.right, m, r, idx, val),
      );
    }
    return this.mergeFunction(
      this.nodeGenerator,
      this.setByRoot(root.left, l, m, idx, val),
      root.right,
    );
  }

  getRangeMergedNode(root, l, r, rangeL, rangeR) {
    if (!rangesIntersect(l, r, rangeL, rangeR)) {
      return this.nodeGenerator();
    } if (r - l === 1) {
      return root;
    }
    const m = (Math.floor((l + r) / 2));
    return this.mergeFunction(
      this.nodeGenerator,
      this.getRangeMergedNode(root.left, l, m, rangeL, rangeR),
      this.getRangeMergedNode(root.right, m, r, rangeL, rangeR),
    );
  }
}

module.exports = SegmentTree;
