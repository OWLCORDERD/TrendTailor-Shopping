const currentDate = new Date().getFullYear() + '-' + new Date().getMonth() + 1;

interface MonthlyTrend {
    version: string;
    collectedAt: string;
    styles: {
        style: string;
        brands: string[];
        categories: string[];
    }[];
}

export const MONTHLY_TREND: MonthlyTrend = {
    version: currentDate,
    collectedAt: new Date().toISOString(),
    styles: [
        {
            // 빈티지룩
            style: 'VINTAGE',
            brands: [`Levi's`, 'deadstock', 'polyteru'],
            categories: ['상의', '하의', '아우터'],
        },
        {
            // 오피스룩
            style: 'OFFICE',
            brands: ['ZARA', 'COS', 'UNIQLO'],
            categories: ['상의', '하의', '아우터'],
        },
        {
            // 스포츠룩
            style: 'SPORTIFY',
            brands: ['NIKE', 'ADIDAS', 'NEW BALANCE'],
            categories: ['상의', '하의', '아우터'],
        },
        {
            // 스트릿룩
            style: 'STREET',
            brands: ['Supreme', 'Thisisneverthat', 'LMC'],
            categories: ['상의', '하의', '아우터'],
        },
        {
            // 미니멀룩
            style: 'MINIMAL',
            brands: ['ZARA', 'COS', 'UNIQLO'],
            categories: ['상의', '하의', '아우터'],
        },
    ]
};