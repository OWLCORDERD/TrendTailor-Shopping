import slugify from 'slugify'

const ENGLISH_ALIAS_PATTERN = /^[A-Za-z0-9\s-]+$/

export function findEnglishAlias(aliases: string[]): string | undefined {
  return aliases.find((alias) => ENGLISH_ALIAS_PATTERN.test(alias.trim()))
}

// 2026.07.20 영문 alias 기반 Firestore 문서 slug 생성
// 영문 alias가 없거나 slug가 비면 빈 문자열 반환
export function createTrendSlug(keyword: {
  name: string
  aliases: string[]
}) {
  const englishAlias = findEnglishAlias(keyword.aliases)

  if (!englishAlias) {
    return ''
  }

  return slugify(englishAlias, {
    lower: true,
    strict: true,
    trim: true,
  })
}
