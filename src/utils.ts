import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { Asset, ImpliedVolatility, LiquidityPool } from './types/schema'
import { RisqOptions as Contract } from './types/RisqWBTCOptions/RisqOptions'

export const BigIntZero =  BigInt.fromI32(0)
export const BigIntOne =  BigInt.fromI32(1)
export const BigDecimalZero = BigDecimal.fromString('0')
export const BigDecimalOne = BigDecimal.fromString('1')

export const WBTC_OPTIONS_ADDR = "0xe1ffbb1999a5ab58c3cd8343823ce8e87a53e656";
export const WBTC_POOL_ADDR = "0x5d6e644ebee654a78beb1207f33ce79ca475fd4e"
export const WBTC_ADDR = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";

export function initLiquidityPool(address: string, options_addr: string, underlying: Asset): LiquidityPool {
  // Create pool
  let liquidity_pool = new LiquidityPool(address)
  liquidity_pool.underlying = underlying.id;
  liquidity_pool.numOptions = BigIntZero;
  liquidity_pool.numExercisedOptions = BigIntZero;
  liquidity_pool.numExpiredOptions = BigIntZero;

  liquidity_pool.numProvides = BigIntZero;
  liquidity_pool.numWithdraws = BigIntZero;
  liquidity_pool.liquidity = BigIntZero;

  liquidity_pool.numProfits = BigIntZero;
  liquidity_pool.totalProfits = BigIntZero;

  liquidity_pool.numLosses = BigIntZero;
  liquidity_pool.totalLosses = BigIntZero;

  liquidity_pool.totalSettlementFees = BigIntZero;
  liquidity_pool.totalFees = BigIntZero;
  liquidity_pool.totalPutVolume = BigIntZero;
  liquidity_pool.totalCallVolume = BigIntZero;

  liquidity_pool.numImpliedVolatility = BigIntZero
  liquidity_pool.save()

  return liquidity_pool
}

export function getCreateWBTCPool(): LiquidityPool {
  let wbtcOptions = Contract.bind(Address.fromString(WBTC_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = wbtcOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(WBTC_ADDR);
    if (underlying == null) {
      underlying = new Asset(WBTC_ADDR);
      underlying.symbol = "WBTC";
      underlying.name = "Wrapped BTC";
      underlying.decimals = 8;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, WBTC_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const ETH_OPTIONS_ADDR = "0x54fa24438370b5e7f64a1c78319d0c1048d14711";
export const ETH_POOL_ADDR = "0x7095b510f402463df8db51de869629f7094487c2"
export const ETH_ADDR = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export function getCreateETHPool(): LiquidityPool {
  let ethOptions = Contract.bind(Address.fromString(ETH_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = ethOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(ETH_ADDR);
    if (underlying == null) {
      underlying = new Asset(ETH_ADDR);
      underlying.symbol = "ETH";
      underlying.name = "Ether";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, ETH_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}