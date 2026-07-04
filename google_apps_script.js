/**
 * ===================================================
 * CRC 簡報學習紀錄與測驗成績串接 - Google Apps Script (GAS) 部署說明
 * ===================================================
 * 
 * 部署步驟（只需 1 分鐘）：
 * 1. 開啟您的 Google 雲端硬碟，新建一個「Google 試算表 (Google Sheet)」。
 * 2. 點選選單列的「擴充功能」 -> 「Apps Script」。
 * 3. 清空裡面的程式碼，將本檔案下方的程式碼完全複製貼上。
 * 4. 點選右上角的「部署」 -> 「新增部署」。
 * 5. 種類選擇「網頁應用程式 (Web App)」：
 *    - 說明：CRC 學習紀錄串接
 *    - 執行身分：我 (Me)
 *    - 誰有存取權利：所有人 (Anyone)  <-- 重要！
 * 6. 點擊「部署」，完成授權後複製獲得的「網頁應用程式 URL」。
 * 7. 將該 URL 貼入簡報網頁中的 Google Sheet 設定框中即可！
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 如果是第一行，自動新增表頭
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "填報時間", 
        "姓名/學號", 
        "班級/單位", 
        "測驗總得分", 
        "答對題數", 
        "學習心得/意見回饋", 
        "詳細答題紀錄"
      ]);
      // 格式化表頭樣式
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#0ea5e9").setFontColor("#ffffff");
    }

    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name || "未填寫",
      data.className || "未填寫",
      data.score || 0,
      (data.correctCount || 0) + " / 10 題",
      data.feedback || "無",
      data.details || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("CRC Google Sheet Web App endpoint is running successfully!");
}
