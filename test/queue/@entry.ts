import { doQueue } from "./doQueue";
import { doQueueWithMax } from "./doQueueWithMax";
import { setMax } from "./setMax";

export default function () {
    test("do queue", doQueue)
    test("do queue with max", doQueueWithMax)
    test("set max", setMax)
}
