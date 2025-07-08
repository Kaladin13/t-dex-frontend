import { faker } from '@faker-js/faker'
import { JettonFormData } from '../types/minter'

const DICEBEAR_STYLES = ['bottts', 'fun-emoji']

const generateRandomAvatarUrl = () => {
  const style = DICEBEAR_STYLES[Math.floor(Math.random() * DICEBEAR_STYLES.length)]
  const seed = Math.random().toString(36).substring(7)
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&size=256`
}

const makeWordCapital = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const generateRandomJettonData = (): JettonFormData => {
  const name = `${makeWordCapital(faker.company.catchPhraseAdjective())} ${makeWordCapital(
    faker.company.buzzNoun(),
  )}`

  const symbol = faker.finance.currencyCode().toUpperCase()

  const description = faker.company.catchPhrase()

  // Generate a random avatar URL using DiceBear
  const image = generateRandomAvatarUrl()

  return {
    name,
    symbol,
    description,
    image,
    decimals: 9, // don't change decimals
  }
}
