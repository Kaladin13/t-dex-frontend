import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  address,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from '@ton/core'

export type DataSize = {
  $$type: 'DataSize'
  cells: bigint
  bits: bigint
  refs: bigint
}

export function storeDataSize(src: DataSize) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.cells, 257)
    b_0.storeInt(src.bits, 257)
    b_0.storeInt(src.refs, 257)
  }
}

export function loadDataSize(slice: Slice) {
  const sc_0 = slice
  const _cells = sc_0.loadIntBig(257)
  const _bits = sc_0.loadIntBig(257)
  const _refs = sc_0.loadIntBig(257)
  return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs }
}

export function loadTupleDataSize(source: TupleReader) {
  const _cells = source.readBigNumber()
  const _bits = source.readBigNumber()
  const _refs = source.readBigNumber()
  return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs }
}

export function loadGetterTupleDataSize(source: TupleReader) {
  const _cells = source.readBigNumber()
  const _bits = source.readBigNumber()
  const _refs = source.readBigNumber()
  return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs }
}

export function storeTupleDataSize(source: DataSize) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.cells)
  builder.writeNumber(source.bits)
  builder.writeNumber(source.refs)
  return builder.build()
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDataSize(src)).endCell())
    },
    parse: (src) => {
      return loadDataSize(src.loadRef().beginParse())
    },
  }
}

export type SignedBundle = {
  $$type: 'SignedBundle'
  signature: Buffer
  signedData: Slice
}

export function storeSignedBundle(src: SignedBundle) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeBuffer(src.signature)
    b_0.storeBuilder(src.signedData.asBuilder())
  }
}

export function loadSignedBundle(slice: Slice) {
  const sc_0 = slice
  const _signature = sc_0.loadBuffer(64)
  const _signedData = sc_0
  return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData }
}

export function loadTupleSignedBundle(source: TupleReader) {
  const _signature = source.readBuffer()
  const _signedData = source.readCell().asSlice()
  return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData }
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
  const _signature = source.readBuffer()
  const _signedData = source.readCell().asSlice()
  return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData }
}

export function storeTupleSignedBundle(source: SignedBundle) {
  const builder = new TupleBuilder()
  builder.writeBuffer(source.signature)
  builder.writeSlice(source.signedData.asCell())
  return builder.build()
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell())
    },
    parse: (src) => {
      return loadSignedBundle(src.loadRef().beginParse())
    },
  }
}

export type StateInit = {
  $$type: 'StateInit'
  code: Cell
  data: Cell
}

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeRef(src.code)
    b_0.storeRef(src.data)
  }
}

export function loadStateInit(slice: Slice) {
  const sc_0 = slice
  const _code = sc_0.loadRef()
  const _data = sc_0.loadRef()
  return { $$type: 'StateInit' as const, code: _code, data: _data }
}

export function loadTupleStateInit(source: TupleReader) {
  const _code = source.readCell()
  const _data = source.readCell()
  return { $$type: 'StateInit' as const, code: _code, data: _data }
}

export function loadGetterTupleStateInit(source: TupleReader) {
  const _code = source.readCell()
  const _data = source.readCell()
  return { $$type: 'StateInit' as const, code: _code, data: _data }
}

export function storeTupleStateInit(source: StateInit) {
  const builder = new TupleBuilder()
  builder.writeCell(source.code)
  builder.writeCell(source.data)
  return builder.build()
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell())
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse())
    },
  }
}

export type Context = {
  $$type: 'Context'
  bounceable: boolean
  sender: Address
  value: bigint
  raw: Slice
}

export function storeContext(src: Context) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeBit(src.bounceable)
    b_0.storeAddress(src.sender)
    b_0.storeInt(src.value, 257)
    b_0.storeRef(src.raw.asCell())
  }
}

export function loadContext(slice: Slice) {
  const sc_0 = slice
  const _bounceable = sc_0.loadBit()
  const _sender = sc_0.loadAddress()
  const _value = sc_0.loadIntBig(257)
  const _raw = sc_0.loadRef().asSlice()
  return {
    $$type: 'Context' as const,
    bounceable: _bounceable,
    sender: _sender,
    value: _value,
    raw: _raw,
  }
}

export function loadTupleContext(source: TupleReader) {
  const _bounceable = source.readBoolean()
  const _sender = source.readAddress()
  const _value = source.readBigNumber()
  const _raw = source.readCell().asSlice()
  return {
    $$type: 'Context' as const,
    bounceable: _bounceable,
    sender: _sender,
    value: _value,
    raw: _raw,
  }
}

export function loadGetterTupleContext(source: TupleReader) {
  const _bounceable = source.readBoolean()
  const _sender = source.readAddress()
  const _value = source.readBigNumber()
  const _raw = source.readCell().asSlice()
  return {
    $$type: 'Context' as const,
    bounceable: _bounceable,
    sender: _sender,
    value: _value,
    raw: _raw,
  }
}

export function storeTupleContext(source: Context) {
  const builder = new TupleBuilder()
  builder.writeBoolean(source.bounceable)
  builder.writeAddress(source.sender)
  builder.writeNumber(source.value)
  builder.writeSlice(source.raw.asCell())
  return builder.build()
}

export function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell())
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse())
    },
  }
}

export type SendParameters = {
  $$type: 'SendParameters'
  mode: bigint
  body: Cell | null
  code: Cell | null
  data: Cell | null
  value: bigint
  to: Address
  bounce: boolean
}

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.mode, 257)
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body)
    } else {
      b_0.storeBit(false)
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code)
    } else {
      b_0.storeBit(false)
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeInt(src.value, 257)
    b_0.storeAddress(src.to)
    b_0.storeBit(src.bounce)
  }
}

export function loadSendParameters(slice: Slice) {
  const sc_0 = slice
  const _mode = sc_0.loadIntBig(257)
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null
  const _code = sc_0.loadBit() ? sc_0.loadRef() : null
  const _data = sc_0.loadBit() ? sc_0.loadRef() : null
  const _value = sc_0.loadIntBig(257)
  const _to = sc_0.loadAddress()
  const _bounce = sc_0.loadBit()
  return {
    $$type: 'SendParameters' as const,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
    value: _value,
    to: _to,
    bounce: _bounce,
  }
}

export function loadTupleSendParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _code = source.readCellOpt()
  const _data = source.readCellOpt()
  const _value = source.readBigNumber()
  const _to = source.readAddress()
  const _bounce = source.readBoolean()
  return {
    $$type: 'SendParameters' as const,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
    value: _value,
    to: _to,
    bounce: _bounce,
  }
}

export function loadGetterTupleSendParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _code = source.readCellOpt()
  const _data = source.readCellOpt()
  const _value = source.readBigNumber()
  const _to = source.readAddress()
  const _bounce = source.readBoolean()
  return {
    $$type: 'SendParameters' as const,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
    value: _value,
    to: _to,
    bounce: _bounce,
  }
}

export function storeTupleSendParameters(source: SendParameters) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.mode)
  builder.writeCell(source.body)
  builder.writeCell(source.code)
  builder.writeCell(source.data)
  builder.writeNumber(source.value)
  builder.writeAddress(source.to)
  builder.writeBoolean(source.bounce)
  return builder.build()
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell())
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse())
    },
  }
}

export type MessageParameters = {
  $$type: 'MessageParameters'
  mode: bigint
  body: Cell | null
  value: bigint
  to: Address
  bounce: boolean
}

export function storeMessageParameters(src: MessageParameters) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.mode, 257)
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeInt(src.value, 257)
    b_0.storeAddress(src.to)
    b_0.storeBit(src.bounce)
  }
}

export function loadMessageParameters(slice: Slice) {
  const sc_0 = slice
  const _mode = sc_0.loadIntBig(257)
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null
  const _value = sc_0.loadIntBig(257)
  const _to = sc_0.loadAddress()
  const _bounce = sc_0.loadBit()
  return {
    $$type: 'MessageParameters' as const,
    mode: _mode,
    body: _body,
    value: _value,
    to: _to,
    bounce: _bounce,
  }
}

export function loadTupleMessageParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _value = source.readBigNumber()
  const _to = source.readAddress()
  const _bounce = source.readBoolean()
  return {
    $$type: 'MessageParameters' as const,
    mode: _mode,
    body: _body,
    value: _value,
    to: _to,
    bounce: _bounce,
  }
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _value = source.readBigNumber()
  const _to = source.readAddress()
  const _bounce = source.readBoolean()
  return {
    $$type: 'MessageParameters' as const,
    mode: _mode,
    body: _body,
    value: _value,
    to: _to,
    bounce: _bounce,
  }
}

export function storeTupleMessageParameters(source: MessageParameters) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.mode)
  builder.writeCell(source.body)
  builder.writeNumber(source.value)
  builder.writeAddress(source.to)
  builder.writeBoolean(source.bounce)
  return builder.build()
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell())
    },
    parse: (src) => {
      return loadMessageParameters(src.loadRef().beginParse())
    },
  }
}

export type DeployParameters = {
  $$type: 'DeployParameters'
  mode: bigint
  body: Cell | null
  value: bigint
  bounce: boolean
  init: StateInit
}

export function storeDeployParameters(src: DeployParameters) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.mode, 257)
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeInt(src.value, 257)
    b_0.storeBit(src.bounce)
    b_0.store(storeStateInit(src.init))
  }
}

export function loadDeployParameters(slice: Slice) {
  const sc_0 = slice
  const _mode = sc_0.loadIntBig(257)
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null
  const _value = sc_0.loadIntBig(257)
  const _bounce = sc_0.loadBit()
  const _init = loadStateInit(sc_0)
  return {
    $$type: 'DeployParameters' as const,
    mode: _mode,
    body: _body,
    value: _value,
    bounce: _bounce,
    init: _init,
  }
}

export function loadTupleDeployParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _value = source.readBigNumber()
  const _bounce = source.readBoolean()
  const _init = loadTupleStateInit(source)
  return {
    $$type: 'DeployParameters' as const,
    mode: _mode,
    body: _body,
    value: _value,
    bounce: _bounce,
    init: _init,
  }
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _body = source.readCellOpt()
  const _value = source.readBigNumber()
  const _bounce = source.readBoolean()
  const _init = loadGetterTupleStateInit(source)
  return {
    $$type: 'DeployParameters' as const,
    mode: _mode,
    body: _body,
    value: _value,
    bounce: _bounce,
    init: _init,
  }
}

export function storeTupleDeployParameters(source: DeployParameters) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.mode)
  builder.writeCell(source.body)
  builder.writeNumber(source.value)
  builder.writeBoolean(source.bounce)
  builder.writeTuple(storeTupleStateInit(source.init))
  return builder.build()
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell())
    },
    parse: (src) => {
      return loadDeployParameters(src.loadRef().beginParse())
    },
  }
}

export type StdAddress = {
  $$type: 'StdAddress'
  workchain: bigint
  address: bigint
}

export function storeStdAddress(src: StdAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.workchain, 8)
    b_0.storeUint(src.address, 256)
  }
}

export function loadStdAddress(slice: Slice) {
  const sc_0 = slice
  const _workchain = sc_0.loadIntBig(8)
  const _address = sc_0.loadUintBig(256)
  return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address }
}

export function loadTupleStdAddress(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _address = source.readBigNumber()
  return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address }
}

export function loadGetterTupleStdAddress(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _address = source.readBigNumber()
  return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address }
}

export function storeTupleStdAddress(source: StdAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.workchain)
  builder.writeNumber(source.address)
  return builder.build()
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStdAddress(src)).endCell())
    },
    parse: (src) => {
      return loadStdAddress(src.loadRef().beginParse())
    },
  }
}

export type VarAddress = {
  $$type: 'VarAddress'
  workchain: bigint
  address: Slice
}

export function storeVarAddress(src: VarAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.workchain, 32)
    b_0.storeRef(src.address.asCell())
  }
}

export function loadVarAddress(slice: Slice) {
  const sc_0 = slice
  const _workchain = sc_0.loadIntBig(32)
  const _address = sc_0.loadRef().asSlice()
  return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address }
}

export function loadTupleVarAddress(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _address = source.readCell().asSlice()
  return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address }
}

export function loadGetterTupleVarAddress(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _address = source.readCell().asSlice()
  return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address }
}

export function storeTupleVarAddress(source: VarAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.workchain)
  builder.writeSlice(source.address.asCell())
  return builder.build()
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVarAddress(src)).endCell())
    },
    parse: (src) => {
      return loadVarAddress(src.loadRef().beginParse())
    },
  }
}

export type BasechainAddress = {
  $$type: 'BasechainAddress'
  hash: bigint | null
}

export function storeBasechainAddress(src: BasechainAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    if (src.hash !== null && src.hash !== undefined) {
      b_0.storeBit(true).storeInt(src.hash, 257)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadBasechainAddress(slice: Slice) {
  const sc_0 = slice
  const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null
  return { $$type: 'BasechainAddress' as const, hash: _hash }
}

export function loadTupleBasechainAddress(source: TupleReader) {
  const _hash = source.readBigNumberOpt()
  return { $$type: 'BasechainAddress' as const, hash: _hash }
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
  const _hash = source.readBigNumberOpt()
  return { $$type: 'BasechainAddress' as const, hash: _hash }
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.hash)
  return builder.build()
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell())
    },
    parse: (src) => {
      return loadBasechainAddress(src.loadRef().beginParse())
    },
  }
}

export type SortedAddresses = {
  $$type: 'SortedAddresses'
  lower: Address
  higher: Address
}

export function storeSortedAddresses(src: SortedAddresses) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.lower)
    b_0.storeAddress(src.higher)
  }
}

export function loadSortedAddresses(slice: Slice) {
  const sc_0 = slice
  const _lower = sc_0.loadAddress()
  const _higher = sc_0.loadAddress()
  return { $$type: 'SortedAddresses' as const, lower: _lower, higher: _higher }
}

export function loadTupleSortedAddresses(source: TupleReader) {
  const _lower = source.readAddress()
  const _higher = source.readAddress()
  return { $$type: 'SortedAddresses' as const, lower: _lower, higher: _higher }
}

export function loadGetterTupleSortedAddresses(source: TupleReader) {
  const _lower = source.readAddress()
  const _higher = source.readAddress()
  return { $$type: 'SortedAddresses' as const, lower: _lower, higher: _higher }
}

export function storeTupleSortedAddresses(source: SortedAddresses) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.lower)
  builder.writeAddress(source.higher)
  return builder.build()
}

export function dictValueParserSortedAddresses(): DictionaryValue<SortedAddresses> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSortedAddresses(src)).endCell())
    },
    parse: (src) => {
      return loadSortedAddresses(src.loadRef().beginParse())
    },
  }
}

export type SortedAddressesAndCoins = {
  $$type: 'SortedAddressesAndCoins'
  lower: Address
  higher: Address
  lowerCoins: bigint
  higherCoins: bigint
}

export function storeSortedAddressesAndCoins(src: SortedAddressesAndCoins) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.lower)
    b_0.storeAddress(src.higher)
    b_0.storeInt(src.lowerCoins, 257)
    const b_1 = new Builder()
    b_1.storeInt(src.higherCoins, 257)
    b_0.storeRef(b_1.endCell())
  }
}

export function loadSortedAddressesAndCoins(slice: Slice) {
  const sc_0 = slice
  const _lower = sc_0.loadAddress()
  const _higher = sc_0.loadAddress()
  const _lowerCoins = sc_0.loadIntBig(257)
  const sc_1 = sc_0.loadRef().beginParse()
  const _higherCoins = sc_1.loadIntBig(257)
  return {
    $$type: 'SortedAddressesAndCoins' as const,
    lower: _lower,
    higher: _higher,
    lowerCoins: _lowerCoins,
    higherCoins: _higherCoins,
  }
}

export function loadTupleSortedAddressesAndCoins(source: TupleReader) {
  const _lower = source.readAddress()
  const _higher = source.readAddress()
  const _lowerCoins = source.readBigNumber()
  const _higherCoins = source.readBigNumber()
  return {
    $$type: 'SortedAddressesAndCoins' as const,
    lower: _lower,
    higher: _higher,
    lowerCoins: _lowerCoins,
    higherCoins: _higherCoins,
  }
}

export function loadGetterTupleSortedAddressesAndCoins(source: TupleReader) {
  const _lower = source.readAddress()
  const _higher = source.readAddress()
  const _lowerCoins = source.readBigNumber()
  const _higherCoins = source.readBigNumber()
  return {
    $$type: 'SortedAddressesAndCoins' as const,
    lower: _lower,
    higher: _higher,
    lowerCoins: _lowerCoins,
    higherCoins: _higherCoins,
  }
}

export function storeTupleSortedAddressesAndCoins(source: SortedAddressesAndCoins) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.lower)
  builder.writeAddress(source.higher)
  builder.writeNumber(source.lowerCoins)
  builder.writeNumber(source.higherCoins)
  return builder.build()
}

export function dictValueParserSortedAddressesAndCoins(): DictionaryValue<SortedAddressesAndCoins> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSortedAddressesAndCoins(src)).endCell())
    },
    parse: (src) => {
      return loadSortedAddressesAndCoins(src.loadRef().beginParse())
    },
  }
}

export type AmmPool$Data = {
  $$type: 'AmmPool$Data'
  leftVault: Address
  rightVault: Address
  leftSideReserve: bigint
  rightSideReserve: bigint
  totalSupply: bigint
  jettonContent: Cell | null
}

export function storeAmmPool$Data(src: AmmPool$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.leftVault)
    b_0.storeAddress(src.rightVault)
    b_0.storeCoins(src.leftSideReserve)
    b_0.storeCoins(src.rightSideReserve)
    b_0.storeCoins(src.totalSupply)
    if (src.jettonContent !== null && src.jettonContent !== undefined) {
      b_0.storeBit(true).storeRef(src.jettonContent)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadAmmPool$Data(slice: Slice) {
  const sc_0 = slice
  const _leftVault = sc_0.loadAddress()
  const _rightVault = sc_0.loadAddress()
  const _leftSideReserve = sc_0.loadCoins()
  const _rightSideReserve = sc_0.loadCoins()
  const _totalSupply = sc_0.loadCoins()
  const _jettonContent = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'AmmPool$Data' as const,
    leftVault: _leftVault,
    rightVault: _rightVault,
    leftSideReserve: _leftSideReserve,
    rightSideReserve: _rightSideReserve,
    totalSupply: _totalSupply,
    jettonContent: _jettonContent,
  }
}

export function loadTupleAmmPool$Data(source: TupleReader) {
  const _leftVault = source.readAddress()
  const _rightVault = source.readAddress()
  const _leftSideReserve = source.readBigNumber()
  const _rightSideReserve = source.readBigNumber()
  const _totalSupply = source.readBigNumber()
  const _jettonContent = source.readCellOpt()
  return {
    $$type: 'AmmPool$Data' as const,
    leftVault: _leftVault,
    rightVault: _rightVault,
    leftSideReserve: _leftSideReserve,
    rightSideReserve: _rightSideReserve,
    totalSupply: _totalSupply,
    jettonContent: _jettonContent,
  }
}

export function loadGetterTupleAmmPool$Data(source: TupleReader) {
  const _leftVault = source.readAddress()
  const _rightVault = source.readAddress()
  const _leftSideReserve = source.readBigNumber()
  const _rightSideReserve = source.readBigNumber()
  const _totalSupply = source.readBigNumber()
  const _jettonContent = source.readCellOpt()
  return {
    $$type: 'AmmPool$Data' as const,
    leftVault: _leftVault,
    rightVault: _rightVault,
    leftSideReserve: _leftSideReserve,
    rightSideReserve: _rightSideReserve,
    totalSupply: _totalSupply,
    jettonContent: _jettonContent,
  }
}

export function storeTupleAmmPool$Data(source: AmmPool$Data) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.leftVault)
  builder.writeAddress(source.rightVault)
  builder.writeNumber(source.leftSideReserve)
  builder.writeNumber(source.rightSideReserve)
  builder.writeNumber(source.totalSupply)
  builder.writeCell(source.jettonContent)
  return builder.build()
}

export function dictValueParserAmmPool$Data(): DictionaryValue<AmmPool$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAmmPool$Data(src)).endCell())
    },
    parse: (src) => {
      return loadAmmPool$Data(src.loadRef().beginParse())
    },
  }
}

export type LiquidityDepositContract$Data = {
  $$type: 'LiquidityDepositContract$Data'
  leftVault: Address
  rightVault: Address
  leftSideAmount: bigint
  rightSideAmount: bigint
  depositor: Address
  contractId: bigint
  status: bigint
  leftAdditionalParams: AdditionalParams | null
  rightAdditionalParams: AdditionalParams | null
}

export function storeLiquidityDepositContract$Data(src: LiquidityDepositContract$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.leftVault)
    b_0.storeAddress(src.rightVault)
    b_0.storeCoins(src.leftSideAmount)
    b_0.storeCoins(src.rightSideAmount)
    const b_1 = new Builder()
    b_1.storeAddress(src.depositor)
    b_1.storeUint(src.contractId, 64)
    b_1.storeUint(src.status, 3)
    if (src.leftAdditionalParams !== null && src.leftAdditionalParams !== undefined) {
      b_1.storeBit(true)
      b_1.store(storeAdditionalParams(src.leftAdditionalParams))
    } else {
      b_1.storeBit(false)
    }
    if (src.rightAdditionalParams !== null && src.rightAdditionalParams !== undefined) {
      b_1.storeBit(true)
      b_1.store(storeAdditionalParams(src.rightAdditionalParams))
    } else {
      b_1.storeBit(false)
    }
    b_0.storeRef(b_1.endCell())
  }
}

export function loadLiquidityDepositContract$Data(slice: Slice) {
  const sc_0 = slice
  const _leftVault = sc_0.loadAddress()
  const _rightVault = sc_0.loadAddress()
  const _leftSideAmount = sc_0.loadCoins()
  const _rightSideAmount = sc_0.loadCoins()
  const sc_1 = sc_0.loadRef().beginParse()
  const _depositor = sc_1.loadAddress()
  const _contractId = sc_1.loadUintBig(64)
  const _status = sc_1.loadUintBig(3)
  const _leftAdditionalParams = sc_1.loadBit() ? loadAdditionalParams(sc_1) : null
  const _rightAdditionalParams = sc_1.loadBit() ? loadAdditionalParams(sc_1) : null
  return {
    $$type: 'LiquidityDepositContract$Data' as const,
    leftVault: _leftVault,
    rightVault: _rightVault,
    leftSideAmount: _leftSideAmount,
    rightSideAmount: _rightSideAmount,
    depositor: _depositor,
    contractId: _contractId,
    status: _status,
    leftAdditionalParams: _leftAdditionalParams,
    rightAdditionalParams: _rightAdditionalParams,
  }
}

export function loadTupleLiquidityDepositContract$Data(source: TupleReader) {
  const _leftVault = source.readAddress()
  const _rightVault = source.readAddress()
  const _leftSideAmount = source.readBigNumber()
  const _rightSideAmount = source.readBigNumber()
  const _depositor = source.readAddress()
  const _contractId = source.readBigNumber()
  const _status = source.readBigNumber()
  const _leftAdditionalParams_p = source.readTupleOpt()
  const _leftAdditionalParams = _leftAdditionalParams_p
    ? loadTupleAdditionalParams(_leftAdditionalParams_p)
    : null
  const _rightAdditionalParams_p = source.readTupleOpt()
  const _rightAdditionalParams = _rightAdditionalParams_p
    ? loadTupleAdditionalParams(_rightAdditionalParams_p)
    : null
  return {
    $$type: 'LiquidityDepositContract$Data' as const,
    leftVault: _leftVault,
    rightVault: _rightVault,
    leftSideAmount: _leftSideAmount,
    rightSideAmount: _rightSideAmount,
    depositor: _depositor,
    contractId: _contractId,
    status: _status,
    leftAdditionalParams: _leftAdditionalParams,
    rightAdditionalParams: _rightAdditionalParams,
  }
}

export function loadGetterTupleLiquidityDepositContract$Data(source: TupleReader) {
  const _leftVault = source.readAddress()
  const _rightVault = source.readAddress()
  const _leftSideAmount = source.readBigNumber()
  const _rightSideAmount = source.readBigNumber()
  const _depositor = source.readAddress()
  const _contractId = source.readBigNumber()
  const _status = source.readBigNumber()
  const _leftAdditionalParams_p = source.readTupleOpt()
  const _leftAdditionalParams = _leftAdditionalParams_p
    ? loadTupleAdditionalParams(_leftAdditionalParams_p)
    : null
  const _rightAdditionalParams_p = source.readTupleOpt()
  const _rightAdditionalParams = _rightAdditionalParams_p
    ? loadTupleAdditionalParams(_rightAdditionalParams_p)
    : null
  return {
    $$type: 'LiquidityDepositContract$Data' as const,
    leftVault: _leftVault,
    rightVault: _rightVault,
    leftSideAmount: _leftSideAmount,
    rightSideAmount: _rightSideAmount,
    depositor: _depositor,
    contractId: _contractId,
    status: _status,
    leftAdditionalParams: _leftAdditionalParams,
    rightAdditionalParams: _rightAdditionalParams,
  }
}

export function storeTupleLiquidityDepositContract$Data(source: LiquidityDepositContract$Data) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.leftVault)
  builder.writeAddress(source.rightVault)
  builder.writeNumber(source.leftSideAmount)
  builder.writeNumber(source.rightSideAmount)
  builder.writeAddress(source.depositor)
  builder.writeNumber(source.contractId)
  builder.writeNumber(source.status)
  if (source.leftAdditionalParams !== null && source.leftAdditionalParams !== undefined) {
    builder.writeTuple(storeTupleAdditionalParams(source.leftAdditionalParams))
  } else {
    builder.writeTuple(null)
  }
  if (source.rightAdditionalParams !== null && source.rightAdditionalParams !== undefined) {
    builder.writeTuple(storeTupleAdditionalParams(source.rightAdditionalParams))
  } else {
    builder.writeTuple(null)
  }
  return builder.build()
}

export function dictValueParserLiquidityDepositContract$Data(): DictionaryValue<LiquidityDepositContract$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLiquidityDepositContract$Data(src)).endCell())
    },
    parse: (src) => {
      return loadLiquidityDepositContract$Data(src.loadRef().beginParse())
    },
  }
}

export type JettonNotifyWithActionRequest = {
  $$type: 'JettonNotifyWithActionRequest'
  queryId: bigint
  amount: bigint
  sender: Address
  eitherBit: boolean
  actionOpcode: bigint
  actionPayload: Cell
  proofType: bigint
  proof: Slice
}

export function storeJettonNotifyWithActionRequest(src: JettonNotifyWithActionRequest) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1935855772, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeBit(src.eitherBit)
    b_0.storeUint(src.actionOpcode, 32)
    b_0.storeRef(src.actionPayload)
    b_0.storeUint(src.proofType, 8)
    b_0.storeBuilder(src.proof.asBuilder())
  }
}

export function loadJettonNotifyWithActionRequest(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1935855772) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _eitherBit = sc_0.loadBit()
  const _actionOpcode = sc_0.loadUintBig(32)
  const _actionPayload = sc_0.loadRef()
  const _proofType = sc_0.loadUintBig(8)
  const _proof = sc_0
  return {
    $$type: 'JettonNotifyWithActionRequest' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    eitherBit: _eitherBit,
    actionOpcode: _actionOpcode,
    actionPayload: _actionPayload,
    proofType: _proofType,
    proof: _proof,
  }
}

export function loadTupleJettonNotifyWithActionRequest(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _eitherBit = source.readBoolean()
  const _actionOpcode = source.readBigNumber()
  const _actionPayload = source.readCell()
  const _proofType = source.readBigNumber()
  const _proof = source.readCell().asSlice()
  return {
    $$type: 'JettonNotifyWithActionRequest' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    eitherBit: _eitherBit,
    actionOpcode: _actionOpcode,
    actionPayload: _actionPayload,
    proofType: _proofType,
    proof: _proof,
  }
}

export function loadGetterTupleJettonNotifyWithActionRequest(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _eitherBit = source.readBoolean()
  const _actionOpcode = source.readBigNumber()
  const _actionPayload = source.readCell()
  const _proofType = source.readBigNumber()
  const _proof = source.readCell().asSlice()
  return {
    $$type: 'JettonNotifyWithActionRequest' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    eitherBit: _eitherBit,
    actionOpcode: _actionOpcode,
    actionPayload: _actionPayload,
    proofType: _proofType,
    proof: _proof,
  }
}

export function storeTupleJettonNotifyWithActionRequest(source: JettonNotifyWithActionRequest) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeBoolean(source.eitherBit)
  builder.writeNumber(source.actionOpcode)
  builder.writeCell(source.actionPayload)
  builder.writeNumber(source.proofType)
  builder.writeSlice(source.proof.asCell())
  return builder.build()
}

export function dictValueParserJettonNotifyWithActionRequest(): DictionaryValue<JettonNotifyWithActionRequest> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonNotifyWithActionRequest(src)).endCell())
    },
    parse: (src) => {
      return loadJettonNotifyWithActionRequest(src.loadRef().beginParse())
    },
  }
}

export type SendViaJettonTransfer = {
  $$type: 'SendViaJettonTransfer'
  queryId: bigint
  amount: bigint
  destination: Address
  responseDestination: Address | null
  customPayload: Cell | null
  forwardTonAmount: bigint
  forwardPayload: Slice
}

export function storeSendViaJettonTransfer(src: SendViaJettonTransfer) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(260734629, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.destination)
    b_0.storeAddress(src.responseDestination)
    if (src.customPayload !== null && src.customPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.customPayload)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeCoins(src.forwardTonAmount)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadSendViaJettonTransfer(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 260734629) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _destination = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  const _forwardTonAmount = sc_0.loadCoins()
  const _forwardPayload = sc_0
  return {
    $$type: 'SendViaJettonTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleSendViaJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _destination = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'SendViaJettonTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleSendViaJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _destination = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'SendViaJettonTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleSendViaJettonTransfer(source: SendViaJettonTransfer) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.destination)
  builder.writeAddress(source.responseDestination)
  builder.writeCell(source.customPayload)
  builder.writeNumber(source.forwardTonAmount)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserSendViaJettonTransfer(): DictionaryValue<SendViaJettonTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendViaJettonTransfer(src)).endCell())
    },
    parse: (src) => {
      return loadSendViaJettonTransfer(src.loadRef().beginParse())
    },
  }
}

export type JettonVault$Data = {
  $$type: 'JettonVault$Data'
  jettonMaster: Address
  jettonWallet: Address | null
}

export function storeJettonVault$Data(src: JettonVault$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.jettonMaster)
    b_0.storeAddress(src.jettonWallet)
  }
}

export function loadJettonVault$Data(slice: Slice) {
  const sc_0 = slice
  const _jettonMaster = sc_0.loadAddress()
  const _jettonWallet = sc_0.loadMaybeAddress()
  return {
    $$type: 'JettonVault$Data' as const,
    jettonMaster: _jettonMaster,
    jettonWallet: _jettonWallet,
  }
}

export function loadTupleJettonVault$Data(source: TupleReader) {
  const _jettonMaster = source.readAddress()
  const _jettonWallet = source.readAddressOpt()
  return {
    $$type: 'JettonVault$Data' as const,
    jettonMaster: _jettonMaster,
    jettonWallet: _jettonWallet,
  }
}

export function loadGetterTupleJettonVault$Data(source: TupleReader) {
  const _jettonMaster = source.readAddress()
  const _jettonWallet = source.readAddressOpt()
  return {
    $$type: 'JettonVault$Data' as const,
    jettonMaster: _jettonMaster,
    jettonWallet: _jettonWallet,
  }
}

export function storeTupleJettonVault$Data(source: JettonVault$Data) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.jettonMaster)
  builder.writeAddress(source.jettonWallet)
  return builder.build()
}

export function dictValueParserJettonVault$Data(): DictionaryValue<JettonVault$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonVault$Data(src)).endCell())
    },
    parse: (src) => {
      return loadJettonVault$Data(src.loadRef().beginParse())
    },
  }
}

export type SwapIn = {
  $$type: 'SwapIn'
  amount: bigint
  receiver: Address
  params: SwapParameters
  multihopInfo: MultihopInfo | null
}

export function storeSwapIn(src: SwapIn) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2888784440, 32)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.receiver)
    const b_1 = new Builder()
    b_1.store(storeSwapParameters(src.params))
    const b_2 = new Builder()
    if (src.multihopInfo !== null && src.multihopInfo !== undefined) {
      b_2.storeBit(true)
      b_2.store(storeMultihopInfo(src.multihopInfo))
    } else {
      b_2.storeBit(false)
    }
    b_1.storeRef(b_2.endCell())
    b_0.storeRef(b_1.endCell())
  }
}

export function loadSwapIn(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2888784440) {
    throw Error('Invalid prefix')
  }
  const _amount = sc_0.loadCoins()
  const _receiver = sc_0.loadAddress()
  const sc_1 = sc_0.loadRef().beginParse()
  const _params = loadSwapParameters(sc_1)
  const sc_2 = sc_1.loadRef().beginParse()
  const _multihopInfo = sc_2.loadBit() ? loadMultihopInfo(sc_2) : null
  return {
    $$type: 'SwapIn' as const,
    amount: _amount,
    receiver: _receiver,
    params: _params,
    multihopInfo: _multihopInfo,
  }
}

export function loadTupleSwapIn(source: TupleReader) {
  const _amount = source.readBigNumber()
  const _receiver = source.readAddress()
  const _params = loadTupleSwapParameters(source)
  const _multihopInfo_p = source.readTupleOpt()
  const _multihopInfo = _multihopInfo_p ? loadTupleMultihopInfo(_multihopInfo_p) : null
  return {
    $$type: 'SwapIn' as const,
    amount: _amount,
    receiver: _receiver,
    params: _params,
    multihopInfo: _multihopInfo,
  }
}

export function loadGetterTupleSwapIn(source: TupleReader) {
  const _amount = source.readBigNumber()
  const _receiver = source.readAddress()
  const _params = loadGetterTupleSwapParameters(source)
  const _multihopInfo_p = source.readTupleOpt()
  const _multihopInfo = _multihopInfo_p ? loadTupleMultihopInfo(_multihopInfo_p) : null
  return {
    $$type: 'SwapIn' as const,
    amount: _amount,
    receiver: _receiver,
    params: _params,
    multihopInfo: _multihopInfo,
  }
}

export function storeTupleSwapIn(source: SwapIn) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.amount)
  builder.writeAddress(source.receiver)
  builder.writeTuple(storeTupleSwapParameters(source.params))
  if (source.multihopInfo !== null && source.multihopInfo !== undefined) {
    builder.writeTuple(storeTupleMultihopInfo(source.multihopInfo))
  } else {
    builder.writeTuple(null)
  }
  return builder.build()
}

export function dictValueParserSwapIn(): DictionaryValue<SwapIn> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSwapIn(src)).endCell())
    },
    parse: (src) => {
      return loadSwapIn(src.loadRef().beginParse())
    },
  }
}

export type MultihopInfo = {
  $$type: 'MultihopInfo'
  leftVault: Address
  rightVault: Address
  outVault: Address
}

export function storeMultihopInfo(src: MultihopInfo) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.leftVault)
    b_0.storeAddress(src.rightVault)
    b_0.storeAddress(src.outVault)
  }
}

export function loadMultihopInfo(slice: Slice) {
  const sc_0 = slice
  const _leftVault = sc_0.loadAddress()
  const _rightVault = sc_0.loadAddress()
  const _outVault = sc_0.loadAddress()
  return {
    $$type: 'MultihopInfo' as const,
    leftVault: _leftVault,
    rightVault: _rightVault,
    outVault: _outVault,
  }
}

export function loadTupleMultihopInfo(source: TupleReader) {
  const _leftVault = source.readAddress()
  const _rightVault = source.readAddress()
  const _outVault = source.readAddress()
  return {
    $$type: 'MultihopInfo' as const,
    leftVault: _leftVault,
    rightVault: _rightVault,
    outVault: _outVault,
  }
}

export function loadGetterTupleMultihopInfo(source: TupleReader) {
  const _leftVault = source.readAddress()
  const _rightVault = source.readAddress()
  const _outVault = source.readAddress()
  return {
    $$type: 'MultihopInfo' as const,
    leftVault: _leftVault,
    rightVault: _rightVault,
    outVault: _outVault,
  }
}

export function storeTupleMultihopInfo(source: MultihopInfo) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.leftVault)
  builder.writeAddress(source.rightVault)
  builder.writeAddress(source.outVault)
  return builder.build()
}

export function dictValueParserMultihopInfo(): DictionaryValue<MultihopInfo> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMultihopInfo(src)).endCell())
    },
    parse: (src) => {
      return loadMultihopInfo(src.loadRef().beginParse())
    },
  }
}

export type PayoutFromPool = {
  $$type: 'PayoutFromPool'
  otherVault: Address
  amount: bigint
  receiver: Address
  payloadToForward: Cell | null
}

export function storePayoutFromPool(src: PayoutFromPool) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(122649184, 32)
    b_0.storeAddress(src.otherVault)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.receiver)
    if (src.payloadToForward !== null && src.payloadToForward !== undefined) {
      b_0.storeBit(true).storeRef(src.payloadToForward)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadPayoutFromPool(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 122649184) {
    throw Error('Invalid prefix')
  }
  const _otherVault = sc_0.loadAddress()
  const _amount = sc_0.loadCoins()
  const _receiver = sc_0.loadAddress()
  const _payloadToForward = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'PayoutFromPool' as const,
    otherVault: _otherVault,
    amount: _amount,
    receiver: _receiver,
    payloadToForward: _payloadToForward,
  }
}

export function loadTuplePayoutFromPool(source: TupleReader) {
  const _otherVault = source.readAddress()
  const _amount = source.readBigNumber()
  const _receiver = source.readAddress()
  const _payloadToForward = source.readCellOpt()
  return {
    $$type: 'PayoutFromPool' as const,
    otherVault: _otherVault,
    amount: _amount,
    receiver: _receiver,
    payloadToForward: _payloadToForward,
  }
}

export function loadGetterTuplePayoutFromPool(source: TupleReader) {
  const _otherVault = source.readAddress()
  const _amount = source.readBigNumber()
  const _receiver = source.readAddress()
  const _payloadToForward = source.readCellOpt()
  return {
    $$type: 'PayoutFromPool' as const,
    otherVault: _otherVault,
    amount: _amount,
    receiver: _receiver,
    payloadToForward: _payloadToForward,
  }
}

export function storeTuplePayoutFromPool(source: PayoutFromPool) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.otherVault)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.receiver)
  builder.writeCell(source.payloadToForward)
  return builder.build()
}

export function dictValueParserPayoutFromPool(): DictionaryValue<PayoutFromPool> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storePayoutFromPool(src)).endCell())
    },
    parse: (src) => {
      return loadPayoutFromPool(src.loadRef().beginParse())
    },
  }
}

export type LiquidityDeposit = {
  $$type: 'LiquidityDeposit'
  depositor: Address
  contractId: bigint
  leftAmount: bigint
  rightAmount: bigint
  leftAdditionalParams: AdditionalParams
  rightAdditionalParams: AdditionalParams
}

export function storeLiquidityDeposit(src: LiquidityDeposit) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1680571655, 32)
    b_0.storeAddress(src.depositor)
    b_0.storeUint(src.contractId, 64)
    b_0.storeCoins(src.leftAmount)
    b_0.storeCoins(src.rightAmount)
    b_0.store(storeAdditionalParams(src.leftAdditionalParams))
    const b_1 = new Builder()
    b_1.store(storeAdditionalParams(src.rightAdditionalParams))
    b_0.storeRef(b_1.endCell())
  }
}

export function loadLiquidityDeposit(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1680571655) {
    throw Error('Invalid prefix')
  }
  const _depositor = sc_0.loadAddress()
  const _contractId = sc_0.loadUintBig(64)
  const _leftAmount = sc_0.loadCoins()
  const _rightAmount = sc_0.loadCoins()
  const _leftAdditionalParams = loadAdditionalParams(sc_0)
  const sc_1 = sc_0.loadRef().beginParse()
  const _rightAdditionalParams = loadAdditionalParams(sc_1)
  return {
    $$type: 'LiquidityDeposit' as const,
    depositor: _depositor,
    contractId: _contractId,
    leftAmount: _leftAmount,
    rightAmount: _rightAmount,
    leftAdditionalParams: _leftAdditionalParams,
    rightAdditionalParams: _rightAdditionalParams,
  }
}

export function loadTupleLiquidityDeposit(source: TupleReader) {
  const _depositor = source.readAddress()
  const _contractId = source.readBigNumber()
  const _leftAmount = source.readBigNumber()
  const _rightAmount = source.readBigNumber()
  const _leftAdditionalParams = loadTupleAdditionalParams(source)
  const _rightAdditionalParams = loadTupleAdditionalParams(source)
  return {
    $$type: 'LiquidityDeposit' as const,
    depositor: _depositor,
    contractId: _contractId,
    leftAmount: _leftAmount,
    rightAmount: _rightAmount,
    leftAdditionalParams: _leftAdditionalParams,
    rightAdditionalParams: _rightAdditionalParams,
  }
}

export function loadGetterTupleLiquidityDeposit(source: TupleReader) {
  const _depositor = source.readAddress()
  const _contractId = source.readBigNumber()
  const _leftAmount = source.readBigNumber()
  const _rightAmount = source.readBigNumber()
  const _leftAdditionalParams = loadGetterTupleAdditionalParams(source)
  const _rightAdditionalParams = loadGetterTupleAdditionalParams(source)
  return {
    $$type: 'LiquidityDeposit' as const,
    depositor: _depositor,
    contractId: _contractId,
    leftAmount: _leftAmount,
    rightAmount: _rightAmount,
    leftAdditionalParams: _leftAdditionalParams,
    rightAdditionalParams: _rightAdditionalParams,
  }
}

export function storeTupleLiquidityDeposit(source: LiquidityDeposit) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.depositor)
  builder.writeNumber(source.contractId)
  builder.writeNumber(source.leftAmount)
  builder.writeNumber(source.rightAmount)
  builder.writeTuple(storeTupleAdditionalParams(source.leftAdditionalParams))
  builder.writeTuple(storeTupleAdditionalParams(source.rightAdditionalParams))
  return builder.build()
}

export function dictValueParserLiquidityDeposit(): DictionaryValue<LiquidityDeposit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLiquidityDeposit(src)).endCell())
    },
    parse: (src) => {
      return loadLiquidityDeposit(src.loadRef().beginParse())
    },
  }
}

export type LiquidityWithdrawParameters = {
  $$type: 'LiquidityWithdrawParameters'
  leftAmountMin: bigint
  rightAmountMin: bigint
  timeout: bigint
  receiver: Address
  liquidityWithdrawPayload: Cell | null
}

export function storeLiquidityWithdrawParameters(src: LiquidityWithdrawParameters) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeCoins(src.leftAmountMin)
    b_0.storeCoins(src.rightAmountMin)
    b_0.storeUint(src.timeout, 32)
    b_0.storeAddress(src.receiver)
    if (src.liquidityWithdrawPayload !== null && src.liquidityWithdrawPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.liquidityWithdrawPayload)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadLiquidityWithdrawParameters(slice: Slice) {
  const sc_0 = slice
  const _leftAmountMin = sc_0.loadCoins()
  const _rightAmountMin = sc_0.loadCoins()
  const _timeout = sc_0.loadUintBig(32)
  const _receiver = sc_0.loadAddress()
  const _liquidityWithdrawPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'LiquidityWithdrawParameters' as const,
    leftAmountMin: _leftAmountMin,
    rightAmountMin: _rightAmountMin,
    timeout: _timeout,
    receiver: _receiver,
    liquidityWithdrawPayload: _liquidityWithdrawPayload,
  }
}

export function loadTupleLiquidityWithdrawParameters(source: TupleReader) {
  const _leftAmountMin = source.readBigNumber()
  const _rightAmountMin = source.readBigNumber()
  const _timeout = source.readBigNumber()
  const _receiver = source.readAddress()
  const _liquidityWithdrawPayload = source.readCellOpt()
  return {
    $$type: 'LiquidityWithdrawParameters' as const,
    leftAmountMin: _leftAmountMin,
    rightAmountMin: _rightAmountMin,
    timeout: _timeout,
    receiver: _receiver,
    liquidityWithdrawPayload: _liquidityWithdrawPayload,
  }
}

export function loadGetterTupleLiquidityWithdrawParameters(source: TupleReader) {
  const _leftAmountMin = source.readBigNumber()
  const _rightAmountMin = source.readBigNumber()
  const _timeout = source.readBigNumber()
  const _receiver = source.readAddress()
  const _liquidityWithdrawPayload = source.readCellOpt()
  return {
    $$type: 'LiquidityWithdrawParameters' as const,
    leftAmountMin: _leftAmountMin,
    rightAmountMin: _rightAmountMin,
    timeout: _timeout,
    receiver: _receiver,
    liquidityWithdrawPayload: _liquidityWithdrawPayload,
  }
}

export function storeTupleLiquidityWithdrawParameters(source: LiquidityWithdrawParameters) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.leftAmountMin)
  builder.writeNumber(source.rightAmountMin)
  builder.writeNumber(source.timeout)
  builder.writeAddress(source.receiver)
  builder.writeCell(source.liquidityWithdrawPayload)
  return builder.build()
}

export function dictValueParserLiquidityWithdrawParameters(): DictionaryValue<LiquidityWithdrawParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLiquidityWithdrawParameters(src)).endCell())
    },
    parse: (src) => {
      return loadLiquidityWithdrawParameters(src.loadRef().beginParse())
    },
  }
}

export type LiquidityWithdrawViaBurnNotification = {
  $$type: 'LiquidityWithdrawViaBurnNotification'
  queryId: bigint
  amount: bigint
  sender: Address
  responseDestination: Address | null
  forwardPayload: LiquidityWithdrawParameters
}

export function storeLiquidityWithdrawViaBurnNotification(
  src: LiquidityWithdrawViaBurnNotification,
) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2078119902, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeAddress(src.responseDestination)
    const b_1 = new Builder()
    b_1.store(storeLiquidityWithdrawParameters(src.forwardPayload))
    b_0.storeRef(b_1.endCell())
  }
}

export function loadLiquidityWithdrawViaBurnNotification(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2078119902) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  const sc_1 = sc_0.loadRef().beginParse()
  const _forwardPayload = loadLiquidityWithdrawParameters(sc_1)
  return {
    $$type: 'LiquidityWithdrawViaBurnNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleLiquidityWithdrawViaBurnNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _forwardPayload = loadTupleLiquidityWithdrawParameters(source)
  return {
    $$type: 'LiquidityWithdrawViaBurnNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleLiquidityWithdrawViaBurnNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _forwardPayload = loadGetterTupleLiquidityWithdrawParameters(source)
  return {
    $$type: 'LiquidityWithdrawViaBurnNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleLiquidityWithdrawViaBurnNotification(
  source: LiquidityWithdrawViaBurnNotification,
) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeAddress(source.responseDestination)
  builder.writeTuple(storeTupleLiquidityWithdrawParameters(source.forwardPayload))
  return builder.build()
}

export function dictValueParserLiquidityWithdrawViaBurnNotification(): DictionaryValue<LiquidityWithdrawViaBurnNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLiquidityWithdrawViaBurnNotification(src)).endCell())
    },
    parse: (src) => {
      return loadLiquidityWithdrawViaBurnNotification(src.loadRef().beginParse())
    },
  }
}

export type MintViaJettonTransferInternal = {
  $$type: 'MintViaJettonTransferInternal'
  queryId: bigint
  amount: bigint
  sender: Address
  sendAllTonsInNotifyFlag: boolean
  responseDestination: Address | null
  forwardTonAmount: bigint
  forwardPayload: Slice
}

export function storeMintViaJettonTransferInternal(src: MintViaJettonTransferInternal) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(395134233, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeBit(src.sendAllTonsInNotifyFlag)
    b_0.storeAddress(src.responseDestination)
    b_0.storeCoins(src.forwardTonAmount)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadMintViaJettonTransferInternal(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 395134233) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _sendAllTonsInNotifyFlag = sc_0.loadBit()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _forwardTonAmount = sc_0.loadCoins()
  const _forwardPayload = sc_0
  return {
    $$type: 'MintViaJettonTransferInternal' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    sendAllTonsInNotifyFlag: _sendAllTonsInNotifyFlag,
    responseDestination: _responseDestination,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleMintViaJettonTransferInternal(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _sendAllTonsInNotifyFlag = source.readBoolean()
  const _responseDestination = source.readAddressOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'MintViaJettonTransferInternal' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    sendAllTonsInNotifyFlag: _sendAllTonsInNotifyFlag,
    responseDestination: _responseDestination,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleMintViaJettonTransferInternal(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _sendAllTonsInNotifyFlag = source.readBoolean()
  const _responseDestination = source.readAddressOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'MintViaJettonTransferInternal' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    sendAllTonsInNotifyFlag: _sendAllTonsInNotifyFlag,
    responseDestination: _responseDestination,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleMintViaJettonTransferInternal(source: MintViaJettonTransferInternal) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeBoolean(source.sendAllTonsInNotifyFlag)
  builder.writeAddress(source.responseDestination)
  builder.writeNumber(source.forwardTonAmount)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserMintViaJettonTransferInternal(): DictionaryValue<MintViaJettonTransferInternal> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMintViaJettonTransferInternal(src)).endCell())
    },
    parse: (src) => {
      return loadMintViaJettonTransferInternal(src.loadRef().beginParse())
    },
  }
}

export type PartHasBeenDeposited = {
  $$type: 'PartHasBeenDeposited'
  depositor: Address
  amount: bigint
  additionalParams: AdditionalParams
}

export function storePartHasBeenDeposited(src: PartHasBeenDeposited) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3886237535, 32)
    b_0.storeAddress(src.depositor)
    b_0.storeCoins(src.amount)
    b_0.store(storeAdditionalParams(src.additionalParams))
  }
}

export function loadPartHasBeenDeposited(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3886237535) {
    throw Error('Invalid prefix')
  }
  const _depositor = sc_0.loadAddress()
  const _amount = sc_0.loadCoins()
  const _additionalParams = loadAdditionalParams(sc_0)
  return {
    $$type: 'PartHasBeenDeposited' as const,
    depositor: _depositor,
    amount: _amount,
    additionalParams: _additionalParams,
  }
}

export function loadTuplePartHasBeenDeposited(source: TupleReader) {
  const _depositor = source.readAddress()
  const _amount = source.readBigNumber()
  const _additionalParams = loadTupleAdditionalParams(source)
  return {
    $$type: 'PartHasBeenDeposited' as const,
    depositor: _depositor,
    amount: _amount,
    additionalParams: _additionalParams,
  }
}

export function loadGetterTuplePartHasBeenDeposited(source: TupleReader) {
  const _depositor = source.readAddress()
  const _amount = source.readBigNumber()
  const _additionalParams = loadGetterTupleAdditionalParams(source)
  return {
    $$type: 'PartHasBeenDeposited' as const,
    depositor: _depositor,
    amount: _amount,
    additionalParams: _additionalParams,
  }
}

export function storeTuplePartHasBeenDeposited(source: PartHasBeenDeposited) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.depositor)
  builder.writeNumber(source.amount)
  builder.writeTuple(storeTupleAdditionalParams(source.additionalParams))
  return builder.build()
}

export function dictValueParserPartHasBeenDeposited(): DictionaryValue<PartHasBeenDeposited> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storePartHasBeenDeposited(src)).endCell())
    },
    parse: (src) => {
      return loadPartHasBeenDeposited(src.loadRef().beginParse())
    },
  }
}

export type AdditionalParams = {
  $$type: 'AdditionalParams'
  minAmountToDeposit: bigint
  lpTimeout: bigint
  payloadOnSuccess: Cell | null
  payloadOnFailure: Cell | null
}

export function storeAdditionalParams(src: AdditionalParams) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeCoins(src.minAmountToDeposit)
    b_0.storeUint(src.lpTimeout, 32)
    if (src.payloadOnSuccess !== null && src.payloadOnSuccess !== undefined) {
      b_0.storeBit(true).storeRef(src.payloadOnSuccess)
    } else {
      b_0.storeBit(false)
    }
    if (src.payloadOnFailure !== null && src.payloadOnFailure !== undefined) {
      b_0.storeBit(true).storeRef(src.payloadOnFailure)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadAdditionalParams(slice: Slice) {
  const sc_0 = slice
  const _minAmountToDeposit = sc_0.loadCoins()
  const _lpTimeout = sc_0.loadUintBig(32)
  const _payloadOnSuccess = sc_0.loadBit() ? sc_0.loadRef() : null
  const _payloadOnFailure = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'AdditionalParams' as const,
    minAmountToDeposit: _minAmountToDeposit,
    lpTimeout: _lpTimeout,
    payloadOnSuccess: _payloadOnSuccess,
    payloadOnFailure: _payloadOnFailure,
  }
}

export function loadTupleAdditionalParams(source: TupleReader) {
  const _minAmountToDeposit = source.readBigNumber()
  const _lpTimeout = source.readBigNumber()
  const _payloadOnSuccess = source.readCellOpt()
  const _payloadOnFailure = source.readCellOpt()
  return {
    $$type: 'AdditionalParams' as const,
    minAmountToDeposit: _minAmountToDeposit,
    lpTimeout: _lpTimeout,
    payloadOnSuccess: _payloadOnSuccess,
    payloadOnFailure: _payloadOnFailure,
  }
}

export function loadGetterTupleAdditionalParams(source: TupleReader) {
  const _minAmountToDeposit = source.readBigNumber()
  const _lpTimeout = source.readBigNumber()
  const _payloadOnSuccess = source.readCellOpt()
  const _payloadOnFailure = source.readCellOpt()
  return {
    $$type: 'AdditionalParams' as const,
    minAmountToDeposit: _minAmountToDeposit,
    lpTimeout: _lpTimeout,
    payloadOnSuccess: _payloadOnSuccess,
    payloadOnFailure: _payloadOnFailure,
  }
}

export function storeTupleAdditionalParams(source: AdditionalParams) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.minAmountToDeposit)
  builder.writeNumber(source.lpTimeout)
  builder.writeCell(source.payloadOnSuccess)
  builder.writeCell(source.payloadOnFailure)
  return builder.build()
}

export function dictValueParserAdditionalParams(): DictionaryValue<AdditionalParams> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAdditionalParams(src)).endCell())
    },
    parse: (src) => {
      return loadAdditionalParams(src.loadRef().beginParse())
    },
  }
}

export type SliceBitsAndRefs = {
  $$type: 'SliceBitsAndRefs'
  bits: bigint
  refs: bigint
}

export function storeSliceBitsAndRefs(src: SliceBitsAndRefs) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.bits, 257)
    b_0.storeInt(src.refs, 257)
  }
}

export function loadSliceBitsAndRefs(slice: Slice) {
  const sc_0 = slice
  const _bits = sc_0.loadIntBig(257)
  const _refs = sc_0.loadIntBig(257)
  return { $$type: 'SliceBitsAndRefs' as const, bits: _bits, refs: _refs }
}

export function loadTupleSliceBitsAndRefs(source: TupleReader) {
  const _bits = source.readBigNumber()
  const _refs = source.readBigNumber()
  return { $$type: 'SliceBitsAndRefs' as const, bits: _bits, refs: _refs }
}

export function loadGetterTupleSliceBitsAndRefs(source: TupleReader) {
  const _bits = source.readBigNumber()
  const _refs = source.readBigNumber()
  return { $$type: 'SliceBitsAndRefs' as const, bits: _bits, refs: _refs }
}

export function storeTupleSliceBitsAndRefs(source: SliceBitsAndRefs) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.bits)
  builder.writeNumber(source.refs)
  return builder.build()
}

export function dictValueParserSliceBitsAndRefs(): DictionaryValue<SliceBitsAndRefs> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSliceBitsAndRefs(src)).endCell())
    },
    parse: (src) => {
      return loadSliceBitsAndRefs(src.loadRef().beginParse())
    },
  }
}

export type SwapStep = {
  $$type: 'SwapStep'
  pool: Address
  minAmountOut: bigint
  nextStep: Cell | null
}

export function storeSwapStep(src: SwapStep) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.pool)
    b_0.storeCoins(src.minAmountOut)
    if (src.nextStep !== null && src.nextStep !== undefined) {
      b_0.storeBit(true).storeRef(src.nextStep)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadSwapStep(slice: Slice) {
  const sc_0 = slice
  const _pool = sc_0.loadAddress()
  const _minAmountOut = sc_0.loadCoins()
  const _nextStep = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'SwapStep' as const,
    pool: _pool,
    minAmountOut: _minAmountOut,
    nextStep: _nextStep,
  }
}

export function loadTupleSwapStep(source: TupleReader) {
  const _pool = source.readAddress()
  const _minAmountOut = source.readBigNumber()
  const _nextStep = source.readCellOpt()
  return {
    $$type: 'SwapStep' as const,
    pool: _pool,
    minAmountOut: _minAmountOut,
    nextStep: _nextStep,
  }
}

export function loadGetterTupleSwapStep(source: TupleReader) {
  const _pool = source.readAddress()
  const _minAmountOut = source.readBigNumber()
  const _nextStep = source.readCellOpt()
  return {
    $$type: 'SwapStep' as const,
    pool: _pool,
    minAmountOut: _minAmountOut,
    nextStep: _nextStep,
  }
}

export function storeTupleSwapStep(source: SwapStep) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.pool)
  builder.writeNumber(source.minAmountOut)
  builder.writeCell(source.nextStep)
  return builder.build()
}

export function dictValueParserSwapStep(): DictionaryValue<SwapStep> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSwapStep(src)).endCell())
    },
    parse: (src) => {
      return loadSwapStep(src.loadRef().beginParse())
    },
  }
}

export type SwapRequest = {
  $$type: 'SwapRequest'
  pool: Address
  receiver: Address | null
  params: SwapParameters
}

export function storeSwapRequest(src: SwapRequest) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.pool)
    b_0.storeAddress(src.receiver)
    const b_1 = new Builder()
    b_1.store(storeSwapParameters(src.params))
    b_0.storeRef(b_1.endCell())
  }
}

export function loadSwapRequest(slice: Slice) {
  const sc_0 = slice
  const _pool = sc_0.loadAddress()
  const _receiver = sc_0.loadMaybeAddress()
  const sc_1 = sc_0.loadRef().beginParse()
  const _params = loadSwapParameters(sc_1)
  return { $$type: 'SwapRequest' as const, pool: _pool, receiver: _receiver, params: _params }
}

export function loadTupleSwapRequest(source: TupleReader) {
  const _pool = source.readAddress()
  const _receiver = source.readAddressOpt()
  const _params = loadTupleSwapParameters(source)
  return { $$type: 'SwapRequest' as const, pool: _pool, receiver: _receiver, params: _params }
}

export function loadGetterTupleSwapRequest(source: TupleReader) {
  const _pool = source.readAddress()
  const _receiver = source.readAddressOpt()
  const _params = loadGetterTupleSwapParameters(source)
  return { $$type: 'SwapRequest' as const, pool: _pool, receiver: _receiver, params: _params }
}

export function storeTupleSwapRequest(source: SwapRequest) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.pool)
  builder.writeAddress(source.receiver)
  builder.writeTuple(storeTupleSwapParameters(source.params))
  return builder.build()
}

export function dictValueParserSwapRequest(): DictionaryValue<SwapRequest> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSwapRequest(src)).endCell())
    },
    parse: (src) => {
      return loadSwapRequest(src.loadRef().beginParse())
    },
  }
}

export type SwapParameters = {
  $$type: 'SwapParameters'
  isExactOutType: boolean
  cashbackAddress: Address | null
  desiredAmount: bigint
  timeout: bigint
  payloadOnSuccess: Cell | null
  payloadOnFailure: Cell | null
  nextStep: SwapStep | null
}

export function storeSwapParameters(src: SwapParameters) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeBit(src.isExactOutType)
    b_0.storeAddress(src.cashbackAddress)
    b_0.storeCoins(src.desiredAmount)
    b_0.storeUint(src.timeout, 32)
    if (src.payloadOnSuccess !== null && src.payloadOnSuccess !== undefined) {
      b_0.storeBit(true).storeRef(src.payloadOnSuccess)
    } else {
      b_0.storeBit(false)
    }
    if (src.payloadOnFailure !== null && src.payloadOnFailure !== undefined) {
      b_0.storeBit(true).storeRef(src.payloadOnFailure)
    } else {
      b_0.storeBit(false)
    }
    if (src.nextStep !== null && src.nextStep !== undefined) {
      b_0.storeBit(true)
      b_0.store(storeSwapStep(src.nextStep))
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadSwapParameters(slice: Slice) {
  const sc_0 = slice
  const _isExactOutType = sc_0.loadBit()
  const _cashbackAddress = sc_0.loadMaybeAddress()
  const _desiredAmount = sc_0.loadCoins()
  const _timeout = sc_0.loadUintBig(32)
  const _payloadOnSuccess = sc_0.loadBit() ? sc_0.loadRef() : null
  const _payloadOnFailure = sc_0.loadBit() ? sc_0.loadRef() : null
  const _nextStep = sc_0.loadBit() ? loadSwapStep(sc_0) : null
  return {
    $$type: 'SwapParameters' as const,
    isExactOutType: _isExactOutType,
    cashbackAddress: _cashbackAddress,
    desiredAmount: _desiredAmount,
    timeout: _timeout,
    payloadOnSuccess: _payloadOnSuccess,
    payloadOnFailure: _payloadOnFailure,
    nextStep: _nextStep,
  }
}

export function loadTupleSwapParameters(source: TupleReader) {
  const _isExactOutType = source.readBoolean()
  const _cashbackAddress = source.readAddressOpt()
  const _desiredAmount = source.readBigNumber()
  const _timeout = source.readBigNumber()
  const _payloadOnSuccess = source.readCellOpt()
  const _payloadOnFailure = source.readCellOpt()
  const _nextStep_p = source.readTupleOpt()
  const _nextStep = _nextStep_p ? loadTupleSwapStep(_nextStep_p) : null
  return {
    $$type: 'SwapParameters' as const,
    isExactOutType: _isExactOutType,
    cashbackAddress: _cashbackAddress,
    desiredAmount: _desiredAmount,
    timeout: _timeout,
    payloadOnSuccess: _payloadOnSuccess,
    payloadOnFailure: _payloadOnFailure,
    nextStep: _nextStep,
  }
}

export function loadGetterTupleSwapParameters(source: TupleReader) {
  const _isExactOutType = source.readBoolean()
  const _cashbackAddress = source.readAddressOpt()
  const _desiredAmount = source.readBigNumber()
  const _timeout = source.readBigNumber()
  const _payloadOnSuccess = source.readCellOpt()
  const _payloadOnFailure = source.readCellOpt()
  const _nextStep_p = source.readTupleOpt()
  const _nextStep = _nextStep_p ? loadTupleSwapStep(_nextStep_p) : null
  return {
    $$type: 'SwapParameters' as const,
    isExactOutType: _isExactOutType,
    cashbackAddress: _cashbackAddress,
    desiredAmount: _desiredAmount,
    timeout: _timeout,
    payloadOnSuccess: _payloadOnSuccess,
    payloadOnFailure: _payloadOnFailure,
    nextStep: _nextStep,
  }
}

export function storeTupleSwapParameters(source: SwapParameters) {
  const builder = new TupleBuilder()
  builder.writeBoolean(source.isExactOutType)
  builder.writeAddress(source.cashbackAddress)
  builder.writeNumber(source.desiredAmount)
  builder.writeNumber(source.timeout)
  builder.writeCell(source.payloadOnSuccess)
  builder.writeCell(source.payloadOnFailure)
  if (source.nextStep !== null && source.nextStep !== undefined) {
    builder.writeTuple(storeTupleSwapStep(source.nextStep))
  } else {
    builder.writeTuple(null)
  }
  return builder.build()
}

export function dictValueParserSwapParameters(): DictionaryValue<SwapParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSwapParameters(src)).endCell())
    },
    parse: (src) => {
      return loadSwapParameters(src.loadRef().beginParse())
    },
  }
}

export type LiquidityDepositInitData = {
  $$type: 'LiquidityDepositInitData'
  otherVault: Address
  otherAmount: bigint
  contractId: bigint
}

export function storeLiquidityDepositInitData(src: LiquidityDepositInitData) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.otherVault)
    b_0.storeCoins(src.otherAmount)
    b_0.storeUint(src.contractId, 64)
  }
}

export function loadLiquidityDepositInitData(slice: Slice) {
  const sc_0 = slice
  const _otherVault = sc_0.loadAddress()
  const _otherAmount = sc_0.loadCoins()
  const _contractId = sc_0.loadUintBig(64)
  return {
    $$type: 'LiquidityDepositInitData' as const,
    otherVault: _otherVault,
    otherAmount: _otherAmount,
    contractId: _contractId,
  }
}

export function loadTupleLiquidityDepositInitData(source: TupleReader) {
  const _otherVault = source.readAddress()
  const _otherAmount = source.readBigNumber()
  const _contractId = source.readBigNumber()
  return {
    $$type: 'LiquidityDepositInitData' as const,
    otherVault: _otherVault,
    otherAmount: _otherAmount,
    contractId: _contractId,
  }
}

export function loadGetterTupleLiquidityDepositInitData(source: TupleReader) {
  const _otherVault = source.readAddress()
  const _otherAmount = source.readBigNumber()
  const _contractId = source.readBigNumber()
  return {
    $$type: 'LiquidityDepositInitData' as const,
    otherVault: _otherVault,
    otherAmount: _otherAmount,
    contractId: _contractId,
  }
}

export function storeTupleLiquidityDepositInitData(source: LiquidityDepositInitData) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.otherVault)
  builder.writeNumber(source.otherAmount)
  builder.writeNumber(source.contractId)
  return builder.build()
}

export function dictValueParserLiquidityDepositInitData(): DictionaryValue<LiquidityDepositInitData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLiquidityDepositInitData(src)).endCell())
    },
    parse: (src) => {
      return loadLiquidityDepositInitData(src.loadRef().beginParse())
    },
  }
}

export type LiquidityDepositEitherAddress = {
  $$type: 'LiquidityDepositEitherAddress'
  eitherBit: boolean
  liquidityDepositContract: Address | null
  initData: LiquidityDepositInitData | null
}

export function storeLiquidityDepositEitherAddress(src: LiquidityDepositEitherAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeBit(src.eitherBit)
    b_0.storeAddress(src.liquidityDepositContract)
    if (src.initData !== null && src.initData !== undefined) {
      b_0.storeBit(true)
      b_0.store(storeLiquidityDepositInitData(src.initData))
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadLiquidityDepositEitherAddress(slice: Slice) {
  const sc_0 = slice
  const _eitherBit = sc_0.loadBit()
  const _liquidityDepositContract = sc_0.loadMaybeAddress()
  const _initData = sc_0.loadBit() ? loadLiquidityDepositInitData(sc_0) : null
  return {
    $$type: 'LiquidityDepositEitherAddress' as const,
    eitherBit: _eitherBit,
    liquidityDepositContract: _liquidityDepositContract,
    initData: _initData,
  }
}

export function loadTupleLiquidityDepositEitherAddress(source: TupleReader) {
  const _eitherBit = source.readBoolean()
  const _liquidityDepositContract = source.readAddressOpt()
  const _initData_p = source.readTupleOpt()
  const _initData = _initData_p ? loadTupleLiquidityDepositInitData(_initData_p) : null
  return {
    $$type: 'LiquidityDepositEitherAddress' as const,
    eitherBit: _eitherBit,
    liquidityDepositContract: _liquidityDepositContract,
    initData: _initData,
  }
}

export function loadGetterTupleLiquidityDepositEitherAddress(source: TupleReader) {
  const _eitherBit = source.readBoolean()
  const _liquidityDepositContract = source.readAddressOpt()
  const _initData_p = source.readTupleOpt()
  const _initData = _initData_p ? loadTupleLiquidityDepositInitData(_initData_p) : null
  return {
    $$type: 'LiquidityDepositEitherAddress' as const,
    eitherBit: _eitherBit,
    liquidityDepositContract: _liquidityDepositContract,
    initData: _initData,
  }
}

export function storeTupleLiquidityDepositEitherAddress(source: LiquidityDepositEitherAddress) {
  const builder = new TupleBuilder()
  builder.writeBoolean(source.eitherBit)
  builder.writeAddress(source.liquidityDepositContract)
  if (source.initData !== null && source.initData !== undefined) {
    builder.writeTuple(storeTupleLiquidityDepositInitData(source.initData))
  } else {
    builder.writeTuple(null)
  }
  return builder.build()
}

export function dictValueParserLiquidityDepositEitherAddress(): DictionaryValue<LiquidityDepositEitherAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLiquidityDepositEitherAddress(src)).endCell())
    },
    parse: (src) => {
      return loadLiquidityDepositEitherAddress(src.loadRef().beginParse())
    },
  }
}

export type LPDepositPart = {
  $$type: 'LPDepositPart'
  liquidityDepositContractData: LiquidityDepositEitherAddress
  additionalParams: AdditionalParams
}

export function storeLPDepositPart(src: LPDepositPart) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.store(storeLiquidityDepositEitherAddress(src.liquidityDepositContractData))
    b_0.store(storeAdditionalParams(src.additionalParams))
  }
}

export function loadLPDepositPart(slice: Slice) {
  const sc_0 = slice
  const _liquidityDepositContractData = loadLiquidityDepositEitherAddress(sc_0)
  const _additionalParams = loadAdditionalParams(sc_0)
  return {
    $$type: 'LPDepositPart' as const,
    liquidityDepositContractData: _liquidityDepositContractData,
    additionalParams: _additionalParams,
  }
}

export function loadTupleLPDepositPart(source: TupleReader) {
  const _liquidityDepositContractData = loadTupleLiquidityDepositEitherAddress(source)
  const _additionalParams = loadTupleAdditionalParams(source)
  return {
    $$type: 'LPDepositPart' as const,
    liquidityDepositContractData: _liquidityDepositContractData,
    additionalParams: _additionalParams,
  }
}

export function loadGetterTupleLPDepositPart(source: TupleReader) {
  const _liquidityDepositContractData = loadGetterTupleLiquidityDepositEitherAddress(source)
  const _additionalParams = loadGetterTupleAdditionalParams(source)
  return {
    $$type: 'LPDepositPart' as const,
    liquidityDepositContractData: _liquidityDepositContractData,
    additionalParams: _additionalParams,
  }
}

export function storeTupleLPDepositPart(source: LPDepositPart) {
  const builder = new TupleBuilder()
  builder.writeTuple(storeTupleLiquidityDepositEitherAddress(source.liquidityDepositContractData))
  builder.writeTuple(storeTupleAdditionalParams(source.additionalParams))
  return builder.build()
}

export function dictValueParserLPDepositPart(): DictionaryValue<LPDepositPart> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLPDepositPart(src)).endCell())
    },
    parse: (src) => {
      return loadLPDepositPart(src.loadRef().beginParse())
    },
  }
}

export type SwapRequestTon = {
  $$type: 'SwapRequestTon'
  amount: bigint
  action: SwapRequest
}

export function storeSwapRequestTon(src: SwapRequestTon) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1770830344, 32)
    b_0.storeCoins(src.amount)
    b_0.store(storeSwapRequest(src.action))
  }
}

export function loadSwapRequestTon(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1770830344) {
    throw Error('Invalid prefix')
  }
  const _amount = sc_0.loadCoins()
  const _action = loadSwapRequest(sc_0)
  return { $$type: 'SwapRequestTon' as const, amount: _amount, action: _action }
}

export function loadTupleSwapRequestTon(source: TupleReader) {
  const _amount = source.readBigNumber()
  const _action = loadTupleSwapRequest(source)
  return { $$type: 'SwapRequestTon' as const, amount: _amount, action: _action }
}

export function loadGetterTupleSwapRequestTon(source: TupleReader) {
  const _amount = source.readBigNumber()
  const _action = loadGetterTupleSwapRequest(source)
  return { $$type: 'SwapRequestTon' as const, amount: _amount, action: _action }
}

export function storeTupleSwapRequestTon(source: SwapRequestTon) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.amount)
  builder.writeTuple(storeTupleSwapRequest(source.action))
  return builder.build()
}

export function dictValueParserSwapRequestTon(): DictionaryValue<SwapRequestTon> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSwapRequestTon(src)).endCell())
    },
    parse: (src) => {
      return loadSwapRequestTon(src.loadRef().beginParse())
    },
  }
}

export type AddLiquidityPartTon = {
  $$type: 'AddLiquidityPartTon'
  amountIn: bigint
  liquidityDepositContractData: LiquidityDepositEitherAddress
  additionalParams: AdditionalParams
}

export function storeAddLiquidityPartTon(src: AddLiquidityPartTon) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(457393782, 32)
    b_0.storeCoins(src.amountIn)
    b_0.store(storeLiquidityDepositEitherAddress(src.liquidityDepositContractData))
    const b_1 = new Builder()
    b_1.store(storeAdditionalParams(src.additionalParams))
    b_0.storeRef(b_1.endCell())
  }
}

export function loadAddLiquidityPartTon(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 457393782) {
    throw Error('Invalid prefix')
  }
  const _amountIn = sc_0.loadCoins()
  const _liquidityDepositContractData = loadLiquidityDepositEitherAddress(sc_0)
  const sc_1 = sc_0.loadRef().beginParse()
  const _additionalParams = loadAdditionalParams(sc_1)
  return {
    $$type: 'AddLiquidityPartTon' as const,
    amountIn: _amountIn,
    liquidityDepositContractData: _liquidityDepositContractData,
    additionalParams: _additionalParams,
  }
}

export function loadTupleAddLiquidityPartTon(source: TupleReader) {
  const _amountIn = source.readBigNumber()
  const _liquidityDepositContractData = loadTupleLiquidityDepositEitherAddress(source)
  const _additionalParams = loadTupleAdditionalParams(source)
  return {
    $$type: 'AddLiquidityPartTon' as const,
    amountIn: _amountIn,
    liquidityDepositContractData: _liquidityDepositContractData,
    additionalParams: _additionalParams,
  }
}

export function loadGetterTupleAddLiquidityPartTon(source: TupleReader) {
  const _amountIn = source.readBigNumber()
  const _liquidityDepositContractData = loadGetterTupleLiquidityDepositEitherAddress(source)
  const _additionalParams = loadGetterTupleAdditionalParams(source)
  return {
    $$type: 'AddLiquidityPartTon' as const,
    amountIn: _amountIn,
    liquidityDepositContractData: _liquidityDepositContractData,
    additionalParams: _additionalParams,
  }
}

export function storeTupleAddLiquidityPartTon(source: AddLiquidityPartTon) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.amountIn)
  builder.writeTuple(storeTupleLiquidityDepositEitherAddress(source.liquidityDepositContractData))
  builder.writeTuple(storeTupleAdditionalParams(source.additionalParams))
  return builder.build()
}

export function dictValueParserAddLiquidityPartTon(): DictionaryValue<AddLiquidityPartTon> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAddLiquidityPartTon(src)).endCell())
    },
    parse: (src) => {
      return loadAddLiquidityPartTon(src.loadRef().beginParse())
    },
  }
}

export type ReturnJettonsViaJettonTransfer = {
  $$type: 'ReturnJettonsViaJettonTransfer'
  queryId: bigint
  amount: bigint
  destination: Address
  responseDestination: Address | null
  customPayload: Cell | null
  forwardTonAmount: bigint
  forwardPayload: Slice
}

export function storeReturnJettonsViaJettonTransfer(src: ReturnJettonsViaJettonTransfer) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(260734629, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.destination)
    b_0.storeAddress(src.responseDestination)
    if (src.customPayload !== null && src.customPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.customPayload)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeCoins(src.forwardTonAmount)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadReturnJettonsViaJettonTransfer(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 260734629) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _destination = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  const _forwardTonAmount = sc_0.loadCoins()
  const _forwardPayload = sc_0
  return {
    $$type: 'ReturnJettonsViaJettonTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleReturnJettonsViaJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _destination = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'ReturnJettonsViaJettonTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleReturnJettonsViaJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _destination = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'ReturnJettonsViaJettonTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleReturnJettonsViaJettonTransfer(source: ReturnJettonsViaJettonTransfer) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.destination)
  builder.writeAddress(source.responseDestination)
  builder.writeCell(source.customPayload)
  builder.writeNumber(source.forwardTonAmount)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserReturnJettonsViaJettonTransfer(): DictionaryValue<ReturnJettonsViaJettonTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeReturnJettonsViaJettonTransfer(src)).endCell())
    },
    parse: (src) => {
      return loadReturnJettonsViaJettonTransfer(src.loadRef().beginParse())
    },
  }
}

export type UnexpectedJettonNotification = {
  $$type: 'UnexpectedJettonNotification'
  queryId: bigint
  amount: bigint
  sender: Address
  forwardPayload: Slice
}

export function storeUnexpectedJettonNotification(src: UnexpectedJettonNotification) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1935855772, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadUnexpectedJettonNotification(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1935855772) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _forwardPayload = sc_0
  return {
    $$type: 'UnexpectedJettonNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleUnexpectedJettonNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'UnexpectedJettonNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleUnexpectedJettonNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'UnexpectedJettonNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleUnexpectedJettonNotification(source: UnexpectedJettonNotification) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserUnexpectedJettonNotification(): DictionaryValue<UnexpectedJettonNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUnexpectedJettonNotification(src)).endCell())
    },
    parse: (src) => {
      return loadUnexpectedJettonNotification(src.loadRef().beginParse())
    },
  }
}

export type TonVault$Data = {
  $$type: 'TonVault$Data'
  admin: Address
}

export function storeTonVault$Data(src: TonVault$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.admin)
  }
}

export function loadTonVault$Data(slice: Slice) {
  const sc_0 = slice
  const _admin = sc_0.loadAddress()
  return { $$type: 'TonVault$Data' as const, admin: _admin }
}

export function loadTupleTonVault$Data(source: TupleReader) {
  const _admin = source.readAddress()
  return { $$type: 'TonVault$Data' as const, admin: _admin }
}

export function loadGetterTupleTonVault$Data(source: TupleReader) {
  const _admin = source.readAddress()
  return { $$type: 'TonVault$Data' as const, admin: _admin }
}

export function storeTupleTonVault$Data(source: TonVault$Data) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.admin)
  return builder.build()
}

export function dictValueParserTonVault$Data(): DictionaryValue<TonVault$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTonVault$Data(src)).endCell())
    },
    parse: (src) => {
      return loadTonVault$Data(src.loadRef().beginParse())
    },
  }
}

export type TEP89DiscoveryResult = {
  $$type: 'TEP89DiscoveryResult'
  discoveryId: bigint
  expectedJettonWallet: Address
  actualJettonWallet: Address | null
  action: Cell
}

export function storeTEP89DiscoveryResult(src: TEP89DiscoveryResult) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2048026621, 32)
    b_0.storeUint(src.discoveryId, 64)
    b_0.storeAddress(src.expectedJettonWallet)
    b_0.storeAddress(src.actualJettonWallet)
    b_0.storeRef(src.action)
  }
}

export function loadTEP89DiscoveryResult(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2048026621) {
    throw Error('Invalid prefix')
  }
  const _discoveryId = sc_0.loadUintBig(64)
  const _expectedJettonWallet = sc_0.loadAddress()
  const _actualJettonWallet = sc_0.loadMaybeAddress()
  const _action = sc_0.loadRef()
  return {
    $$type: 'TEP89DiscoveryResult' as const,
    discoveryId: _discoveryId,
    expectedJettonWallet: _expectedJettonWallet,
    actualJettonWallet: _actualJettonWallet,
    action: _action,
  }
}

export function loadTupleTEP89DiscoveryResult(source: TupleReader) {
  const _discoveryId = source.readBigNumber()
  const _expectedJettonWallet = source.readAddress()
  const _actualJettonWallet = source.readAddressOpt()
  const _action = source.readCell()
  return {
    $$type: 'TEP89DiscoveryResult' as const,
    discoveryId: _discoveryId,
    expectedJettonWallet: _expectedJettonWallet,
    actualJettonWallet: _actualJettonWallet,
    action: _action,
  }
}

export function loadGetterTupleTEP89DiscoveryResult(source: TupleReader) {
  const _discoveryId = source.readBigNumber()
  const _expectedJettonWallet = source.readAddress()
  const _actualJettonWallet = source.readAddressOpt()
  const _action = source.readCell()
  return {
    $$type: 'TEP89DiscoveryResult' as const,
    discoveryId: _discoveryId,
    expectedJettonWallet: _expectedJettonWallet,
    actualJettonWallet: _actualJettonWallet,
    action: _action,
  }
}

export function storeTupleTEP89DiscoveryResult(source: TEP89DiscoveryResult) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.discoveryId)
  builder.writeAddress(source.expectedJettonWallet)
  builder.writeAddress(source.actualJettonWallet)
  builder.writeCell(source.action)
  return builder.build()
}

export function dictValueParserTEP89DiscoveryResult(): DictionaryValue<TEP89DiscoveryResult> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTEP89DiscoveryResult(src)).endCell())
    },
    parse: (src) => {
      return loadTEP89DiscoveryResult(src.loadRef().beginParse())
    },
  }
}

export type TEP89DiscoveryProxy$Data = {
  $$type: 'TEP89DiscoveryProxy$Data'
  jettonMaster: Address
  discoveryRequester: Address
  expectedJettonWallet: Address
  action: Cell
  discoveryId: bigint
}

export function storeTEP89DiscoveryProxy$Data(src: TEP89DiscoveryProxy$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.jettonMaster)
    b_0.storeAddress(src.discoveryRequester)
    b_0.storeAddress(src.expectedJettonWallet)
    b_0.storeRef(src.action)
    b_0.storeUint(src.discoveryId, 64)
  }
}

export function loadTEP89DiscoveryProxy$Data(slice: Slice) {
  const sc_0 = slice
  const _jettonMaster = sc_0.loadAddress()
  const _discoveryRequester = sc_0.loadAddress()
  const _expectedJettonWallet = sc_0.loadAddress()
  const _action = sc_0.loadRef()
  const _discoveryId = sc_0.loadUintBig(64)
  return {
    $$type: 'TEP89DiscoveryProxy$Data' as const,
    jettonMaster: _jettonMaster,
    discoveryRequester: _discoveryRequester,
    expectedJettonWallet: _expectedJettonWallet,
    action: _action,
    discoveryId: _discoveryId,
  }
}

export function loadTupleTEP89DiscoveryProxy$Data(source: TupleReader) {
  const _jettonMaster = source.readAddress()
  const _discoveryRequester = source.readAddress()
  const _expectedJettonWallet = source.readAddress()
  const _action = source.readCell()
  const _discoveryId = source.readBigNumber()
  return {
    $$type: 'TEP89DiscoveryProxy$Data' as const,
    jettonMaster: _jettonMaster,
    discoveryRequester: _discoveryRequester,
    expectedJettonWallet: _expectedJettonWallet,
    action: _action,
    discoveryId: _discoveryId,
  }
}

export function loadGetterTupleTEP89DiscoveryProxy$Data(source: TupleReader) {
  const _jettonMaster = source.readAddress()
  const _discoveryRequester = source.readAddress()
  const _expectedJettonWallet = source.readAddress()
  const _action = source.readCell()
  const _discoveryId = source.readBigNumber()
  return {
    $$type: 'TEP89DiscoveryProxy$Data' as const,
    jettonMaster: _jettonMaster,
    discoveryRequester: _discoveryRequester,
    expectedJettonWallet: _expectedJettonWallet,
    action: _action,
    discoveryId: _discoveryId,
  }
}

export function storeTupleTEP89DiscoveryProxy$Data(source: TEP89DiscoveryProxy$Data) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.jettonMaster)
  builder.writeAddress(source.discoveryRequester)
  builder.writeAddress(source.expectedJettonWallet)
  builder.writeCell(source.action)
  builder.writeNumber(source.discoveryId)
  return builder.build()
}

export function dictValueParserTEP89DiscoveryProxy$Data(): DictionaryValue<TEP89DiscoveryProxy$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTEP89DiscoveryProxy$Data(src)).endCell())
    },
    parse: (src) => {
      return loadTEP89DiscoveryProxy$Data(src.loadRef().beginParse())
    },
  }
}

export type LPJettonWallet$Data = {
  $$type: 'LPJettonWallet$Data'
  balance: bigint
  owner: Address
  minter: Address
}

export function storeLPJettonWallet$Data(src: LPJettonWallet$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeCoins(src.balance)
    b_0.storeAddress(src.owner)
    b_0.storeAddress(src.minter)
  }
}

export function loadLPJettonWallet$Data(slice: Slice) {
  const sc_0 = slice
  const _balance = sc_0.loadCoins()
  const _owner = sc_0.loadAddress()
  const _minter = sc_0.loadAddress()
  return {
    $$type: 'LPJettonWallet$Data' as const,
    balance: _balance,
    owner: _owner,
    minter: _minter,
  }
}

export function loadTupleLPJettonWallet$Data(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  return {
    $$type: 'LPJettonWallet$Data' as const,
    balance: _balance,
    owner: _owner,
    minter: _minter,
  }
}

export function loadGetterTupleLPJettonWallet$Data(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  return {
    $$type: 'LPJettonWallet$Data' as const,
    balance: _balance,
    owner: _owner,
    minter: _minter,
  }
}

export function storeTupleLPJettonWallet$Data(source: LPJettonWallet$Data) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.balance)
  builder.writeAddress(source.owner)
  builder.writeAddress(source.minter)
  return builder.build()
}

export function dictValueParserLPJettonWallet$Data(): DictionaryValue<LPJettonWallet$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLPJettonWallet$Data(src)).endCell())
    },
    parse: (src) => {
      return loadLPJettonWallet$Data(src.loadRef().beginParse())
    },
  }
}

export type JettonData = {
  $$type: 'JettonData'
  totalSupply: bigint
  mintable: boolean
  owner: Address
  content: Cell
  jettonWalletCode: Cell
}

export function storeJettonData(src: JettonData) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.totalSupply, 257)
    b_0.storeBit(src.mintable)
    b_0.storeAddress(src.owner)
    b_0.storeRef(src.content)
    b_0.storeRef(src.jettonWalletCode)
  }
}

export function loadJettonData(slice: Slice) {
  const sc_0 = slice
  const _totalSupply = sc_0.loadIntBig(257)
  const _mintable = sc_0.loadBit()
  const _owner = sc_0.loadAddress()
  const _content = sc_0.loadRef()
  const _jettonWalletCode = sc_0.loadRef()
  return {
    $$type: 'JettonData' as const,
    totalSupply: _totalSupply,
    mintable: _mintable,
    owner: _owner,
    content: _content,
    jettonWalletCode: _jettonWalletCode,
  }
}

export function loadTupleJettonData(source: TupleReader) {
  const _totalSupply = source.readBigNumber()
  const _mintable = source.readBoolean()
  const _owner = source.readAddress()
  const _content = source.readCell()
  const _jettonWalletCode = source.readCell()
  return {
    $$type: 'JettonData' as const,
    totalSupply: _totalSupply,
    mintable: _mintable,
    owner: _owner,
    content: _content,
    jettonWalletCode: _jettonWalletCode,
  }
}

export function loadGetterTupleJettonData(source: TupleReader) {
  const _totalSupply = source.readBigNumber()
  const _mintable = source.readBoolean()
  const _owner = source.readAddress()
  const _content = source.readCell()
  const _jettonWalletCode = source.readCell()
  return {
    $$type: 'JettonData' as const,
    totalSupply: _totalSupply,
    mintable: _mintable,
    owner: _owner,
    content: _content,
    jettonWalletCode: _jettonWalletCode,
  }
}

export function storeTupleJettonData(source: JettonData) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.totalSupply)
  builder.writeBoolean(source.mintable)
  builder.writeAddress(source.owner)
  builder.writeCell(source.content)
  builder.writeCell(source.jettonWalletCode)
  return builder.build()
}

export function dictValueParserJettonData(): DictionaryValue<JettonData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonData(src)).endCell())
    },
    parse: (src) => {
      return loadJettonData(src.loadRef().beginParse())
    },
  }
}

export type JettonMinterState = {
  $$type: 'JettonMinterState'
  totalSupply: bigint
  mintable: boolean
  adminAddress: Address
  jettonContent: Cell
  jettonWalletCode: Cell
}

export function storeJettonMinterState(src: JettonMinterState) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeCoins(src.totalSupply)
    b_0.storeBit(src.mintable)
    b_0.storeAddress(src.adminAddress)
    b_0.storeRef(src.jettonContent)
    b_0.storeRef(src.jettonWalletCode)
  }
}

export function loadJettonMinterState(slice: Slice) {
  const sc_0 = slice
  const _totalSupply = sc_0.loadCoins()
  const _mintable = sc_0.loadBit()
  const _adminAddress = sc_0.loadAddress()
  const _jettonContent = sc_0.loadRef()
  const _jettonWalletCode = sc_0.loadRef()
  return {
    $$type: 'JettonMinterState' as const,
    totalSupply: _totalSupply,
    mintable: _mintable,
    adminAddress: _adminAddress,
    jettonContent: _jettonContent,
    jettonWalletCode: _jettonWalletCode,
  }
}

export function loadTupleJettonMinterState(source: TupleReader) {
  const _totalSupply = source.readBigNumber()
  const _mintable = source.readBoolean()
  const _adminAddress = source.readAddress()
  const _jettonContent = source.readCell()
  const _jettonWalletCode = source.readCell()
  return {
    $$type: 'JettonMinterState' as const,
    totalSupply: _totalSupply,
    mintable: _mintable,
    adminAddress: _adminAddress,
    jettonContent: _jettonContent,
    jettonWalletCode: _jettonWalletCode,
  }
}

export function loadGetterTupleJettonMinterState(source: TupleReader) {
  const _totalSupply = source.readBigNumber()
  const _mintable = source.readBoolean()
  const _adminAddress = source.readAddress()
  const _jettonContent = source.readCell()
  const _jettonWalletCode = source.readCell()
  return {
    $$type: 'JettonMinterState' as const,
    totalSupply: _totalSupply,
    mintable: _mintable,
    adminAddress: _adminAddress,
    jettonContent: _jettonContent,
    jettonWalletCode: _jettonWalletCode,
  }
}

export function storeTupleJettonMinterState(source: JettonMinterState) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.totalSupply)
  builder.writeBoolean(source.mintable)
  builder.writeAddress(source.adminAddress)
  builder.writeCell(source.jettonContent)
  builder.writeCell(source.jettonWalletCode)
  return builder.build()
}

export function dictValueParserJettonMinterState(): DictionaryValue<JettonMinterState> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonMinterState(src)).endCell())
    },
    parse: (src) => {
      return loadJettonMinterState(src.loadRef().beginParse())
    },
  }
}

export type JettonWalletData = {
  $$type: 'JettonWalletData'
  balance: bigint
  owner: Address
  minter: Address
  code: Cell
}

export function storeJettonWalletData(src: JettonWalletData) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.balance, 257)
    b_0.storeAddress(src.owner)
    b_0.storeAddress(src.minter)
    b_0.storeRef(src.code)
  }
}

export function loadJettonWalletData(slice: Slice) {
  const sc_0 = slice
  const _balance = sc_0.loadIntBig(257)
  const _owner = sc_0.loadAddress()
  const _minter = sc_0.loadAddress()
  const _code = sc_0.loadRef()
  return {
    $$type: 'JettonWalletData' as const,
    balance: _balance,
    owner: _owner,
    minter: _minter,
    code: _code,
  }
}

export function loadTupleJettonWalletData(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _code = source.readCell()
  return {
    $$type: 'JettonWalletData' as const,
    balance: _balance,
    owner: _owner,
    minter: _minter,
    code: _code,
  }
}

export function loadGetterTupleJettonWalletData(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _code = source.readCell()
  return {
    $$type: 'JettonWalletData' as const,
    balance: _balance,
    owner: _owner,
    minter: _minter,
    code: _code,
  }
}

export function storeTupleJettonWalletData(source: JettonWalletData) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.balance)
  builder.writeAddress(source.owner)
  builder.writeAddress(source.minter)
  builder.writeCell(source.code)
  return builder.build()
}

export function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell())
    },
    parse: (src) => {
      return loadJettonWalletData(src.loadRef().beginParse())
    },
  }
}

export type JettonTransfer = {
  $$type: 'JettonTransfer'
  queryId: bigint
  amount: bigint
  destination: Address
  responseDestination: Address | null
  customPayload: Cell | null
  forwardTonAmount: bigint
  forwardPayload: Slice
}

export function storeJettonTransfer(src: JettonTransfer) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(260734629, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.destination)
    b_0.storeAddress(src.responseDestination)
    if (src.customPayload !== null && src.customPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.customPayload)
    } else {
      b_0.storeBit(false)
    }
    b_0.storeCoins(src.forwardTonAmount)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadJettonTransfer(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 260734629) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _destination = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  const _forwardTonAmount = sc_0.loadCoins()
  const _forwardPayload = sc_0
  return {
    $$type: 'JettonTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _destination = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'JettonTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleJettonTransfer(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _destination = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'JettonTransfer' as const,
    queryId: _queryId,
    amount: _amount,
    destination: _destination,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleJettonTransfer(source: JettonTransfer) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.destination)
  builder.writeAddress(source.responseDestination)
  builder.writeCell(source.customPayload)
  builder.writeNumber(source.forwardTonAmount)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell())
    },
    parse: (src) => {
      return loadJettonTransfer(src.loadRef().beginParse())
    },
  }
}

export type JettonTransferInternal = {
  $$type: 'JettonTransferInternal'
  queryId: bigint
  amount: bigint
  sender: Address
  sendAllTonsInNotifyFlag: boolean
  responseDestination: Address | null
  forwardTonAmount: bigint
  forwardPayload: Slice
}

export function storeJettonTransferInternal(src: JettonTransferInternal) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(395134233, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeBit(src.sendAllTonsInNotifyFlag)
    b_0.storeAddress(src.responseDestination)
    b_0.storeCoins(src.forwardTonAmount)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadJettonTransferInternal(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 395134233) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _sendAllTonsInNotifyFlag = sc_0.loadBit()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _forwardTonAmount = sc_0.loadCoins()
  const _forwardPayload = sc_0
  return {
    $$type: 'JettonTransferInternal' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    sendAllTonsInNotifyFlag: _sendAllTonsInNotifyFlag,
    responseDestination: _responseDestination,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleJettonTransferInternal(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _sendAllTonsInNotifyFlag = source.readBoolean()
  const _responseDestination = source.readAddressOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'JettonTransferInternal' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    sendAllTonsInNotifyFlag: _sendAllTonsInNotifyFlag,
    responseDestination: _responseDestination,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleJettonTransferInternal(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _sendAllTonsInNotifyFlag = source.readBoolean()
  const _responseDestination = source.readAddressOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'JettonTransferInternal' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    sendAllTonsInNotifyFlag: _sendAllTonsInNotifyFlag,
    responseDestination: _responseDestination,
    forwardTonAmount: _forwardTonAmount,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleJettonTransferInternal(source: JettonTransferInternal) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeBoolean(source.sendAllTonsInNotifyFlag)
  builder.writeAddress(source.responseDestination)
  builder.writeNumber(source.forwardTonAmount)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserJettonTransferInternal(): DictionaryValue<JettonTransferInternal> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonTransferInternal(src)).endCell())
    },
    parse: (src) => {
      return loadJettonTransferInternal(src.loadRef().beginParse())
    },
  }
}

export type JettonNotification = {
  $$type: 'JettonNotification'
  queryId: bigint
  amount: bigint
  sender: Address
  forwardPayload: Slice
}

export function storeJettonNotification(src: JettonNotification) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1935855772, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadJettonNotification(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1935855772) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _forwardPayload = sc_0
  return {
    $$type: 'JettonNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleJettonNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'JettonNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleJettonNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'JettonNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleJettonNotification(source: JettonNotification) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserJettonNotification(): DictionaryValue<JettonNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonNotification(src)).endCell())
    },
    parse: (src) => {
      return loadJettonNotification(src.loadRef().beginParse())
    },
  }
}

export type LPWithdrawViaJettonBurn = {
  $$type: 'LPWithdrawViaJettonBurn'
  queryId: bigint
  amount: bigint
  responseDestination: Address | null
  customPayload: Cell | null
}

export function storeLPWithdrawViaJettonBurn(src: LPWithdrawViaJettonBurn) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1499400124, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.responseDestination)
    if (src.customPayload !== null && src.customPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.customPayload)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadLPWithdrawViaJettonBurn(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1499400124) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'LPWithdrawViaJettonBurn' as const,
    queryId: _queryId,
    amount: _amount,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
  }
}

export function loadTupleLPWithdrawViaJettonBurn(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  return {
    $$type: 'LPWithdrawViaJettonBurn' as const,
    queryId: _queryId,
    amount: _amount,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
  }
}

export function loadGetterTupleLPWithdrawViaJettonBurn(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  return {
    $$type: 'LPWithdrawViaJettonBurn' as const,
    queryId: _queryId,
    amount: _amount,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
  }
}

export function storeTupleLPWithdrawViaJettonBurn(source: LPWithdrawViaJettonBurn) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.responseDestination)
  builder.writeCell(source.customPayload)
  return builder.build()
}

export function dictValueParserLPWithdrawViaJettonBurn(): DictionaryValue<LPWithdrawViaJettonBurn> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLPWithdrawViaJettonBurn(src)).endCell())
    },
    parse: (src) => {
      return loadLPWithdrawViaJettonBurn(src.loadRef().beginParse())
    },
  }
}

export type LPWithdrawNotification = {
  $$type: 'LPWithdrawNotification'
  queryId: bigint
  amount: bigint
  sender: Address
  responseDestination: Address | null
  forwardPayload: Cell | null
}

export function storeLPWithdrawNotification(src: LPWithdrawNotification) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2078119902, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeAddress(src.responseDestination)
    if (src.forwardPayload !== null && src.forwardPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.forwardPayload)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadLPWithdrawNotification(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2078119902) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'LPWithdrawNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleLPWithdrawNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _forwardPayload = source.readCellOpt()
  return {
    $$type: 'LPWithdrawNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleLPWithdrawNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _forwardPayload = source.readCellOpt()
  return {
    $$type: 'LPWithdrawNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleLPWithdrawNotification(source: LPWithdrawNotification) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeAddress(source.responseDestination)
  builder.writeCell(source.forwardPayload)
  return builder.build()
}

export function dictValueParserLPWithdrawNotification(): DictionaryValue<LPWithdrawNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLPWithdrawNotification(src)).endCell())
    },
    parse: (src) => {
      return loadLPWithdrawNotification(src.loadRef().beginParse())
    },
  }
}

export type JettonExcesses = {
  $$type: 'JettonExcesses'
  queryId: bigint
}

export function storeJettonExcesses(src: JettonExcesses) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3576854235, 32)
    b_0.storeUint(src.queryId, 64)
  }
}

export function loadJettonExcesses(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3576854235) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  return { $$type: 'JettonExcesses' as const, queryId: _queryId }
}

export function loadTupleJettonExcesses(source: TupleReader) {
  const _queryId = source.readBigNumber()
  return { $$type: 'JettonExcesses' as const, queryId: _queryId }
}

export function loadGetterTupleJettonExcesses(source: TupleReader) {
  const _queryId = source.readBigNumber()
  return { $$type: 'JettonExcesses' as const, queryId: _queryId }
}

export function storeTupleJettonExcesses(source: JettonExcesses) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  return builder.build()
}

export function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell())
    },
    parse: (src) => {
      return loadJettonExcesses(src.loadRef().beginParse())
    },
  }
}

export type ProvideWalletBalance = {
  $$type: 'ProvideWalletBalance'
  receiver: Address
  includeVerifyInfo: boolean
}

export function storeProvideWalletBalance(src: ProvideWalletBalance) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2059982169, 32)
    b_0.storeAddress(src.receiver)
    b_0.storeBit(src.includeVerifyInfo)
  }
}

export function loadProvideWalletBalance(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2059982169) {
    throw Error('Invalid prefix')
  }
  const _receiver = sc_0.loadAddress()
  const _includeVerifyInfo = sc_0.loadBit()
  return {
    $$type: 'ProvideWalletBalance' as const,
    receiver: _receiver,
    includeVerifyInfo: _includeVerifyInfo,
  }
}

export function loadTupleProvideWalletBalance(source: TupleReader) {
  const _receiver = source.readAddress()
  const _includeVerifyInfo = source.readBoolean()
  return {
    $$type: 'ProvideWalletBalance' as const,
    receiver: _receiver,
    includeVerifyInfo: _includeVerifyInfo,
  }
}

export function loadGetterTupleProvideWalletBalance(source: TupleReader) {
  const _receiver = source.readAddress()
  const _includeVerifyInfo = source.readBoolean()
  return {
    $$type: 'ProvideWalletBalance' as const,
    receiver: _receiver,
    includeVerifyInfo: _includeVerifyInfo,
  }
}

export function storeTupleProvideWalletBalance(source: ProvideWalletBalance) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.receiver)
  builder.writeBoolean(source.includeVerifyInfo)
  return builder.build()
}

export function dictValueParserProvideWalletBalance(): DictionaryValue<ProvideWalletBalance> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeProvideWalletBalance(src)).endCell())
    },
    parse: (src) => {
      return loadProvideWalletBalance(src.loadRef().beginParse())
    },
  }
}

export type VerifyInfo = {
  $$type: 'VerifyInfo'
  owner: Address
  minter: Address
  code: Cell
}

export function storeVerifyInfo(src: VerifyInfo) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.owner)
    b_0.storeAddress(src.minter)
    b_0.storeRef(src.code)
  }
}

export function loadVerifyInfo(slice: Slice) {
  const sc_0 = slice
  const _owner = sc_0.loadAddress()
  const _minter = sc_0.loadAddress()
  const _code = sc_0.loadRef()
  return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code }
}

export function loadTupleVerifyInfo(source: TupleReader) {
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _code = source.readCell()
  return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code }
}

export function loadGetterTupleVerifyInfo(source: TupleReader) {
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _code = source.readCell()
  return { $$type: 'VerifyInfo' as const, owner: _owner, minter: _minter, code: _code }
}

export function storeTupleVerifyInfo(source: VerifyInfo) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.owner)
  builder.writeAddress(source.minter)
  builder.writeCell(source.code)
  return builder.build()
}

export function dictValueParserVerifyInfo(): DictionaryValue<VerifyInfo> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVerifyInfo(src)).endCell())
    },
    parse: (src) => {
      return loadVerifyInfo(src.loadRef().beginParse())
    },
  }
}

export type TakeWalletBalance = {
  $$type: 'TakeWalletBalance'
  balance: bigint
  verifyInfo: VerifyInfo | null
}

export function storeTakeWalletBalance(src: TakeWalletBalance) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3396861378, 32)
    b_0.storeCoins(src.balance)
    if (src.verifyInfo !== null && src.verifyInfo !== undefined) {
      b_0.storeBit(true)
      b_0.store(storeVerifyInfo(src.verifyInfo))
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadTakeWalletBalance(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3396861378) {
    throw Error('Invalid prefix')
  }
  const _balance = sc_0.loadCoins()
  const _verifyInfo = sc_0.loadBit() ? loadVerifyInfo(sc_0) : null
  return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo }
}

export function loadTupleTakeWalletBalance(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _verifyInfo_p = source.readTupleOpt()
  const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null
  return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo }
}

export function loadGetterTupleTakeWalletBalance(source: TupleReader) {
  const _balance = source.readBigNumber()
  const _verifyInfo_p = source.readTupleOpt()
  const _verifyInfo = _verifyInfo_p ? loadTupleVerifyInfo(_verifyInfo_p) : null
  return { $$type: 'TakeWalletBalance' as const, balance: _balance, verifyInfo: _verifyInfo }
}

export function storeTupleTakeWalletBalance(source: TakeWalletBalance) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.balance)
  if (source.verifyInfo !== null && source.verifyInfo !== undefined) {
    builder.writeTuple(storeTupleVerifyInfo(source.verifyInfo))
  } else {
    builder.writeTuple(null)
  }
  return builder.build()
}

export function dictValueParserTakeWalletBalance(): DictionaryValue<TakeWalletBalance> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTakeWalletBalance(src)).endCell())
    },
    parse: (src) => {
      return loadTakeWalletBalance(src.loadRef().beginParse())
    },
  }
}

export type ClaimTON = {
  $$type: 'ClaimTON'
  receiver: Address
}

export function storeClaimTON(src: ClaimTON) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(60010958, 32)
    b_0.storeAddress(src.receiver)
  }
}

export function loadClaimTON(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 60010958) {
    throw Error('Invalid prefix')
  }
  const _receiver = sc_0.loadAddress()
  return { $$type: 'ClaimTON' as const, receiver: _receiver }
}

export function loadTupleClaimTON(source: TupleReader) {
  const _receiver = source.readAddress()
  return { $$type: 'ClaimTON' as const, receiver: _receiver }
}

export function loadGetterTupleClaimTON(source: TupleReader) {
  const _receiver = source.readAddress()
  return { $$type: 'ClaimTON' as const, receiver: _receiver }
}

export function storeTupleClaimTON(source: ClaimTON) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.receiver)
  return builder.build()
}

export function dictValueParserClaimTON(): DictionaryValue<ClaimTON> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeClaimTON(src)).endCell())
    },
    parse: (src) => {
      return loadClaimTON(src.loadRef().beginParse())
    },
  }
}

export type ProvideWalletAddress = {
  $$type: 'ProvideWalletAddress'
  queryId: bigint
  ownerAddress: Address
  includeAddress: boolean
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(745978227, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeAddress(src.ownerAddress)
    b_0.storeBit(src.includeAddress)
  }
}

export function loadProvideWalletAddress(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 745978227) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _ownerAddress = sc_0.loadAddress()
  const _includeAddress = sc_0.loadBit()
  return {
    $$type: 'ProvideWalletAddress' as const,
    queryId: _queryId,
    ownerAddress: _ownerAddress,
    includeAddress: _includeAddress,
  }
}

export function loadTupleProvideWalletAddress(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _ownerAddress = source.readAddress()
  const _includeAddress = source.readBoolean()
  return {
    $$type: 'ProvideWalletAddress' as const,
    queryId: _queryId,
    ownerAddress: _ownerAddress,
    includeAddress: _includeAddress,
  }
}

export function loadGetterTupleProvideWalletAddress(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _ownerAddress = source.readAddress()
  const _includeAddress = source.readBoolean()
  return {
    $$type: 'ProvideWalletAddress' as const,
    queryId: _queryId,
    ownerAddress: _ownerAddress,
    includeAddress: _includeAddress,
  }
}

export function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeAddress(source.ownerAddress)
  builder.writeBoolean(source.includeAddress)
  return builder.build()
}

export function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell())
    },
    parse: (src) => {
      return loadProvideWalletAddress(src.loadRef().beginParse())
    },
  }
}

export type TakeWalletAddress = {
  $$type: 'TakeWalletAddress'
  queryId: bigint
  walletAddress: Address
  ownerAddress: Cell | null
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3513996288, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeAddress(src.walletAddress)
    if (src.ownerAddress !== null && src.ownerAddress !== undefined) {
      b_0.storeBit(true).storeRef(src.ownerAddress)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadTakeWalletAddress(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3513996288) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _walletAddress = sc_0.loadAddress()
  const _ownerAddress = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'TakeWalletAddress' as const,
    queryId: _queryId,
    walletAddress: _walletAddress,
    ownerAddress: _ownerAddress,
  }
}

export function loadTupleTakeWalletAddress(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _walletAddress = source.readAddress()
  const _ownerAddress = source.readCellOpt()
  return {
    $$type: 'TakeWalletAddress' as const,
    queryId: _queryId,
    walletAddress: _walletAddress,
    ownerAddress: _ownerAddress,
  }
}

export function loadGetterTupleTakeWalletAddress(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _walletAddress = source.readAddress()
  const _ownerAddress = source.readCellOpt()
  return {
    $$type: 'TakeWalletAddress' as const,
    queryId: _queryId,
    walletAddress: _walletAddress,
    ownerAddress: _ownerAddress,
  }
}

export function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeAddress(source.walletAddress)
  builder.writeCell(source.ownerAddress)
  return builder.build()
}

export function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell())
    },
    parse: (src) => {
      return loadTakeWalletAddress(src.loadRef().beginParse())
    },
  }
}

export type ParsedExotic = {
  $$type: 'ParsedExotic'
  data: Slice
  isExotic: boolean
}

export function storeParsedExotic(src: ParsedExotic) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeRef(src.data.asCell())
    b_0.storeBit(src.isExotic)
  }
}

export function loadParsedExotic(slice: Slice) {
  const sc_0 = slice
  const _data = sc_0.loadRef().asSlice()
  const _isExotic = sc_0.loadBit()
  return { $$type: 'ParsedExotic' as const, data: _data, isExotic: _isExotic }
}

export function loadTupleParsedExotic(source: TupleReader) {
  const _data = source.readCell().asSlice()
  const _isExotic = source.readBoolean()
  return { $$type: 'ParsedExotic' as const, data: _data, isExotic: _isExotic }
}

export function loadGetterTupleParsedExotic(source: TupleReader) {
  const _data = source.readCell().asSlice()
  const _isExotic = source.readBoolean()
  return { $$type: 'ParsedExotic' as const, data: _data, isExotic: _isExotic }
}

export function storeTupleParsedExotic(source: ParsedExotic) {
  const builder = new TupleBuilder()
  builder.writeSlice(source.data.asCell())
  builder.writeBoolean(source.isExotic)
  return builder.build()
}

export function dictValueParserParsedExotic(): DictionaryValue<ParsedExotic> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeParsedExotic(src)).endCell())
    },
    parse: (src) => {
      return loadParsedExotic(src.loadRef().beginParse())
    },
  }
}

export type MerkleProof = {
  $$type: 'MerkleProof'
  tag: bigint
  hash: bigint
  depth: bigint
  content: Cell
}

export function storeMerkleProof(src: MerkleProof) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(src.tag, 8)
    b_0.storeUint(src.hash, 256)
    b_0.storeUint(src.depth, 16)
    b_0.storeRef(src.content)
  }
}

export function loadMerkleProof(slice: Slice) {
  const sc_0 = slice
  const _tag = sc_0.loadUintBig(8)
  const _hash = sc_0.loadUintBig(256)
  const _depth = sc_0.loadUintBig(16)
  const _content = sc_0.loadRef()
  return {
    $$type: 'MerkleProof' as const,
    tag: _tag,
    hash: _hash,
    depth: _depth,
    content: _content,
  }
}

export function loadTupleMerkleProof(source: TupleReader) {
  const _tag = source.readBigNumber()
  const _hash = source.readBigNumber()
  const _depth = source.readBigNumber()
  const _content = source.readCell()
  return {
    $$type: 'MerkleProof' as const,
    tag: _tag,
    hash: _hash,
    depth: _depth,
    content: _content,
  }
}

export function loadGetterTupleMerkleProof(source: TupleReader) {
  const _tag = source.readBigNumber()
  const _hash = source.readBigNumber()
  const _depth = source.readBigNumber()
  const _content = source.readCell()
  return {
    $$type: 'MerkleProof' as const,
    tag: _tag,
    hash: _hash,
    depth: _depth,
    content: _content,
  }
}

export function storeTupleMerkleProof(source: MerkleProof) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.tag)
  builder.writeNumber(source.hash)
  builder.writeNumber(source.depth)
  builder.writeCell(source.content)
  return builder.build()
}

export function dictValueParserMerkleProof(): DictionaryValue<MerkleProof> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMerkleProof(src)).endCell())
    },
    parse: (src) => {
      return loadMerkleProof(src.loadRef().beginParse())
    },
  }
}

export type MerkleUpdate = {
  $$type: 'MerkleUpdate'
  tag: bigint
  _prevHash: bigint
  newHash: bigint
  _oldDepth: bigint
  _newDepth: bigint
  _prevState: Cell
  newState: Cell
}

export function storeMerkleUpdate(src: MerkleUpdate) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(src.tag, 8)
    b_0.storeUint(src._prevHash, 256)
    b_0.storeUint(src.newHash, 256)
    b_0.storeUint(src._oldDepth, 16)
    b_0.storeUint(src._newDepth, 16)
    b_0.storeRef(src._prevState)
    b_0.storeRef(src.newState)
  }
}

export function loadMerkleUpdate(slice: Slice) {
  const sc_0 = slice
  const _tag = sc_0.loadUintBig(8)
  const __prevHash = sc_0.loadUintBig(256)
  const _newHash = sc_0.loadUintBig(256)
  const __oldDepth = sc_0.loadUintBig(16)
  const __newDepth = sc_0.loadUintBig(16)
  const __prevState = sc_0.loadRef()
  const _newState = sc_0.loadRef()
  return {
    $$type: 'MerkleUpdate' as const,
    tag: _tag,
    _prevHash: __prevHash,
    newHash: _newHash,
    _oldDepth: __oldDepth,
    _newDepth: __newDepth,
    _prevState: __prevState,
    newState: _newState,
  }
}

export function loadTupleMerkleUpdate(source: TupleReader) {
  const _tag = source.readBigNumber()
  const __prevHash = source.readBigNumber()
  const _newHash = source.readBigNumber()
  const __oldDepth = source.readBigNumber()
  const __newDepth = source.readBigNumber()
  const __prevState = source.readCell()
  const _newState = source.readCell()
  return {
    $$type: 'MerkleUpdate' as const,
    tag: _tag,
    _prevHash: __prevHash,
    newHash: _newHash,
    _oldDepth: __oldDepth,
    _newDepth: __newDepth,
    _prevState: __prevState,
    newState: _newState,
  }
}

export function loadGetterTupleMerkleUpdate(source: TupleReader) {
  const _tag = source.readBigNumber()
  const __prevHash = source.readBigNumber()
  const _newHash = source.readBigNumber()
  const __oldDepth = source.readBigNumber()
  const __newDepth = source.readBigNumber()
  const __prevState = source.readCell()
  const _newState = source.readCell()
  return {
    $$type: 'MerkleUpdate' as const,
    tag: _tag,
    _prevHash: __prevHash,
    newHash: _newHash,
    _oldDepth: __oldDepth,
    _newDepth: __newDepth,
    _prevState: __prevState,
    newState: _newState,
  }
}

export function storeTupleMerkleUpdate(source: MerkleUpdate) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.tag)
  builder.writeNumber(source._prevHash)
  builder.writeNumber(source.newHash)
  builder.writeNumber(source._oldDepth)
  builder.writeNumber(source._newDepth)
  builder.writeCell(source._prevState)
  builder.writeCell(source.newState)
  return builder.build()
}

export function dictValueParserMerkleUpdate(): DictionaryValue<MerkleUpdate> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMerkleUpdate(src)).endCell())
    },
    parse: (src) => {
      return loadMerkleUpdate(src.loadRef().beginParse())
    },
  }
}

export type BlockHeader = {
  $$type: 'BlockHeader'
  _info: Cell
  _valueFlow: Cell
  stateUpdate: Cell
  extra: Slice
}

export function storeBlockHeader(src: BlockHeader) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeRef(src._info)
    b_0.storeRef(src._valueFlow)
    b_0.storeRef(src.stateUpdate)
    b_0.storeBuilder(src.extra.asBuilder())
  }
}

export function loadBlockHeader(slice: Slice) {
  const sc_0 = slice
  const __info = sc_0.loadRef()
  const __valueFlow = sc_0.loadRef()
  const _stateUpdate = sc_0.loadRef()
  const _extra = sc_0
  return {
    $$type: 'BlockHeader' as const,
    _info: __info,
    _valueFlow: __valueFlow,
    stateUpdate: _stateUpdate,
    extra: _extra,
  }
}

export function loadTupleBlockHeader(source: TupleReader) {
  const __info = source.readCell()
  const __valueFlow = source.readCell()
  const _stateUpdate = source.readCell()
  const _extra = source.readCell().asSlice()
  return {
    $$type: 'BlockHeader' as const,
    _info: __info,
    _valueFlow: __valueFlow,
    stateUpdate: _stateUpdate,
    extra: _extra,
  }
}

export function loadGetterTupleBlockHeader(source: TupleReader) {
  const __info = source.readCell()
  const __valueFlow = source.readCell()
  const _stateUpdate = source.readCell()
  const _extra = source.readCell().asSlice()
  return {
    $$type: 'BlockHeader' as const,
    _info: __info,
    _valueFlow: __valueFlow,
    stateUpdate: _stateUpdate,
    extra: _extra,
  }
}

export function storeTupleBlockHeader(source: BlockHeader) {
  const builder = new TupleBuilder()
  builder.writeCell(source._info)
  builder.writeCell(source._valueFlow)
  builder.writeCell(source.stateUpdate)
  builder.writeSlice(source.extra.asCell())
  return builder.build()
}

export function dictValueParserBlockHeader(): DictionaryValue<BlockHeader> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBlockHeader(src)).endCell())
    },
    parse: (src) => {
      return loadBlockHeader(src.loadRef().beginParse())
    },
  }
}

export type McBlockExtra = {
  $$type: 'McBlockExtra'
  _unusedBits: bigint
  shardHashes: Dictionary<number, Cell>
  _unusedRemaining: Slice
}

export function storeMcBlockExtra(src: McBlockExtra) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(src._unusedBits, 17)
    b_0.storeDict(src.shardHashes, Dictionary.Keys.Int(32), Dictionary.Values.Cell())
    b_0.storeBuilder(src._unusedRemaining.asBuilder())
  }
}

export function loadMcBlockExtra(slice: Slice) {
  const sc_0 = slice
  const __unusedBits = sc_0.loadUintBig(17)
  const _shardHashes = Dictionary.load(Dictionary.Keys.Int(32), Dictionary.Values.Cell(), sc_0)
  const __unusedRemaining = sc_0
  return {
    $$type: 'McBlockExtra' as const,
    _unusedBits: __unusedBits,
    shardHashes: _shardHashes,
    _unusedRemaining: __unusedRemaining,
  }
}

export function loadTupleMcBlockExtra(source: TupleReader) {
  const __unusedBits = source.readBigNumber()
  const _shardHashes = Dictionary.loadDirect(
    Dictionary.Keys.Int(32),
    Dictionary.Values.Cell(),
    source.readCellOpt(),
  )
  const __unusedRemaining = source.readCell().asSlice()
  return {
    $$type: 'McBlockExtra' as const,
    _unusedBits: __unusedBits,
    shardHashes: _shardHashes,
    _unusedRemaining: __unusedRemaining,
  }
}

export function loadGetterTupleMcBlockExtra(source: TupleReader) {
  const __unusedBits = source.readBigNumber()
  const _shardHashes = Dictionary.loadDirect(
    Dictionary.Keys.Int(32),
    Dictionary.Values.Cell(),
    source.readCellOpt(),
  )
  const __unusedRemaining = source.readCell().asSlice()
  return {
    $$type: 'McBlockExtra' as const,
    _unusedBits: __unusedBits,
    shardHashes: _shardHashes,
    _unusedRemaining: __unusedRemaining,
  }
}

export function storeTupleMcBlockExtra(source: McBlockExtra) {
  const builder = new TupleBuilder()
  builder.writeNumber(source._unusedBits)
  builder.writeCell(
    source.shardHashes.size > 0
      ? beginCell()
          .storeDictDirect(source.shardHashes, Dictionary.Keys.Int(32), Dictionary.Values.Cell())
          .endCell()
      : null,
  )
  builder.writeSlice(source._unusedRemaining.asCell())
  return builder.build()
}

export function dictValueParserMcBlockExtra(): DictionaryValue<McBlockExtra> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMcBlockExtra(src)).endCell())
    },
    parse: (src) => {
      return loadMcBlockExtra(src.loadRef().beginParse())
    },
  }
}

export type ShardDescr = {
  $$type: 'ShardDescr'
  _unusedBits: bigint
  rootHash: bigint
  _remaining: Slice
}

export function storeShardDescr(src: ShardDescr) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(src._unusedBits, 196)
    b_0.storeUint(src.rootHash, 256)
    b_0.storeBuilder(src._remaining.asBuilder())
  }
}

export function loadShardDescr(slice: Slice) {
  const sc_0 = slice
  const __unusedBits = sc_0.loadUintBig(196)
  const _rootHash = sc_0.loadUintBig(256)
  const __remaining = sc_0
  return {
    $$type: 'ShardDescr' as const,
    _unusedBits: __unusedBits,
    rootHash: _rootHash,
    _remaining: __remaining,
  }
}

export function loadTupleShardDescr(source: TupleReader) {
  const __unusedBits = source.readBigNumber()
  const _rootHash = source.readBigNumber()
  const __remaining = source.readCell().asSlice()
  return {
    $$type: 'ShardDescr' as const,
    _unusedBits: __unusedBits,
    rootHash: _rootHash,
    _remaining: __remaining,
  }
}

export function loadGetterTupleShardDescr(source: TupleReader) {
  const __unusedBits = source.readBigNumber()
  const _rootHash = source.readBigNumber()
  const __remaining = source.readCell().asSlice()
  return {
    $$type: 'ShardDescr' as const,
    _unusedBits: __unusedBits,
    rootHash: _rootHash,
    _remaining: __remaining,
  }
}

export function storeTupleShardDescr(source: ShardDescr) {
  const builder = new TupleBuilder()
  builder.writeNumber(source._unusedBits)
  builder.writeNumber(source.rootHash)
  builder.writeSlice(source._remaining.asCell())
  return builder.build()
}

export function dictValueParserShardDescr(): DictionaryValue<ShardDescr> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeShardDescr(src)).endCell())
    },
    parse: (src) => {
      return loadShardDescr(src.loadRef().beginParse())
    },
  }
}

export type TreeNode = {
  $$type: 'TreeNode'
  leftChild: Cell
  rightChild: Cell
}

export function storeTreeNode(src: TreeNode) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeRef(src.leftChild)
    b_0.storeRef(src.rightChild)
  }
}

export function loadTreeNode(slice: Slice) {
  const sc_0 = slice
  const _leftChild = sc_0.loadRef()
  const _rightChild = sc_0.loadRef()
  return { $$type: 'TreeNode' as const, leftChild: _leftChild, rightChild: _rightChild }
}

export function loadTupleTreeNode(source: TupleReader) {
  const _leftChild = source.readCell()
  const _rightChild = source.readCell()
  return { $$type: 'TreeNode' as const, leftChild: _leftChild, rightChild: _rightChild }
}

export function loadGetterTupleTreeNode(source: TupleReader) {
  const _leftChild = source.readCell()
  const _rightChild = source.readCell()
  return { $$type: 'TreeNode' as const, leftChild: _leftChild, rightChild: _rightChild }
}

export function storeTupleTreeNode(source: TreeNode) {
  const builder = new TupleBuilder()
  builder.writeCell(source.leftChild)
  builder.writeCell(source.rightChild)
  return builder.build()
}

export function dictValueParserTreeNode(): DictionaryValue<TreeNode> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTreeNode(src)).endCell())
    },
    parse: (src) => {
      return loadTreeNode(src.loadRef().beginParse())
    },
  }
}

export type TwoCells = {
  $$type: 'TwoCells'
  first: Cell
  second: Cell
}

export function storeTwoCells(src: TwoCells) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeRef(src.first)
    b_0.storeRef(src.second)
  }
}

export function loadTwoCells(slice: Slice) {
  const sc_0 = slice
  const _first = sc_0.loadRef()
  const _second = sc_0.loadRef()
  return { $$type: 'TwoCells' as const, first: _first, second: _second }
}

export function loadTupleTwoCells(source: TupleReader) {
  const _first = source.readCell()
  const _second = source.readCell()
  return { $$type: 'TwoCells' as const, first: _first, second: _second }
}

export function loadGetterTupleTwoCells(source: TupleReader) {
  const _first = source.readCell()
  const _second = source.readCell()
  return { $$type: 'TwoCells' as const, first: _first, second: _second }
}

export function storeTupleTwoCells(source: TwoCells) {
  const builder = new TupleBuilder()
  builder.writeCell(source.first)
  builder.writeCell(source.second)
  return builder.build()
}

export function dictValueParserTwoCells(): DictionaryValue<TwoCells> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTwoCells(src)).endCell())
    },
    parse: (src) => {
      return loadTwoCells(src.loadRef().beginParse())
    },
  }
}

export type BlockId = {
  $$type: 'BlockId'
  workchain: bigint
  shard: bigint
  seqno: bigint
  rootHash: bigint
  fileHash: bigint
}

export function storeBlockId(src: BlockId) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeInt(src.workchain, 257)
    b_0.storeInt(src.shard, 257)
    b_0.storeInt(src.seqno, 257)
    const b_1 = new Builder()
    b_1.storeInt(src.rootHash, 257)
    b_1.storeInt(src.fileHash, 257)
    b_0.storeRef(b_1.endCell())
  }
}

export function loadBlockId(slice: Slice) {
  const sc_0 = slice
  const _workchain = sc_0.loadIntBig(257)
  const _shard = sc_0.loadIntBig(257)
  const _seqno = sc_0.loadIntBig(257)
  const sc_1 = sc_0.loadRef().beginParse()
  const _rootHash = sc_1.loadIntBig(257)
  const _fileHash = sc_1.loadIntBig(257)
  return {
    $$type: 'BlockId' as const,
    workchain: _workchain,
    shard: _shard,
    seqno: _seqno,
    rootHash: _rootHash,
    fileHash: _fileHash,
  }
}

export function loadTupleBlockId(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _shard = source.readBigNumber()
  const _seqno = source.readBigNumber()
  const _rootHash = source.readBigNumber()
  const _fileHash = source.readBigNumber()
  return {
    $$type: 'BlockId' as const,
    workchain: _workchain,
    shard: _shard,
    seqno: _seqno,
    rootHash: _rootHash,
    fileHash: _fileHash,
  }
}

export function loadGetterTupleBlockId(source: TupleReader) {
  const _workchain = source.readBigNumber()
  const _shard = source.readBigNumber()
  const _seqno = source.readBigNumber()
  const _rootHash = source.readBigNumber()
  const _fileHash = source.readBigNumber()
  return {
    $$type: 'BlockId' as const,
    workchain: _workchain,
    shard: _shard,
    seqno: _seqno,
    rootHash: _rootHash,
    fileHash: _fileHash,
  }
}

export function storeTupleBlockId(source: BlockId) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.workchain)
  builder.writeNumber(source.shard)
  builder.writeNumber(source.seqno)
  builder.writeNumber(source.rootHash)
  builder.writeNumber(source.fileHash)
  return builder.build()
}

export function dictValueParserBlockId(): DictionaryValue<BlockId> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeBlockId(src)).endCell())
    },
    parse: (src) => {
      return loadBlockId(src.loadRef().beginParse())
    },
  }
}

export type StateProof = {
  $$type: 'StateProof'
  mcBlockSeqno: bigint
  shardBitLen: bigint
  mcBlockHeaderProof: Cell
  shardBlockHeaderProof: Cell
  shardChainStateProof: Cell
}

export function storeStateProof(src: StateProof) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(src.mcBlockSeqno, 32)
    b_0.storeUint(src.shardBitLen, 8)
    b_0.storeRef(src.mcBlockHeaderProof)
    b_0.storeRef(src.shardBlockHeaderProof)
    b_0.storeRef(src.shardChainStateProof)
  }
}

export function loadStateProof(slice: Slice) {
  const sc_0 = slice
  const _mcBlockSeqno = sc_0.loadUintBig(32)
  const _shardBitLen = sc_0.loadUintBig(8)
  const _mcBlockHeaderProof = sc_0.loadRef()
  const _shardBlockHeaderProof = sc_0.loadRef()
  const _shardChainStateProof = sc_0.loadRef()
  return {
    $$type: 'StateProof' as const,
    mcBlockSeqno: _mcBlockSeqno,
    shardBitLen: _shardBitLen,
    mcBlockHeaderProof: _mcBlockHeaderProof,
    shardBlockHeaderProof: _shardBlockHeaderProof,
    shardChainStateProof: _shardChainStateProof,
  }
}

export function loadTupleStateProof(source: TupleReader) {
  const _mcBlockSeqno = source.readBigNumber()
  const _shardBitLen = source.readBigNumber()
  const _mcBlockHeaderProof = source.readCell()
  const _shardBlockHeaderProof = source.readCell()
  const _shardChainStateProof = source.readCell()
  return {
    $$type: 'StateProof' as const,
    mcBlockSeqno: _mcBlockSeqno,
    shardBitLen: _shardBitLen,
    mcBlockHeaderProof: _mcBlockHeaderProof,
    shardBlockHeaderProof: _shardBlockHeaderProof,
    shardChainStateProof: _shardChainStateProof,
  }
}

export function loadGetterTupleStateProof(source: TupleReader) {
  const _mcBlockSeqno = source.readBigNumber()
  const _shardBitLen = source.readBigNumber()
  const _mcBlockHeaderProof = source.readCell()
  const _shardBlockHeaderProof = source.readCell()
  const _shardChainStateProof = source.readCell()
  return {
    $$type: 'StateProof' as const,
    mcBlockSeqno: _mcBlockSeqno,
    shardBitLen: _shardBitLen,
    mcBlockHeaderProof: _mcBlockHeaderProof,
    shardBlockHeaderProof: _shardBlockHeaderProof,
    shardChainStateProof: _shardChainStateProof,
  }
}

export function storeTupleStateProof(source: StateProof) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.mcBlockSeqno)
  builder.writeNumber(source.shardBitLen)
  builder.writeCell(source.mcBlockHeaderProof)
  builder.writeCell(source.shardBlockHeaderProof)
  builder.writeCell(source.shardChainStateProof)
  return builder.build()
}

export function dictValueParserStateProof(): DictionaryValue<StateProof> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateProof(src)).endCell())
    },
    parse: (src) => {
      return loadStateProof(src.loadRef().beginParse())
    },
  }
}

export type AugHashmapLookupResult = {
  $$type: 'AugHashmapLookupResult'
  valueWithExtra: Slice | null
  found: boolean
}

export function storeAugHashmapLookupResult(src: AugHashmapLookupResult) {
  return (builder: Builder) => {
    const b_0 = builder
    if (src.valueWithExtra !== null && src.valueWithExtra !== undefined) {
      b_0.storeBit(true).storeRef(src.valueWithExtra.asCell())
    } else {
      b_0.storeBit(false)
    }
    b_0.storeBit(src.found)
  }
}

export function loadAugHashmapLookupResult(slice: Slice) {
  const sc_0 = slice
  const _valueWithExtra = sc_0.loadBit() ? (sc_0.loadRef()?.asSlice() ?? null) : null
  const _found = sc_0.loadBit()
  return {
    $$type: 'AugHashmapLookupResult' as const,
    valueWithExtra: _valueWithExtra,
    found: _found,
  }
}

export function loadTupleAugHashmapLookupResult(source: TupleReader) {
  const _valueWithExtra = source.readCellOpt()?.asSlice() ?? null
  const _found = source.readBoolean()
  return {
    $$type: 'AugHashmapLookupResult' as const,
    valueWithExtra: _valueWithExtra,
    found: _found,
  }
}

export function loadGetterTupleAugHashmapLookupResult(source: TupleReader) {
  const _valueWithExtra = source.readCellOpt()?.asSlice() ?? null
  const _found = source.readBoolean()
  return {
    $$type: 'AugHashmapLookupResult' as const,
    valueWithExtra: _valueWithExtra,
    found: _found,
  }
}

export function storeTupleAugHashmapLookupResult(source: AugHashmapLookupResult) {
  const builder = new TupleBuilder()
  builder.writeSlice(source.valueWithExtra?.asCell())
  builder.writeBoolean(source.found)
  return builder.build()
}

export function dictValueParserAugHashmapLookupResult(): DictionaryValue<AugHashmapLookupResult> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAugHashmapLookupResult(src)).endCell())
    },
    parse: (src) => {
      return loadAugHashmapLookupResult(src.loadRef().beginParse())
    },
  }
}

export type ParseHashmapLabelResult = {
  $$type: 'ParseHashmapLabelResult'
  self: Slice
  label: bigint
  labelLength: bigint
}

export function storeParseHashmapLabelResult(src: ParseHashmapLabelResult) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeRef(src.self.asCell())
    b_0.storeInt(src.label, 257)
    b_0.storeInt(src.labelLength, 257)
  }
}

export function loadParseHashmapLabelResult(slice: Slice) {
  const sc_0 = slice
  const _self = sc_0.loadRef().asSlice()
  const _label = sc_0.loadIntBig(257)
  const _labelLength = sc_0.loadIntBig(257)
  return {
    $$type: 'ParseHashmapLabelResult' as const,
    self: _self,
    label: _label,
    labelLength: _labelLength,
  }
}

export function loadTupleParseHashmapLabelResult(source: TupleReader) {
  const _self = source.readCell().asSlice()
  const _label = source.readBigNumber()
  const _labelLength = source.readBigNumber()
  return {
    $$type: 'ParseHashmapLabelResult' as const,
    self: _self,
    label: _label,
    labelLength: _labelLength,
  }
}

export function loadGetterTupleParseHashmapLabelResult(source: TupleReader) {
  const _self = source.readCell().asSlice()
  const _label = source.readBigNumber()
  const _labelLength = source.readBigNumber()
  return {
    $$type: 'ParseHashmapLabelResult' as const,
    self: _self,
    label: _label,
    labelLength: _labelLength,
  }
}

export function storeTupleParseHashmapLabelResult(source: ParseHashmapLabelResult) {
  const builder = new TupleBuilder()
  builder.writeSlice(source.self.asCell())
  builder.writeNumber(source.label)
  builder.writeNumber(source.labelLength)
  return builder.build()
}

export function dictValueParserParseHashmapLabelResult(): DictionaryValue<ParseHashmapLabelResult> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeParseHashmapLabelResult(src)).endCell())
    },
    parse: (src) => {
      return loadParseHashmapLabelResult(src.loadRef().beginParse())
    },
  }
}

export type AmmPoolParams = {
  $$type: 'AmmPoolParams'
  firstVault: Address
  secondVault: Address
}

export function storeAmmPoolParams(src: AmmPoolParams) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.firstVault)
    b_0.storeAddress(src.secondVault)
  }
}

export function loadAmmPoolParams(slice: Slice) {
  const sc_0 = slice
  const _firstVault = sc_0.loadAddress()
  const _secondVault = sc_0.loadAddress()
  return { $$type: 'AmmPoolParams' as const, firstVault: _firstVault, secondVault: _secondVault }
}

export function loadTupleAmmPoolParams(source: TupleReader) {
  const _firstVault = source.readAddress()
  const _secondVault = source.readAddress()
  return { $$type: 'AmmPoolParams' as const, firstVault: _firstVault, secondVault: _secondVault }
}

export function loadGetterTupleAmmPoolParams(source: TupleReader) {
  const _firstVault = source.readAddress()
  const _secondVault = source.readAddress()
  return { $$type: 'AmmPoolParams' as const, firstVault: _firstVault, secondVault: _secondVault }
}

export function storeTupleAmmPoolParams(source: AmmPoolParams) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.firstVault)
  builder.writeAddress(source.secondVault)
  return builder.build()
}

export function dictValueParserAmmPoolParams(): DictionaryValue<AmmPoolParams> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAmmPoolParams(src)).endCell())
    },
    parse: (src) => {
      return loadAmmPoolParams(src.loadRef().beginParse())
    },
  }
}

export type LPDepositParams = {
  $$type: 'LPDepositParams'
  firstVault: Address
  secondVault: Address
  firstAmount: bigint
  secondAmount: bigint
  depositor: Address
  contractId: bigint
}

export function storeLPDepositParams(src: LPDepositParams) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.firstVault)
    b_0.storeAddress(src.secondVault)
    b_0.storeCoins(src.firstAmount)
    b_0.storeCoins(src.secondAmount)
    const b_1 = new Builder()
    b_1.storeAddress(src.depositor)
    b_1.storeUint(src.contractId, 64)
    b_0.storeRef(b_1.endCell())
  }
}

export function loadLPDepositParams(slice: Slice) {
  const sc_0 = slice
  const _firstVault = sc_0.loadAddress()
  const _secondVault = sc_0.loadAddress()
  const _firstAmount = sc_0.loadCoins()
  const _secondAmount = sc_0.loadCoins()
  const sc_1 = sc_0.loadRef().beginParse()
  const _depositor = sc_1.loadAddress()
  const _contractId = sc_1.loadUintBig(64)
  return {
    $$type: 'LPDepositParams' as const,
    firstVault: _firstVault,
    secondVault: _secondVault,
    firstAmount: _firstAmount,
    secondAmount: _secondAmount,
    depositor: _depositor,
    contractId: _contractId,
  }
}

export function loadTupleLPDepositParams(source: TupleReader) {
  const _firstVault = source.readAddress()
  const _secondVault = source.readAddress()
  const _firstAmount = source.readBigNumber()
  const _secondAmount = source.readBigNumber()
  const _depositor = source.readAddress()
  const _contractId = source.readBigNumber()
  return {
    $$type: 'LPDepositParams' as const,
    firstVault: _firstVault,
    secondVault: _secondVault,
    firstAmount: _firstAmount,
    secondAmount: _secondAmount,
    depositor: _depositor,
    contractId: _contractId,
  }
}

export function loadGetterTupleLPDepositParams(source: TupleReader) {
  const _firstVault = source.readAddress()
  const _secondVault = source.readAddress()
  const _firstAmount = source.readBigNumber()
  const _secondAmount = source.readBigNumber()
  const _depositor = source.readAddress()
  const _contractId = source.readBigNumber()
  return {
    $$type: 'LPDepositParams' as const,
    firstVault: _firstVault,
    secondVault: _secondVault,
    firstAmount: _firstAmount,
    secondAmount: _secondAmount,
    depositor: _depositor,
    contractId: _contractId,
  }
}

export function storeTupleLPDepositParams(source: LPDepositParams) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.firstVault)
  builder.writeAddress(source.secondVault)
  builder.writeNumber(source.firstAmount)
  builder.writeNumber(source.secondAmount)
  builder.writeAddress(source.depositor)
  builder.writeNumber(source.contractId)
  return builder.build()
}

export function dictValueParserLPDepositParams(): DictionaryValue<LPDepositParams> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeLPDepositParams(src)).endCell())
    },
    parse: (src) => {
      return loadLPDepositParams(src.loadRef().beginParse())
    },
  }
}

export type JettonVaultParams = {
  $$type: 'JettonVaultParams'
  jettonMaster: Address
}

export function storeJettonVaultParams(src: JettonVaultParams) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.jettonMaster)
  }
}

export function loadJettonVaultParams(slice: Slice) {
  const sc_0 = slice
  const _jettonMaster = sc_0.loadAddress()
  return { $$type: 'JettonVaultParams' as const, jettonMaster: _jettonMaster }
}

export function loadTupleJettonVaultParams(source: TupleReader) {
  const _jettonMaster = source.readAddress()
  return { $$type: 'JettonVaultParams' as const, jettonMaster: _jettonMaster }
}

export function loadGetterTupleJettonVaultParams(source: TupleReader) {
  const _jettonMaster = source.readAddress()
  return { $$type: 'JettonVaultParams' as const, jettonMaster: _jettonMaster }
}

export function storeTupleJettonVaultParams(source: JettonVaultParams) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.jettonMaster)
  return builder.build()
}

export function dictValueParserJettonVaultParams(): DictionaryValue<JettonVaultParams> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonVaultParams(src)).endCell())
    },
    parse: (src) => {
      return loadJettonVaultParams(src.loadRef().beginParse())
    },
  }
}

export type Request = {
  $$type: 'Request'
  requestId: bigint
  request: Cell
}

export function storeRequest(src: Request) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(src.requestId, 32)
    b_0.storeRef(src.request)
  }
}

export function loadRequest(slice: Slice) {
  const sc_0 = slice
  const _requestId = sc_0.loadUintBig(32)
  const _request = sc_0.loadRef()
  return { $$type: 'Request' as const, requestId: _requestId, request: _request }
}

export function loadTupleRequest(source: TupleReader) {
  const _requestId = source.readBigNumber()
  const _request = source.readCell()
  return { $$type: 'Request' as const, requestId: _requestId, request: _request }
}

export function loadGetterTupleRequest(source: TupleReader) {
  const _requestId = source.readBigNumber()
  const _request = source.readCell()
  return { $$type: 'Request' as const, requestId: _requestId, request: _request }
}

export function storeTupleRequest(source: Request) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.requestId)
  builder.writeCell(source.request)
  return builder.build()
}

export function dictValueParserRequest(): DictionaryValue<Request> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRequest(src)).endCell())
    },
    parse: (src) => {
      return loadRequest(src.loadRef().beginParse())
    },
  }
}

export type AddressesRequest = {
  $$type: 'AddressesRequest'
  responseAddress: Address | null
  first: Request
  second: Request | null
  third: Request | null
  forwardPayload: Cell | null
}

export function storeAddressesRequest(src: AddressesRequest) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2958248825, 32)
    b_0.storeAddress(src.responseAddress)
    b_0.store(storeRequest(src.first))
    if (src.second !== null && src.second !== undefined) {
      b_0.storeBit(true)
      b_0.store(storeRequest(src.second))
    } else {
      b_0.storeBit(false)
    }
    const b_1 = new Builder()
    if (src.third !== null && src.third !== undefined) {
      b_1.storeBit(true)
      b_1.store(storeRequest(src.third))
    } else {
      b_1.storeBit(false)
    }
    if (src.forwardPayload !== null && src.forwardPayload !== undefined) {
      b_1.storeBit(true).storeRef(src.forwardPayload)
    } else {
      b_1.storeBit(false)
    }
    b_0.storeRef(b_1.endCell())
  }
}

export function loadAddressesRequest(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2958248825) {
    throw Error('Invalid prefix')
  }
  const _responseAddress = sc_0.loadMaybeAddress()
  const _first = loadRequest(sc_0)
  const _second = sc_0.loadBit() ? loadRequest(sc_0) : null
  const sc_1 = sc_0.loadRef().beginParse()
  const _third = sc_1.loadBit() ? loadRequest(sc_1) : null
  const _forwardPayload = sc_1.loadBit() ? sc_1.loadRef() : null
  return {
    $$type: 'AddressesRequest' as const,
    responseAddress: _responseAddress,
    first: _first,
    second: _second,
    third: _third,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleAddressesRequest(source: TupleReader) {
  const _responseAddress = source.readAddressOpt()
  const _first = loadTupleRequest(source)
  const _second_p = source.readTupleOpt()
  const _second = _second_p ? loadTupleRequest(_second_p) : null
  const _third_p = source.readTupleOpt()
  const _third = _third_p ? loadTupleRequest(_third_p) : null
  const _forwardPayload = source.readCellOpt()
  return {
    $$type: 'AddressesRequest' as const,
    responseAddress: _responseAddress,
    first: _first,
    second: _second,
    third: _third,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleAddressesRequest(source: TupleReader) {
  const _responseAddress = source.readAddressOpt()
  const _first = loadGetterTupleRequest(source)
  const _second_p = source.readTupleOpt()
  const _second = _second_p ? loadTupleRequest(_second_p) : null
  const _third_p = source.readTupleOpt()
  const _third = _third_p ? loadTupleRequest(_third_p) : null
  const _forwardPayload = source.readCellOpt()
  return {
    $$type: 'AddressesRequest' as const,
    responseAddress: _responseAddress,
    first: _first,
    second: _second,
    third: _third,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleAddressesRequest(source: AddressesRequest) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.responseAddress)
  builder.writeTuple(storeTupleRequest(source.first))
  if (source.second !== null && source.second !== undefined) {
    builder.writeTuple(storeTupleRequest(source.second))
  } else {
    builder.writeTuple(null)
  }
  if (source.third !== null && source.third !== undefined) {
    builder.writeTuple(storeTupleRequest(source.third))
  } else {
    builder.writeTuple(null)
  }
  builder.writeCell(source.forwardPayload)
  return builder.build()
}

export function dictValueParserAddressesRequest(): DictionaryValue<AddressesRequest> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAddressesRequest(src)).endCell())
    },
    parse: (src) => {
      return loadAddressesRequest(src.loadRef().beginParse())
    },
  }
}

export type AddressResponse = {
  $$type: 'AddressResponse'
  first: Address
  second: Address | null
  third: Address | null
  forwardPayload: Cell | null
}

export function storeAddressResponse(src: AddressResponse) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3167933154, 32)
    b_0.storeAddress(src.first)
    b_0.storeAddress(src.second)
    b_0.storeAddress(src.third)
    if (src.forwardPayload !== null && src.forwardPayload !== undefined) {
      b_0.storeBit(true).storeRef(src.forwardPayload)
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadAddressResponse(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3167933154) {
    throw Error('Invalid prefix')
  }
  const _first = sc_0.loadAddress()
  const _second = sc_0.loadMaybeAddress()
  const _third = sc_0.loadMaybeAddress()
  const _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'AddressResponse' as const,
    first: _first,
    second: _second,
    third: _third,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleAddressResponse(source: TupleReader) {
  const _first = source.readAddress()
  const _second = source.readAddressOpt()
  const _third = source.readAddressOpt()
  const _forwardPayload = source.readCellOpt()
  return {
    $$type: 'AddressResponse' as const,
    first: _first,
    second: _second,
    third: _third,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleAddressResponse(source: TupleReader) {
  const _first = source.readAddress()
  const _second = source.readAddressOpt()
  const _third = source.readAddressOpt()
  const _forwardPayload = source.readCellOpt()
  return {
    $$type: 'AddressResponse' as const,
    first: _first,
    second: _second,
    third: _third,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleAddressResponse(source: AddressResponse) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.first)
  builder.writeAddress(source.second)
  builder.writeAddress(source.third)
  builder.writeCell(source.forwardPayload)
  return builder.build()
}

export function dictValueParserAddressResponse(): DictionaryValue<AddressResponse> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAddressResponse(src)).endCell())
    },
    parse: (src) => {
      return loadAddressResponse(src.loadRef().beginParse())
    },
  }
}

export type Factory$Data = {
  $$type: 'Factory$Data'
}

export function storeFactory$Data(src: Factory$Data) {
  return (builder: Builder) => {
    const b_0 = builder
  }
}

export function loadFactory$Data(slice: Slice) {
  const sc_0 = slice
  return { $$type: 'Factory$Data' as const }
}

export function loadTupleFactory$Data(source: TupleReader) {
  return { $$type: 'Factory$Data' as const }
}

export function loadGetterTupleFactory$Data(source: TupleReader) {
  return { $$type: 'Factory$Data' as const }
}

export function storeTupleFactory$Data(source: Factory$Data) {
  const builder = new TupleBuilder()
  return builder.build()
}

export function dictValueParserFactory$Data(): DictionaryValue<Factory$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFactory$Data(src)).endCell())
    },
    parse: (src) => {
      return loadFactory$Data(src.loadRef().beginParse())
    },
  }
}

type TonVault_init_args = {
  $$type: 'TonVault_init_args'
  admin: Address
}

function initTonVault_init_args(src: TonVault_init_args) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.admin)
  }
}

async function TonVault_init(admin: Address) {
  const __code = Cell.fromHex(
    'b5ee9c724102130100061c000114ff00208e8130e1f2c80b0104b401d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863fa40013102915be07021d74920c21f953101d31f02de218210698cba08bae3022182107362d09cbae3022182101b434676bae302218210074f7a60ba0208091001d210235f03fa00fa40d72c01916d93fa4001e201d401d0d200d72c01916d93fa4001e201fa00d31ff404f404d200019afa40fa00f40455206f03916de21716151443303710791078550539f8416f24135f032aa1276eb39607206ef2d0809337f842e25476545476542f0301ce6c51206e92317f9301c0ffe29230719d206ef2d0806f236c21d765a602e2f8416f24fa40fa0071d721fa00fa00306c6170f83a21a602ed476f106f1e6f138101d0d721d33f30a822a422a8a08132c870f836a0812ee070f8365003a812a08132c870f836a001710401ac01aa00a0802881753070f838a081753070f836aa008209312d00a0a08131f9f842fa4430c300917f9623fa4430c300e2933a5b7f9459a019b9e218f2f4298014fb02105610491036496970810090508b700b10786dc80501fe55908210ac2f5a38500bcb1f5009fa0217cec85077085067ca005004206e9430cf84809201cee258fa02cb1ff400f400216eb38e147f01ca0001206ef2d0806f235023ce01fa02f400947032ca00e2c8236eb38e137f01ca0003206ef2d0806f2310355023cecece9633705003ca00e212cdcdc94430441359c8cf8580ca0006012289cf16ce01fa02806acf40f400c901fb000700011000d410235f03d33ffa00fa40308040706d718b04251068105704085520c8556082100f8a7ea55008cb1f16cb3f5004fa0212ce01206e9430cf84809201cee2f40001fa02cec9f84210237f1023c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00f80f82009aa1f2f001fc10235f03fa00d200d72c01916d93fa4001e201d200019afa40fa00d33f55206f03916de2433003d430d0fa00d31ff404f404553034f8416f2454732123fa40fa0071d721fa00fa00306c6170f83aa706ed476f106f1e6f138101d0d721d33f30a703a0813afc70f836a0813a9870f836a08155f070f836a08208989680a00a02a681290470f836a08132c870f836a044305244fa40fa0071d721fa00fa00306c6170f83a7101aa00a0802881753070f838a081753070f836aa008209312d00a0a0a08120a4512aa101bcf2f4278014fb0205e30f0b0f02fe3304206ef2d0806f23f82854238323fa443123fa4431b9924300dff8425504706d6ddb3c81009070f84205104910384670c855508210e7a3475f5007cb1f15ce5003fa0250345043fa02cb1f12f400f400c91241437f595f41f90001f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f9040003c8cf8580ca00120c0e0198f843d0f404302081456a018010f40f6fa1f2e0876d2281382f018010f40f6fa1f2e08781382f01028010f41702817fa0018010f40f6fa1f2e08712817fa001028010f417c801c8f400cd55810d00c25089ce16ce5004fa0258fa0201c8ce12cb3f12cb02226eb38e197f01ca0002206ef2d0806f2410455043fa02cb1f12f400f40095327058ca00e2226eb38e197f01ca0002206ef2d0806f2410455043fa02cb1f12f400f40095327058ca00e2cdc90030cccccf884008cbff01fa028069cf40cf8634f400c901fb0000b03502206ef2d0807081009070f8421056104810374690055521c855508210e7a3475f5007cb1f15ce5003fa0250345043fa02cb1f12f400f400c910344130441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00015c8e8d5bfa40fa00fa40f40430db3c30e03331c00001c121b08e10f842c8cf8508ce70cf0b6ec98042fb00e0f2c0821101f0f828500421fa443121fa4431b99101df7053006df843d0f404302081382f018010f40f6fa1f2e0876d22817fa0018010f40f6fa1f2e087817fa001028010f4170281456a018010f40f6fa1f2e0871281456a01028010f417c801c8f400cd55515056ce13ce01fa0201fa0201fa02f400c98122f8f8424330120098fa44315920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400206ef2d08001baf2f4804050037001441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00df0945b7',
  )
  const builder = beginCell()
  const __system = Cell.fromHex(
    'b5ee9c7241025901001752000101c001020148023d0105bb82f8030228ff008e88f4a413f4bcf2c80bed5320e303ed43d90416020271050802012006070039b803bed44d0d401f863fa40fa40fa00fa00fa00f40455506c16236c6180039bad4ced44d0d401f863fa40fa40fa00fa00fa00f40455506c16256c61802012009110201200a100201580b0c00d7adbcf6a2686a00fc31fd207d207d007d007d007a022aa8360b2a82b87c14097c21e87a021840bfd000c0087a07b7d0f97043e42a90ad7d0109676764b82c907c80117c802d6bb280ebb2c101009a64658be587e587e5ffe5ffb8fc8200643a00e581096503e5ffe4e83630c00201200d0e0064aaaded44d0d401f863fa40fa40fa00fa00fa00f40455506c1655055306c7059230239c25c7059122e08125a8f2f070e26c610182aa2ded44d0d401f863fa40fa40fa00fa00fa00f40455506c167fc87101cb00700181010acf01c9d088f843d0f40430817fa0018010f40f6fa1f2e0872555306c650f00000039b4d4bda89a1a803f0c7f481f481f401f401f401e808aaa0d82c48d8c3002012012130039b4af3da89a1a803f0c7f481f481f401f401f401e808aaa0d82c44d8c30020120141500afb1663b513435007e18fe903e903e803e803e803d0115541b059545638dfb68bb7ee2c08c22c08c14c5f1c164cc54d0e3845445b1c1664c205978bcbc1c36cc7854cd3880a040f96040fa2a6114842808966a6128761b186000bdb287fb513435007e18fe903e903e803e803e803d0115541b059545638fbb68bb7ee2c08c22c08c14c5f1c164cc54cd23845445b1c1664c204455fcbc1c36cc7854d0f888a8483040656045773cbc37a040f96a00a040fa2a162a61361b186001f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863fa40fa40fa00fa00fa00f40455506c16078e44058020d7217021d749c21f9430d31f01de8210178d4519ba8e27d33ffa00596c2115a110354403c8f84301cc55505056ce13ce01fa0201fa0201fa02f400c9ed54e05f07e07026d74920170466c21f953106d31f07de218210642b7d07bae3022182107bdd97debae302218210ac2f5a38bae30250865f062282102c76b973ba18272a3b02fc5b05fa40d33ffa00fa00fa00d31ff404f404553004d430d0fa00d31ff404f404553034706d6d5612035612513e513e03561203561203db3c8200bf5cf8424330fa44315920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400206ef2d08001baf2f48200b29a2ac200f2f45398f8235384b609bc191b017ef843d0f404302081456a018010f40f6fa1f2e0876d81382ff82a028010f41702817fa0018010f40f6fa1f2e08712817fa001028010f417c801c8f400cd55811a00c25089ce16ce5004fa0258fa0201c8ce12cb3f12cb02226eb38e197f01ca0002206ef2d0806f2410455043fa02cb1f12f400f40095327058ca00e2226eb38e197f01ca0002206ef2d0806f2410455043fa02cb1f12f400f40095327058ca00e2cdc903cc8ec2547dcb547dba547cfa547cbe1111111d11111110111c11100f111b0f0e111a0e0d111e0d0c111f0cdb3c8200f276f2f01113011112010511110504111004103f102ede8112b75610c0005610c000baf2f42f9c6c3334343436373746165055e30d5321a81f1c2404fe53afa853fca8bc8f74315479eda984547008b98ec22e518d108f5171107e106c105b04103d41e052c0111611111110111511100f11140f0e11130e0d11170d0c11180cdb3c8200836ff2f050bc105a104910384713455599107d102b3939165f06e2f8416f24135f03f80770f836a1ab0070067005a15467c02a5502c8e30d1f1d1e23006a55308210074f7a605005cb1f13ce01fa02cef400c94630544c55034444c8cf8580ca00cf8440ce01fa02806acf40f400c901fb000202e030547adea984547004b98ec12e518c108f107e5161106c105b04103d102f52c0111611111110111511100f11140f0e11130e0d11170d0c11180cdb3c816b65f2f050bc105a104910384714455599107d102c3939165f06e2f8416f24135f03f80770f836a1ab00047004a1546b8123c81f2201f6355f036c2234f8416f24135f03f80770f836a1ab007072544c505288c855308210074f7a605005cb1f13ce01fa02cef400c92c431446004343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0070708100822b44135065c855308210074f7a605005cb1f13ce01fa02cef400c92850444343c8cf8580ca0020012689cf16ce01fa02806acf40f400c901fb00f80f21000110006655308210074f7a605005cb1f13ce01fa02cef400c9443052a040337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00000c5162a05151a001fe208e262020f285b603a520c001963020a5ab00a494a4ab00aee29c5ca90621a1ab0066a001c000e631923070e25363bd8e13305352a15423a0a9845321a15422a0a984b608926c22e270c8ca0013f40015f400c9d05171a0707f83062570f82812f843d0f40430817fa0018010f40f6fa1f2e087c855215afa0212cecec9242501fef82854140410494a307f0211101023c855608210178d45195008cb1f16cb3f5004fa0212ceca0001206e9430cf84809201cee201fa02cec9454041301a103544445f41f90001f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f9040003c8cf8580ca0012cccccf884008cbff01fa028069cf40cf8634f400c901260040fb0010354143c8f84301cc55505056ce13ce01fa0201fa0201fa02f400c9ed5401fc5b05d33f31fa00fa40d72c01916d93fa4001e230d430d0fa00fa00d31ffa40f404554035f842fa440770f82812f843d0f40430817fa0018010f40f6fa1f2e087c855215afa0212cecec920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f904008200a4b802c00097206ef2d08017ba93303670e2162801fef2f48200d50821c00092317f94f82358bbe2f2f4547469a98454756aa984218200df1205be14f2f422817b3203be12f2f45094a1f8416f24135f03ab005164a15159a1f82f74fb02278010543654c855308210074f7a605005cb1f13ce01fa02cef400c9294813506640037fc8cf8580ca00cf8440ce01fa02806acf40f4002900b8c901fb00708306284a43c855308210074f7a605005cb1f13ce01fa02cef400c92503488840037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0010354143c8f84301cc55505056ce13ce01fa0201fa0201fa02f400c9ed5403fc5b05fa00fa40d430d0d200d72c01916d93fa4001e201fa00d31ff404f404d200019afa40fa00f40455206f03916de217161514433007d430d0d200019cfa40fa40fa4055206c136f0392306de28b02308b0230708b0230216eb38e1531f842820081fb531fc705917f94531ec705e2f2f4e30d2ec7059253dce30e2dc0002b2e2f02f821206ef2d0806f235b22206ef2d0806f2330317053006df82ac8f84301cc55515056ce13ce01fa0201fa0201fa02f400c981203ef8424330fa44315920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400206ef2d08001baf2f481539022206ef2d0806f236c215610c705917fe30ef2f4012c2d001a22206ef2d0806f236c212fc7050012206ef2d0806f236c21000e3053bc10bc7f5904ce917f932cc000e28e465471a053e60270705035804005c855308210074f7a605005cb1f13ce01fa02cef400c943304343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00f80f8200874ef2f0de25c20094f82326bc9170e2e30008e30f9101df103541433031353a008c5471a053e60270705035804005c855308210074f7a605005cb1f13ce01fa02cef400c943304343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00f80f820090faf2f003f034375193a120c1018e4554727553bc0270705035804005c855308210074f7a605005cb1f13ce01fa02cef400c943304343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00f80f8115dcf2f0de208103e5a8248103e8a82c02a9845309bc913ae30d5389bc923437e30d5087a016830650857007c8323334008c5463905468ce0270705035804005c855308210074f7a605005cb1f13ce01fa02cef400c943304343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00f80f815017f2f000b470f8416f24135f03f80770f836a1ab0051aba1266eb39606206ef2d080923628e254477724c855308210074f7a605005cb1f13ce01fa02cef400c9459023701023c8cf8580ca00cf8440ce01fa02806acf40f400c901fb001026006255308210074f7a605005cb1f13ce01fa02cef400c94400701023c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0002d636298103e58103e8a98453caa052d2a0544ceea98451bba15206b98e465465905458c40270705035804005c855308210074f7a605005cb1f13ce01fa02cef400c943304343c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00f80f811a12f2f09139e2266eb3e30f363901b43480407027206ef2d0806f23303128206ef2d0806f236c216eb38e1828206ef2d0806f236c21d0fa40fa00f404552003d1586f03916de245404130176d55405610015610500b6f03109b1078106710561045103441301b1089c83701fe55908210ac2f5a38500bcb1f5009fa0217cec85077085067ca005004206e9430cf84809201cee258fa02cb1ff400f400216eb38e147f01ca0001206ef2d0806f235023ce01fa02f400947032ca00e2c8236eb38e137f01ca0003206ef2d0806f2310355023cecece9633705003ca00e212cdcdc97002206ef2d0806f235b1238003070c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0000703031347005804005c855308210074f7a605005cb1f13ce01fa02cef400c940337fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb000034c8f84301cc55505056ce13ce01fa0201fa0201fa02f400c9ed5401f08ed73031d33ffa40d2003021fa4430c0008e4170f8285230f843d0f40430817fa0018010f40f6fa1f2e087c855215afa0212cecec920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400916de25520e03101c00001c121b08e10f842c8cf8508ce70cf0b6ec98042fb00e0f2c0823c00a495c801cf16c992306de2c88210d173540001cb1f12cb3f58206e95307001cb019e830958cb0a01206ef2d08001cbffe2f400c9f84270804043137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb000201203e490105b4ad503f0228ff008e88f4a413f4bcf2c80bed5320e303ed43d9404100a5a66342bb513435007e18fe903e903e803e803500743e9034cff4c0b48000673e8034c7fd013d01154c1bc1245b788074800067be8034c7fd013d01154c1b051bc1248c1b78841644160415c4159b06489b246001f03001d072d721d200d200fa4021103450666f04f86102f862ed44d0d401f863fa40fa40fa00fa00d401d0fa40d33fd302d200019cfa00d31ff404f40455306f04916de201d200019efa00d31ff404f40455306c146f0492306de210591058105710566c190a925f0ae07029d74920c21f953109d31f0ade214204fe8210e7a3475fba8f695b08fa40fa00fa00d31ff404f404553034f842530dc7058e1f3e8200a73a535bbaf2f48200d9155369c705f2f4547210266f040771b1070ede2cc7058e1e3e8200dbf25149ba14f2f48200d9155147c70514f2f441301b6f040872b1925f06e220c003e30010685515e050ab5f0ac00001c121b0e3024346474801fc536521fa443121fa4431b99101df30815eb45118c705f2f470708100a05472226d2d514d4434f843d0f404302081382f018010f40f6fa1f2e0876d02817fa0018010f40f6fa1f2e08712817fa001028010f41781456af82a028010f417c801c8f400cd55515056ce13ce01fa0201fa0201fa02f400c92c206ef2d0806f244401fc5611206ef2d0806f242f518f085613085613085533c855b08210642b7d07500dcb1f1bce19cb3f5007fa025005fa02045043fa02cb1f12f400f400c84344055043fa02cb1f12f400f400cdc9103544445f41f90001f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f9040003c8cf8580ca0012cccccf884008450024cbff01fa028069cf40cf8634f400c901fb0000d4c8f84301cc55805089ce16ce5004fa0258fa0201c8ce12cb3f12cb02226eb38e197f01ca0002206ef2d0806f2410455043fa02cb1f12f400f40095327058ca00e2226eb38e197f01ca0002206ef2d0806f2410455043fa02cb1f12f400f40095327058ca00e2cdc9ed540020f842c8cf8508ce70cf0b6ec98042fb000006f2c0820105b7f4104a0228ff008e88f4a413f4bcf2c80bed5320e303ed43d94b4c0033a65ec0bb51343e803e903e9015481b04fe0a9518cc148c1b0d2001f83001d072d721d200d200fa4021103450666f04f86102f862ed44d0fa00fa40fa4055206c13048e53028020d7217021d749c21f9430d31f01de208210178d4519ba8e1630d33ffa00596c21a002c855205afa0212cecec9ed54e082107bdd97deba8e15d33ffa00596c21a002c855205afa0212cecec9ed54e05f04e04d045a02d70d1ff2e0822182100f8a7ea5bae302218210178d4519bae3022182107ac8d559bae302218210595f07bcba4e51555601fc31d33ffa00fa40d72c01916d93fa4001e201f40431fa0023fa4430f2d08a8123fff84229c705f2f45164a181093e21c2fff2f42620d70b00c0018e12d74b81099001c0019301c001923170e2f2f49130e2f8416f2425b8a4541432817d7106fa40fa0071d721fa00fa00306c6170f83a12a85240a0801e814e2070f838a04f01fc81290470f836aa008208989680a0a0bcf2f450547080407f2a4613509a705520c855608210178d45195008cb1f16cb3f5004fa0212ceca0001206e9430cf84809201cee201fa02cec9525328f82ac855215afa0212cecec910561024103610261045102410235f41f90001f9005ad76501d76582020134c8cb17cb0fcb0f50006acbffcbff71f9040003c8cf8580ca0012cccccf884008cbff01fa028069cf40cf8634f400c901fb0002c855205afa0212cecec9ed5403f831d33ffa00fa40d200d72c01916d93fa4001e201fa005175a070535af82ac855215afa0212cecec9f842fa44315920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400206ef2d08001ba9b8123fff84252b0c705f2f4dff8416f2421f8276f1021a109e30226c20097107c3a5f04345be30d52535400b010575f07018208989680b60972fb020370830650437007c8553082107362d09c5005cb1f13cb3f01fa02cecec925045055441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0002c855205afa0212cecec9ed5400aa5530fa40fa0071d721fa00fa00306c6170f83a5230a0a17170294913508bc8553082107362d09c5005cb1f13cb3f01fa02cecec92947145066441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00444000b88208989680b60972fb02236eb39321c2009170e28e3503206ef2d0808100827004c8018210d53276db58cb1fcb3fc94140441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00926c31e202c855205afa0212cecec9ed5400c231fa40d200306d019930f82a4430126f0358923333e201c8598210ca77fdc25003cb1f01fa02216eb38e117f01ca0001206ef2d0806f235023cececc947032ca00e2c90170804043137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb0002fe8efa31d33ffa00d72c01916d93fa4001e201f404308123fff84227c705f2f45142a181093e21c2fff2f4f8416f2443305230fa40fa0071d721fa00fa00306c6170f83a817d71811a2c70f836aa0012a012bcf2f47080407f07206ef2d080d0fa00fa00d31ffa40f404554005d155032c108b107a50965059144330c8e03431575800be558082107bdd97de500acb1f18cb3f5006fa0214ce58206e9430cf84809201cee2c84455065054fa0258fa02cb1f12cef400cdc926045055441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0002c855205afa0212cecec9ed540088820b93b1ceba8e3701fa40308123fff8425003c70512f2f482089896808010fb027083066d40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e05bf2c082e5c73a87',
  )
  builder.storeRef(__system)
  initTonVault_init_args({ $$type: 'TonVault_init_args', admin })(builder)
  const __data = builder.endCell()
  return { code: __code, data: __data }
}

export const TonVault_errors = {
  2: { message: 'Stack underflow' },
  3: { message: 'Stack overflow' },
  4: { message: 'Integer overflow' },
  5: { message: 'Integer out of expected range' },
  6: { message: 'Invalid opcode' },
  7: { message: 'Type check error' },
  8: { message: 'Cell overflow' },
  9: { message: 'Cell underflow' },
  10: { message: 'Dictionary error' },
  11: { message: "'Unknown' error" },
  12: { message: 'Fatal error' },
  13: { message: 'Out of gas error' },
  14: { message: 'Virtualization error' },
  32: { message: 'Action list is invalid' },
  33: { message: 'Action list is too long' },
  34: { message: 'Action is invalid or not supported' },
  35: { message: 'Invalid source address in outbound message' },
  36: { message: 'Invalid destination address in outbound message' },
  37: { message: 'Not enough Toncoin' },
  38: { message: 'Not enough extra currencies' },
  39: { message: 'Outbound message does not fit into a cell after rewriting' },
  40: { message: 'Cannot process a message' },
  41: { message: 'Library reference is null' },
  42: { message: 'Library change action error' },
  43: {
    message:
      'Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree',
  },
  50: { message: 'Account state size exceeded limits' },
  128: { message: 'Null reference exception' },
  129: { message: 'Invalid serialization prefix' },
  130: { message: 'Invalid incoming message' },
  131: { message: 'Constraints error' },
  132: { message: 'Access denied' },
  133: { message: 'Contract stopped' },
  134: { message: 'Invalid argument' },
  135: { message: 'Code of a contract was not found' },
  136: { message: 'Invalid standard address' },
  138: { message: 'Not a basechain address' },
  1543: { message: 'TEP89 proxy: TakeWalletAddress must be sent by the jetton master' },
  2366: { message: 'Incorrect balance after send' },
  2448: { message: 'Invalid forward payload in message' },
  4439: { message: 'Pool: vaultOut must be one of the vaults' },
  4791: { message: 'Pool: INVARIANT BROKEN' },
  5596: { message: 'Pool: Desired amount out is greater than pool reserves' },
  6674: { message: 'Pool: Amount out is less than desired amount' },
  7206: { message: 'Block Proof: mcBlockSeqno is stale' },
  8254: { message: 'Pool: Sender must be pool if multihopInfo is specified' },
  8356: { message: 'TonVault: Not enough value to pay for gas' },
  8952: { message: 'TonVault: Sender must be pool' },
  9215: { message: 'Incorrect sender' },
  9640: { message: 'Pool: argument of `reserveForVault` must be one of the vaults' },
  10789: { message: 'JettonVault: Invalid state init proof' },
  10955: { message: 'Label length exceeds maximum' },
  11580: { message: 'TEP89 proxy: Sender must be the discovery requester' },
  12793: { message: 'TonVault: Not enough value to pay for swap fees' },
  14016: { message: 'JettonVault: Sender must be jetton wallet or too low gas for action' },
  20503: { message: 'Pool: Amount of tokens sent is insufficient for exactOut swap' },
  21392: { message: 'Pool: Out vault on a previous step must be one of the pool vaults' },
  24244: { message: 'LP Deposit: Vaults MUST be sorted, to not break invariant' },
  24479: { message: 'Block Proof: Shard state update is not exotic' },
  25473: { message: 'Block Proof: Invalid Merkle proof hash' },
  26082: { message: 'Pool: vaultAddress must be one of the vaults' },
  27493: { message: 'Pool: Liquidity provision failed due to slippage on right side' },
  29532: { message: 'Block Proof: Invalid Merkle update tag' },
  31538: { message: "Pool: Couldn't pay right more than asked" },
  32113: { message: 'Insufficient amount of TON attached' },
  33275: { message: 'Pool: Sender must be a vault' },
  33589: { message: 'JettonVault: Unsupported proof type' },
  33637: { message: 'Block Proof: Shard account for jetton master not found in shard accounts' },
  33647: { message: 'Pool: Liquidity provision failed due to slippage on left side' },
  34638: { message: 'Pool: No liquidity in pool' },
  37114: { message: 'Pool: Swap timeout' },
  39585: { message: 'TonVault: Jetton transfer must be performed to correct Jetton Vault' },
  40766: { message: 'Block Proof: Invalid Merkle proof tag' },
  42168: { message: 'Pool: Invalid sender of JettonBurn notification' },
  42810: { message: 'LP Deposit: Amount must be equal to leftSide' },
  45722: { message: "Pool: You can't add 0 tokens on one side" },
  45964: { message: 'Factory: Unknown requestId' },
  47096: { message: 'JettonVault: Sender must be pool' },
  48988: { message: 'Pool: Liquidity provider should be liquidity contract' },
  54536: { message: 'Pool: Expired timeout on liquidity withdrawal' },
  55530: { message: 'JettonVault: Sender must be a valid TEP-89 proxy' },
  55573: { message: 'LP Deposit: Depositor must be the same' },
  56306: { message: 'LP Deposit: Amount must be equal to rightSide' },
  56834: {
    message:
      'JettonVault: Expected and Actual wallets are not equal or gas for action is not enough',
  },
  57106: { message: "Pool: Couldn't pay left more than asked" },
  57113: { message: 'JettonVault: Invalid block state proof' },
  57215: { message: 'Block Proof: Merkle proof is not exotic' },
  62070: { message: 'Pool: Liquidity provision failed due to timeout' },
} as const

export const TonVault_errors_backward = {
  'Stack underflow': 2,
  'Stack overflow': 3,
  'Integer overflow': 4,
  'Integer out of expected range': 5,
  'Invalid opcode': 6,
  'Type check error': 7,
  'Cell overflow': 8,
  'Cell underflow': 9,
  'Dictionary error': 10,
  "'Unknown' error": 11,
  'Fatal error': 12,
  'Out of gas error': 13,
  'Virtualization error': 14,
  'Action list is invalid': 32,
  'Action list is too long': 33,
  'Action is invalid or not supported': 34,
  'Invalid source address in outbound message': 35,
  'Invalid destination address in outbound message': 36,
  'Not enough Toncoin': 37,
  'Not enough extra currencies': 38,
  'Outbound message does not fit into a cell after rewriting': 39,
  'Cannot process a message': 40,
  'Library reference is null': 41,
  'Library change action error': 42,
  'Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree': 43,
  'Account state size exceeded limits': 50,
  'Null reference exception': 128,
  'Invalid serialization prefix': 129,
  'Invalid incoming message': 130,
  'Constraints error': 131,
  'Access denied': 132,
  'Contract stopped': 133,
  'Invalid argument': 134,
  'Code of a contract was not found': 135,
  'Invalid standard address': 136,
  'Not a basechain address': 138,
  'TEP89 proxy: TakeWalletAddress must be sent by the jetton master': 1543,
  'Incorrect balance after send': 2366,
  'Invalid forward payload in message': 2448,
  'Pool: vaultOut must be one of the vaults': 4439,
  'Pool: INVARIANT BROKEN': 4791,
  'Pool: Desired amount out is greater than pool reserves': 5596,
  'Pool: Amount out is less than desired amount': 6674,
  'Block Proof: mcBlockSeqno is stale': 7206,
  'Pool: Sender must be pool if multihopInfo is specified': 8254,
  'TonVault: Not enough value to pay for gas': 8356,
  'TonVault: Sender must be pool': 8952,
  'Incorrect sender': 9215,
  'Pool: argument of `reserveForVault` must be one of the vaults': 9640,
  'JettonVault: Invalid state init proof': 10789,
  'Label length exceeds maximum': 10955,
  'TEP89 proxy: Sender must be the discovery requester': 11580,
  'TonVault: Not enough value to pay for swap fees': 12793,
  'JettonVault: Sender must be jetton wallet or too low gas for action': 14016,
  'Pool: Amount of tokens sent is insufficient for exactOut swap': 20503,
  'Pool: Out vault on a previous step must be one of the pool vaults': 21392,
  'LP Deposit: Vaults MUST be sorted, to not break invariant': 24244,
  'Block Proof: Shard state update is not exotic': 24479,
  'Block Proof: Invalid Merkle proof hash': 25473,
  'Pool: vaultAddress must be one of the vaults': 26082,
  'Pool: Liquidity provision failed due to slippage on right side': 27493,
  'Block Proof: Invalid Merkle update tag': 29532,
  "Pool: Couldn't pay right more than asked": 31538,
  'Insufficient amount of TON attached': 32113,
  'Pool: Sender must be a vault': 33275,
  'JettonVault: Unsupported proof type': 33589,
  'Block Proof: Shard account for jetton master not found in shard accounts': 33637,
  'Pool: Liquidity provision failed due to slippage on left side': 33647,
  'Pool: No liquidity in pool': 34638,
  'Pool: Swap timeout': 37114,
  'TonVault: Jetton transfer must be performed to correct Jetton Vault': 39585,
  'Block Proof: Invalid Merkle proof tag': 40766,
  'Pool: Invalid sender of JettonBurn notification': 42168,
  'LP Deposit: Amount must be equal to leftSide': 42810,
  "Pool: You can't add 0 tokens on one side": 45722,
  'Factory: Unknown requestId': 45964,
  'JettonVault: Sender must be pool': 47096,
  'Pool: Liquidity provider should be liquidity contract': 48988,
  'Pool: Expired timeout on liquidity withdrawal': 54536,
  'JettonVault: Sender must be a valid TEP-89 proxy': 55530,
  'LP Deposit: Depositor must be the same': 55573,
  'LP Deposit: Amount must be equal to rightSide': 56306,
  'JettonVault: Expected and Actual wallets are not equal or gas for action is not enough': 56834,
  "Pool: Couldn't pay left more than asked": 57106,
  'JettonVault: Invalid block state proof': 57113,
  'Block Proof: Merkle proof is not exotic': 57215,
  'Pool: Liquidity provision failed due to timeout': 62070,
} as const

const TonVault_types: ABIType[] = [
  {
    name: 'DataSize',
    header: null,
    fields: [
      { name: 'cells', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'bits', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'refs', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
    ],
  },
  {
    name: 'SignedBundle',
    header: null,
    fields: [
      {
        name: 'signature',
        type: { kind: 'simple', type: 'fixed-bytes', optional: false, format: 64 },
      },
      {
        name: 'signedData',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'StateInit',
    header: null,
    fields: [
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'Context',
    header: null,
    fields: [
      { name: 'bounceable', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'raw', type: { kind: 'simple', type: 'slice', optional: false } },
    ],
  },
  {
    name: 'SendParameters',
    header: null,
    fields: [
      { name: 'mode', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'to', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'bounce', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
  {
    name: 'MessageParameters',
    header: null,
    fields: [
      { name: 'mode', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'to', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'bounce', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
  {
    name: 'DeployParameters',
    header: null,
    fields: [
      { name: 'mode', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'bounce', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'init', type: { kind: 'simple', type: 'StateInit', optional: false } },
    ],
  },
  {
    name: 'StdAddress',
    header: null,
    fields: [
      { name: 'workchain', type: { kind: 'simple', type: 'int', optional: false, format: 8 } },
      { name: 'address', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
    ],
  },
  {
    name: 'VarAddress',
    header: null,
    fields: [
      { name: 'workchain', type: { kind: 'simple', type: 'int', optional: false, format: 32 } },
      { name: 'address', type: { kind: 'simple', type: 'slice', optional: false } },
    ],
  },
  {
    name: 'BasechainAddress',
    header: null,
    fields: [{ name: 'hash', type: { kind: 'simple', type: 'int', optional: true, format: 257 } }],
  },
  {
    name: 'SortedAddresses',
    header: null,
    fields: [
      { name: 'lower', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'higher', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'SortedAddressesAndCoins',
    header: null,
    fields: [
      { name: 'lower', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'higher', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'lowerCoins', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'higherCoins', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
    ],
  },
  {
    name: 'AmmPool$Data',
    header: null,
    fields: [
      { name: 'leftVault', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'rightVault', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'leftSideReserve',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'rightSideReserve',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'totalSupply',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'jettonContent', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'LiquidityDepositContract$Data',
    header: null,
    fields: [
      { name: 'leftVault', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'rightVault', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'leftSideAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'rightSideAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'depositor', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'contractId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'status', type: { kind: 'simple', type: 'uint', optional: false, format: 3 } },
      {
        name: 'leftAdditionalParams',
        type: { kind: 'simple', type: 'AdditionalParams', optional: true },
      },
      {
        name: 'rightAdditionalParams',
        type: { kind: 'simple', type: 'AdditionalParams', optional: true },
      },
    ],
  },
  {
    name: 'JettonNotifyWithActionRequest',
    header: 1935855772,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'eitherBit', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'actionOpcode', type: { kind: 'simple', type: 'uint', optional: false, format: 32 } },
      { name: 'actionPayload', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'proofType', type: { kind: 'simple', type: 'uint', optional: false, format: 8 } },
      {
        name: 'proof',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'SendViaJettonTransfer',
    header: 260734629,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'destination', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'customPayload', type: { kind: 'simple', type: 'cell', optional: true } },
      {
        name: 'forwardTonAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'forwardPayload',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'JettonVault$Data',
    header: null,
    fields: [
      { name: 'jettonMaster', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'jettonWallet', type: { kind: 'simple', type: 'address', optional: true } },
    ],
  },
  {
    name: 'SwapIn',
    header: 2888784440,
    fields: [
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'receiver', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'params', type: { kind: 'simple', type: 'SwapParameters', optional: false } },
      { name: 'multihopInfo', type: { kind: 'simple', type: 'MultihopInfo', optional: true } },
    ],
  },
  {
    name: 'MultihopInfo',
    header: null,
    fields: [
      { name: 'leftVault', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'rightVault', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'outVault', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'PayoutFromPool',
    header: 122649184,
    fields: [
      { name: 'otherVault', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'receiver', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'payloadToForward', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'LiquidityDeposit',
    header: 1680571655,
    fields: [
      { name: 'depositor', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'contractId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      {
        name: 'leftAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'rightAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'leftAdditionalParams',
        type: { kind: 'simple', type: 'AdditionalParams', optional: false },
      },
      {
        name: 'rightAdditionalParams',
        type: { kind: 'simple', type: 'AdditionalParams', optional: false },
      },
    ],
  },
  {
    name: 'LiquidityWithdrawParameters',
    header: null,
    fields: [
      {
        name: 'leftAmountMin',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'rightAmountMin',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'timeout', type: { kind: 'simple', type: 'uint', optional: false, format: 32 } },
      { name: 'receiver', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'liquidityWithdrawPayload', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'LiquidityWithdrawViaBurnNotification',
    header: 2078119902,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      {
        name: 'forwardPayload',
        type: { kind: 'simple', type: 'LiquidityWithdrawParameters', optional: false },
      },
    ],
  },
  {
    name: 'MintViaJettonTransferInternal',
    header: 395134233,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'sendAllTonsInNotifyFlag', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      {
        name: 'forwardTonAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'forwardPayload',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'PartHasBeenDeposited',
    header: 3886237535,
    fields: [
      { name: 'depositor', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      {
        name: 'additionalParams',
        type: { kind: 'simple', type: 'AdditionalParams', optional: false },
      },
    ],
  },
  {
    name: 'AdditionalParams',
    header: null,
    fields: [
      {
        name: 'minAmountToDeposit',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'lpTimeout', type: { kind: 'simple', type: 'uint', optional: false, format: 32 } },
      { name: 'payloadOnSuccess', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'payloadOnFailure', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'SliceBitsAndRefs',
    header: null,
    fields: [
      { name: 'bits', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'refs', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
    ],
  },
  {
    name: 'SwapStep',
    header: null,
    fields: [
      { name: 'pool', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'minAmountOut',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'nextStep', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'SwapRequest',
    header: null,
    fields: [
      { name: 'pool', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'receiver', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'params', type: { kind: 'simple', type: 'SwapParameters', optional: false } },
    ],
  },
  {
    name: 'SwapParameters',
    header: null,
    fields: [
      { name: 'isExactOutType', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'cashbackAddress', type: { kind: 'simple', type: 'address', optional: true } },
      {
        name: 'desiredAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'timeout', type: { kind: 'simple', type: 'uint', optional: false, format: 32 } },
      { name: 'payloadOnSuccess', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'payloadOnFailure', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'nextStep', type: { kind: 'simple', type: 'SwapStep', optional: true } },
    ],
  },
  {
    name: 'LiquidityDepositInitData',
    header: null,
    fields: [
      { name: 'otherVault', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'otherAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'contractId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'LiquidityDepositEitherAddress',
    header: null,
    fields: [
      { name: 'eitherBit', type: { kind: 'simple', type: 'bool', optional: false } },
      {
        name: 'liquidityDepositContract',
        type: { kind: 'simple', type: 'address', optional: true },
      },
      {
        name: 'initData',
        type: { kind: 'simple', type: 'LiquidityDepositInitData', optional: true },
      },
    ],
  },
  {
    name: 'LPDepositPart',
    header: null,
    fields: [
      {
        name: 'liquidityDepositContractData',
        type: { kind: 'simple', type: 'LiquidityDepositEitherAddress', optional: false },
      },
      {
        name: 'additionalParams',
        type: { kind: 'simple', type: 'AdditionalParams', optional: false },
      },
    ],
  },
  {
    name: 'SwapRequestTon',
    header: 1770830344,
    fields: [
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'action', type: { kind: 'simple', type: 'SwapRequest', optional: false } },
    ],
  },
  {
    name: 'AddLiquidityPartTon',
    header: 457393782,
    fields: [
      {
        name: 'amountIn',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'liquidityDepositContractData',
        type: { kind: 'simple', type: 'LiquidityDepositEitherAddress', optional: false },
      },
      {
        name: 'additionalParams',
        type: { kind: 'simple', type: 'AdditionalParams', optional: false },
      },
    ],
  },
  {
    name: 'ReturnJettonsViaJettonTransfer',
    header: 260734629,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'destination', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'customPayload', type: { kind: 'simple', type: 'cell', optional: true } },
      {
        name: 'forwardTonAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'forwardPayload',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'UnexpectedJettonNotification',
    header: 1935855772,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'forwardPayload',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'TonVault$Data',
    header: null,
    fields: [{ name: 'admin', type: { kind: 'simple', type: 'address', optional: false } }],
  },
  {
    name: 'TEP89DiscoveryResult',
    header: 2048026621,
    fields: [
      { name: 'discoveryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'expectedJettonWallet', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'actualJettonWallet', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'action', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'TEP89DiscoveryProxy$Data',
    header: null,
    fields: [
      { name: 'jettonMaster', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'discoveryRequester', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'expectedJettonWallet', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'action', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'discoveryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'LPJettonWallet$Data',
    header: null,
    fields: [
      { name: 'balance', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'minter', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'JettonData',
    header: null,
    fields: [
      { name: 'totalSupply', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'mintable', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'content', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'jettonWalletCode', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'JettonMinterState',
    header: null,
    fields: [
      {
        name: 'totalSupply',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'mintable', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'adminAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'jettonContent', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'jettonWalletCode', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'JettonWalletData',
    header: null,
    fields: [
      { name: 'balance', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'minter', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'JettonTransfer',
    header: 260734629,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'destination', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'customPayload', type: { kind: 'simple', type: 'cell', optional: true } },
      {
        name: 'forwardTonAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'forwardPayload',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'JettonTransferInternal',
    header: 395134233,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'sendAllTonsInNotifyFlag', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      {
        name: 'forwardTonAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'forwardPayload',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'JettonNotification',
    header: 1935855772,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'forwardPayload',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'LPWithdrawViaJettonBurn',
    header: 1499400124,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'customPayload', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'LPWithdrawNotification',
    header: 2078119902,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'forwardPayload', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'JettonExcesses',
    header: 3576854235,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'ProvideWalletBalance',
    header: 2059982169,
    fields: [
      { name: 'receiver', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'includeVerifyInfo', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
  {
    name: 'VerifyInfo',
    header: null,
    fields: [
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'minter', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'TakeWalletBalance',
    header: 3396861378,
    fields: [
      { name: 'balance', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'verifyInfo', type: { kind: 'simple', type: 'VerifyInfo', optional: true } },
    ],
  },
  {
    name: 'ClaimTON',
    header: 60010958,
    fields: [{ name: 'receiver', type: { kind: 'simple', type: 'address', optional: false } }],
  },
  {
    name: 'ProvideWalletAddress',
    header: 745978227,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'ownerAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'includeAddress', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
  {
    name: 'TakeWalletAddress',
    header: 3513996288,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'walletAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'ownerAddress', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'ParsedExotic',
    header: null,
    fields: [
      { name: 'data', type: { kind: 'simple', type: 'slice', optional: false } },
      { name: 'isExotic', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
  {
    name: 'MerkleProof',
    header: null,
    fields: [
      { name: 'tag', type: { kind: 'simple', type: 'uint', optional: false, format: 8 } },
      { name: 'hash', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
      { name: 'depth', type: { kind: 'simple', type: 'uint', optional: false, format: 16 } },
      { name: 'content', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'MerkleUpdate',
    header: null,
    fields: [
      { name: 'tag', type: { kind: 'simple', type: 'uint', optional: false, format: 8 } },
      { name: '_prevHash', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
      { name: 'newHash', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
      { name: '_oldDepth', type: { kind: 'simple', type: 'uint', optional: false, format: 16 } },
      { name: '_newDepth', type: { kind: 'simple', type: 'uint', optional: false, format: 16 } },
      { name: '_prevState', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'newState', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'BlockHeader',
    header: null,
    fields: [
      { name: '_info', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: '_valueFlow', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'stateUpdate', type: { kind: 'simple', type: 'cell', optional: false } },
      {
        name: 'extra',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'McBlockExtra',
    header: null,
    fields: [
      { name: '_unusedBits', type: { kind: 'simple', type: 'uint', optional: false, format: 17 } },
      {
        name: 'shardHashes',
        type: { kind: 'dict', key: 'int', keyFormat: 32, value: 'cell', valueFormat: 'ref' },
      },
      {
        name: '_unusedRemaining',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'ShardDescr',
    header: null,
    fields: [
      { name: '_unusedBits', type: { kind: 'simple', type: 'uint', optional: false, format: 196 } },
      { name: 'rootHash', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
      {
        name: '_remaining',
        type: { kind: 'simple', type: 'slice', optional: false, format: 'remainder' },
      },
    ],
  },
  {
    name: 'TreeNode',
    header: null,
    fields: [
      { name: 'leftChild', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'rightChild', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'TwoCells',
    header: null,
    fields: [
      { name: 'first', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'second', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'BlockId',
    header: null,
    fields: [
      { name: 'workchain', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'shard', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'seqno', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'rootHash', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'fileHash', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
    ],
  },
  {
    name: 'StateProof',
    header: null,
    fields: [
      { name: 'mcBlockSeqno', type: { kind: 'simple', type: 'uint', optional: false, format: 32 } },
      { name: 'shardBitLen', type: { kind: 'simple', type: 'uint', optional: false, format: 8 } },
      { name: 'mcBlockHeaderProof', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'shardBlockHeaderProof', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'shardChainStateProof', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'AugHashmapLookupResult',
    header: null,
    fields: [
      { name: 'valueWithExtra', type: { kind: 'simple', type: 'slice', optional: true } },
      { name: 'found', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
  {
    name: 'ParseHashmapLabelResult',
    header: null,
    fields: [
      { name: 'self', type: { kind: 'simple', type: 'slice', optional: false } },
      { name: 'label', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'labelLength', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
    ],
  },
  {
    name: 'AmmPoolParams',
    header: null,
    fields: [
      { name: 'firstVault', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'secondVault', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'LPDepositParams',
    header: null,
    fields: [
      { name: 'firstVault', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'secondVault', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'firstAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      {
        name: 'secondAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'depositor', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'contractId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'JettonVaultParams',
    header: null,
    fields: [{ name: 'jettonMaster', type: { kind: 'simple', type: 'address', optional: false } }],
  },
  {
    name: 'Request',
    header: null,
    fields: [
      { name: 'requestId', type: { kind: 'simple', type: 'uint', optional: false, format: 32 } },
      { name: 'request', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'AddressesRequest',
    header: 2958248825,
    fields: [
      { name: 'responseAddress', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'first', type: { kind: 'simple', type: 'Request', optional: false } },
      { name: 'second', type: { kind: 'simple', type: 'Request', optional: true } },
      { name: 'third', type: { kind: 'simple', type: 'Request', optional: true } },
      { name: 'forwardPayload', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'AddressResponse',
    header: 3167933154,
    fields: [
      { name: 'first', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'second', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'third', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'forwardPayload', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  { name: 'Factory$Data', header: null, fields: [] },
]

const TonVault_opcodes = {
  JettonNotifyWithActionRequest: 1935855772,
  SendViaJettonTransfer: 260734629,
  SwapIn: 2888784440,
  PayoutFromPool: 122649184,
  LiquidityDeposit: 1680571655,
  LiquidityWithdrawViaBurnNotification: 2078119902,
  MintViaJettonTransferInternal: 395134233,
  PartHasBeenDeposited: 3886237535,
  SwapRequestTon: 1770830344,
  AddLiquidityPartTon: 457393782,
  ReturnJettonsViaJettonTransfer: 260734629,
  UnexpectedJettonNotification: 1935855772,
  TEP89DiscoveryResult: 2048026621,
  JettonTransfer: 260734629,
  JettonTransferInternal: 395134233,
  JettonNotification: 1935855772,
  LPWithdrawViaJettonBurn: 1499400124,
  LPWithdrawNotification: 2078119902,
  JettonExcesses: 3576854235,
  ProvideWalletBalance: 2059982169,
  TakeWalletBalance: 3396861378,
  ClaimTON: 60010958,
  ProvideWalletAddress: 745978227,
  TakeWalletAddress: 3513996288,
  AddressesRequest: 2958248825,
  AddressResponse: 3167933154,
}

const TonVault_getters: ABIGetter[] = []

export const TonVault_getterMapping: { [key: string]: string } = {}

const TonVault_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'typed', type: 'SwapRequestTon' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'UnexpectedJettonNotification' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'AddLiquidityPartTon' } },
  { receiver: 'internal', message: { kind: 'empty' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'PayoutFromPool' } },
]

export const gasForBurn = 6700n
export const gasForTransfer = 10500n
export const minTonsForStorage = 10000000n
export const Basechain = 0n
export const walletStateInitCells = 30n
export const walletStateInitBits = 20000n
export const SwapRequestOpcode = 3215360001n
export const LPDepositPartOpcode = 1690340348n
export const PROOF_NO_PROOF_ATTACHED = 0n
export const PROOF_TEP89 = 1n
export const PROOF_STATE_INIT = 2n
export const PROOF_STATE_TO_THE_BLOCK = 3n
export const GasSwapRequestTonVault = 11000n
export const GasSwapRequestJettonVault = 13000n
export const GasAmmPoolSwap = 12000n
export const GasPayoutFromAnyVault = 13000n
export const GasLPDepositPartJettonVault = 9500n
export const GasLPDepositPartTonVault = 15100n
export const GasLPDepositContract = 15000n
export const GasAmmPoolLiquidityDeposit = 22000n
export const MerkleProofTag = 3n
export const MerkleUpdateTag = 4n
export const AmmPoolAddrRequestId = 1178113395n
export const LPDepositAddrRequestId = 2077416248n
export const JettonVaultAddrRequestId = 2062860555n

export class TonVault implements Contract {
  public static readonly PoolFee = 3n
  public static readonly storageReserve = 0n
  public static readonly errors = TonVault_errors_backward
  public static readonly opcodes = TonVault_opcodes

  static async init(admin: Address) {
    return await TonVault_init(admin)
  }

  static async fromInit(admin: Address) {
    const __gen_init = await TonVault_init(admin)
    const address = contractAddress(0, __gen_init)
    return new TonVault(address, __gen_init)
  }

  static fromAddress(address: Address) {
    return new TonVault(address)
  }

  readonly address: Address
  readonly init?: { code: Cell; data: Cell }
  readonly abi: ContractABI = {
    types: TonVault_types,
    getters: TonVault_getters,
    receivers: TonVault_receivers,
    errors: TonVault_errors,
  }

  constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address
    this.init = init
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | SwapRequestTon
      | UnexpectedJettonNotification
      | AddLiquidityPartTon
      | null
      | PayoutFromPool,
  ) {
    let body: Cell | null = null
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SwapRequestTon'
    ) {
      body = beginCell().store(storeSwapRequestTon(message)).endCell()
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'UnexpectedJettonNotification'
    ) {
      body = beginCell().store(storeUnexpectedJettonNotification(message)).endCell()
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'AddLiquidityPartTon'
    ) {
      body = beginCell().store(storeAddLiquidityPartTon(message)).endCell()
    }
    if (message === null) {
      body = new Cell()
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'PayoutFromPool'
    ) {
      body = beginCell().store(storePayoutFromPool(message)).endCell()
    }
    if (body === null) {
      throw new Error('Invalid message type')
    }

    await provider.internal(via, { ...args, body: body })
  }
}
