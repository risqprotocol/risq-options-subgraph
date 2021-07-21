import { Create, Exercise, Expire, SetImpliedVolRateCall } from '../types/RisqLTCOptions/RisqOptions'
import { Asset, RisqOption, ImpliedVolatility } from '../types/schema'
import { RisqOptions as Contract } from '../types/RisqLTCOptions/RisqOptions'
import { Address } from '@graphprotocol/graph-ts';
import { BigIntOne, BigIntZero, getCreateLTCPool, LTC_OPTIONS_ADDR } from "../utils";

export function handleCreate(event: Create): void {
  let ltcOptions = Contract.bind(Address.fromString(LTC_OPTIONS_ADDR));
  let liquidity_pool = getCreateLTCPool()

  // Create option
  let option = new RisqOption("LTC-" + event.params.id.toString());
  option.underlying = liquidity_pool.underlying;
  option.creationBlock = event.block.number;
  option.creationTimestamp = event.block.timestamp;
  option.holder = event.params.account.toHexString().toString();
  option.premium = event.params.totalFee - event.params.settlementFee;
  option.settlementFee = event.params.settlementFee;
  option.pool = liquidity_pool.id
  
  // Get from state 
  let option_data = ltcOptions.options(event.params.id)
  
  option.strike = option_data.value2;
  option.amount = option_data.value4;
  option.expiration = option_data.value6;

  if (option_data.value7 == 1) {
    option.type = "Put";
    liquidity_pool.totalPutVolume = liquidity_pool.totalPutVolume + option.premium
  } else if (option_data.value7 == 2) {
    option.type = "Call";
    liquidity_pool.totalCallVolume = liquidity_pool.totalCallVolume + option.premium
  } else {
    return
  }

  if (option_data.value0 == 0) {
    option.state = "Inactive";
  } else if (option_data.value0 == 1) {
    option.state = "Active";
  } else if (option_data.value0 == 2) {
    option.state = "Exercised";
  } else if (option_data.value0 == 3) {
    option.state = "Expired";
  } else {
    return
  }

  // Save entities
  liquidity_pool.numOptions = liquidity_pool.numOptions + BigIntOne;
  
  liquidity_pool.totalSettlementFees = liquidity_pool.totalSettlementFees + option.settlementFee;
  liquidity_pool.totalFees = liquidity_pool.totalFees + event.params.totalFee;

  liquidity_pool.save()

  option.save()
};

export function handleExercise(event: Exercise): void {
  let liquidity_pool = getCreateLTCPool()
  liquidity_pool.numExercisedOptions = liquidity_pool.numExercisedOptions + BigIntOne

  let option = RisqOption.load("LTC-" + event.params.id.toString())
  if (option == null) {
    return
  }

  option.state = "Exercised"
  option.save()
}

export function handleExpire(event: Expire): void {
  let liquidity_pool = getCreateLTCPool()
  liquidity_pool.numExpiredOptions = liquidity_pool.numExpiredOptions + BigIntOne

  let option = RisqOption.load("LTC-" + event.params.id.toString())
  if (option == null) {
    return
  }

  option.state = "Expired"
  option.save()
}

export function handleSetImpliedVolRate(call: SetImpliedVolRateCall): void {
  let liquidity_pool = getCreateLTCPool()
  liquidity_pool.numImpliedVolatility = liquidity_pool.numImpliedVolatility + BigIntOne

  let iv = new ImpliedVolatility("LTC-" + liquidity_pool.numImpliedVolatility.toString())
  iv.blockNumber = call.block.number
  iv.timestamp = call.block.timestamp
  iv.impliedVolatility = call.inputs.value
  iv.pool = liquidity_pool.id
  iv.save()

  liquidity_pool.latestImpliedVolatility = iv.id
  liquidity_pool.save()
}