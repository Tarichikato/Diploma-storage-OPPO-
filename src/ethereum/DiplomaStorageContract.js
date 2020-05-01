import { web3 } from "./web3"
import DiplomaStorageABI from "./DiplomaStorageABI"

export function createContract(contractAddress) {
    return new web3.eth.Contract(DiplomaStorageABI, '0xF8E3C77E0e735544284a7a3988e6D51c1201147B')
    
}