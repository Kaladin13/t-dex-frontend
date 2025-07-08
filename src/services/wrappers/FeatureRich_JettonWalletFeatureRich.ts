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

export type JettonWalletFeatureRich$Data = {
  $$type: 'JettonWalletFeatureRich$Data'
  owner: Address
  minter: Address
  balance: bigint
}

export function storeJettonWalletFeatureRich$Data(src: JettonWalletFeatureRich$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.owner)
    b_0.storeAddress(src.minter)
    b_0.storeCoins(src.balance)
  }
}

export function loadJettonWalletFeatureRich$Data(slice: Slice) {
  const sc_0 = slice
  const _owner = sc_0.loadAddress()
  const _minter = sc_0.loadAddress()
  const _balance = sc_0.loadCoins()
  return {
    $$type: 'JettonWalletFeatureRich$Data' as const,
    owner: _owner,
    minter: _minter,
    balance: _balance,
  }
}

export function loadTupleJettonWalletFeatureRich$Data(source: TupleReader) {
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _balance = source.readBigNumber()
  return {
    $$type: 'JettonWalletFeatureRich$Data' as const,
    owner: _owner,
    minter: _minter,
    balance: _balance,
  }
}

export function loadGetterTupleJettonWalletFeatureRich$Data(source: TupleReader) {
  const _owner = source.readAddress()
  const _minter = source.readAddress()
  const _balance = source.readBigNumber()
  return {
    $$type: 'JettonWalletFeatureRich$Data' as const,
    owner: _owner,
    minter: _minter,
    balance: _balance,
  }
}

export function storeTupleJettonWalletFeatureRich$Data(source: JettonWalletFeatureRich$Data) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.owner)
  builder.writeAddress(source.minter)
  builder.writeNumber(source.balance)
  return builder.build()
}

export function dictValueParserJettonWalletFeatureRich$Data(): DictionaryValue<JettonWalletFeatureRich$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonWalletFeatureRich$Data(src)).endCell())
    },
    parse: (src) => {
      return loadJettonWalletFeatureRich$Data(src.loadRef().beginParse())
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

export type MaybeAddress = {
  $$type: 'MaybeAddress'
  address: Address | null
}

export function storeMaybeAddress(src: MaybeAddress) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.address)
  }
}

export function loadMaybeAddress(slice: Slice) {
  const sc_0 = slice
  const _address = sc_0.loadMaybeAddress()
  return { $$type: 'MaybeAddress' as const, address: _address }
}

export function loadTupleMaybeAddress(source: TupleReader) {
  const _address = source.readAddressOpt()
  return { $$type: 'MaybeAddress' as const, address: _address }
}

export function loadGetterTupleMaybeAddress(source: TupleReader) {
  const _address = source.readAddressOpt()
  return { $$type: 'MaybeAddress' as const, address: _address }
}

export function storeTupleMaybeAddress(source: MaybeAddress) {
  const builder = new TupleBuilder()
  builder.writeAddress(source.address)
  return builder.build()
}

export function dictValueParserMaybeAddress(): DictionaryValue<MaybeAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMaybeAddress(src)).endCell())
    },
    parse: (src) => {
      return loadMaybeAddress(src.loadRef().beginParse())
    },
  }
}

export type JettonUpdateContent = {
  $$type: 'JettonUpdateContent'
  queryId: bigint
  content: Cell
}

export function storeJettonUpdateContent(src: JettonUpdateContent) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(4, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeRef(src.content)
  }
}

export function loadJettonUpdateContent(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 4) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _content = sc_0.loadRef()
  return { $$type: 'JettonUpdateContent' as const, queryId: _queryId, content: _content }
}

export function loadTupleJettonUpdateContent(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _content = source.readCell()
  return { $$type: 'JettonUpdateContent' as const, queryId: _queryId, content: _content }
}

export function loadGetterTupleJettonUpdateContent(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _content = source.readCell()
  return { $$type: 'JettonUpdateContent' as const, queryId: _queryId, content: _content }
}

export function storeTupleJettonUpdateContent(source: JettonUpdateContent) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeCell(source.content)
  return builder.build()
}

export function dictValueParserJettonUpdateContent(): DictionaryValue<JettonUpdateContent> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonUpdateContent(src)).endCell())
    },
    parse: (src) => {
      return loadJettonUpdateContent(src.loadRef().beginParse())
    },
  }
}

export type CustomPayloadWithSendModes = {
  $$type: 'CustomPayloadWithSendModes'
  mode: bigint
  forwardStateInit: StateInit | null
}

export function storeCustomPayloadWithSendModes(src: CustomPayloadWithSendModes) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(src.mode, 32)
    if (src.forwardStateInit !== null && src.forwardStateInit !== undefined) {
      b_0.storeBit(true)
      b_0.store(storeStateInit(src.forwardStateInit))
    } else {
      b_0.storeBit(false)
    }
  }
}

export function loadCustomPayloadWithSendModes(slice: Slice) {
  const sc_0 = slice
  const _mode = sc_0.loadUintBig(32)
  const _forwardStateInit = sc_0.loadBit() ? loadStateInit(sc_0) : null
  return {
    $$type: 'CustomPayloadWithSendModes' as const,
    mode: _mode,
    forwardStateInit: _forwardStateInit,
  }
}

export function loadTupleCustomPayloadWithSendModes(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _forwardStateInit_p = source.readTupleOpt()
  const _forwardStateInit = _forwardStateInit_p ? loadTupleStateInit(_forwardStateInit_p) : null
  return {
    $$type: 'CustomPayloadWithSendModes' as const,
    mode: _mode,
    forwardStateInit: _forwardStateInit,
  }
}

export function loadGetterTupleCustomPayloadWithSendModes(source: TupleReader) {
  const _mode = source.readBigNumber()
  const _forwardStateInit_p = source.readTupleOpt()
  const _forwardStateInit = _forwardStateInit_p ? loadTupleStateInit(_forwardStateInit_p) : null
  return {
    $$type: 'CustomPayloadWithSendModes' as const,
    mode: _mode,
    forwardStateInit: _forwardStateInit,
  }
}

export function storeTupleCustomPayloadWithSendModes(source: CustomPayloadWithSendModes) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.mode)
  if (source.forwardStateInit !== null && source.forwardStateInit !== undefined) {
    builder.writeTuple(storeTupleStateInit(source.forwardStateInit))
  } else {
    builder.writeTuple(null)
  }
  return builder.build()
}

export function dictValueParserCustomPayloadWithSendModes(): DictionaryValue<CustomPayloadWithSendModes> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCustomPayloadWithSendModes(src)).endCell())
    },
    parse: (src) => {
      return loadCustomPayloadWithSendModes(src.loadRef().beginParse())
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

export type JettonTransferInternalWithStateInit = {
  $$type: 'JettonTransferInternalWithStateInit'
  queryId: bigint
  amount: bigint
  sender: Address
  responseDestination: Address | null
  forwardTonAmount: bigint
  forwardStateInit: StateInit | null
  forwardPayload: Slice
}

export function storeJettonTransferInternalWithStateInit(src: JettonTransferInternalWithStateInit) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(395134233, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeAddress(src.responseDestination)
    b_0.storeCoins(src.forwardTonAmount)
    if (src.forwardStateInit !== null && src.forwardStateInit !== undefined) {
      b_0.storeBit(true)
      b_0.store(storeStateInit(src.forwardStateInit))
    } else {
      b_0.storeBit(false)
    }
    b_0.storeBuilder(src.forwardPayload.asBuilder())
  }
}

export function loadJettonTransferInternalWithStateInit(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 395134233) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _forwardTonAmount = sc_0.loadCoins()
  const _forwardStateInit = sc_0.loadBit() ? loadStateInit(sc_0) : null
  const _forwardPayload = sc_0
  return {
    $$type: 'JettonTransferInternalWithStateInit' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
    forwardTonAmount: _forwardTonAmount,
    forwardStateInit: _forwardStateInit,
    forwardPayload: _forwardPayload,
  }
}

export function loadTupleJettonTransferInternalWithStateInit(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardStateInit_p = source.readTupleOpt()
  const _forwardStateInit = _forwardStateInit_p ? loadTupleStateInit(_forwardStateInit_p) : null
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'JettonTransferInternalWithStateInit' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
    forwardTonAmount: _forwardTonAmount,
    forwardStateInit: _forwardStateInit,
    forwardPayload: _forwardPayload,
  }
}

export function loadGetterTupleJettonTransferInternalWithStateInit(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  const _forwardTonAmount = source.readBigNumber()
  const _forwardStateInit_p = source.readTupleOpt()
  const _forwardStateInit = _forwardStateInit_p ? loadTupleStateInit(_forwardStateInit_p) : null
  const _forwardPayload = source.readCell().asSlice()
  return {
    $$type: 'JettonTransferInternalWithStateInit' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
    forwardTonAmount: _forwardTonAmount,
    forwardStateInit: _forwardStateInit,
    forwardPayload: _forwardPayload,
  }
}

export function storeTupleJettonTransferInternalWithStateInit(
  source: JettonTransferInternalWithStateInit,
) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeAddress(source.responseDestination)
  builder.writeNumber(source.forwardTonAmount)
  if (source.forwardStateInit !== null && source.forwardStateInit !== undefined) {
    builder.writeTuple(storeTupleStateInit(source.forwardStateInit))
  } else {
    builder.writeTuple(null)
  }
  builder.writeSlice(source.forwardPayload.asCell())
  return builder.build()
}

export function dictValueParserJettonTransferInternalWithStateInit(): DictionaryValue<JettonTransferInternalWithStateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonTransferInternalWithStateInit(src)).endCell())
    },
    parse: (src) => {
      return loadJettonTransferInternalWithStateInit(src.loadRef().beginParse())
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

export type JettonBurn = {
  $$type: 'JettonBurn'
  queryId: bigint
  amount: bigint
  responseDestination: Address | null
  customPayload: Cell | null
}

export function storeJettonBurn(src: JettonBurn) {
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

export function loadJettonBurn(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1499400124) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _responseDestination = sc_0.loadMaybeAddress()
  const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null
  return {
    $$type: 'JettonBurn' as const,
    queryId: _queryId,
    amount: _amount,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
  }
}

export function loadTupleJettonBurn(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  return {
    $$type: 'JettonBurn' as const,
    queryId: _queryId,
    amount: _amount,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
  }
}

export function loadGetterTupleJettonBurn(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _responseDestination = source.readAddressOpt()
  const _customPayload = source.readCellOpt()
  return {
    $$type: 'JettonBurn' as const,
    queryId: _queryId,
    amount: _amount,
    responseDestination: _responseDestination,
    customPayload: _customPayload,
  }
}

export function storeTupleJettonBurn(source: JettonBurn) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.responseDestination)
  builder.writeCell(source.customPayload)
  return builder.build()
}

export function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell())
    },
    parse: (src) => {
      return loadJettonBurn(src.loadRef().beginParse())
    },
  }
}

export type JettonBurnNotification = {
  $$type: 'JettonBurnNotification'
  queryId: bigint
  amount: bigint
  sender: Address
  responseDestination: Address | null
}

export function storeJettonBurnNotification(src: JettonBurnNotification) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(2078119902, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeCoins(src.amount)
    b_0.storeAddress(src.sender)
    b_0.storeAddress(src.responseDestination)
  }
}

export function loadJettonBurnNotification(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 2078119902) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _amount = sc_0.loadCoins()
  const _sender = sc_0.loadAddress()
  const _responseDestination = sc_0.loadMaybeAddress()
  return {
    $$type: 'JettonBurnNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
  }
}

export function loadTupleJettonBurnNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  return {
    $$type: 'JettonBurnNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
  }
}

export function loadGetterTupleJettonBurnNotification(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _amount = source.readBigNumber()
  const _sender = source.readAddress()
  const _responseDestination = source.readAddressOpt()
  return {
    $$type: 'JettonBurnNotification' as const,
    queryId: _queryId,
    amount: _amount,
    sender: _sender,
    responseDestination: _responseDestination,
  }
}

export function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeNumber(source.amount)
  builder.writeAddress(source.sender)
  builder.writeAddress(source.responseDestination)
  return builder.build()
}

export function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonBurnNotification(src)).endCell())
    },
    parse: (src) => {
      return loadJettonBurnNotification(src.loadRef().beginParse())
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

export type Mint = {
  $$type: 'Mint'
  queryId: bigint
  receiver: Address
  mintMessage: JettonTransferInternalWithStateInit
}

export function storeMint(src: Mint) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(1680571655, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeAddress(src.receiver)
    const b_1 = new Builder()
    b_1.store(storeJettonTransferInternalWithStateInit(src.mintMessage))
    b_0.storeRef(b_1.endCell())
  }
}

export function loadMint(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 1680571655) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _receiver = sc_0.loadAddress()
  const sc_1 = sc_0.loadRef().beginParse()
  const _mintMessage = loadJettonTransferInternalWithStateInit(sc_1)
  return {
    $$type: 'Mint' as const,
    queryId: _queryId,
    receiver: _receiver,
    mintMessage: _mintMessage,
  }
}

export function loadTupleMint(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _receiver = source.readAddress()
  const _mintMessage = loadTupleJettonTransferInternalWithStateInit(source)
  return {
    $$type: 'Mint' as const,
    queryId: _queryId,
    receiver: _receiver,
    mintMessage: _mintMessage,
  }
}

export function loadGetterTupleMint(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _receiver = source.readAddress()
  const _mintMessage = loadGetterTupleJettonTransferInternalWithStateInit(source)
  return {
    $$type: 'Mint' as const,
    queryId: _queryId,
    receiver: _receiver,
    mintMessage: _mintMessage,
  }
}

export function storeTupleMint(source: Mint) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeAddress(source.receiver)
  builder.writeTuple(storeTupleJettonTransferInternalWithStateInit(source.mintMessage))
  return builder.build()
}

export function dictValueParserMint(): DictionaryValue<Mint> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMint(src)).endCell())
    },
    parse: (src) => {
      return loadMint(src.loadRef().beginParse())
    },
  }
}

export type CloseMinting = {
  $$type: 'CloseMinting'
}

export function storeCloseMinting(src: CloseMinting) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(22, 32)
  }
}

export function loadCloseMinting(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 22) {
    throw Error('Invalid prefix')
  }
  return { $$type: 'CloseMinting' as const }
}

export function loadTupleCloseMinting(source: TupleReader) {
  return { $$type: 'CloseMinting' as const }
}

export function loadGetterTupleCloseMinting(source: TupleReader) {
  return { $$type: 'CloseMinting' as const }
}

export function storeTupleCloseMinting(source: CloseMinting) {
  const builder = new TupleBuilder()
  return builder.build()
}

export function dictValueParserCloseMinting(): DictionaryValue<CloseMinting> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCloseMinting(src)).endCell())
    },
    parse: (src) => {
      return loadCloseMinting(src.loadRef().beginParse())
    },
  }
}

export type ChangeOwner = {
  $$type: 'ChangeOwner'
  queryId: bigint
  newOwner: Address
}

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeUint(3, 32)
    b_0.storeUint(src.queryId, 64)
    b_0.storeAddress(src.newOwner)
  }
}

export function loadChangeOwner(slice: Slice) {
  const sc_0 = slice
  if (sc_0.loadUint(32) !== 3) {
    throw Error('Invalid prefix')
  }
  const _queryId = sc_0.loadUintBig(64)
  const _newOwner = sc_0.loadAddress()
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner }
}

export function loadTupleChangeOwner(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _newOwner = source.readAddress()
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner }
}

export function loadGetterTupleChangeOwner(source: TupleReader) {
  const _queryId = source.readBigNumber()
  const _newOwner = source.readAddress()
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner }
}

export function storeTupleChangeOwner(source: ChangeOwner) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.queryId)
  builder.writeAddress(source.newOwner)
  return builder.build()
}

export function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell())
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse())
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

export type JettonMinterFeatureRich$Data = {
  $$type: 'JettonMinterFeatureRich$Data'
  totalSupply: bigint
  owner: Address
  jettonContent: Cell
  mintable: boolean
}

export function storeJettonMinterFeatureRich$Data(src: JettonMinterFeatureRich$Data) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeCoins(src.totalSupply)
    b_0.storeAddress(src.owner)
    b_0.storeRef(src.jettonContent)
    b_0.storeBit(src.mintable)
  }
}

export function loadJettonMinterFeatureRich$Data(slice: Slice) {
  const sc_0 = slice
  const _totalSupply = sc_0.loadCoins()
  const _owner = sc_0.loadAddress()
  const _jettonContent = sc_0.loadRef()
  const _mintable = sc_0.loadBit()
  return {
    $$type: 'JettonMinterFeatureRich$Data' as const,
    totalSupply: _totalSupply,
    owner: _owner,
    jettonContent: _jettonContent,
    mintable: _mintable,
  }
}

export function loadTupleJettonMinterFeatureRich$Data(source: TupleReader) {
  const _totalSupply = source.readBigNumber()
  const _owner = source.readAddress()
  const _jettonContent = source.readCell()
  const _mintable = source.readBoolean()
  return {
    $$type: 'JettonMinterFeatureRich$Data' as const,
    totalSupply: _totalSupply,
    owner: _owner,
    jettonContent: _jettonContent,
    mintable: _mintable,
  }
}

export function loadGetterTupleJettonMinterFeatureRich$Data(source: TupleReader) {
  const _totalSupply = source.readBigNumber()
  const _owner = source.readAddress()
  const _jettonContent = source.readCell()
  const _mintable = source.readBoolean()
  return {
    $$type: 'JettonMinterFeatureRich$Data' as const,
    totalSupply: _totalSupply,
    owner: _owner,
    jettonContent: _jettonContent,
    mintable: _mintable,
  }
}

export function storeTupleJettonMinterFeatureRich$Data(source: JettonMinterFeatureRich$Data) {
  const builder = new TupleBuilder()
  builder.writeNumber(source.totalSupply)
  builder.writeAddress(source.owner)
  builder.writeCell(source.jettonContent)
  builder.writeBoolean(source.mintable)
  return builder.build()
}

export function dictValueParserJettonMinterFeatureRich$Data(): DictionaryValue<JettonMinterFeatureRich$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonMinterFeatureRich$Data(src)).endCell())
    },
    parse: (src) => {
      return loadJettonMinterFeatureRich$Data(src.loadRef().beginParse())
    },
  }
}

type JettonWalletFeatureRich_init_args = {
  $$type: 'JettonWalletFeatureRich_init_args'
  owner: Address
  minter: Address
  balance: bigint
}

function initJettonWalletFeatureRich_init_args(src: JettonWalletFeatureRich_init_args) {
  return (builder: Builder) => {
    const b_0 = builder
    b_0.storeAddress(src.owner)
    b_0.storeAddress(src.minter)
    b_0.storeCoins(src.balance)
  }
}

async function JettonWalletFeatureRich_init(owner: Address, minter: Address, balance: bigint) {
  const __code = Cell.fromHex(
    'b5ee9c724102150100079500022cff008e88f4a413f4bcf2c80bed53208e8130e1ed43d901020033a65ec0bb51343e903e903e8015481b04fe0a95185014901b0d20049401d072d721d200d200fa4021103450666f04f86102f862ed44d0fa40fa40fa0055206c1304e30202d70d1ff2e0822182100f8a7ea5bae302218210178d4519bae3022182107ac8d559ba03040c1100b2028020d7217021d749c21f9430d31f01de208210178d4519ba8e1930d33ffa00596c2113a0c855205acf1658cf1601fa02c9ed54e082107bdd97deba8e18d33ffa00596c2113a0c855205acf1658cf1601fa02c9ed54e05f0402fe31d33ffa00fa4020d70b01c30093fa40019472d7216de201f404fa00516616151443303723fa4430f2d08a8123fff8425290c705f2f4f8416f2424b8a4541432817d7106fa40fa0071d721fa00fa00306c6170f83a12a85230a0801e814e2070f838a0812af870f836aa008208989680a0a0bcf2f4216ee30201206ef2d080050701f4315183a181093e21c2fff2f425f404016e913091d1e250437080407f29481350c96d01c855608210178d45195008cb1f16cb3f5004fa0258cf1601206e9430cf848092cf16e201fa02216eb39f7f01ca0001206ef2d0806f2202cccc947032ca00e201cf16c9543164f82ac855215acf1658cf1601fa02c910380600ac1045102410235f41f90001f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f9040003c8cf8580ca0012cccccf884008cbff01fa028069cf40cf8634f400c901fb0002c855205acf1658cf1601fa02c9ed540294d0d31fd2000195d4d4596f02916de21202d1012171b093352905de6d2274b08e1230814699216eb3f2f4206ef2d0806f226f029131e251a5a10172b0e30245407080407f2a04103948da080a01c245407080407f2a04103948dac855608210178d45195008cb1f16cb3f5004fa0258cf1601206e9430cf848092cf16e201fa02216eb39f7f01ca0001206ef2d0806f2202cccc947032ca00e201cf16c9543163f82ac855215acf1658cf1601fa02c90900bc705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d010341023102750034414c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0002c855205acf1658cf1601fa02c9ed5401fcc855608210178d45195008cb1f16cb3f5004fa0258cf1601206e9430cf848092cf16e201fa02216eb39f7f01ca0001206ef2d0806f2202cccc947032ca00e201cf16c9543163f82ac855215acf1658cf1601fa02c91045103410381045102410235f41f90001f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff710b0066f9040003c8cf8580ca0012cccccf884008cbff01fa028069cf40cf8634f400c901fb0002c855205acf1658cf1601fa02c9ed5401fe31d33ffa00fa4020d70b01c30093fa40019472d7216de201fa00d2000195d4d4596f02916de25416061026102510241023375194a0533870f82ac855215acf1658cf1601fa02c9f842fa44315920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400206ef2d08001ba9a8123fff8422ac705f2f4df0d02fef8416f2421f8276f1021a127c2008ee55531fa40fa0071d721fa00fa00306c6170f83a5240a012a12b6eb38e443b7170284813507ac8553082107362d09c5005cb1f13cb3f01fa0201cf1601cf16c92846145055441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00503306e30d131697108f3c10596c81e2030e1001fe2b206ef2d0806f22705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d02a8200ca9802c705f2f471700d206ef2d0806f222a4a13509cc8553082107362d09c5005cb1f13cb3f01fa0201cf1601cf16c910451049103c4760040555205f41f90001f9005ad765010f006ad76582020134c8cb17cb0fcb0fcbffcbff71f9040003c8cf8580ca0012cccccf884008cbff01fa028069cf40cf8634f400c901fb0000c08208989680b60972fb02256eb39322c2009170e28e3605206ef2d0808100827003c8018210d53276db58cb1fcb3fc9414013441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0092355be202c855205acf1658cf1601fa02c9ed5402fe8e6331fa40d200596d339931f82a4330126f0301926c22e259c8598210ca77fdc25003cb1f01fa02216eb38e137f01ca0001206ef2d0806f235acf1658cf16cc947032ca00e2c90170804043137fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb00e0218210595f07bcbae302333302820b93b1cebae3025bf2c082121401c831d33ffa0020d70b01c30093fa40019472d7216de201f404553030338123fff8425250c705f2f45155a181093e21c2fff2f4f8416f2443305230fa40fa0071d721fa00fa00306c6170f83a817d71811a2c70f836aa0012a012bcf2f47080405413757f061300a0c8553082107bdd97de5005cb1f13cb3f01fa0201cf1601206e9430cf848092cf16e2c9254744441359c8cf8580ca00cf8440ce01fa02806acf40f400c901fb0002c855205acf1658cf1601fa02c9ed54006cfa4001318123fff84213c70512f2f482089896808010fb027083066d40037fc8cf8580ca00cf8440ce01fa02806acf40f400c901fb009fc18b16',
  )
  const builder = beginCell()
  initJettonWalletFeatureRich_init_args({
    $$type: 'JettonWalletFeatureRich_init_args',
    owner,
    minter,
    balance,
  })(builder)
  const __data = builder.endCell()
  return { code: __code, data: __data }
}

export const JettonWalletFeatureRich_errors = {
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
  2366: { message: 'Incorrect balance after send' },
  9215: { message: 'Incorrect sender' },
  10363: { message: 'Unauthorized burn' },
  18073: { message: 'Forward state init is null with deploy send mode' },
  32113: { message: 'Insufficient amount of TON attached' },
  37629: { message: 'Insufficient gas for mint' },
  51864: { message: "Deploy address doesn't match owner address" },
  51950: { message: 'Mint is closed' },
} as const

export const JettonWalletFeatureRich_errors_backward = {
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
  'Incorrect balance after send': 2366,
  'Incorrect sender': 9215,
  'Unauthorized burn': 10363,
  'Forward state init is null with deploy send mode': 18073,
  'Insufficient amount of TON attached': 32113,
  'Insufficient gas for mint': 37629,
  "Deploy address doesn't match owner address": 51864,
  'Mint is closed': 51950,
} as const

const JettonWalletFeatureRich_types: ABIType[] = [
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
    name: 'JettonWalletFeatureRich$Data',
    header: null,
    fields: [
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'minter', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'balance', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
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
    name: 'MaybeAddress',
    header: null,
    fields: [{ name: 'address', type: { kind: 'simple', type: 'address', optional: true } }],
  },
  {
    name: 'JettonUpdateContent',
    header: 4,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'content', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'CustomPayloadWithSendModes',
    header: null,
    fields: [
      { name: 'mode', type: { kind: 'simple', type: 'uint', optional: false, format: 32 } },
      { name: 'forwardStateInit', type: { kind: 'simple', type: 'StateInit', optional: true } },
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
    name: 'JettonTransferInternalWithStateInit',
    header: 395134233,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      {
        name: 'forwardTonAmount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'forwardStateInit', type: { kind: 'simple', type: 'StateInit', optional: true } },
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
    name: 'JettonBurn',
    header: 1499400124,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
      { name: 'customPayload', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'JettonBurnNotification',
    header: 2078119902,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'amount', type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'responseDestination', type: { kind: 'simple', type: 'address', optional: true } },
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
    name: 'Mint',
    header: 1680571655,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'receiver', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'mintMessage',
        type: { kind: 'simple', type: 'JettonTransferInternalWithStateInit', optional: false },
      },
    ],
  },
  { name: 'CloseMinting', header: 22, fields: [] },
  {
    name: 'ChangeOwner',
    header: 3,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'newOwner', type: { kind: 'simple', type: 'address', optional: false } },
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
    name: 'SliceBitsAndRefs',
    header: null,
    fields: [
      { name: 'bits', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'refs', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
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
    name: 'JettonMinterFeatureRich$Data',
    header: null,
    fields: [
      {
        name: 'totalSupply',
        type: { kind: 'simple', type: 'uint', optional: false, format: 'coins' },
      },
      { name: 'owner', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'jettonContent', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'mintable', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
]

const JettonWalletFeatureRich_opcodes = {
  JettonUpdateContent: 4,
  JettonTransfer: 260734629,
  JettonTransferInternalWithStateInit: 395134233,
  JettonNotification: 1935855772,
  JettonBurn: 1499400124,
  JettonBurnNotification: 2078119902,
  JettonExcesses: 3576854235,
  ProvideWalletAddress: 745978227,
  TakeWalletAddress: 3513996288,
  Mint: 1680571655,
  CloseMinting: 22,
  ChangeOwner: 3,
  ProvideWalletBalance: 2059982169,
  TakeWalletBalance: 3396861378,
  ClaimTON: 60010958,
}

const JettonWalletFeatureRich_getters: ABIGetter[] = [
  {
    name: 'get_wallet_data',
    methodId: 97026,
    arguments: [],
    returnType: { kind: 'simple', type: 'JettonWalletData', optional: false },
  },
]

export const JettonWalletFeatureRich_getterMapping: { [key: string]: string } = {
  get_wallet_data: 'getGetWalletData',
}

const JettonWalletFeatureRich_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'typed', type: 'JettonTransfer' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'JettonTransferInternalWithStateInit' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ProvideWalletBalance' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'JettonBurn' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ClaimTON' } },
]

export const SendAllJettonsMode = 1n
export const SendNotDeployReceiversJettonWallet = 2n
export const SendStateInitWithJettonNotification = 4n
export const gasForBurn = 6700n
export const gasForTransfer = 11000n
export const minTonsForStorage = 10000000n
export const Basechain = 0n
export const walletStateInitCells = 30n
export const walletStateInitBits = 20000n

export class JettonWalletFeatureRich implements Contract {
  public static readonly storageReserve = 0n
  public static readonly errors = JettonWalletFeatureRich_errors_backward
  public static readonly opcodes = JettonWalletFeatureRich_opcodes

  static async init(owner: Address, minter: Address, balance: bigint) {
    return await JettonWalletFeatureRich_init(owner, minter, balance)
  }

  static async fromInit(owner: Address, minter: Address, balance: bigint) {
    const __gen_init = await JettonWalletFeatureRich_init(owner, minter, balance)
    const address = contractAddress(0, __gen_init)
    return new JettonWalletFeatureRich(address, __gen_init)
  }

  static fromAddress(address: Address) {
    return new JettonWalletFeatureRich(address)
  }

  readonly address: Address
  readonly init?: { code: Cell; data: Cell }
  readonly abi: ContractABI = {
    types: JettonWalletFeatureRich_types,
    getters: JettonWalletFeatureRich_getters,
    receivers: JettonWalletFeatureRich_receivers,
    errors: JettonWalletFeatureRich_errors,
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
      | JettonTransfer
      | JettonTransferInternalWithStateInit
      | ProvideWalletBalance
      | JettonBurn
      | ClaimTON,
  ) {
    let body: Cell | null = null
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'JettonTransfer'
    ) {
      body = beginCell().store(storeJettonTransfer(message)).endCell()
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'JettonTransferInternalWithStateInit'
    ) {
      body = beginCell().store(storeJettonTransferInternalWithStateInit(message)).endCell()
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'ProvideWalletBalance'
    ) {
      body = beginCell().store(storeProvideWalletBalance(message)).endCell()
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'JettonBurn'
    ) {
      body = beginCell().store(storeJettonBurn(message)).endCell()
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'ClaimTON'
    ) {
      body = beginCell().store(storeClaimTON(message)).endCell()
    }
    if (body === null) {
      throw new Error('Invalid message type')
    }

    await provider.internal(via, { ...args, body: body })
  }

  async getGetWalletData(provider: ContractProvider) {
    const builder = new TupleBuilder()
    const source = (await provider.get('get_wallet_data', builder.build())).stack
    const result = loadGetterTupleJettonWalletData(source)
    return result
  }
}
