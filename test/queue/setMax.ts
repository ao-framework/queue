import Queue from "../../src";
export function setMax() {
    let queue = new Queue(1);
    let r = queue.setMax(100);
    expect(queue["max"]).toBe(100);
    expect(r).toBe(queue);
}
