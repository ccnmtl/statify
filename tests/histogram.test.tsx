import { overlappingBins } from '../src/graphs/histogram';
import { Bin } from 'd3-array';

test('Empty Bins return an empty Bin', () => {
    const bin1:Bin<number, number>[] = [];
    const bin2:Bin<number, number>[] = [];
    expect(overlappingBins(bin1, bin2)).toStrictEqual([] as Bin<number, number>[]);
});
