var submit = document.getElementById('submitButton');
submit.onclick = showImage;     //Submit 버튼 클릭시 이미지 보여주기

function showImage() {
    var newImage = document.getElementById('image-show').lastElementChild;
    newImage.style.visibility = "visible";
    
    document.getElementById('image-upload').style.visibility = 'hidden';

    document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
}


function loadFile(input) {
    var file = input.files[0];

    var name = document.getElementById('fileName');
    name.textContent = file.name;

    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');

    newImage.src = URL.createObjectURL(file);   

    newImage.style.width = "70%";
    newImage.style.height = "70%";
    newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지 숨기기
    newImage.style.objectFit = "contain";

    var container = document.getElementById('image-show');
    container.appendChild(newImage);
};


var test1 = null, test2 = null;
function gridExcelToWeb(file, target){
    var reader = new FileReader();

    reader.onload = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
            var data = evt.target.result;  //해당 데이터, 웹 서버에서 ajax같은거로 가져온 blob 형태의 데이터를 넣어주어도 동작 한다.
            data = new Uint8Array(data);
            var workbook = XLSX.read(data, { type: 'array' });
            var sheetName = '';
            workbook.SheetNames.forEach( function(data, idx){   //시트 여러개라면 이 안에서 반복문을 통해 돌리면 된다.
                if(idx == 0){
                    sheetName = data;
                }
            });
            test1 = workbook;

            var toHtml = XLSX.utils.sheet_to_html(workbook.Sheets[sheetName], { header: '' });

            target.html(toHtml);
            target.find('table').attr({class:'table table-bordered',id:'excelResult'});  //id나 class같은거를 줄 수 있다.
            test2 = toHtml;
            $('#excelResult').find('tr').each(function(idx){
                if(idx <=1 ){ 
                    $(this).css({'background-color':'#969da5a3'});
                }
            });
        }
    };
    reader.readAsArrayBuffer(file);
}    

$('#file').change( function(){
    const selectedFile = $(this)[0].files[0];
    gridExcelToWeb(selectedFile,  $('#grid'))
});