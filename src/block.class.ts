class Block {
    index: number
    data: string
    timestamp: number

    hash: string
    previousHash: string

    constructor(index: number, data: string, timestamp: number, hash: string, previousHash: string) {
        this.index = index
        this.data = data
        this.timestamp = timestamp

        this.hash = hash
        this.previousHash = previousHash
    }
}

export default Block