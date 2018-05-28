
function doGet(e){
  if(e.parameters.passward=="holo"){//データ要求なら
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("シート1");
    var good=sheet.getRange("D"+1).getValue();    //以前リクエストからの差分の「いいね」数を取得
    var comment = [];
    var lastRow=sheet.getDataRange().getLastRow();
    var j=0;
    for(var i=2; i<=lastRow; i++){//全ての行を探索
      if(sheet.getRange("B"+i).getValue()>sheet.getRange("B"+1).getValue()){//以前のリクエストの時刻より後に保存されたコメントなら
        comment[j] = sheet.getRange("A"+i).getValue();    //以前リクエストからの差分のコメントを取得
        j++;
      }
    }
    sheet.getRange("B"+1).setValue(new Date());    //次回リクエストの時のために今回リクエストの時刻を保存
    sheet.getRange("D"+1).setValue(0);     //次回リクエストの時のために今までの「いいね」数をリセット
    //JSONで返す
    var data={"comments":comment, "niceCount":good};
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);  
  }
  //webアプリケーションにアクセスされたらMain.htmlファイルを渡す
  else {return HtmlService.createTemplateFromFile("Main").evaluate().setTitle('HoloPresenter Webアプリ');} 
}


//htmlから呼び出し
//新規コメントを保存
function CommentSet(str){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("シート1");
  var lastRow=sheet.getDataRange().getLastRow(); //対象となるシートの最終行を取得
  var no=lastRow+1;
  var time = new Date();
  sheet.getRange("A"+no).setValue(str);    //最終行の次の行にコメントを保存
  sheet.getRange("B"+no).setValue(time);    //その時の時刻を保存
}

//htmlから呼び出し
//新規のいいねによるカウントアップ
function GoodSet(){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("シート1");
  var count=sheet.getRange("D"+1).getValue();
  count += 1;
  sheet.getRange("D"+1).setValue(count);    //カウントアップ
}