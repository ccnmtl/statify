export const cumulativeMeanFunc = (array: number[]): number[][] => {
    let sum = 0;
    return array.map((value, index) => {
        sum += value;
        return [sum / (index + 1), index + 1];
    });
};