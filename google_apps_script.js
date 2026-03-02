/**
 * 구글 스프레드시트 연동을 위한 Google Apps Script (GAS) 코드입니다.
 * 1. 구글 스프레드시트 만들기 [확장 프로그램] -> [Apps Script] 클릭
 * 2. 아래 코드를 복사해서 붙여넣고 [배포] -> [새 배포] -> [웹 앱]으로 배포하세요.
 * 3. 액세스 권한은 '모든 사용자(Anyone)'로 설정해야 웹사이트에서 접근 가능합니다.
 */

function doPost(e) {
    try {
        var data = JSON.parse(e.postData.contents);
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

        // 데이터 추출
        var studentId = data.studentId;
        var name = data.name;
        var appliedAt = data.appliedAt;
        var dates = data.dates.join(", "); // 선택한 날짜들을 콤마로 구분

        // 시트에 행 추가 (학번 / 이름 / 신청시간 / 선택 날짜)
        sheet.appendRow([studentId, name, appliedAt, dates]);

        return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function doGet(e) {
    return ContentService.createTextOutput("신청 시스템 서버가 정상 작동 중입니다.");
}
