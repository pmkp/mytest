var express = require('express');
var router = express.Router();
function submitContents(option) {
            var title = $('#addContentSubject').val();
            var content = $('#addContents').val();
            var writer = $('#addContentWriter').val();
            if(option == 'add') {
                // 새 글 등록 시
                if(title == '' || content == '' || writer == '' ) {
                    alert("제목과 내용, 작성자 모두 있어야합니다.");
                    return;
                } else {
                    $('#writeAction').submit();
                }
            }
        }
function addBoard(title, writer, content, password){
    var newBoardContents = new BoardContents;
    
    newBoardContents.writer = writer;
    newBoardContents.title = title;
    newBoardContents.contents = content;
    newBoardContents.save(function (err) {
        if (err) throw err;
    });
}
module.exports = router;