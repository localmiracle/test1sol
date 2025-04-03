import { Deposit as DepositEvent } from "../generated/SimpleBank/SimpleBank"
import { DepositEntity } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleDeposit(event: DepositEvent): void {
  let id = event.params.depositor.toHex();
  let entity = DepositEntity.load(id);

  if (entity == null) {
    entity = new DepositEntity(id);
    entity.depositor = event.params.depositor;
    entity.totalDeposited = event.params.amount;
    entity.lastDepositTimestamp = event.block.timestamp;
  } else {
    entity.totalDeposited = entity.totalDeposited.plus(event.params.amount);
    entity.lastDepositTimestamp = event.block.timestamp;
  }

  entity.save();
}
