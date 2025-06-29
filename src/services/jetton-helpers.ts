import { Sha256 } from '@aws-crypto/sha256-js'
import { Dictionary, Cell, Address } from '@ton/core'
import { Buffer } from 'buffer'
import chalk from 'chalk'

const ONCHAIN_CONTENT_PREFIX = 0x00

const sha256 = (str: string) => {
  const sha = new Sha256()
  sha.update(str)
  return Buffer.from(sha.digestSync())
}

const toKey = (key: string) => {
  return BigInt(`0x${sha256(key).toString('hex')}`)
}

export type Metadata = {
  name: string
  symbol: string
  description: string
  image: string
}

export type JettonParams = {
  address: Address
  metadata: Metadata
  totalSupply: bigint
  owner: Address
  jettonWalletCode: Cell
}

export async function parseMetadataFromCell(metadataCell: Cell) {
  const cs = metadataCell.beginParse()
  const prefix = cs.loadInt(8)
  if (prefix !== ONCHAIN_CONTENT_PREFIX) {
    throw new Error('Invalid metadata prefix')
  }
  const dict = cs.loadDict(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell())
  // In each key we need to skip 8 bits - size of snake prefix.
  const name = dict.get(toKey('name'))?.beginParse().skip(8).loadStringTail()
  const description = dict.get(toKey('description'))?.beginParse().skip(8).loadStringTail()
  const image = dict.get(toKey('image'))?.beginParse().skip(8).loadStringTail()
  const symbol = dict.get(toKey('symbol'))?.beginParse().skip(8).loadStringTail()
  return { name, description, image, symbol }
}

export const displayContentCell = async (content: Cell) => {
  try {
    const result = await parseMetadataFromCell(content)
    console.log(`Token name: ${result.name}`)
    console.log(`Description: ${result.description}`)
    console.log(`Image: ${chalk.underline(result.image)}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.error('Failed to parse metadata from cell')
  }
}
