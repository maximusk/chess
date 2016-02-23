let toIndexesMap = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8};
let fromIndexesMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export default class Converter {
    static toIndexes(str) {
        let x = toIndexesMap[str[0]];
        let y = Number(str[1]);
        return [x, y]
    }

    static fromIndexes(x, y) {
        return fromIndexesMap[x] + y;
    }
}