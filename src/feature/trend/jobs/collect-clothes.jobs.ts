interface trendKeywordType {
    name: string; // 트랜드 키워드명
    aliases: string[] // 트랜드 키워드 별칭
    createdAt: Date; // 트랜드 키워드 생성일
    children: {
        top: string[],
        bottom: string[],
        shoes: string[]
    },
}

// 2026.07.25 트랜드 의류 검색 키워드 조합 생성 함수
// - (트랜드 키워드명 + 상의/하의/신발 검색 키워드) 최종 검색 키워드 조합하여 검색
// - 검색 결과가 없을 경우, (트랜드 키워드 별칭 + 상의/하의/신발 검색 키워드) 조합으로 재검색
const generateKeywordSearchQuery = () => {}

// 2026.07.25 트랜드 의류 검색 키워드를 통한 의류 데이터 조회
export const searchClothesBytrendKeyword = async () => {}