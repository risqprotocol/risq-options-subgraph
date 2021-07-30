import { BigInt } from "@graphprotocol/graph-ts"
import {
  RisqLINKOptions,
  Create,
  Exercise,
  Expire,
  OwnershipTransferred
} from "../generated/RisqLINKOptions/RisqLINKOptions"
import { CreateEvent } from "../generated/schema"

export function handleCreate(event: Create): void {
  let entity = new CreateEvent(event.transaction.hash.toHexString())
  entity.optionId = event.params.id
  entity.account = event.params.account
  entity.totalFee = event.params.totalFee
  entity.settlementFee = event.params.settlementFee
  entity.blockNumber = event.block.number
  entity.timestamp = event.block.timestamp
  entity.contract = event.transaction.to!

  // Entities can be written to the store with `.save()`
  entity.save()

}

