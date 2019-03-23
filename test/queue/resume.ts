import Queue from "../../src";
export function resume(finished) {
    let responses: number[] = [];
    let queue = new Queue();
    for (let i = 0; i < 25; i++) {
        queue.push(() => {
            return new Promise(done => {
                setTimeout(() => {
                    responses.push(i);
                    queue.halt();
                    setTimeout(() => {
                        queue.resume();
                        if (i === 24) {
                            expect(responses.length).toBe(25);
                            let count = 0;
                            responses.forEach(n => {
                                expect(n).toBe(count);
                                count++
                            })
                            finished();
                        }
                    }, 2);
                    done();
                }, 1);
            });
        });
    }
}
