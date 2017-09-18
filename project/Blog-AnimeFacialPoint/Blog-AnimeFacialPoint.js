var img_div = document.getElementById('img');
var img_window_width = document.body.clientWidth;
var img_canvas = img_div.getContext('2d');


var img = new Image();
img.src = './img/nxn.jpg';
img.onload = init; // init

//convert rgb to gray
function getGray(r, g, b) {
    return 0.299 * r + 0.578 * g + 0.114 * b;
}

//img2txt
function init() {




    var left_offset = (img_window_width - img.width) / 2;

    img_div.width = img.width + left_offset;
    img_div.height = img.height;

    img_canvas.drawImage(img, left_offset, 0, img.width, img.height);

    /*var imgData = img_canvas.getImageData(0, 0, img.width, img.height);
    var imgDataArr = imgData.data;
    var imgDataWidth = imgData.width;
    var imgDataHeight = imgData.height;
    for (h = 0; h < imgDataHeight; h += 6) {
        for (w = 0; w < imgDataWidth; w += 6) {
            var index = (w + imgDataWidth * h) * 4;
            var r = imgDataArr[index + 0];
            var g = imgDataArr[index + 1];
            var b = imgDataArr[index + 2];
            var gray = getGray(r, g, b);
            txt_canvas.fillText(toText(gray), w, h);
        }
    }*/

}