function KakaoResponse(message) {
    if (!(message instanceof KakaoMessage)) return NullKakaoResponse();
    this.message = message;
    this.keyboard = {
        "type": "text"
    };
}

function isInvalidMessage(message) {}

function NullKakaoResponse() {
    console.log(arguments.callee.callr.toString() +
        "에서 잘못된 message로 카카오 응답을 생성 시도했습니다.");
    this.message = {
        "text": "요청 처리 중 오류가 발생했습니다."
    }
    this.keyboard = {
        "type": "text"
    };
}

function KakaoMessage(text, photo, message_button) {
    this.text = text;
    this.photo = new Photo(photo);
    this.message_button = message_button;
}

function Photo(url, width, height) {
    this.url = url;
    this.width = width;
    this.height = height;
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