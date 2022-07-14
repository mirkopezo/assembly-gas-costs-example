## Resources
- https://ethereum.github.io/yellowpaper/paper.pdf
- https://www.evm.codes/
- https://ethereum.org/en/developers/docs/evm/opcodes/
- https://docs.soliditylang.org/en/latest/internals/layout_in_memory.html

<br/>

## Payable function that does nothing

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

contract GasTestingPayable {
    function doNothing() external payable {}
}
```
How much will cost us gas when we call function **doNothing()** in GasTestingPayable contract?

|    | Instruction    | Gas cost | Note                                                                                                                                                                                                                                                                      |
|----|----------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 00 | PUSH1 80       | 3        |                                                                                                                                                                                                                                                                           |
| 02 | PUSH1 40       | 3        |                                                                                                                                                                                                                                                                           |
| 04 | MSTORE         | 12       | Static cost is 3. Dynamic cost is 9 because we wrote to 0x40 slot and there are 2 slots before (0x00-0x1f and 0x20-0x4f), so that is 3 slots in total. Gas cost per slot is 3.                                                                                            |
| 05 | PUSH1 04       | 3        |                                                                                                                                                                                                                                                                           |
| 07 | CALLDATASIZE   | 2        |                                                                                                                                                                                                                                                                           |
| 08 | LT             | 3        |                                                                                                                                                                                                                                                                           |
| 09 | PUSH1 1c       | 3        |                                                                                                                                                                                                                                                                           |
| 0b | JUMPI          | 10       |                                                                                                                                                                                                                                                                           |
| 0c | PUSH1 00       | 3        |                                                                                                                                                                                                                                                                           |
| 0e | CALLDATALOAD   | 3        |                                                                                                                                                                                                                                                                           |
| 0f | PUSH1 e0       | 3        |                                                                                                                                                                                                                                                                           |
| 11 | SHR            | 3        |                                                                                                                                                                                                                                                                           |
| 12 | DUP1           | 3        |                                                                                                                                                                                                                                                                           |
| 13 | PUSH4 2f576f20 | 3        |                                                                                                                                                                                                                                                                           |
| 18 | EQ             | 3        |                                                                                                                                                                                                                                                                           |
| 19 | PUSH1 21       | 3        |                                                                                                                                                                                                                                                                           |
| 1b | JUMPI          | 10       |                                                                                                                                                                                                                                                                           |
| 1c | JUMPDEST       | /        | This will be executed only if calldata is less than 4 bytes or calldata doesn't match doAnything() function signature, and REVERT would be our last instruction executed.                                                                                                 |
| 1d | PUSH1 00       | /        |                                                                                                                                                                                                                                                                           |
| 1f | DUP1           | /        |                                                                                                                                                                                                                                                                           |
| 20 | REVERT         | /        |                                                                                                                                                                                                                                                                           |
| 21 | JUMPDEST       | 1        |                                                                                                                                                                                                                                                                           |
| 22 | STOP           | 0        |                                                                                                                                                                                                                                                                           |
|    | sum            | 74       |                                                                                                                                                                                                                                                                           |
|    |                |          |                                                                                                                                                                                                                                                                           |
|    | tx data        | 64       | Cost is 16 gas for every non-zero byte of data for a transaction, and 4 gas for every zero byte of data for a transaction. We are calling doNothing() function and we are passing 0x2f576f20 (doNothing() function sig) to contract, that means we have 4 non-zero bytes. |
|    | tx cost        | 21000    | Base gas cost for every transaction.                                                                                                                                                                                                                                      |
|    | total sum      | 21138    |                                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                         |

<br/>

## Non-payable function that does nothing

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

contract GasTestingNonPayable {
    function doNothingNonPayable() external {}
}
```

How much will cost us gas when we call function **doNothingNonPayable()** in GasTestingNonPayable contract? It should be more expensive than payable function because it needs to check if user sent ether to function, if that is case transaction needs to revert.

|    | Instruction    | Gas cost | Note |
|----|----------------|----------|------|
| 00 | PUSH1 80       | 3        |      |
| 02 | PUSH1 40       | 3        |      |
| 04 | MSTORE         | 12       |      |
| 05 | CALLVALUE      | 2        |      |
| 06 | DUP1           | 3        |      |
| 07 | ISZERO         | 3        |      |
| 08 | PUSH1 0f       | 3        |      |
| 0a | JUMPI          | 10       |      |
| 0b | PUSH1 00       | /        |      |
| 0d | DUP1           | /        |      |
| 0e | REVERT         | /        |      |
| 0f | JUMPDEST       | 1        |      |
| 10 | POP            | 2        |      |
| 11 | PUSH1 04       | 3        |      |
| 13 | CALLDATASIZE   | 2        |      |
| 14 | LT             | 3        |      |
| 15 | PUSH1 28       | 3        |      |
| 17 | JUMPI          | 10       |      |
| 18 | PUSH1 00       | 3        |      |
| 1a | CALLDATALOAD   | 3        |      |
| 1b | PUSH1 e0       | 3        |      |
| 1d | SHR            | 3        |      |
| 1e | DUP1           | 3        |      |
| 1f | PUSH4 ede65e13 | 3        |      |
| 24 | EQ             | 3        |      |
| 25 | PUSH1 2d       | 3        |      |
| 27 | JUMPI          | 10       |      |
| 28 | JUMPDEST       | /        |      |
| 29 | PUSH1 00       | /        |      |
| 2b | DUP1           | /        |      |
| 2c | REVERT         | /        |      |
| 2d | JUMPDEST       | 1        |      |
| 2e | STOP           | 0        |      |
|    | sum            | 98       |      |
|    |                |          |      |
|    | tx data        | 64       |      |
|    | tx cost        | 21000    |      |
|    | total sum      | 21162    |      |
