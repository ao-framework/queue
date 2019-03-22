<p align="center">
<img width="150" src="https://ao-framework.github.io/website/ao.logo.svg"><br>
<b>Queue</b>
</p>

<p align="center"><em>Currently in early development. Breaking changes will occur frequently.</em></p>

**Queue** is a library for managing sequential promises in a bound or unbound haltable queue.

#### Install
```bash
npm install @ao-framework/queue
```

#### Import
```ts
import Queue from "@ao-framework/queue"
```

#### Usage 
```ts
let queue = new Queue(100);

queue.push(async () => {
    //do something
}).catch(err => {
    //max exceeded
})
```
