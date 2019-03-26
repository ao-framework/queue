import { Queueable } from "./interfaces/queueable.interface";
import { EventBus } from "@ao-framework/portals"

export interface Queue {
    on(channel: "push", listener: (queueable: Queueable) => any, context?: any): this;
    on(channel: "error", listener: (error: Error) => any, context?: any): this;
    on(channel: "processing", listener: () => any, context?: any): this;
    on(channel: "set.max", listener: (max: number) => any, context?: any): this;
    on(channel: "halted", listener: () => any, context?: any): this;
    on(channel: "resumed", listener: (...args: any[]) => any, context?: any): this;
    on(channel: "recovered.queue", listener: (queue: Queueable[]) => any, context?: any): this;
    on(channel: "tick", listener: (queueable: Queueable) => any, context?: any): this;
    on(channel: "drained", listener: () => any, context?: any): this;
    on(channel: "stack", listener: (stack: Queueable[]) => any, context?: any): this;
}

export class Queue extends EventBus {
    /**
     * Whether or not the queue has been halted
     */
    public halted: boolean = false;
    /**
     * Whether or not a queuable list is processing
     */
    private processing: boolean = false;

    /**
     * Holds the list of queue handlers
     */
    private queue: Queueable[] = [];

    /**
     * Creates an instance of Queue
     * 
     * @param max Max number of queueables
     */
    public constructor(private max: number = null) {
        super("@ao-framework/queue");
    }

    /**
     * Push a queueable handler into the queue list
     */
    public async push(queueable: Queueable): Promise<void> {
        if (typeof this.max === "number" && this.queue.length + 1 > this.max) {
            let error = new Error("Boundary reached");
            this.emit("error", error)
            return Promise.reject(error)
        }
        this.queue.push(queueable);
        this.emit("push", queueable);
        if (!this.processing) {
            this.process()
        }
    }

    /**
     * Set the max number of queueable handlers
     * @param max 
     */
    public setMax(max: number) {
        this.max = max;
        this.emit("set.max", max)
        return this;
    }

    /**
     * Get and clear the current queue list
     */
    private makeStack(): Queueable[] {
        let stack = this.queue;
        this.queue = [];
        this.emit("stack", stack);
        return stack;
    }

    /**
     * Process the current queue
     */
    private async process() {
        this.processing = true;
        this.emit("processing");
        let stack = this.makeStack();
        let called: number[] = [];
        for (let [index, queueable] of stack.entries()) {
            try {
                if (this.halted) {
                    called.forEach(index => stack.splice(index, 1))
                    stack.reverse().forEach(item => this.queue.unshift(item));
                    this.emit("recovered.queue", this.queue);
                    return;
                }
                called.unshift(index);
                await queueable()
                this.emit("tick", queueable);
            } catch (err) { }
        }
        this.processing = false;
        if (this.queue.length > 0) {
            this.process()
        } else {
            this.emit("drained");
        }
    }

    /**
     * Halt the queue in place
     */
    public halt() {
        this.halted = true;
        this.emit("halted");
    }

    /**
     * Resume the queue from where it was halted
     */
    public resume() {
        this.halted = false;
        this.process();
        this.emit("resumed");
    }
}
