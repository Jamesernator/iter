export default function named<A extends Array<any>, R>(name: string, func: (...args: A) => R): (...args: A) => R;
