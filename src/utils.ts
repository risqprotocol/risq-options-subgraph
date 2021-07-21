import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { Asset, ImpliedVolatility, LiquidityPool } from './types/schema'
import { RisqOptions as Contract } from './types/RisqWBTCOptions/RisqOptions'

export const BigIntZero =  BigInt.fromI32(0)
export const BigIntOne =  BigInt.fromI32(1)
export const BigDecimalZero = BigDecimal.fromString('0')
export const BigDecimalOne = BigDecimal.fromString('1')

export const WBTC_OPTIONS_ADDR = "0xe1ffbb1999a5ab58c3cd8343823ce8e87a53e656";
export const WBTC_POOL_ADDR = "0x5d6e644ebee654a78beb1207f33ce79ca475fd4e"
export const WBTC_ADDR = "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c";

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
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, WBTC_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const ETH_OPTIONS_ADDR = "0x54fa24438370b5e7f64a1c78319d0c1048d14711";
export const ETH_POOL_ADDR = "0x7095b510f402463df8db51de869629f7094487c2"
export const ETH_ADDR = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";

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

export const BNB_OPTIONS_ADDR = "0x209Ee82429FD4e26251ed01771338C94fCbAF717";
export const BNB_POOL_ADDR = "0x6249C0e395Ab75f047183B21d2755babBD795A6f"
export const BNB_ADDR = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

export function getCreateBNBPool(): LiquidityPool {
  let bnbOptions = Contract.bind(Address.fromString(BNB_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = bnbOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(BNB_ADDR);
    if (underlying == null) {
      underlying = new Asset(BNB_ADDR);
      underlying.symbol = "BNB";
      underlying.name = "Wrapped BNB";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, BNB_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const BCH_OPTIONS_ADDR = "0x6Ee22C3b113B299D6D831C065547aaA900e03c3D";
export const BCH_POOL_ADDR = "0x262ECE00f404D01e6824e345a36C7330d8BCe34e"
export const BCH_ADDR = "0x8ff795a6f4d97e7887c79bea79aba5cc76444adf";

export function getCreateBCHPool(): LiquidityPool {
  let bchOptions = Contract.bind(Address.fromString(BCH_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = bchOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(BCH_ADDR);
    if (underlying == null) {
      underlying = new Asset(BCH_ADDR);
      underlying.symbol = "BCH";
      underlying.name = "Bitcoin Cash";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, BCH_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const LTC_OPTIONS_ADDR = "0x8009A019d83C9826788cbb9BC868d9065AC7088f";
export const LTC_POOL_ADDR = "0xDE6046fE176d3D84A71312e589d9c3C629e92768"
export const LTC_ADDR = "0x4338665cbb7b2485a8855a139b75d5e34ab0db94";

export function getCreateLTCPool(): LiquidityPool {
  let ltcOptions = Contract.bind(Address.fromString(LTC_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = ltcOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(LTC_ADDR);
    if (underlying == null) {
      underlying = new Asset(LTC_ADDR);
      underlying.symbol = "LTC";
      underlying.name = "Litecoin";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, LTC_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const PAXG_OPTIONS_ADDR = "0x1F4d8beaB9668Eeb41beF9Ad17A5389b0A09DC43";
export const PAXG_POOL_ADDR = "0xC62A72186B25e5bC966b53Ee91415B4724ff52C7"
export const PAXG_ADDR = "0x7950865a9140cb519342433146ed5b40c6f210f7";

export function getCreatePAXGPool(): LiquidityPool {
  let paxgOptions = Contract.bind(Address.fromString(PAXG_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = paxgOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(PAXG_ADDR);
    if (underlying == null) {
      underlying = new Asset(PAXG_ADDR);
      underlying.symbol = "PAXG";
      underlying.name = "PAX Gold";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, PAXG_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const COMP_OPTIONS_ADDR = "0x9E7Fe8C954C48F4dd7B259D2781f3fDBb247DebF";
export const COMP_POOL_ADDR = "0xfe477c25b5286cc2304987af7cd05274962cf593"
export const COMP_ADDR = "0x52ce071bd9b1c4b00a0b92d298c512478cad67e8";

export function getCreateCOMPPool(): LiquidityPool {
  let compOptions = Contract.bind(Address.fromString(COMP_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = compOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(COMP_ADDR);
    if (underlying == null) {
      underlying = new Asset(COMP_ADDR);
      underlying.symbol = "COMP";
      underlying.name = "Compound";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, COMP_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const CAKE_OPTIONS_ADDR = "0xA26f309BB16349a2394561277eA6f190D8Ac56f6";
export const CAKE_POOL_ADDR = "0xD6A2782a2f6229CBF258633EB71725E92D6A19d2"
export const CAKE_ADDR = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";

export function getCreateCAKEPool(): LiquidityPool {
  let cakeOptions = Contract.bind(Address.fromString(CAKE_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = cakeOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(CAKE_ADDR);
    if (underlying == null) {
      underlying = new Asset(CAKE_ADDR);
      underlying.symbol = "CAKE";
      underlying.name = "PancakeSwap";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, CAKE_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const UNI_OPTIONS_ADDR = "0x502f641ad75a751F914f8e87fF6416874d06bd17";
export const UNI_POOL_ADDR = "0xf0cc28dee2df4e3482a09809cf6F26A41Fa65e4d"
export const UNI_ADDR = "0xbf5140a22578168fd562dccf235e5d43a02ce9b1";

export function getCreateUNIPool(): LiquidityPool {
  let uniOptions = Contract.bind(Address.fromString(UNI_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = uniOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(UNI_ADDR);
    if (underlying == null) {
      underlying = new Asset(UNI_ADDR);
      underlying.symbol = "UNI";
      underlying.name = "Uniswap";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, UNI_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const LINK_OPTIONS_ADDR = "0xF65cbCc2eC6dbF623F7C9a37327c181F11B8CE48";
export const LINK_POOL_ADDR = "0xf60c7Ed4954f5DfEfea116aE851A8D4DBB864541"
export const LINK_ADDR = "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd";

export function getCreateLINKPool(): LiquidityPool {
  let linkOptions = Contract.bind(Address.fromString(LINK_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = linkOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(LINK_ADDR);
    if (underlying == null) {
      underlying = new Asset(LINK_ADDR);
      underlying.symbol = "LINK";
      underlying.name = "ChainLink";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, LINK_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const TSLA_OPTIONS_ADDR = "0xc308E64037A7889bC8722201e34b047847Ea52bc";
export const TSLA_POOL_ADDR = "0x91313522182d5aFa7862012619fFedBf745c41F2"
export const TSLA_ADDR = "0xF215A127A196e3988C09d052e16BcFD365Cd7AA3";

export function getCreateTSLAPool(): LiquidityPool {
  let tslaOptions = Contract.bind(Address.fromString(TSLA_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = tslaOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(TSLA_ADDR);
    if (underlying == null) {
      underlying = new Asset(TSLA_ADDR);
      underlying.symbol = "TSLA";
      underlying.name = "Mirror TSLA";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, TSLA_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const AMZN_OPTIONS_ADDR = "0xF2E1Cd501491DFc74a4B6c7291fd9436853b8948";
export const AMZN_POOL_ADDR = "0x3d0bA06e66DC6405D64Db542473fDDe6243147F3"
export const AMZN_ADDR = "0x3947B992DC0147D2D89dF0392213781b04B25075";

export function getCreateAMZNPool(): LiquidityPool {
  let amznOptions = Contract.bind(Address.fromString(AMZN_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = amznOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(AMZN_ADDR);
    if (underlying == null) {
      underlying = new Asset(AMZN_ADDR);
      underlying.symbol = "AMZN";
      underlying.name = "Mirror AMZN";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, AMZN_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const GOOGL_OPTIONS_ADDR = "0xc2C6483B8E984D170d1DDB92C819bE1ABc7e37FF";
export const GOOGL_POOL_ADDR = "0x27883d6d5A0FEf1Cf565928259BBe1deaa2CF715"
export const GOOGL_ADDR = "0x62D71B23bF15218C7d2D7E48DBbD9e9c650B173f";

export function getCreateGOOGLPool(): LiquidityPool {
  let googlOptions = Contract.bind(Address.fromString(GOOGL_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = googlOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(GOOGL_ADDR);
    if (underlying == null) {
      underlying = new Asset(GOOGL_ADDR);
      underlying.symbol = "GOOGL";
      underlying.name = "Mirror GOOGL";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, GOOGL_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}

export const YFI_OPTIONS_ADDR = "0x41f6a36094cE2B1Ae6711674E5C19234B232AEb3";
export const YFI_POOL_ADDR = "0x9a1f6843fc4bbe923b35e1f55462aecee09fe2fe"
export const YFI_ADDR = "0x88f1A5ae2A3BF98AEAF342D26B30a79438c9142e";

export function getCreateYFIPool(): LiquidityPool {
  let yfiOptions = Contract.bind(Address.fromString(YFI_OPTIONS_ADDR));

  // Check if pool exists
  let pool_addr = yfiOptions.pool().toHexString().toString();
  let liquidity_pool = LiquidityPool.load(pool_addr)
  if (liquidity_pool == null) {
    // Check if underlying asset exists
    let underlying = Asset.load(YFI_ADDR);
    if (underlying == null) {
      underlying = new Asset(YFI_ADDR);
      underlying.symbol = "YFI";
      underlying.name = "Yearn Finance";
      underlying.decimals = 18;
      underlying.save()
    }

    // Create pool
    liquidity_pool = initLiquidityPool(pool_addr, YFI_OPTIONS_ADDR, underlying as Asset)
  }

  return liquidity_pool as LiquidityPool
}