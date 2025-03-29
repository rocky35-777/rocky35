class LoginPopup {
  constructor(kakaoRestKey, returnUrl) {
    this.loginPopup = document.querySelector("#login_popup");
    this.returnUrl = returnUrl;
    this.kakaoLogin = new KakaoLogin(kakaoRestKey, returnUrl);
  }

  handleKakaoLoginClick = (returnUrl) => {
    this.kakaoLogin.returnUrl = returnUrl;
    this.kakaoLogin.kakaoSignIn();
    this.loginPopupClose();
  };

  handleEmailLoginClick = (returnUrl) => {
    location.href = `/auth/signin?returnURL=${returnUrl}`;
    this.loginPopupClose();
  };

  loginPopupClose = () => {
    lhsCommon.modal.close("login_popup", this);
  };

  eventBind = (setReturnUrlCallback) => {
    // 로그인 팝업 - 카카오 로그인 버튼
    this.loginPopup.querySelector("#login_kakao").addEventListener("click", () => {
      if (setReturnUrlCallback) {
        this.returnUrl = setReturnUrlCallback();
      }

      this.handleKakaoLoginClick(this.returnUrl);
    });

    // 로그인 팝업 - 일반 이메일로 로그인 버튼
    this.loginPopup.querySelector("#login_email").addEventListener("click", () => {
      if (setReturnUrlCallback) {
        this.returnUrl = setReturnUrlCallback();
      }

      this.handleEmailLoginClick(this.returnUrl);
    });

    // 로그인 팝업 닫기 이벤트
    this.loginPopup
      .querySelector(".modal_btn_close")
      .removeEventListener("click", this.loginPopupClose);
  };
}
