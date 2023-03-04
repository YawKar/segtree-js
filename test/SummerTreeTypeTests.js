const { expect } = require('chai');
const SegmentTree = require('../SegmentTree');
const SummerTreeType = require('../TreesTypes/Summer');

describe('SummerTreeType (only configuration functions)', () => {
  describe('#nodeFactory', () => {
    it('Should exist as a function.', () => {
      expect(SummerTreeType).to.have.property('nodeFactory');
      expect(SummerTreeType.nodeFactory).to.be.a('function');
    });

    it('Should generate a node with `left`, `right` and `value`  properties.', () => {
      const node = SummerTreeType.nodeFactory();
      expect(node).to.have.property('left');
      expect(node).to.have.property('right');
      expect(node).to.have.property('value');
    });

    it('Generated node should have 0 as its default value.', () => {
      expect(SummerTreeType.nodeFactory().value).to.equal(0);
    });
  });

  describe('#mergeFunction', () => {
    it('Should exist as a function.', () => {
      expect(SummerTreeType).to.have.property('mergeFunction');
      expect(SummerTreeType.mergeFunction).to.be.a('function');
    });

    it('Should return a node with `left`, `right` and `value` properties.', () => {
      const node1 = SummerTreeType.nodeFactory();
      const node2 = SummerTreeType.nodeFactory();
      const resultNode = SummerTreeType.mergeFunction(SummerTreeType.nodeFactory, node1, node2);
      expect(resultNode).to.have.property('left');
      expect(resultNode).to.have.property('right');
      expect(resultNode).to.have.property('value');
    });

    it('Result node\'s value should be equal to the sum of merged nodes\' values', () => {
      const node1 = SummerTreeType.nodeFactory(13);
      const node2 = SummerTreeType.nodeFactory(7);
      const resultNode = SummerTreeType.mergeFunction(SummerTreeType.nodeFactory, node1, node2);
      expect(resultNode.value).to.equal(20);
    });
  });
});

describe('SegmentTree + SummerTreeType configuration', () => {
  describe('#build', () => {
    it('Should successfully build segment-trees for arrays of different sizes (where size = 2**k and 0 <= k <= 14).', () => {
      for (let k = 0; k < 15; k += 1) {
        const arrLength = 2 ** k;
        const arr = new Array(arrLength).map((val, idx) => idx + 1);
        expect(new SegmentTree(arr, SummerTreeType.mergeFunction, SummerTreeType.nodeFactory));
      }
    });
  });
});
