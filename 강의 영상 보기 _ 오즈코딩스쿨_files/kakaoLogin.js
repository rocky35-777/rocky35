// class KakaoLogin {
//   // constructor(kakao, kakaoRedirectUrl, kakaoAccessToken) {
//   constructor(kakao, kakaoRedirectUrl) {
//     this.kakao = kakao;
//     this.kakaoRedirectUrl = kakaoRedirectUrl;
//     // this.kakaoAccessToken = kakaoAccessToken;
//   }

//   kakaoSignIn = () => {
//     console.log("카카오톡 로그인 클릭");
//     Kakao.Auth.authorize({
//       // 리다이렉트 url 넣어주기
//       state: this.kakao + "&referrer=" + localStorage.getItem("refer"),
//       redirectUri: this.kakaoRedirectUrl,
//     });
//     // Kakao.Auth.setAccessToken(this.kakaoAccessToken, true);
//   };

//   initKakao = () => {
//     if (!Kakao.isInitialized()) {
//       Kakao.init("6ff6b19a2276a5231964239f20c40bb4");
//       Kakao.isInitialized();

//       console.log("[SDK 초기화 여부]");
//       console.log(Kakao.isInitialized());
//     }
//   };
// }

class KakaoLogin {
  constructor(restKey, returnUrl) {
    this.restKey = restKey;
    this.returnUrl = returnUrl;
    this.kakaoRedirectUrl = "https://ozcodingschool.com" + "/oauth";
  }

  kakaoSignIn = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${
      this.restKey
    }&redirect_uri=${this.kakaoRedirectUrl}&response_type=code&state=${
      this.returnUrl
    }&referrer=${localStorage.getItem("refer")}
    }`;
  };
}
