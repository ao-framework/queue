import { doQueue } from "./doQueue";
import { doQueueWithMax } from "./doQueueWithMax";
import { setMax } from "./setMax";
import { halted } from "./halted";
import { halt } from "./halt";

export default function () {
    test("do queue", doQueue)
    test("do queue with max", doQueueWithMax)
    test("set max", setMax)
    test("halted", halted)
    test("halt", halt)
}
