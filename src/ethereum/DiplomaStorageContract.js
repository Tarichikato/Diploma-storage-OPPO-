import { web3 } from "./web3"
import DiplomaStorageABI from "./DiplomaStorageABI"

export function createContract(contractAddress) {
    return new web3.eth.Contract(DiplomaStorageABI, '0x64399f5759209029856F40854699f65e57ED4225')
    
}