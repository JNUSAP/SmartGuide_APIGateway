const config = require('./config.json');

function KakaoResponse(id, name, imgPath) {
    if (id == -1)
        return NullKakaoResponse();
    this.message = new KakaoMessage(id, name, imgPath);
    this.keyboard = {
        "type": "text"
    };
}


function NullKakaoResponse() {
    console.log("잘못된 message로 카카오 응답을 생성 시도했습니다.");
    this.message = new FailedKakaoMessage();
    this.keyboard = {
        "type": "text"
    };
}

function KakaoMessage(id, name, imgPath) {
    this.text = name;
    this.photo = new Photo(imgPath);
    this.message_button = new MessageButton(id);
}

function MessageButton(id) {
    this.label = "상세 정보";
    this.url = config.host + "/bdg/" + id;
}



function Photo(imgPath) {
    this.url = imgPath;
    this.width = 640;
    this.height = 480;
}

function FailedKakaoMessage() {
    this.text = "검색에 실패했습니다.";
    this.photo = config.host + "failed";
    this.message_button = new FailedMessageButton();
}

function FailedMessageButton() {
    this.label = "제안하기";
    this.url = config.host + "/failed";
}
/*
{
  "message": {
    "text": "귀하의 차량이 성공적으로 등록되었습니다. 축하합니다!",
    "photo": {
      "url": "https://photo.src",
      "width": 640,
      "height": 480
    },
    "message_button": {
      "label": "주유 쿠폰받기",
      "url": "https://coupon/url"
    }
  },
  "keyboard": {
    "type": "buttons",
    "buttons": [
      "처음으로",
      "다시 등록하기",
      "취소하기"
    ]
  }
}
*/
module.exports = KakaoResponse;