import test from "ava";
import toArray from "./toArray.js";
import scan from "./scan.js";
import CountClosing from "./helpers/CountClosing.js";
import iterator from "./--iterator.js";

function add(a: number, b: number) {
    return a + b;
}

test("scan acts like reduce but emits the intermediate stages", async (t) => {
    const data = [1, 2, 3, 4, 5];

    t.deepEqual(
        await toArray(scan(data, (acc, val) => acc + val**2)),
        [1, 5, 14, 30, 55],
    );
});

test("scan throws an error if sequence is empty", async (t) => {
    const target: Array<number> = [];
    await t.throwsAsync(() => toArray(scan(target, add)));
    await t.throwsAsync(() => iterator(scan(target, add)).next());
});

test("scan can accept an initial value to seed the sequence", async (t) => {
    const data = ["Cat", "Hat", "Bat"];
    t.deepEqual(
        await toArray(scan(data, "Mat", (acc, item) => acc + item)),
        ["Mat", "MatCat", "MatCatHat", "MatCatHatBat"],
    );
});

test("scan doesn't throw an error on empty sequence when given initial value", async (t) => {
    const data: Array<any> = [];
    t.deepEqual(
        await toArray(scan(data, "Fizzbuzz", () => {
            throw new Error("Not reached!");
        })),
        ["Fizzbuzz"],
    );
});

test("scan iterator closing on early end", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = iterator(scan(data, add));

    await seq.next();
    await seq.return!();
    t.is(data.closed, 1);
});

test("scan iterator closing on reducer error", async (t) => {
    const data = new CountClosing([1, 2, 3, 4]);
    const seq = scan(data, (value, i) => {
        if (i === 2) {
            throw new Error("Error");
        }
        return value;
    });

    await t.throwsAsync(() => toArray(seq));
    t.is(data.closed, 1);
});
