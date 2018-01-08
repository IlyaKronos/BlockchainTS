import * as CryptoJS from "crypto-js"
import Block from "./block.class"

class Blockchain {
    chain: Block[]
    length: number

    constructor(chain?: Block[]) {
        this.chain = chain || []
        this.length = chain ? chain.length : 0
    }

    calculateHash(index: number, data: string, timestamp: number, previousHash: string): string {
        return CryptoJS.SHA256(
            <string>index.toString() + <string>data + <string>timestamp.toString() + <string>previousHash
        ).toString()
    }

    createBlock(data: string): void {
        let index: number = this.length
        this.length++

        let lastHash: string = "0"
        if (index != 0) {
            lastHash = this.chain[index - 1].hash
        }

        let timestamp: number = Math.round(new Date().getTime() / 1000)

        let hash: string = this.calculateHash(index, data, timestamp, lastHash)

        this.chain.push(new Block(index, data, timestamp, hash, lastHash))
    }

    addBlock(block: Block): boolean {
        let lastBlock: Block = this.chain[this.length - 1]
        
        if (block.index != lastBlock.index + 1) {
            throw new Error("Invalid block index")
        }

        if (block.previousHash != lastBlock.hash) {
            throw new Error("Invalid block previousHash")
        }

        if (block.hash != this.calculateHash(block.index, block.data, block.timestamp, block.previousHash)) {
            throw new Error("Invalid block hash")
        }

        let index: number = this.length
        this.length++

        this.chain.push(block)

        return true
    }

    isValid(recalculateHashes?: boolean): boolean {
        let valid: boolean = true
        let lastBlock: Block

        this.chain.map((block: Block, index: number) => {
            if (index == 0) {
                lastBlock = block

                return
            }
            
            if (block.index != lastBlock.index + 1) {
                valid = false
            }

            if (block.previousHash != lastBlock.hash) {
                valid = false
            }

            if (recalculateHashes) {
                if (block.hash != this.calculateHash(block.index, block.data, block.timestamp, block.previousHash)) {
                    valid = false
                }
            }
            
            lastBlock = block
        })

        return valid
    }
}

export default Blockchain