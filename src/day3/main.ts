import { path1, path2 } from "./Data";
import _ = require("lodash");

function makePoints(start: number[], changeIndex: number, changeCount: number, changeValue: number): number[][] {
    const result = [];
    for (let i = 0; i < changeCount; i += 1) {
        const p = _.cloneDeep(start);
        p[changeIndex] += i * changeValue;
        result.push(p);
    }
    return result;
}

function getPoints(path: string[]): number[][] {
    let result: number[][] = [];
    let current = [0, 0];
    for (const vec of path) {
        const dir = vec[0];
        const count = Number(vec.substr(1));
        switch (dir) {
            case "L":
                result = result.concat(makePoints(current, 0, count, -1));
                current[0] -= count;
                break;
            case "R":
                result = result.concat(makePoints(current, 0, count, 1));
                current[0] += count;
                break;
            case "U":
                result = result.concat(makePoints(current, 1, count, 1));
                current[1] += count;
                break;
            case "D":
                result = result.concat(makePoints(current, 1, count, -1));
                current[1] -= count;
                break;
        }
    }
    return result;
}

function makeMatrix(points: number[][]): number[][] {
    const matrix: number[][] = [];
    let steps = 0;
    points.forEach((p) => {
        if (!matrix[p[0]]) {
            matrix[p[0]] = [];
        }
        if (!matrix[p[0]][p[1]]) {
            matrix[p[0]][p[1]] = steps;
        }
        steps += 1;
    });
    return matrix;
}

function taxiDist(point: number[]) {
    return Math.abs(point[0]) + Math.abs(point[1]);
}

function run() {
    const points1 = getPoints(path1);
    const points2 = getPoints(path2);
    const matrix = makeMatrix(points1);

    let collisions: number[][] = [];
    let collisionSteps: number[] = [];
    let steps = 0;
    for (const point of points2) {
        if (matrix[point[0]] && matrix[point[0]][point[1]] && !_.isEqual(point, [0, 0])) {
            collisions.push(point);
            collisionSteps.push(steps + matrix[point[0]][point[1]]);
        }
        steps += 1;
    }
    const res = _.sortBy(collisions, taxiDist)[0];
    console.log("Result1: " + taxiDist(res));

    console.log("Result2: " + _.min(collisionSteps));
}

run();