import Queue from "../../src";
export function halt() {
    let responses: number[] = []
    let promisesHandlers = [];
    for (let i = 0; i < 100; i++) {
        promisesHandlers.push(async () => {
            responses.push(i)
        });
    }
    let queue = new Queue();
    promisesHandlers.forEach(handler => { queue.push(handler); });
    queue.halt();
    expect(queue.halted).toBe(true);
    expect(responses.length).toBe(1);
}
