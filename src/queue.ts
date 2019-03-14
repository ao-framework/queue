type Queueable = () => Promise<any>

/**
 * Definition of Queue
 */
export default class Queue {

    /**
     * Whether or not a queuable
     * list is processing
     */
    private processing: boolean = false;

    /**
     * Holds the list of queue handlers
     */
    private queue: Queueable[] = [];

    /**
     * Creates an instance of Queue
     * @param max Max number of queueables
     */
    public constructor(private max: number = null) { }

    /**
     * Push a queueable handler into the queue list
     */
    public async push(queueable: Queueable): Promise<void> {
        if (typeof this.max === "number" && this.queue.length >= this.max) {
            return Promise.reject(new Error("Max level exceeded"));
        }
        this.queue.push(queueable);
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
        return this;
    }

    /**
     * Get and clear the current queue list
     */
    private makeStack(): Queueable[] {
        let stack = this.queue;
        this.queue = [];
        return stack;
    }

    /**
     * Process the current queue
     */
    private async process() {
        this.processing = true;
        let stack = this.makeStack();
        for (let queueable of stack) {
            try {
                await queueable()
            } catch (err) { }
        }
        this.processing = false;
        if (this.queue.length > 0) {
            this.process()
        }
    }
}
