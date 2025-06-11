// api/getSurveyLink.js

export default function handler(req, res) {
    try {
        // query param 안전하게 파싱
        const url = new URL(req.url, `https://${req.headers.host}`);
        const user_id = url.searchParams.get('user_id');

        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }

        // 기존 코드 동일
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

        if (global.userSurveyMap[user_id]) {
            return res.status(200).json({ link: global.userSurveyMap[user_id] });
        }

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
