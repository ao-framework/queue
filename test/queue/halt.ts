import Queue from "../../src";
export function halt() {
    let promisesHandlers = [];
    for (let i = 0; i < 100; i++) {
        promisesHandlers.push(async () => { console.log(i); });
    }
    let queue = new Queue();
    promisesHandlers.forEach(handler => { queue.push(handler); });
    queue.halt();
    expect(queue.halted).toBe(true);
    expect(queue["queue"].length).toBe(99);
}
