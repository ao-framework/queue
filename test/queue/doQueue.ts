import Queue from "../../src";
export function doQueue(done) {
    let tags: string[] = [];
    let queue = new Queue();
    queue.push(() => {
        return Promise.resolve(tags.push("one"));
    });
    queue.push(() => {
        return new Promise((done, error) => {
            setTimeout(() => {
                tags.push("two");
                done();
            }, 300);
        });
    });
    queue.push(() => {
        return Promise.resolve(tags.push("three")).then(() => {
            expect(tags[0]).toBe("one");
            expect(tags[1]).toBe("two");
            expect(tags[2]).toBe("three");
            done();
        });
    });
}
