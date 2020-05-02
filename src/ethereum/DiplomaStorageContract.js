import { web3 } from "./web3"
import DiplomaStorageABI from "./DiplomaStorageABI"

export function createContract(contractAddress) {
    return new web3.eth.Contract(DiplomaStorageABI, '0xbE41F8E5073E899aa266De4f6603cec84Bb073bc')
    
}