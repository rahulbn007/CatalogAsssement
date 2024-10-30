const fs = require('fs');


function parseJsonInput(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
    const keys = data.keys;
    const points = [];

    for (let key in data) {
        if (key !== "keys") {
            const x = parseInt(key);
            const base = parseInt(data[key].base);
            const y = parseInt(data[key].value, base);
            points.push({ x, y });
        }
    }

    return { n: keys.n, k: keys.k, points };
}


function lagrangeInterpolation(points, k) {
    let result = 0;
    for (let i = 0; i < k; i++) {
        let term = points[i].y;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= points[j].x / (points[j].x - points[i].x);
            }
        }
        result += term;
    }
    return Math.round(result);
}


function main() {
    const filename1 = 'testcase1.json';
    const filename2 = 'testcase2.json';

    
    const { n: n1, k: k1, points: points1 } = parseJsonInput(filename1);
    const { n: n2, k: k2, points: points2 } = parseJsonInput(filename2);

    
    const c1 = lagrangeInterpolation(points1.slice(0, k1), k1);
    const c2 = lagrangeInterpolation(points2.slice(0, k2), k2);

    console.log("Constant term for Testcase 1 (c):", c1);
    console.log("Constant term for Testcase 2 (c):", c2);
}

main();