export const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export const randomChoice = <T>(array: T[]) => array[randomIntFromInterval(0, array.length - 1)];
