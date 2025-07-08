export function formatBigInt(value: bigint, decimals: number): string {
  const valueStr = value.toString().padStart(decimals + 1, '0')
  const integerPart = valueStr.slice(0, -decimals)
  const fractionalPart = valueStr.slice(-decimals).replace(/0+$/, '')

  if (fractionalPart.length === 0) {
    return integerPart
  }

  return `${integerPart}.${fractionalPart}`
}
