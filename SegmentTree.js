"use strict";

class SegmentTree {
    
    /**
     * Creates new segment-tree out of the given array
     * @param {Array<any>} array - the given array to build segment tree
     */
    constructor(array, mergeFunction, nodeGenerator) {
        this._length = array.length;
        this._mergeFunction = mergeFunction;
        this._nodeGenerator = nodeGenerator;
        this._root = this._build(array, 0, this._length);
    }

    set(index, value) {
        this._root = this._set(this._root, 0, this._length, index, value);
    }

    extract(l, r, extractor) {
        return extractor(this._getRangeMergedNode(this._root, 0, this._length, l, r));
    }

    _build(arr, l, r) {
        if (r - l === 1) {
            return this._nodeGenerator(arr[l]);
        }
        let m = ((l + r) >> 1);
        return this._mergeFunction(
            this._nodeGenerator,
            this._build(arr, l, m),
            this._build(arr, m, r)
        );
    }

    _set(root, l, r, idx, val) {
        if (r - l === 1) {
            return this._nodeGenerator(val);
        }
        let m = ((l + r) >> 1);
        if (idx >= m) {
            return this._mergeFunction(
                this._nodeGenerator,
                root.left,
                this._set(root.right, m, r, idx, val)
            );
        } else {
            return this._mergeFunction(
                this._nodeGenerator,
                this._set(root.left, l, m, idx, val),
                root.right
            );
        }
    }
    
    _getRangeMergedNode(root, l, r, rangeL, rangeR) {
        if (!this._rangesIntersect(l, r, rangeL, rangeR)) {
            return this._nodeGenerator();
        } else if (r - l === 1) {
            return root;
        }
        let m = ((l + r) >> 1);
        return this._mergeFunction(
            this._nodeGenerator,
            this._getRangeMergedNode(root.left, l, m, rangeL, rangeR),
            this._getRangeMergedNode(root.right, m, r, rangeL, rangeR)
        );
    }

    _rangesIntersect(l1, r1, l2, r2) {
        let maxLeft = Math.max(l1, l2);
        let minRight = Math.min(r1, r2);
        return maxLeft < minRight;
    }
}

module.exports = SegmentTree;
