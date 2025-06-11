// api/getSurveyLink.js

let counter = 0; // 메모리 기반 카운터 (간단 예시용)

const surveyLinks = [
    'https://naver.com',
    'https://google.com',
    'https://samsung.com'
];

export default function handler(req, res) {
    const linkIndex = counter % surveyLinks.length;
    const selectedLink = surveyLinks[linkIndex];

    counter += 1;

    res.status(200).json({ link: selectedLink });
}