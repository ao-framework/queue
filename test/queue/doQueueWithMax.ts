import Queue from "../../src";
export function doQueueWithMax(done) {
    let tags: string[] = [];
    let queue = new Queue(1);
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
        return new Promise((done, error) => {
            setTimeout(() => {
                tags.push("two");
                done();
            }, 300);
        });
    }).catch(err => {
        expect(err).toBeInstanceOf(Error);
        done();
    });
}
