// api/getSurveyLink.js

// 전역 상태 예제용 (실전에서는 DB 사용!)
if (!global.userSurveyMap) {
    global.userSurveyMap = {};
}
if (!global.counter && global.counter !== 0) {
    global.counter = 0;
}

const surveyLinks = [
    'https://ko.surveymonkey.com/r/CLSLYTW',
    'https://ko.surveymonkey.com/r/KW39F9W',
    'https://ko.surveymonkey.com/r/KW3FLPX'
];

export default function handler(req, res) {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }

        // 이미 user_id에 설문 링크 배정되어 있으면 그대로 반환
        if (global.userSurveyMap[user_id]) {
            return res.status(200).json({ link: global.userSurveyMap[user_id] });
        }

        // 새로 배정
        const linkIndex = global.counter % surveyLinks.length;
        const selectedLink = surveyLinks[linkIndex];

        global.counter += 1;
        global.userSurveyMap[user_id] = selectedLink;

        return res.status(200).json({ link: selectedLink });

    } catch (error) {
        console.error("API ERROR:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}