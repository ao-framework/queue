import Queue from "../../src";
export function halted() {
    let queue = new Queue();
    expect(queue.halted).toBe(false);
}
