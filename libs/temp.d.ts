/**
 * This file exists to make vscode not complain about typing errors. It is not
 * included in the package and is ignored by PXT
 */
declare interface Array<T> {
    [index: number]: T;
    length: number;
    push(e: T): void;
    pop(): T;
    forEach(cb: (e: T, index: number) => void): void;
    filter(cb: (e: T) => boolean): Array<T>;
    removeElement(e: T): void;
    indexOf(e: T): number;
    sort(cb: (a: T, b: T) => number): Array<T>;
    shift(): T;
    some(cb: (a: T) => boolean): boolean;
}

declare interface String {
    charAt(index: number): string;
    substr(start: number, length?: number): string;
}

declare interface Math {
    clamp(min: number, max: number, value: number): number;
    ceil(x: number): number;
    floor(x: number): number;
    max(a: number, b: number): number;
    min(a: number, b: number): number;
    abs(x: number): number;
    sqrt(x: number): number;
    randomRange(min: number, max: number): number;
    roundWithPrecision(x: number, digits: number): number;
    idiv(x: number, y: number): number;
    sign(x: number): number;
    map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number;
}

declare interface Image {
    revision(): number;
    isStatic(): boolean;
    equals(img: Image): boolean;
}

declare const img: any;