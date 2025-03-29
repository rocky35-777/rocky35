/**
 * Product Name : DodamSoft OTP / FDS
 * Copyrights DodamSoft Co.,Ltd. all rights reserved.
 * Author : DodamSoft Co.,Ltd. (Y.S.Rhyou)
 * 
 * 주식회사 도담소프트 OTP/FDS 패키지이며, 본 제품은 산업인력공단에 납품 설치되어 산업인력동단에서 제공하는 서비스에 한하여 사용 가능합니다.
 * 이 외의 용도로 무단 사용하거나 복제, 수정 등의 행위가 발생할 경우 저작권법의 적용을 받을 수 있습니다.
 * 아울러 제품 소유자의 허락 없이 무단 수정으로 인한 장애 및 손실에 대해서는 일체의 책임을 지지 않습니다.
 * 
 * 제품 소유자 : 주식회사 도담소프트 류용식  ( Contact email : whynot@dodam-soft.com )
 */

/* ================================================================================================= */

	var DEBUG = true;
	var dataXml = null;
	var otpInterval = null;
	
	/* ======================================================================================== */
	/* HRD URL DEFINE */
	/* ======================================================================================== */
	/*
	var otpSrvUrl = "https://hrd.thinkinnovation.co.kr/fdsService/hrdOTP/JSP/clientService/";
	var imgUrl = "https://hrd.thinkinnovation.co.kr/fdsService/hrdOTP/Library/res/";
	var menuUrl = "https://hrd.thinkinnovation.co.kr/WinApp/HRD_OTP_Menual.zip";
	var menuPdfUrl = "https://hrd.thinkinnovation.co.kr/WinApp/OTP_Manual.pdf";
	var installUrl = "https://hrd.thinkinnovation.co.kr/WinApp/hrdLMS_Setup.exe";
	*/
	var otpSrvUrl = "https://fds.hrdkorea.or.kr/fdsService/hrdOTP/JSP/clientService/";
	var imgUrl = "https://fds.hrdkorea.or.kr/fdsService/hrdOTP/Library/res/";
	var menuUrl = "https://fds.hrdkorea.or.kr/WinApp/HRD_OTP_Menual.zip";
	var menuPdfUrl = "https://fds.hrdkorea.or.kr/WinApp/OTP_Manual.pdf";
	var installUrl = "https://fds.hrdkorea.or.kr/WinApp/hrdLMS_Setup.exe";
	
	/* ======================================================================================== */
	
	var vAgtID = "";
	var vUsrID = "";
	var vSessionID = "";
	var isWinOtpReady = false;
	var isCloud = false;
	var isRegdUser = false;
	var otpStatus = "";
	var devType = "";
	var osModel = "";
	var bzModel = "";
	var otpTerm = 60;
	var utVal = "";
	
	var ViewType;
	var eucYN = false;
	
	var rgdUsr = "101";
	var unrgdUsr = "102";
	
	var devWin = "101";
	var devHtml = "104";
	
	var frmRegiNew = "101";
	var frmNormal  = "102";
	var splitStr = ":IT:";
	
	var otpStatus01 = "StatusNotRgd";   
	var otpStatus02 = "StatusOK";   
	var otpStatus03 = "StatusIncorrectMethod";       // 설치형 / 비설치형
	var otpStatus04 = "StatusIncorrectOS";           // 설치형 / 비설치형
	var otpStatus05 = "StatusIncorrectBrowser";      // 비설치형
	var otpStatus06 = "StatusIncorrectKey";          // 설치형 / 비설치형
	var otpStatus07 = "StatusAppDemaged";
	var otpStatus08 = "StatusStop";                  // OTP 사용중지
	var otpStatus09 = "StatusAppDown";               // OTP 앱 다운로드 안내
	var otpStatus10 = "StatusAppRun";                // OTP 앱 실행
	
	/* Pop Title */
	var tlt01 = "OTP 단말기 등록 및 설정";	
	var tlt02 = "승인되지 않은 접근";	
	var tlt03 = "OTP 비밀번호";	
	var tlt04 = "<font Class='cssFont13'>OTP 사용중지</font>";
	var tlt05 = "<font Class='cssFont13'>OTP 프로그램 설치안내</font>";
	
	/* Pop Info */
	var infoMsg01 = "<CENTER><font Class='cssFont07'>현재 사용 중이신 PC 또는 스마트폰을 OTP 전용 단말기로<br>등록하여 주십시오</font><br><br><font Class='cssFont02'>OTP는 프로그램 설치용 OTP와 프로그램 설치 없이 사용하실 수 있는<br>클라우드 OTP가 제공됩니다.</CENTER><br><br><LI>OTP 프로그램을 설치하시고자 할 경우 하단 [OTP 프로그램 설치] 버튼을 클릭하여 설치 프로그램을 다운로드하신 후 설치하여 주십시오.</LI><LI>비설치형 OTP를 사용하시고자 할 경우 하단 [클라우드 OTP 등록] 버튼을 클릭하여 주십시오.</LI><br></font>";
	var infoMsg02 = "<CENTER><font Class='cssFont13'>기존에 등록된 OTP 사용환경과 불일치하는 환경을 통하여 접근하셨습니다.</font></CENTER>";
	var infoMsg021 = "<CENTER><font Class='cssFont11'>기존 등록된 OTP 사용환경을 통하여 접근하시거나<br>아니면 하단 OTP 재등록 및 프로그램 설치를 통하여<br>접근하여 주십시오.</font></CENTER>";
	var infoMsg03 = "<CENTER><font Class='cssFont07'></font></CENTER>";	
	/* Mobile Frame Info */
	var infoMsg04 = "<CENTER><font Class='cssFont18'>현재 사용 중이신 PC 또는 스마트폰을 OTP 전용 단말기로 등록하여 주십시오</font><br><br><font class='cssFont17'>클라우드 OTP</font><font Class='cssFont16'>는 설치 없이 간편하게 사용하실 수 있는 비설치형 OTP입니다.</font>";
	var infoMsg041 = "<CENTER><font Class='cssFont18'>현재 사용 중이신 PC 또는 스마트폰을 OTP 전용 단말기로 등록하여 주십시오</font><br><br><font class='cssFont17'>클라우드 OTP</font><font Class='cssFont16'>는 설치 없이 간편하게 사용하실 수 있는 비설치형 OTP입니다.<br><font Class='cssFont17'>설치형 OTP</font><font Class='cssFont16'>는 한번 설치 후 브라우저 변경 및 업데이트의 영향을 받지 않고 간편하게 사용하실  수 있습니다.</font>";
	var infoMsg05 = "<CENTER><font Class='cssFont13'>기존에 등록된 OTP 사용환경과 불일치하는<br>환경을 통하여 접근하셨습니다.</font></CENTER>";
	var infoMsg051 = "<CENTER><font Class='cssFont17'>기존 등록된 OTP 사용환경을 통하여 접근하시거나 아니면 하단 OTP 재등록 버튼을 클릭하여 현재 사용하시는 환경으로 재등록하신 후 접근하여 주십시오.</font></CENTER>";
	var infoMsg052 = "<CENTER><font Class='cssFont17'>기존 등록된 OTP 사용환경을 통하여 접근하시거나 아니면 하단 OTP 재등록 버튼을 클릭하여 현재 사용하시는 환경으로 재등록하신 후 접근하여 주십시오.<br>[설치형 OTP]를 사용하시면 브라우저 변경시 마다 OTP 재등록이 필요하지 않습니다.</font></CENTER>";
	
	/* Pop Msg */
	var msg01 = "<font Class='cssFont07'>전산장애가 발생하였습니다<br/>다시 시도하여 주십시오.</font>";	
	var msg01a = "전산장애가 발생하였습니다. 다시 시도하여 주십시오.";	
	var msg02 = "설치형 OTP가 기본 OTP로 등록되어 있습니다.<br/><br/>만일 비설치형 클라우드 OTP를 사용하시고자 할 경우 하단 클라우드 OTP 사용 버튼을 클릭하여 주십시오.";
	var msg03 = "<font Class='cssFont07'>비설치형 클라우드 OTP를 기본 OTP로 사용하시겠습니까?</font><br/><br/><font Class='cssFont02'>이후 현재 사용하고 계시는 기기 및 브라우저를 통하여 OTP를 실행하여 주십시오.</font><br><br><hr/>";
	var msg04 = "<font Class='cssFont09'>위의 6자리 OTP 비밀번호를 아래의 남은 시간까지 인증 창에 입력하여 주십시오.</font><br><br><font Class='cssFont10'>(입력허용 시간 초과 시 새로운 비밀번호가 자동 생성됩니다)</font>";
	var msg05 = "<font Class='cssFont07'>OTP 프로그램이 정상적으로 응답하지 않고 있습니다.<br>OTP 프로그램을 재설치하시거나 클라우드 OTP를 사용하여 주십시오.</font>";	
	/* Mobile Frame Msg */	
	var msg06 = "<font Class='cssFont07'>OTP 사용환경을 변경하시겠습니까?</font><br/><br/><font Class='cssFont02'>이후 현재 사용하고 계시는 기기 및 브라우저를 통하여 OTP를 실행하여 주십시오.</font><br><br><hr/>";
	var msg07 = "<font Class='cssFont07'>OTP 비밀번호가 5회 연속오류로 사용이 제한되었습니다.<br/><br/>OTP를 재사용하시고자 할 경우 해당 훈련기관에서 제공하는 휴대폰인증을 통해 초기화 후 재사용하여 주십시오.</font>";
	var msg08 = "<font Class='cssFont16'>위의 6자리 OTP 비밀번호를 아래의 남은 시간까지 인증 창에 입력하여 주십시오.</font><br><font Class='cssFont17'>입력허용시간 초과 시 새로운 비밀번호가 자동 생성됩니다<br>입력허용시간이 촉박할 경우 기다려주시면 시간이 다시 60초로 갱신됩니다</font>";
	var msg09 = "<font Class='cssFont17'>OTP 비밀번호가 5회 연속오류로 사용이 제한되었습니다.</font><font class='cssFont16'><br/><br/>OTP를 재사용하시고자 할 경우 해당 훈련기관에서 제공하는 휴대폰인증을 통해 초기화 후 재사용하여 주십시오.</font>";
	var msg10 = "비설치형 클라우드 OTP를 기본 OTP로 사용하시겠습니까?\r\n\r\n이후 현재 사용하고 계시는 기기 및 브라우저를 통하여 OTP를 실행하여 주십시오.";
	var msg11 = "현재 사용 중인 환경을 OTP 사용환경으로 재등록하시겠습니까?\r\n\r\n이후 현재 사용하고 계시는 기기 및 브라우저를 통하여 OTP를 실행하여 주십시오.";
	var msg12 = "<font Class='cssFont07'>현재 사용 중인 환경을 OTP 사용환경으로 재등록하시겠습니까?</font><br/><br/><font Class='cssFont02'>이후 현재 사용하고 계시는 기기 및 브라우저를 통하여 OTP를 실행하여 주십시오.</font><br><br></hr>";
	var msg13 = "다운로드 중 오류가 발생하였습니다. 다시 다운로드 버튼을 클릭하여 주십시오.";	
	var msg14 = "<font Class='cssFont17'>설치형 OTP가 설치되어 있지 않거나 최신 버전이 아닙니다.</font><br/><br/><font Class='cssFont16'>설치형 OTP를 사용하시면 브라우저 변경 시마다 OTP를 재등록하실 필요 없이 간편하게 이용 가능합니다.<br>하단 [설치형 OTP 다운로드] 버튼을 클릭하시어 설치 프로그램을 다운로드 받으신 후 설치하여 주십시오.</font>";
	var msg15 = "<font Class='cssFont17'>설치형 OTP를 사용중입니다.</font><br/><br/><font Class='cssFont16'>만일 설치형 OTP 프로그램이 정상작동하지 않을 경우 하단 [설치형 OTP 실행] 버튼을 클릭하여 주십시오.<br>그래도 OTP가 실행되지 않을 경우 하단 [클라우드 OTP 사용] 버튼을 클릭하시어 클라우드 OTP를 실행하여 주십시오.</font>";
	
	/**
	 * Pop Body
	 * <-- titleArea
	 * <-- winCtnt
	 * <-- btnArea
	 * <-- menuArea
	 */
	
	if(typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, ''); 
		}
	}
	
	
/* Step01 */
/* ================================================================================================= */
	
	function initOtpFrame(AGENT_ID, USER_ID, SESSION_ID, TYPEINFO) {
		try {
			clearInterval(otpInterval);
			otpInterval = null;
			
			vAgtID = AGENT_ID;
			vUsrID = USER_ID;
			vSessionID = SESSION_ID;
			ViewType = TYPEINFO;
			
			if(vAgtID == null || vAgtID == "") {
				otpErrHandler("102","Parameter Missing - AGENT_ID Missing");
				return false;
			}
			else if(vUsrID == null || vUsrID == "") {
				otpErrHandler("102","Parameter Missing - USER_ID Missing");
				return false;
			}
			
			initOtpFrameView();
			checkifRegdDevice();
		} catch(e) {
			otpErrHandler("102","OTP 초기화 오류 - " + e.message);
			return false;
		}
	}
	
	
	function setFrameOtpLoader() {
		try {
			var otpStr = "";
			otpStr += "<Table border='0' width='100%' height='150px' cellspacing='0' cellpadding='0' bgcolor='#1c2859'>";
			otpStr += "<Tr height='150px'>";
			otpStr += "<Td width='100%' align='CENTER' valign='MIDDLE'>";
			otpStr += "<img src='"+ imgUrl +"spinner_64.gif' border='0' width='25px' height='25px' >";
			otpStr += "<br><font color='#e6f5ff' Class='cssFont19'>OTP를 로딩중입니다</font>";
			otpStr += "</Td>";
			otpStr += "</Tr>";
			otpStr += "</Table>";
			
			document.getElementById("hrdOtpFrame").innerHTML = otpStr;
		} catch(e) {
		}
	}
	
	/**
	 * 설치형 유도일 경우 본 프로세스 내에 APP 호출. APP 호출 실패 시 별도 안내 DIV 구성.
	 * @returns
	 */
	function setFrameEnvInfo(isAppErr) {
		try {
			/* ******************************************************************************* */	
			hideFrameArea();
			
			var RetVal = $(dataXml).find("RetVal").text();
			var RetMsg = $(dataXml).find("RetMsg").text();
			var Remark = $(dataXml).find("Remark").text();			
			var otpStatus = $(dataXml).find("OtpStatus").text();
			var errCnt = $(dataXml).find("ErrCnt").text();
			var UTStamp = $(dataXml).find("UTStamp").text();
			utVal = UTStamp;
			
			otpTerm = $(dataXml).find("OTPTerm").text();
			
			/* ******************************************************************************* */
			document.getElementById("otpFrameLine").style.height = '5px';
			
			// Step 01. OTP 단말기 등록정보가 있을 경우 
			if(RetVal.indexOf( rgdUsr ) >= 0) { 
				isRegdUser = true;
				
				if(otpStatus == "101" && errCnt > 0 && Remark.trim() != "F") {
					if(getEncodeInfo()) {
						alert("직전까지 OTP 비밀번호 연속오류 횟수가 " + errCnt + "회입니다.\r\n총 5회 연속오류 시 OTP사용이 제한되오니 주의하여 주십시오.");
					} 
				}
				
				// 정상상태
				if(otpStatus == "101") {
					if(RetMsg.indexOf( splitStr ) >= 0) {
						var tmpArr = RetMsg.split( splitStr );
						if(tmpArr[0] != null && tmpArr[0] != undefined && tmpArr[0] != "undefined") 
							devType = tmpArr[0];
					    if(tmpArr[1] != null && tmpArr[1] != undefined && tmpArr[1] != "undefined") 
					    	osModel = tmpArr[1];
					    if(tmpArr[2] != null && tmpArr[2] != undefined && tmpArr[2] != "undefined") 
					    	bzModel = tmpArr[2];
					}
									
					if(ViewType == "App" && devType == "101" && !isAppErr) {  // App
						execOtpProc();
					} 
					else if(ViewType == "App" && isAppErr) {   // App 재설치 유도
						setFrameOtpView(otpStatus09);
					}
					else {  // Cloud
						// Step 02. 비설치형 KEY가 불일치
						if(Remark.trim() == "F") {   
							setFrameOtpView(otpStatus06);
						} 
						// Step 02. 비설치형 KEY 일치
						else {
							setFrameOtpView(otpStatus02);
						}
					}
				} 
				else if(otpStatus == "102") { // 사용중지 상태
					setFrameOtpView(otpStatus08);
					return false;
				}
				// 조회 중 장애발생
				else {
					otpErrHandler("102","OTP 사용자 정보조회 오류");
					return false;
				}
			} 
			// Step 01. 처음 진입 (OTP 단말정보 등록기록이 없음)	
			else if(RetVal.indexOf( unrgdUsr ) >= 0) {  
				/*
					OTP가 설치되어 있지 않을 경우
					기존에 FDS(OTP) New Version이 설치되어 있을 경우 APP으로 실행 (실행 오류 시 팝업).				
				*/						
				isRegdUser = false;	
					
				if(ViewType == "App" && isAppErr) {  // App
					setFrameOtpView(otpStatus09);
				} else {
					setFrameOtpView(otpStatus01);
				}
			} 
			// Step 01. 전산오류 : 기타오류
			else { 
				otpErrHandler("102","OTP 사용자 정보조회 오류");
				return false;
			}
		} catch(e) {
			otpErrHandler("102","OTP 사용자 정보조회 오류");
			return false;
		}
	}
	
	
	function hideFrameArea() {
		try {
			document.getElementById("hrdOtpFrame").style.height = "0px";
		} catch(e) {
			otpErrHandler("102","OTP UI 구성 중 장애발생 - " + e.message);
			return false;
		}
	}
	
	function showFrameArea() {
		try {
			document.getElementById("hrdOtpFrame").style.height = 
				document.getElementById("hrdOtpFrame").scrollHeight;
		} catch(e) {
			otpErrHandler("102","OTP UI 구성 중 장애발생 - " + e.message);
			return false;
		}
	}

	
/* Step02 */
/* ================================================================================================= */
	
	function checkifRegdDevice() {
		dataXml = null;
		var colVal = hrdClientGetNIDeviceKey();
		try {
			if($.ajaxSetup !== "undefined")
				$.ajaxSetup({ cache: false });
			
			if($.support.cors !== "undefined")
				$.support.cors = true;
			
			$.ajax({
				type : "POST",
				url  : otpSrvUrl + "isRegisteredUser.jsp",
				timeout : 3000,
				crossDomain: true,
				data : {
					agtId : vAgtID,
					usrId : vUsrID,
					colVal: colVal
				},
				dataType : "xml",
				success : function(xml) {
					dataXml = xml;
					
					if(ViewType == null || ViewType == "") {
						otpErrHandler("102","시스템 오류 - 참조값 누락 - VIEWTYPE");
						return false;
					}
					setFrameEnvInfo();
				},
				error : function(xhr, textStatus, error) {
					otpErrHandler("102","OTP 서버통신 장애 - " + error);
					return false;	
				}
			});
			
		} catch(e) {
			otpErrHandler("102","OTP 서버통신 장애 - " + e.message);
			return false;		
		}
	}
	
	function confirmSimpleOtpRegi() {
		try {
			if(getEncodeInfo()) {
				if(confirm(msg10)) {
					isCloud = true;
					regiNIOtpDeviceInfo();
				} 
			} else {
				isCloud = true;
				regiNIOtpDeviceInfo();
			}
			
		} catch(e) {
			otpErrHandler("102","OTP UI 구성 중 장애발생 - " + e.message);
			return false;
		}
	}
	
	function confirmSimpleOtpUpdate() {
		try {
			if(getEncodeInfo()) {
				if(confirm(msg11)) {
					isCloud = true;
					regiNIOtpDeviceInfo();
				} 
			} else {
				isCloud = true;
				regiNIOtpDeviceInfo();
			}
			
		} catch(e) {
			otpErrHandler("102","OTP UI 구성 중 장애발생 - " + e.message);
			return false;
		}
	}
	
	function regiNIOtpDeviceInfo() {
		
		try {
			var _devType = "";
			var _osModel = "";
			var _bzModel = "";
			var _otpKey = "";
			var _remark = "";
			
			_devType = devHtml;
			_osModel = hrdClientGetOS();
			_bzModel = hrdClientGetBrowser();
			_otpKey = hrdClientGetNIDeviceKey();
			
			if($.ajaxSetup !== "undefined")
				$.ajaxSetup({ cache: false });
			
			if($.support.cors !== "undefined")
				$.support.cors = true;
			
			$.ajax({
				type : "POST",
				url  : otpSrvUrl + "regiOtpDevice.jsp",
				crossDomain: true,
				data : {
					agtId : vAgtID,
					usrId : vUsrID,
					sessionId : vSessionID,
					devType : _devType,
					osModel : _osModel,
					bzModel : _bzModel,
					otpKey : _otpKey,
					remark : _remark
				},
				dataType : "xml",
				success : function(xml) {
					if($(xml).find("RetVal").text().indexOf("101") >= 0) {
						setFrameOtpView(otpStatus02);
						fillHtmlOTPNumber();
					} else {
						if(getEncodeInfo()) {
							alert(msg01a);
						} else {
							if(typeof EucMsg !== 'undefined' && typeof EucMsg === 'function') {
								EucMsg(1);
							}
						}
					}
				},
				error : function(xhr, textStatus, error) {
					if(getEncodeInfo()) {
						alert(msg01a);
					} else {
						if(typeof EucMsg !== 'undefined' && typeof EucMsg === 'function') {
							EucMsg(1);
						}
					}
				}
			});
		} catch(e) {
			if(getEncodeInfo()) {
				alert(msg01a);
			} else {
				if(typeof EucMsg !== 'undefined' && typeof EucMsg === 'function') {
					EucMsg(1);
				}
			}
		}
	}
	
	function fillHtmlOTPNumber(prvKey) {
		if(fillOtpNumberView()) {
			
			if(prvKey == null || prvKey == "") {
				if(typeof OtpDoneListener !== 'undefined' && typeof OtpDoneListener === 'function') {
					OtpDoneListener("101");
				}
			}
			
			updateUTinfo(prvKey);
		} else {
			otpErrHandler("102","OTP UI 구성 중 장애발생");
			return false;
		}
	}
	
	function updateUTinfo(prvKey) {
		var colVal = hrdClientGetNIDeviceKey();
		try {
			if($.ajaxSetup !== "undefined")
				$.ajaxSetup({ cache: false });
			
			if($.support.cors !== "undefined")
				$.support.cors = true;
			
			$.ajax({
				type : "POST",
				url  : otpSrvUrl + "chkSrvUT.jsp",
				timeout : 3000,
				crossDomain: true,
				data : {
				},
				dataType : "xml",
				success : function(xml) {
					
					if(ViewType == null || ViewType == "") {
						otpErrHandler("102","시스템 오류 - 참조값 누락 - VIEWTYPE");
						return false;
					}
					
					var srvUT = $(xml).find("UTStamp").text();
					var pKey = hrdClientGetNIDeviceKey();
					
					if(srvUT == null || srvUT == "") {
						otpErrHandler("102","OTP 서버통신 장애 - 시간 동기화 오류");
						return false;
					} else {
						var oKey = genHrdOtpNumber(colVal, srvUT);
						
						if(oKey == "000000") {
							if(getEncodeInfo()) {
								alert(msg01a);
							} else {
								if(typeof EucMsg !== 'undefined' && typeof EucMsg === 'function') {
									EucMsg(1);
								}
							}
							return false;
						} else if(oKey == "" || oKey == null) {
							if(getEncodeInfo()) {
								alert(msg01a);
							} else {
								if(typeof EucMsg !== 'undefined' && typeof EucMsg === 'function') {
									EucMsg(1);
								}
							}
							return false;
						}
						
						clearInterval(otpInterval);
						otpInterval = null;
						
						oKey = String(oKey);

						document.getElementById("oNo1").innerHTML = "<font Class='cssFont14'>" + oKey.charAt(0) + "</font>";
						document.getElementById("oNo2").innerHTML = "<font Class='cssFont14'>" + oKey.charAt(1) + "</font>";
						document.getElementById("oNo3").innerHTML = "<font Class='cssFont14'>" + oKey.charAt(2) + "</font>";
						document.getElementById("oNo4").innerHTML = "<font Class='cssFont14'>" + oKey.charAt(3) + "</font>";
						document.getElementById("oNo5").innerHTML = "<font Class='cssFont14'>" + oKey.charAt(4) + "</font>";
						document.getElementById("oNo6").innerHTML = "<font Class='cssFont14'>" + oKey.charAt(5) + "</font>";
					
						initTimer(oKey, srvUT);
					}
				},
				error : function(xhr, textStatus, error) {
					otpErrHandler("102","OTP 서버통신 장애 - 시간 동기화 오류 - " + error);
					return false;	
				}
			});
		} catch(e) {
			otpErrHandler("102","OTP 서버통신 장애 - 시간 동기화 오류 - " + e.message);
			return false;		
		}
	}
	
	function initTimer(prvKey, srvUT) {
		try {
			var rSec = 60;
			if(!isNaN(otpTerm)) rSec = otpTerm;
			
			var dt = new Date(srvUT * 1000);
			var sc = dt.getSeconds();
			
			if(sc > rSec) {
				rSec = rSec - (sc - rSec);
			} else if(sc == rSec) { 
				rSec = rSec;
			} else {
				rSec = rSec - sc;
			}
			
			otpInterval = setInterval(function() {
								--rSec;
								document.getElementById("remainSec").innerHTML = "";
								document.getElementById("remainSec").innerHTML = String(rSec);
								
								if(rSec == 0) {
									rSec = 60;
									fillHtmlOTPNumber(prvKey);
								}
							},1000);
		} catch(e) {
			otpErrHandler("102","타이머 초기화 오류 - " + error);
			return false;	
		}
	}
	
/* Step03 */
/* ================================================================================================= */
	
	function initOtpFrameView() {
		try {
			hideFrameArea();
			
			var otpStr = "";

			otpStr = "";		
			otpStr += "<Table border='0' width='100%' height='0' cellspacing='0' cellpadding='0' bgcolor='#ffffff'>";
			otpStr += "<Tr height='0'>";
			otpStr += "<Td bgcolor='#1c2859' style='background-size:100% 100%;'>";
			otpStr += "<Div id='winCtnt'></Div>";
			otpStr += "</Td>";
			otpStr += "</Tr>";
			otpStr += "</Table>";
			
			otpStr += "<Table border='0' width='100%' height='0' cellspacing='0' cellpadding='0'>";
			otpStr += "<Tr height='0'>";
			otpStr += "<Td width='100%' align='CENTER'>";
			otpStr += "<Table id='otpFrameLine' border='0' width='100%' height='0' cellspacing='0' cellpadding='0'>";
			otpStr += "<Tr>";
			otpStr += "<Td width='20%' bgcolor='#0382d7'></Td>";
			otpStr += "<Td width='20%' bgcolor='#98d5ff'></Td>";
			otpStr += "<Td width='20%' bgcolor='#f89102'></Td>";
			otpStr += "<Td width='20%' bgcolor='#ff3133'></Td>";
			otpStr += "<Td width='20%' bgcolor='#02a33d'></Td>";
			otpStr += "</Tr>";
			otpStr += "</Table>";
			otpStr += "</Td>";
			otpStr += "</Tr>";
			otpStr += "<Tr height='0'>";
			otpStr += "<Td width='100%' bgcolor='#13181e'>";
			otpStr += "<Div id='btnArea'></Div>";
			otpStr += "</Td>";
			otpStr += "</Tr>";
			otpStr += "<Tr height='0'>";
			otpStr += "<Td width='100%' align='RIGHT' bgcolor='#13181e'>";
			otpStr += "<Div id='menuArea'></Div>";
			otpStr += "</Td>";
			otpStr += "</Tr>";
			otpStr += "</Table>";
			
			document.getElementById("hrdOtpFrame").innerHTML = otpStr;
			
		} catch(e) {
			otpErrHandler("102","OTP UI 구성 중 장애발생 - " + e.message);
			return false;
		} 
	}
	
	
	/**
	 * 
	 * @param rType
	 * @returns
	 */
	function setFrameOtpView(rType) {
		try {
			rType = rType.trim();
			
			// 화면 초기화	
			document.getElementById("winCtnt").innerHTML = "";
			document.getElementById("btnArea").innerHTML = "";
			document.getElementById("menuArea").innerHTML = "";			
			
			var ctnStr = "";
			var btnStr = "";			
			var docStr = "";
						
			hideFrameArea();
			
			ctnStr = setFrameCtntArea(rType);
			
			var bWidth = 0;
			if(detectMobileDevice()) {
				bWidth = 40;
			} else {
				bWidth = 26;
			}
		
			var vOS = hrdClientGetOS();
			if(vOS.indexOf("Windows") >= 0 || navigator.userAgent.indexOf("Windows") >= 0) {
				if(getEncodeInfo()) {
					docStr = "<a href='"+ menuUrl +"' style='text-decoration:none'><font Class='cssFont06'>➽ 사용자매뉴얼 다운로드</font></a>";
				} else {
					docStr = "<a href='"+ menuUrl +"' style='text-decoration:none'><img src='"+ imgUrl +"btn_menudown.jpg' border='0' style='width:"+ bWidth +"%;margin-top:5px;margin-bottom:10px'></a>";
				}
			} else {
				if(getEncodeInfo()) {
					docStr = "<a href='"+ menuPdfUrl +"' style='text-decoration:none' target='_blink'><font Class='cssFont06'>➽ 사용자매뉴얼 다운로드</font></a>";
				} else {
					docStr = "<a href='"+ menuPdfUrl +"' style='text-decoration:none' target='_blink'><img src='"+ imgUrl +"btn_menudown.jpg' border='0' style='width:"+ bWidth +"%;margin-top:5px;margin-bottom:10px'></a>";
				}
			}
			
			btnStr = setFrameBtnArea(rType);
				
			if(rType == otpStatus02) {
				document.getElementById("btnArea").innerHTML = btnStr;		
				document.getElementById("menuArea").innerHTML = docStr;
				
				fillHtmlOTPNumber();
				showFrameArea();
			} else if(rType == otpStatus10) {
				setTimeout(function () {    
					document.getElementById("btnArea").innerHTML = btnStr;		
					document.getElementById("menuArea").innerHTML = docStr;
					document.getElementById("winCtnt").innerHTML = ctnStr;	
					
					showFrameArea();
					setTimeout(function () {    
						showFrameArea();
						setTimeout(function () {    
							showFrameArea();
						}, 100);
					}, 50);
				}, 2000);
			} else {
				document.getElementById("btnArea").innerHTML = btnStr;		
				document.getElementById("menuArea").innerHTML = docStr;
				document.getElementById("winCtnt").innerHTML = ctnStr;	
				
				showFrameArea();
				setTimeout(function () {    
					showFrameArea();
					setTimeout(function () {    
						showFrameArea();
					}, 100);
				}, 50);
			}
			
		} catch(e) {
			otpErrHandler("102","OTP UI 구성 중 장애발생 - " + e.message);
			return false;
		}
	}
	
	
	function setFrameCtntArea(rType) {
		var htmlStr = "";
		
		try {
			var vOS = hrdClientGetOS();
			rType = rType.trim();
			
			if(rType == otpStatus01) { 
				htmlStr = "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
				htmlStr += "<Tr>";
				htmlStr += "<Td style='padding:10px'>";
				if(ViewType == "App" && (vOS.indexOf("Windows") >= 0 || navigator.userAgent.indexOf("Windows") >= 0)) {
					if(getEncodeInfo()) {
						htmlStr += infoMsg041;
					} else {
						htmlStr += "<img src='"+ imgUrl +"msg01.png' border='0' style='width:100%'>";
					}
				} else {
					if(getEncodeInfo()) {
						htmlStr += infoMsg04;
					} else {
						htmlStr += "<img src='"+ imgUrl +"msg02.png' border='0' style='width:100%'>";
					}
				}
				htmlStr += "</Td>";
				htmlStr += "</Tr>";
				htmlStr += "</Table>";	
			}
			else if(rType == otpStatus06 || rType == otpStatus07) {
				var vMsg01 = "";
				if(devType.indexOf( devWin ) >= 0) {
					vMsg01 = "<font Class='cssFont17'>프로그램 설치형 OTP</font>";
				} else {
					vMsg01 = "<font Class='cssFont17'>비설치형 클라우드 OTP</font>";
				}
				
				var vMsg02 = "";
				if(devType.indexOf( devWin ) >= 0) {
					vMsg02 = "<LI><font Class='cssFont16'>운영체제 : <b>"+ osModel +"</b></font></LI>";
				} else {
					vMsg02 = "<LI><font Class='cssFont16'>운영체제 : <b>"+ osModel +"</b></font></LI><LI><font Class='cssFont16'>브라우저 : <b>"+ bzModel +"</b></font></LI>";
				}
				
				htmlStr = "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
				htmlStr += "<Tr>";
				htmlStr += "<Td style='padding:20px'>";
				if(getEncodeInfo()) {
					if(detectMobileDevice()) {
						htmlStr += infoMsg05 + "<br>";
					} else {
						htmlStr += infoMsg02 + "<br>";
					}
				
					if(getEncodeInfo()) {
						htmlStr += "<font Class='cssFont16'><b>기존 등록된 사용환경 : </font>"+ vMsg01 +"<br>";
						htmlStr += vMsg02;
					}
					
					if(ViewType == "App" && (vOS.indexOf("Windows") >= 0 || navigator.userAgent.indexOf("Windows") >= 0)) {
						htmlStr += infoMsg052;
					} else {
						htmlStr += infoMsg051;
					}
				
				} else {
					htmlStr += "<img src='"+ imgUrl +"msg03.png' border='0' style='width:100%'>";
				}
				
				htmlStr += "</Td>";
				htmlStr += "</Tr>";
				htmlStr += "</Table>";
			} else if(rType == otpStatus08) {
				var vMsg01 = "";
				if(getEncodeInfo()) {
					htmlStr = "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
					htmlStr += "<Tr height='10px'><Td colspan='2'></Td></Tr>";
					htmlStr += "<Tr height='30px'>";
					htmlStr += "<Td width='40%' align='RIGHT' style='padding:5px'>";
					htmlStr += "<img src='"+ imgUrl +"warning_b2.png' border='0' height='30px'>";
					htmlStr += "</Td>";
					htmlStr += "<Td width='60%' style='padding:5px'>";
					htmlStr += tlt04;
					htmlStr += "</Td>";
					htmlStr += "</Tr>";
					htmlStr += "<Tr height='10px'><Td colspan='2'></Td></Tr>";
					htmlStr += "<Tr height='30px'>";
					htmlStr += "<Td colspan='2' align='CENTER'>"+ msg09 +"</Td></Tr>";
					htmlStr += "<Tr height='5px'><Td colspan='2'></Td></Tr>";
					htmlStr += "</Table>";
				} else {
					htmlStr = "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
					htmlStr += "<Tr>";
					htmlStr += "<Td width='100%' align='RIGHT' style='padding:5px'>";
					htmlStr += "<img src='"+ imgUrl +"msg04.png' border='0' style='width:100%'>";
					htmlStr += "<Tr height='5px'><Td colspan='2'></Td></Tr>";
					htmlStr += "</Table>";
				}
			} else if(rType == otpStatus09) {
				var vMsg01 = "";
				if(getEncodeInfo()) {
					htmlStr = "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
					htmlStr += "<Tr height='10px'><Td colspan='2'></Td></Tr>";
					htmlStr += "<Tr height='30px'>";
					htmlStr += "<Td width='40%' align='RIGHT' style='padding:5px'>";
					htmlStr += "<img src='"+ imgUrl +"warning_b2.png' border='0' height='30px'>";
					htmlStr += "</Td>";
					htmlStr += "<Td width='60%' style='padding:5px'>";
					htmlStr += tlt05;
					htmlStr += "</Td>";
					htmlStr += "</Tr>";
					htmlStr += "<Tr height='10px'><Td colspan='2'></Td></Tr>";
					htmlStr += "<Tr height='30px'>";
					htmlStr += "<Td colspan='2' align='CENTER'>"+ msg14 +"</Td></Tr>";
					htmlStr += "<Tr height='5px'><Td colspan='2'></Td></Tr>";
					htmlStr += "</Table>";
				} else {
					htmlStr = "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
					htmlStr += "<Tr>";
					htmlStr += "<Td width='100%' align='RIGHT' style='padding:5px'>";
					htmlStr += "<img src='"+ imgUrl +"msg05.png' border='0' style='width:100%'>";
					htmlStr += "<Tr height='5px'><Td colspan='2'></Td></Tr>";
					htmlStr += "</Table>";
				}
			} else if(rType == otpStatus10) {
				var vMsg01 = "";
				if(getEncodeInfo()) {
					htmlStr = "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
					htmlStr += "<Tr height='10px'><Td colspan='2'></Td></Tr>";
					htmlStr += "<Tr height='10px'><Td colspan='2'></Td></Tr>";
					htmlStr += "<Tr height='30px'>";
					htmlStr += "<Td colspan='2' align='CENTER'>"+ msg15 +"</Td></Tr>";
					htmlStr += "<Tr height='5px'><Td colspan='2'></Td></Tr>";
					htmlStr += "</Table>";
				} else {
					htmlStr = "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
					htmlStr += "<Tr>";
					htmlStr += "<Td width='100%' align='RIGHT' style='padding:5px'>";
					htmlStr += "<img src='"+ imgUrl +"msg06.png' border='0' style='width:100%'>";
					htmlStr += "<Tr height='5px'><Td colspan='2'></Td></Tr>";
					htmlStr += "</Table>";
				}
			}
						
			return htmlStr;
		} catch(e) {
			otpErrHandler("102","OTP UI 구성 중 장애발생 - " + e.message);
			return false;
		}
	}
	
	
	function setFrameBtnArea(rType) {
		var htmlStr = "";
		
		try {
			var vOS = hrdClientGetOS();
			var useXDR = window.XDomainRequest;
			
			if(ViewType == null || ViewType == "") {
				otpErrHandler("102","시스템 오류 - 참조값 누락 - VIEWTYPE");
				return false;
			}
			
			rType = rType.trim();
			
			var bWidth = 0;
			if(detectMobileDevice()) {
				bWidth = 50;
			} else {
				bWidth = 22;
			}
	
			if(rType == otpStatus01) { 
				htmlStr = "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
				htmlStr += "<Tr height='40px'>";
				htmlStr += "<Td width='100%' align='CENTER'>";
				if(ViewType == "App" && (vOS.indexOf("Windows") >= 0 || navigator.userAgent.indexOf("Windows") >= 0)) {
					if($.get !== "undefined" || useXDR) {
						if(getEncodeInfo()) {
							htmlStr += "<input type='button' id='setApp' value='설치형 OTP 등록' onclick='javascript:execOtpProc();' style='width:170px;height:30px;margin-right:15px' Class='btnType05'>";
						} else {
							htmlStr += "<a href='javascript:execOtpProc();' style='margin-right:20'><img src='"+ imgUrl +"btn_inst01.jpg' border='0' style='width:"+ bWidth +"%;margin-top:10'></a>&nbsp&nbsp&nbsp&nbsp";
						}
					} 
				}
				if(getEncodeInfo()) {
					htmlStr += "<input type='button' id='setCloud' value='클라우드 OTP 등록' onclick='javascript:confirmSimpleOtpRegi();' style='width:140px;height:30px' Class='btnType05'>";
				} else {
					htmlStr += "<a href='javascript:confirmSimpleOtpRegi();'><img src='"+ imgUrl +"btn_uninst01.jpg' border='0' style='width:"+ bWidth +"%;margin-top:10'></a>";
				}
				
				htmlStr += "</Td>";
				htmlStr += "</Tr>";
				htmlStr += "</Table>";
			}
			else if(rType == otpStatus02) { 
				htmlStr = "<Table border='0' width='100%' height='100%' cellspacing='0' cellpadding='0'>";
				htmlStr += "<Tr height='10px'>";
				htmlStr += "<Td width='100%'>";
				htmlStr += "</Td>";
				htmlStr += "</Tr>";
				htmlStr += "</Table>";
			}
			else if(rType == otpStatus06) { 
				htmlStr = "<Table border='0' width='100%' height='100%' cellspacing='0' cellpadding='0'>";
				htmlStr += "<Tr height='40px'>";

				htmlStr += "<Td width='100%' align='CENTER'>";
				if(ViewType == "App" && (vOS.indexOf("Windows") >= 0 || navigator.userAgent.indexOf("Windows") >= 0)) {
					if($.get !== "undefined" || useXDR) {
						if(getEncodeInfo()) {
							htmlStr += "<input type='button' id='setApp' value='설치형 OTP 등록' onclick='javascript:execOtpProc();' style='width:170px;height:30px;margin-right:15px' Class='btnType05'>";
						} else {
							htmlStr += "<a href='javascript:execOtpProc();' style='margin-right:20'><img src='"+ imgUrl +"btn_inst01.jpg' border='0' style='width:"+ bWidth +"%;margin-top:10'></a>&&nbsp&nbsp&nbsp&nbsp";
						}
					}
				} 
				if(getEncodeInfo()) {
					htmlStr += "<input type='button' id='setCloud' value='클라우드 OTP 재등록' onclick='javascript:confirmSimpleOtpUpdate();' style='width:160px;height:30px' Class='btnType05'>";
				} else {
					htmlStr += "<a href='javascript:confirmSimpleOtpUpdate();'><img src='"+ imgUrl +"btn_uninst02.jpg' border='0' style='width:"+ bWidth +"%;margin-left:20;margin-top:10'></a>";
				}
				
				htmlStr += "</Td>";			
				
				htmlStr += "</Tr>";
				htmlStr += "</Table>";
			}
			else if(rType == otpStatus07) { 
				htmlStr = "<Table border='0' width='100%' height='100%' cellspacing='0' cellpadding='0'>";
				htmlStr += "<Tr height='40px'>";
				htmlStr += "<Td width='100%' align='CENTER'>";
				if(getEncodeInfo()) {
					htmlStr += "<input type='button' id='setCloud' value='클라우드 OTP 사용' onclick='javascript:confirmSimpleOtpRegi();' style='width:140px;height:30px' Class='btnType05'>";
				} else {
					htmlStr += "<a href='javascript:confirmSimpleOtpRegi();'><img src='"+ imgUrl +"btn_uninst03.jpg' border='0' style='width:"+ bWidth +"%;margin-top:10'></a>";
				}
				htmlStr += "</Td>";
				htmlStr += "</Tr>";
				htmlStr += "</Table>";
			}
			else if(rType == otpStatus09) { 
				htmlStr = "<Table border='0' width='100%' height='100%' cellspacing='0' cellpadding='0'>";
				htmlStr += "<Tr height='40px'>";
				htmlStr += "<Td width='100%' align='CENTER'>";
				if(ViewType == "App" && (vOS.indexOf("Windows") >= 0 || navigator.userAgent.indexOf("Windows") >= 0)) {
					if($.get !== "undefined" || useXDR) {
						if(getEncodeInfo()) {
							htmlStr += "<input type='button' id='setApp' value='설치형 OTP 다운로드' onclick='javascript:downWinApp();' style='width:170px;height:30px;margin-right:15px' Class='btnType05'>";
						} else {
							htmlStr += "<a href='javascript:downWinApp();' style='margin-right:20'><img src='"+ imgUrl +"btn_inst02.jpg' border='0' style='width:"+ bWidth +"%;margin-top:10'></a>&&nbsp&nbsp&nbsp&nbsp";
						}
					}
				}
				if(getEncodeInfo()) {
					htmlStr += "<input type='button' id='setCloud' value='클라우드 OTP 사용' onclick='javascript:confirmSimpleOtpRegi();' style='width:140px;height:30px' Class='btnType05'>";
				} else {
					htmlStr += "<a href='javascript:confirmSimpleOtpRegi();'><img src='"+ imgUrl +"btn_uninst03.jpg' border='0' style='width:"+ bWidth +"%;margin-left:20;margin-top:10'></a>";
				}
				
				htmlStr += "</Td>";
				htmlStr += "</Tr>";
				htmlStr += "</Table>";
			}
			else if(rType == otpStatus10) { 
				htmlStr = "<Table border='0' width='100%' height='100%' cellspacing='0' cellpadding='0'>";
				htmlStr += "<Tr height='40px'>";
				htmlStr += "<Td width='100%' align='CENTER'>";
				if(ViewType == "App" && (vOS.indexOf("Windows") >= 0 || navigator.userAgent.indexOf("Windows") >= 0)) {
					if($.get !== "undefined" || useXDR) {
						if(getEncodeInfo()) {
							htmlStr += "<input type='button' id='setApp' value='설치형 OTP 실행' onclick='javascript:execOtpProc();' style='width:170px;height:30px;margin-right:15px' Class='btnType05'>";
						} else {
							htmlStr += "<a href='javascript:execOtpProc();' style='margin-right:20'><img src='"+ imgUrl +"btn_inst03.jpg' border='0' style='width:"+ bWidth +"%;margin-top:10'></a>&&nbsp&nbsp&nbsp&nbsp";
						}
					}
				}
				if(getEncodeInfo()) {
					htmlStr += "<input type='button' id='setCloud' value='클라우드 OTP 사용' onclick='javascript:confirmSimpleOtpRegi();' style='width:140px;height:30px' Class='btnType05'>";
				} else {
					htmlStr += "<a href='javascript:confirmSimpleOtpRegi();'><img src='"+ imgUrl +"btn_uninst03.jpg' border='0' style='width:"+ bWidth +"%;margin-left:20;margin-top:10'></a>";
				}
				htmlStr += "</Td>";
				htmlStr += "</Tr>";
				htmlStr += "</Table>";
			}
			else { 
				htmlStr = "<Table border='0' width='100%' height='100%' cellspacing='0' cellpadding='0'>";
				htmlStr += "<Tr height='10px'>";
				htmlStr += "<Td width='100%'>";
				htmlStr += "</Td>";
				htmlStr += "</Tr>";
				htmlStr += "</Table>";
			}
			
			return htmlStr;
		} catch(e) {
			otpErrHandler("102","OTP UI 구성 중 장애발생 - " + e.message);
			return false;
		}
	}
	
	
	function fillOtpNumberView() {
		try {
			document.getElementById("winCtnt").innerHTML = "";
			
			if(ViewType == null || ViewType == "") {
				otpErrHandler("102","시스템 오류 - 참조값 누락 - VIEWTYPE");
				return false;
			}
			
			hideFrameArea();
			
			otpStr = "";
			otpStr += "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
			otpStr += "<Tr height='80'>";
			otpStr += "<Td align='CENTER'>";
			otpStr += "<Table width='295' height='50' border='0'>";
			otpStr += "<Tr height='50'>";
			otpStr += "<Td id='oNo1' width='45' bgcolor='#44458a' align='CENTER' style='border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-left-radius:6px;border-bottom-right-radius:6px;'></Td>";
			otpStr += "<Td width='5'></Td>";
			otpStr += "<Td id='oNo2' width='45' bgcolor='#44458a' align='CENTER' style='border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-left-radius:6px;border-bottom-right-radius:6px;'></Td>";
			otpStr += "<Td width='5'></Td>";
			otpStr += "<Td id='oNo3' width='45' bgcolor='#44458a' align='CENTER' style='border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-left-radius:6px;border-bottom-right-radius:6px;'></Td>";
			otpStr += "<Td width='5'></Td>";
			otpStr += "<Td id='oNo4' width='45' bgcolor='#44458a' align='CENTER' style='border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-left-radius:6px;border-bottom-right-radius:6px;'></Td>";
			otpStr += "<Td width='5'></Td>";
			otpStr += "<Td id='oNo5' width='45' bgcolor='#44458a' align='CENTER' style='border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-left-radius:6px;border-bottom-right-radius:6px;'></Td>";
			otpStr += "<Td width='5'></Td>";
			otpStr += "<Td id='oNo6' width='45' bgcolor='#44458a' align='CENTER' style='border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-left-radius:6px;border-bottom-right-radius:6px;'></Td>";
			otpStr += "</Tr>";
			otpStr += "</Table>";
			otpStr += "</Td>";
			otpStr += "</Tr>";
			otpStr += "</Table>";
			otpStr += "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
			otpStr += "<Tr>";
			if(getEncodeInfo()) {
				otpStr += "<Td align='CENTER'>"+ msg08 +"</Td>";
			} else {
				otpStr += "<img src='"+ imgUrl +"msg07.png' border='0' style='width:100%'>";
			}
			otpStr += "</Tr>";
			otpStr += "</Table>";
			otpStr += "<Table border='0' width='100%' cellspacing='0' cellpadding='0'>";
			otpStr += "<Tr height='30'>";
			otpStr += "<Td align='CENTER'><font Class='cssFont15'><P id='remainSec'></P></font></Td>";
			otpStr += "</Tr>";
			otpStr += "</Table>";
			
			document.getElementById("winCtnt").innerHTML = otpStr;
			
			showFrameArea();
			setTimeout(function () {    
				showFrameArea();
				setTimeout(function () {    
					showFrameArea();
				}, 100);
			}, 50);
			
			
			return true;
		} catch(e) {
			otpErrHandler("102","OTP UI 구성 중 장애발생 - " + e.message);
			return false;
		}
	}
	
	function downWinApp() {
		try {
			location.href = installUrl;
			chkIfInstalled();
		} catch(e) {
			if(getEncodeInfo()) {
				alert(msg13);
			} else {
				if(typeof EucMsg !== 'undefined' && typeof EucMsg === 'function') {
					EucMsg(2);
				}
			}
		}
	}
	
	function chkIfInstalled() {
		try {
			(function chkScript(i) {    
				setTimeout(function () {    
					if(--i) {
						if(isCloud || isWinOtpReady) {
							i = 1;
							return false;
						} else {
							execOtpProc();
							chkScript(i);    
						}
					}
				}, 2000)
			})(40);  
		} catch(e) {
		}
	}
	
	function LoadingLayer_open() {
		var el = "layerSplash";
		
		var browser = hrdClientGetBrowser();
		var version = hrdClientGetIE_Version();

		var winWidth = 0;
		var winHeight = 0;
		
		var cap = "<br><br><br>";
		cap += "<img src='"+ imgUrl +"loader.gif' width='30' border='0'>";
		
		document.getElementById("LayerCap").innerHTML = cap;

		if(browser.indexOf("Explorer") >= 0) {
			if(version > 9) {
				winWidth = document.documentElement.clientWidth;
				winHeight = document.documentElement.clientHeight;
			} else {
				winWidth = document.body.clientWidth;
				winHeight = document.body.clientHeight;
			}
		} else {
			winWidth = document.documentElement.clientWidth;
			winHeight = document.documentElement.clientHeight;
		}

		document.getElementById("layerSplash").style.top = "0px";
		document.getElementById("layerSplash").style.left = "0px";
		document.getElementById("layerSplash").style.width = winWidth;
		document.getElementById("layerSplash").style.height = winHeight;

		document.getElementById("splashBg").style.top = "0px";
		document.getElementById("splashBg").style.left = "0px";
		document.getElementById("splashBg").style.width = winWidth;
		document.getElementById("splashBg").style.height = winHeight;

		document.getElementById("pop-Splach1").style.width = winWidth;
		document.getElementById("pop-Splach1").style.height = winHeight;
		document.getElementById("pop-Splach1").style.top = "0px";
		document.getElementById("pop-Splach1").style.left = "0px";
		
		var temp = $('#' + el);     /* LAYER ID 저장 */
		var bg = temp.prev().hasClass('bg');

		if(bg){
			$('.layerSplash').fadeIn(0);
		}else{
			temp.fadeIn(0);
		}
	}


	function LoadingLayer_Close(el){
		var temp = $('#' + el);     /* LAYER ID 저장 */
		temp.fadeOut();
	}
	
	function writeLog(msg) {
		try {
			if(DEBUG) {
				var today = new Date();
				var h = today.getHours();
				var m = today.getMinutes();
				var s = today.getSeconds();
			}
		} catch(e) {
		}
	}
	
	function detectMobileDevice() { 
		if( navigator.userAgent.match(/Android/i)
				|| navigator.userAgent.match(/webOS/i)
				|| navigator.userAgent.match(/iPhone/i)
				|| navigator.userAgent.match(/iPad/i)
				|| navigator.userAgent.match(/iPod/i)
				|| navigator.userAgent.match(/BlackBerry/i)
				|| navigator.userAgent.match(/Windows Phone/i)
		){
			return true;
		} else {
			return false;
		}
	}
	
	
/* Step04 */
/* ================================================================================================= */
		
	/**
	 *  var isRegdUser = false;
		var devType = "";
		var osModel = "";
		var bzModel = "";
	 * @returns
	 */
	function execOtpProc() {
		try {	
			var vOS = hrdClientGetOS();
			if(vOS.indexOf("Windows") >= 0 || navigator.userAgent.indexOf("Windows") >= 0) {
				vOS = devWin;
			} else {
				vOS = devHtml;
			}
					
			if(vOS == devWin) {
				checkWinOTP("innoOTP");
			} else {
				execFailureAlert();
			}
		} catch(e) {
		}
	}
	
	/**
	 * 호출 매개변수 : innoOTP (OTP APP 실행)
	 * @param KeyVal
	 * @returns
	 */
	function checkWinOTP(KeyVal) {
		try {
			isWinOtpReady = false;
			
			var useXDR = window.XDomainRequest;
			var inputParam = KeyVal + " " + vAgtID + " " + vUsrID + " " + vSessionID;
			
			if($.get === "undefined") {
				if(useXDR) {
					checkWinOTP_xDomin(inputParam);
				} 
			} else {
				checkWinOTP_jQuery(inputParam);
			}
		} catch(e) {
		}
	}
	
	
	function checkWinOTP_xDomin(inputParam) {
		try {
			if($.ajaxSetup !== "undefined")
				$.ajaxSetup({ cache: false });
			
			if($.support.cors !== "undefined")
				$.support.cors = true;
			
			var xdr = new XDomainRequest();
			var exportUrl = "http://127.0.0.1:42401?" + inputParam; 
			
			xdr.onload = function (data) { 
			};
			xdr.onsuccess = function() {
			};
			xdr.onprogress = function() {
			};
			xdr.onerror = function () {
				isWinOtpReady = false;
				execFailureAlert();
			};
				
			xdr.open("get", exportUrl);
			xdr.send();
			
			var response = xdr.responseText;
			xdr == null;
		} catch(e) {
			isWinOtpReady = false;
			execFailureAlert();
		}
	}
	
	function checkWinOTP_jQuery(inputParam) {
		try {
			if($.ajaxSetup !== "undefined")
				$.ajaxSetup({ cache: false });
			
			if($.support.cors !== "undefined")
				$.support.cors = true;
			
			var exportUrl = "http://127.0.0.1:42401?" + inputParam; 
			$.get(exportUrl, 
				function(data) { 
					isWinOtpReady = true; 
					setFrameOtpView(otpStatus10);
				}
			)
			.error(function(xhr, textStatus, error) { 
				isWinOtpReady = false;
				execFailureAlert();
			});
		} catch(e) { 	
			execFailureAlert();
		}
	}
	
	
	function execFailureAlert() {			
		try {	
			setFrameEnvInfo(true);
			
			try {
				setTimeout(function () {    
					if (typeof console._commandLineAPI !== 'undefined') {
					    console.API = console._commandLineAPI;
					} else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
					    console.API = console._inspectorCommandLineAPI;
					} else if (typeof console.clear !== 'undefined') {
					    console.API = console;
					}
					
					console.API.clear();
				}, 300);
			} catch(e) { }
		} catch(e) {
		}
	}
	
	
	/* =========================================================================================== */
	
	function hrdClientGetOS() {
		try {
			return hrdOtpBrowserInfo.os;
		} catch(e) {
			otpErrHandler("102","OTP 실행 오류 - " + e.message);
			return "";
		}
	}
	
	function hrdClientGetBrowser() {
		try {
			return hrdOtpBrowserInfo.browser;
		} catch(e) {
			otpErrHandler("102","OTP 실행 오류 - " + e.message);
			return "";
		}
	}
	
	function hrdClientGetOsVer() {
		try {
			return hrdOtpBrowserInfo.osVersion;
		} catch(e) {
			otpErrHandler("102","OTP 실행 오류 - " + e.message);
			return "";
		}
	}
	
	function hrdClientGetIE_Version() {   
		try {
			var rv = -1;     
	        if (navigator.appName == 'Microsoft Internet Explorer') {        
	             var ua = navigator.userAgent;        
	             var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
	             if (re.exec(ua) != null)            
	                 rv = parseFloat(RegExp.$1);    
	            }    
	        return rv; 
		} catch(e) {
			otpErrHandler("102","OTP 실행 오류 - " + e.message);
			return "";
		}
	} 
	
	function hrdClientGetNIDeviceKey() {
		try {
			if(hrdClientGetOS == "iOS") {
				return hrdhex_sha512( hrdOtpGLPrint.print + hrdOtpClientInfo.NaviDetail);
			} else {
				return hrdhex_sha512( hrdOtpBrowserPrint.print + hrdOtpGLPrint.print );
			}
		} catch(e) {
			otpErrHandler("102","OTP 실행 오류 - " + e.message);
			return "";
		}
	}	
	
	var hrdOtpBrowserInfo = {
			init : function() {
					
		        var unknown = 'Unknown';

		        //browser
		        var nVer = navigator.appVersion;
		        var nAgt = navigator.userAgent;
		        var browser = navigator.appName;
		        var version = '' + parseFloat(navigator.appVersion);
		        var majorVersion = parseInt(navigator.appVersion, 10);
		        var nameOffset, verOffset, ix;
		        
		        if((verOffset = nAgt.indexOf('Opera')) != -1) {
		            browser = 'Opera';
		            version = nAgt.substring(verOffset + 6);
		            if ((verOffset = nAgt.indexOf('Version')) != -1) {
		                version = nAgt.substring(verOffset + 8);
		            }
		        }
		        else if((verOffset = nAgt.indexOf('MSIE')) != -1) {
		            browser = 'Microsoft Internet Explorer';
		            version = nAgt.substring(verOffset + 5);
		        }
		        else if((browser == 'Netscape') && (nAgt.indexOf('Trident/') != -1)) {

		            browser = 'Microsoft Internet Explorer';
		            version = nAgt.substring(verOffset + 5);
		            if ((verOffset = nAgt.indexOf('rv:')) != -1) {
		                version = nAgt.substring(verOffset + 3);
		            }
		        }
		        else if((verOffset = nAgt.indexOf('Edge/')) != -1) {
		            browser = 'Edge';
		            version = nAgt.substring(verOffset + 7);
		        }
		        else if((verOffset = nAgt.indexOf('Chrome')) != -1) {
		            browser = 'Chrome';
		            version = nAgt.substring(verOffset + 7);
		        }
		        else if((verOffset = nAgt.indexOf('Safari')) != -1) {
		            browser = 'Safari';
		            version = nAgt.substring(verOffset + 7);
		            if((verOffset = nAgt.indexOf('Version')) != -1) {
		                version = nAgt.substring(verOffset + 8);
		            }

		            if(nAgt.indexOf('CriOS') != -1) {
		                browser = 'Chrome';
		            }
		        }
		        else if((verOffset = nAgt.indexOf('Firefox')) != -1) {
		            browser = 'Firefox';
		            version = nAgt.substring(verOffset + 8);
		        }
		        else if((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
		            browser = nAgt.substring(nameOffset, verOffset);
		            version = nAgt.substring(verOffset + 1);
		            if (browser.toLowerCase() == browser.toUpperCase()) {
		                browser = navigator.appName;
		            }
		        }

		        if((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
		        if((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
		        if((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

		        majorVersion = parseInt('' + version, 10);
		        if(isNaN(majorVersion)) {
		            version = '' + parseFloat(navigator.appVersion);
		            majorVersion = parseInt(navigator.appVersion, 10);
		        }

		        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

		        var os = unknown;
		        var clientStrings = [
		            {s:'Windows 3.11', r:/Win16/},
		            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
		            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
		            {s:'Windows 98', r:/(Windows 98|Win98)/},
		            {s:'Windows CE', r:/Windows CE/},
		            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
		            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
		            {s:'Windows Server 2003', r:/Windows NT 5.2/},
		            {s:'Windows Vista', r:/Windows NT 6.0/},
		            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
		            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
		            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},  
		            {s:'Windows 10', r:/(Windows 10|Windows NT 6.4)/},
		            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
		            {s:'Windows ME', r:/Windows ME/},
		            {s:'Android', r:/Android/},
		            {s:'Open BSD', r:/OpenBSD/},
		            {s:'Sun OS', r:/SunOS/},
		            {s:'Linux', r:/(Linux|X11)/},
		            {s:'iOS', r:/(iPhone|iPad|iPod)/},
		            {s:'Mac OS X', r:/Mac OS X/},
		            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
		            {s:'QNX', r:/QNX/},
		            {s:'UNIX', r:/UNIX/},
		            {s:'BeOS', r:/BeOS/},
		            {s:'OS/2', r:/OS\/2/},
		            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
		        ];
		        for (var id in clientStrings) {
		            var cs = clientStrings[id];
		            if(cs.r.test(nAgt)) {
		                os = cs.s;
		                break;
		            }
		        }

		        var osVersion = unknown;

		        if(/Windows/.test(os)) {
		            osVersion = /Windows (.*)/.exec(os)[1];
		            os = 'Windows';
		        }

		        switch(os) {
		            case 'Mac OS X':
		                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
		                break;
		            case 'Android':
		                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
		                break;
		            case 'iOS':
		                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
		                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
		                break;
		        }
		        this.browser = browser;
		        this.browserVersion = version;
		        this.mobile = mobile;
		        this.os = os;
		        this.osVersion = osVersion;	 
		    }
		};
	hrdOtpBrowserInfo.init();
	
	
	var hrdOtpGLPrint = {
		init : function() {
			this.print = this.getPrint() || "NONE";
		},
		getPrint: function() {
			try {
				var canvas, ctx, width = 256, height = 128;
				canvas = document.createElement('canvas');		
				canvas.setAttribute("width", width);
				canvas.setAttribute("height", height);
				canvas.setAttribute("display", "none");		
				ctx = canvas.getContext("webgl2") || 
					  canvas.getContext("experimental-webgl2") || 
					  canvas.getContext("webgl") || 
					  canvas.getContext("experimental-webgl") || 
					  canvas.getContext("moz-webgl");

				try {	
					var f = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
					var g = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
					var h = ctx.createBuffer();
					
					ctx.bindBuffer(ctx.ARRAY_BUFFER, h);

					var i = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .7321, 0]);

					ctx.bufferData(ctx.ARRAY_BUFFER, i, ctx.STATIC_DRAW), h.itemSize = 3, h.numItems = 3;

					var j = ctx.createProgram();
					var k = ctx.createShader(ctx.VERTEX_SHADER);	
					
					ctx.shaderSource(k, f);
					ctx.compileShader(k);

					var l = ctx.createShader(ctx.FRAGMENT_SHADER);

					ctx.shaderSource(l, g);
					ctx.compileShader(l);
					ctx.attachShader(j, k);
					ctx.attachShader(j, l);
					ctx.linkProgram(j);
					ctx.useProgram(j);

					j.vertexPosAttrib = ctx.getAttribLocation(j, "attrVertex");
					j.offsetUniform = ctx.getUniformLocation(j, "uniformOffset");

					ctx.enableVertexAttribArray(j.vertexPosArray);
					ctx.vertexAttribPointer(j.vertexPosAttrib, h.itemSize, ctx.FLOAT, !1, 0, 0);
					ctx.uniform2f(j.offsetUniform, 1, 1);
					ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, h.numItems);

				}
				catch (e) {	 }
				
				var m = "";

				var n = new Uint8Array(width * height * 4);
				ctx.readPixels(0, 0, width, height, ctx.RGBA, ctx.UNSIGNED_BYTE, n);
				m = JSON.stringify(n).replace(/,?"[0-9]+":/g, "");					
				
				return m;
			} catch(e) {
				return "NONE";
			}
		}
	};
	hrdOtpGLPrint.init();
		
		
	var hrdOtpClientInfo = {
			init : function() {
				this.TimeZone = this.getTimeZone() || "UNKNOWN";
				this.ScreenInfo = this.getScreebInfo() || "UNKNOWN";
				this.BrowserDetail = this.getBrowserDetail() || "UNKNOWN";
				this.NaviDetail = this.getNaviDetail() || "UNKNOWN";
				this.PluginList = this.getPluginList() || "UNKNOWN"; 
			},
			getTimeZone : function() {
				try {
					var TZ = new Date().getTimezoneOffset();
					//var TZ = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
					return TZ;
				} catch(e) {
					return "UNKNOWN";
				}
			},
			getScreebInfo : function() {
				try {
					var ScreenSize = "";
					var AvailableScreenSize = "";
					var colorDepth = "";
					var pixelDepth = "";
					
					ScreenSize = screen.width + screen.height;
					AvailableScreenSize = screen.availWidth + screen.availHeight;
					colorDepth = screen.colorDepth;
					pixelDepth = screen.pixelDepth;
					
					return ScreenSize + "*" + AvailableScreenSize + "*" + colorDepth + "*" + pixelDepth;
				} catch(e) {
					return "UNKNOWN";
				}
			},
			getBrowserDetail : function() {
				try {
					var OS = "";
					var osVer = "";
					var browser = "";
					var version = "";
					var userAgent = "";
					var browserState = "UNKNOWN";
					try {
						if(window.outerWidth == 0|| window.outerHeight == 0) {
							browserState = "outerSize:0";
						} else {
							browserState = document.visibilityState;
						}
						
					} catch(e) {}

					OS = browserInfo.os;
					osVer = browserInfo.osVersion;
					browser = browserInfo.browser;
					version = browserInfo.browserVersion;
					userAgent = browserState + " - " + navigator.userAgent;
					 
					return browser + "*" + version + "*" + userAgent + "*" + OS + "*" + osVer;
				} catch(e) {
					return "UNKNOWN";
				}
			},
			getNaviDetail : function() {
				try {
					var output = "";
				    for(var key in navigator) {
				        output += "●" + key + " : " + navigator[key] + "<br>";
				    }
				    return output;
				} catch(e) {
					return "UNKNOWN";
				}
			},
			getPluginList : function() {
				try {
					var pluginsLength = navigator.plugins.length; 
					
					var txt = "";
					for(var i = 0; i < pluginsLength; i++) {
					  txt += navigator.plugins[i].name + "_";
					  txt += navigator.plugins[i].filename + "_";
					  txt += navigator.plugins[i].description + "_";
					  txt += navigator.plugins[i].version?navigator.plugins[i].version:"";
					  txt += "|";
					}
					
					return txt;
				} catch(e) {
					return "UNKNOWN";
				}
			}
	};
	hrdOtpClientInfo.init();
	
	var hrdOtpBrowserPrint = {
			init : function() {
				this.print = this.getPrint() || "NONE";
			},
			getPrint: function() {
				try {
					var canvas = document.createElement('canvas');
					canvas.setAttribute("width", "1000");
					canvas.setAttribute("height", "600");
					
					var ctx = canvas.getContext('2d');
					
					var grd=ctx.createLinearGradient(0,0,1000,600);
						grd.addColorStop(0, '#6600FF');
						grd.addColorStop(0.5, '#E89234');
						grd.addColorStop(1, '#6600FF');

					ctx.fillStyle = grd;
					ctx.fillRect(0,0,1000,600);
			        
			        for (var i=0;i<30;i++){
			            for (var j=0;j<40;j++){
			              ctx.strokeStyle = 'rgb(0,' + Math.floor(555-42.5*i) + ',' + 
			                               Math.floor(555-42.5*j) + ')';
			              ctx.beginPath();
			              ctx.arc(12.5+j*25,12.5+i*25,150,0,Math.PI*2,true);
			              ctx.stroke();
			            }
			        }
					
					var txt = 'i6hrd..$#@tqi((^@emon%^%^&hrdkorea@$@$@#$loms!~';
				    ctx.textBaseline = "top";
				    ctx.font = "70px 'Arial'";
				    ctx.textBaseline = "alphabetic";
				    ctx.rotate(.10);
				    ctx.fillStyle = "#f45";
				    ctx.fillRect(125,1,162,20);
				    ctx.fillStyle = "#069";
				    ctx.fillText(txt, 2, 20);
				    ctx.fillStyle = "rgba(100, 200, 0, 0.7)";
				    ctx.fillText(txt, 14, 17);
				    ctx.fillStyle = "#070";
				    ctx.fillStyle = "rgba(150, 100, 0, 0.7)";
				    ctx.fillText("%^*^*loms#%#$@%", 4, 30);
				    
				    ctx.globalAlpha = 0.7;
				    
				    ctx.fillStyle = "#075";
				    ctx.fillStyle = "rgba(50, 200, 100, 0.9)";
				    ctx.fillText("%^$hrdkorea%^&#$loms^&*%", 0, 37);
				    
				    var gradient1 = ctx.createLinearGradient(0,0,canvas.width,0);
				    gradient1.addColorStop("0","white");
				    gradient1.addColorStop("0.5","blue");
				    gradient1.addColorStop("1.0","red");
				    ctx.fillStyle = gradient1;
				    ctx.fillText("%^$hrdkorea%^&#$loms^&*%", 10, 88);
				    
				    ctx.globalAlpha = 0.5;
				   
				    var gradient2 = ctx.createLinearGradient(0,0,canvas.width,0);
				    gradient2.addColorStop("0","red");
				    gradient2.addColorStop("0.5","magenta");
				    gradient2.addColorStop("1.0","blue");
				    ctx.fillStyle = gradient2;
				    ctx.fillText("%^$hrdkorea%^&#$loms^&*%", 0, 138);
				    
				    var gradient3 = ctx.createLinearGradient(0,0,canvas.width,0);
				    gradient3.addColorStop("0","green");
				    gradient3.addColorStop("0.5","blue");
				    gradient3.addColorStop("1.0","magenta");
				    ctx.fillStyle = gradient3;
				    ctx.fillText("%^$hrdkorea%^&#$loms^&*%", 0, 200);
				    
				    var gradient4 = ctx.createLinearGradient(0,0,canvas.width,0);
				    gradient4.addColorStop("0","pink");
				    gradient4.addColorStop("0.3","green");
				    gradient4.addColorStop("0.7","blue");
				    gradient4.addColorStop("1.0","red");
				    ctx.fillStyle = gradient4;
				    ctx.fillText("%^hrdemon%^&#$loms^&*%", 0, 300);
				    
				    var gradient5 = ctx.createLinearGradient(0,0,170,0);
				    gradient5.addColorStop(0,"black");
				    gradient5.addColorStop("0.3","magenta");
				    gradient5.addColorStop("0.5","blue");
				    gradient5.addColorStop("0.6","green");
				    gradient5.addColorStop("0.8","yellow");
				    gradient5.addColorStop(1,"red");
				    ctx.fillStyle = gradient5;
				    ctx.fillText("@#lomshrdkorea%^&#$loms^&*%", 0, 400);
				    
				    var gradient6 = ctx.createLinearGradient(0,0,170,0);
				    gradient6.addColorStop(0,"red");
				    gradient6.addColorStop("0.5","magenta");
				    gradient6.addColorStop("1.0","blue");
				    ctx.fillStyle = gradient6;
				    ctx.fillText("%^$hrdkorea%^&#$loms^&*%", 0, 500);
				    
				    ctx.shadowBlur = 20;
				    ctx.shadowColor = "blue";
				    ctx.fillRect(-20,10,430,5);
				    var strng = canvas.toDataURL();
				    
				    if(strng.length==0) {
				    	return "NONE";
				    } else {
				    	return hrdhex_sha512(strng);
				    }
				} catch(e) {
					return "NONE";
				}
			}
	};
	hrdOtpBrowserPrint.init();	
	
	function hrdhex_sha512(s)    { 
		return rstr2hex(rstr_sha512(str2rstr_utf8(s))); 
		
		function rstr2hex(input) {
			try { hexcase } catch(e) { hexcase=0; }
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var output = "";
			var x;
			for(var i = 0; i < input.length; i++) {
			    x = input.charCodeAt(i);
			    output += hex_tab.charAt((x >>> 4) & 0x0F)
			           +  hex_tab.charAt( x        & 0x0F);
			}
			return output;
		}
		
		function rstr_sha512(s) {
			return binb2rstr(binb_sha512(rstr2binb(s), s.length * 8));
			
			function binb2rstr(input) {
				var output = "";
				for(var i = 0; i < input.length * 32; i += 8)
					output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
				return output;
			}
			
			function rstr2binb(input) {
				var output = Array(input.length >> 2);
				for(var i = 0; i < output.length; i++)
					output[i] = 0;
				for(var i = 0; i < input.length * 8; i += 8)
					output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
				return output;
			}
			
			var sha512_k;
			function binb_sha512(x, len) {
				if(sha512_k == undefined) {
					sha512_k = new Array(
					new int64(0x428a2f98, -685199838), new int64(0x71374491, 0x23ef65cd),
					new int64(-1245643825, -330482897), new int64(-373957723, -2121671748),
					new int64(0x3956c25b, -213338824), new int64(0x59f111f1, -1241133031),
					new int64(-1841331548, -1357295717), new int64(-1424204075, -630357736),
					new int64(-670586216, -1560083902), new int64(0x12835b01, 0x45706fbe),
					new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, -704662302),
					new int64(0x72be5d74, -226784913), new int64(-2132889090, 0x3b1696b1),
					new int64(-1680079193, 0x25c71235), new int64(-1046744716, -815192428),
					new int64(-459576895, -1628353838), new int64(-272742522, 0x384f25e3),
					new int64(0xfc19dc6, -1953704523), new int64(0x240ca1cc, 0x77ac9c65),
					new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
					new int64(0x5cb0a9dc, -1119749164), new int64(0x76f988da, -2096016459),
					new int64(-1740746414, -295247957), new int64(-1473132947, 0x2db43210),
					new int64(-1341970488, -1728372417), new int64(-1084653625, -1091629340),
					new int64(-958395405, 0x3da88fc2), new int64(-710438585, -1828018395),
					new int64(0x6ca6351, -536640913), new int64(0x14292967, 0xa0e6e70),
					new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
					new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, -1651133473),
					new int64(0x650a7354, -1951439906), new int64(0x766a0abb, 0x3c77b2a8),
					new int64(-2117940946, 0x47edaee6), new int64(-1838011259, 0x1482353b),
					new int64(-1564481375, 0x4cf10364), new int64(-1474664885, -1136513023),
					new int64(-1035236496, -789014639), new int64(-949202525, 0x654be30),
					new int64(-778901479, -688958952), new int64(-694614492, 0x5565a910),
					new int64(-200395387, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
					new int64(0x19a4c116, -1194143544), new int64(0x1e376c08, 0x5141ab53),
					new int64(0x2748774c, -544281703), new int64(0x34b0bcb5, -509917016),
					new int64(0x391c0cb3, -976659869), new int64(0x4ed8aa4a, -482243893),
					new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, -692930397),
					new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
					new int64(-2067236844, -1578062990), new int64(-1933114872, 0x1a6439ec),
					new int64(-1866530822, 0x23631e28), new int64(-1538233109, -561857047),
					new int64(-1090935817, -1295615723), new int64(-965641998, -479046869),
					new int64(-903397682, -366583396), new int64(-779700025, 0x21c0c207),
					new int64(-354779690, -840897762), new int64(-176337025, -294727304),
					new int64(0x6f067aa, 0x72176fba), new int64(0xa637dc5, -1563912026),
					new int64(0x113f9804, -1090974290), new int64(0x1b710b35, 0x131c471b),
					new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
					new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, -1676669620),
					new int64(0x4cc5d4be, -885112138), new int64(0x597f299c, -60457430),
					new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817));
				}
			
				var H = new Array(
				new int64(0x6a09e667, -205731576),
				new int64(-1150833019, -2067093701),
				new int64(0x3c6ef372, -23791573),
				new int64(-1521486534, 0x5f1d36f1),
				new int64(0x510e527f, -1377402159),
				new int64(-1694144372, 0x2b3e6c1f),
				new int64(0x1f83d9ab, -79577749),
				new int64(0x5be0cd19, 0x137e2179));
			
				var T1 = new int64(0, 0),
			    	T2 = new int64(0, 0),
				    a = new int64(0,0),
				    b = new int64(0,0),
				    c = new int64(0,0),
				    d = new int64(0,0),
				    e = new int64(0,0),
				    f = new int64(0,0),
				    g = new int64(0,0),
				    h = new int64(0,0),
				    //Temporary variables not specified by the document
				    s0 = new int64(0, 0),
				    s1 = new int64(0, 0),
				    Ch = new int64(0, 0),
				    Maj = new int64(0, 0),
				    r1 = new int64(0, 0),
				    r2 = new int64(0, 0),
				    r3 = new int64(0, 0);
				var j, i;
				var W = new Array(80);
				for(i=0; i<80; i++)
					W[i] = new int64(0, 0);
			
				x[len >> 5] |= 0x80 << (24 - (len & 0x1f));
				x[((len + 128 >> 10)<< 5) + 31] = len;
			
				for(i = 0; i<x.length; i+=32) {
				    int64copy(a, H[0]);
				    int64copy(b, H[1]);
				    int64copy(c, H[2]);
				    int64copy(d, H[3]);
				    int64copy(e, H[4]);
				    int64copy(f, H[5]);
				    int64copy(g, H[6]);
				    int64copy(h, H[7]);
			
				    for(j=0; j<16; j++) {
				        W[j].h = x[i + 2*j];
				        W[j].l = x[i + 2*j + 1];
				    }
			
				    for(j=16; j<80; j++) {
				    	int64rrot(r1, W[j-2], 19);
				    	int64revrrot(r2, W[j-2], 29);
				    	int64shr(r3, W[j-2], 6);
				    	s1.l = r1.l ^ r2.l ^ r3.l;
				    	s1.h = r1.h ^ r2.h ^ r3.h;
				    	int64rrot(r1, W[j-15], 1);
				    	int64rrot(r2, W[j-15], 8);
				    	int64shr(r3, W[j-15], 7);
				    	s0.l = r1.l ^ r2.l ^ r3.l;
				    	s0.h = r1.h ^ r2.h ^ r3.h;
			
				    	int64add4(W[j], s1, W[j-7], s0, W[j-16]);
				    }
			
				    for(j = 0; j < 80; j++) {
				    	Ch.l = (e.l & f.l) ^ (~e.l & g.l);
				    	Ch.h = (e.h & f.h) ^ (~e.h & g.h);
			
				    	int64rrot(r1, e, 14);
				    	int64rrot(r2, e, 18);
				    	int64revrrot(r3, e, 9);
				    	s1.l = r1.l ^ r2.l ^ r3.l;
				    	s1.h = r1.h ^ r2.h ^ r3.h;
			
				    	int64rrot(r1, a, 28);
				    	int64revrrot(r2, a, 2);
				    	int64revrrot(r3, a, 7);
				    	s0.l = r1.l ^ r2.l ^ r3.l;
				    	s0.h = r1.h ^ r2.h ^ r3.h;
			
				    	Maj.l = (a.l & b.l) ^ (a.l & c.l) ^ (b.l & c.l);
				    	Maj.h = (a.h & b.h) ^ (a.h & c.h) ^ (b.h & c.h);
			
				    	int64add5(T1, h, s1, Ch, sha512_k[j], W[j]);
				    	int64add(T2, s0, Maj);
			
				    	int64copy(h, g);
				    	int64copy(g, f);
				    	int64copy(f, e);
				    	int64add(e, d, T1);
				    	int64copy(d, c);
				    	int64copy(c, b);
				    	int64copy(b, a);
				    	int64add(a, T1, T2);
				    }
				    int64add(H[0], H[0], a);
				    int64add(H[1], H[1], b);
				    int64add(H[2], H[2], c);
				    int64add(H[3], H[3], d);
				    int64add(H[4], H[4], e);
				    int64add(H[5], H[5], f);
				    int64add(H[6], H[6], g);
				    int64add(H[7], H[7], h);
				}
			
				var hash = new Array(16);
				for(i=0; i<8; i++) {
					hash[2*i] = H[i].h;
					hash[2*i + 1] = H[i].l;
				}
				return hash;
			}
		}
		
		function int64(h, l) {
			this.h = h;
			this.l = l;
		}
		
		function int64copy(dst, src) {
			dst.h = src.h;
			dst.l = src.l;
		}
		
		function int64rrot(dst, x, shift) {
		    dst.l = (x.l >>> shift) | (x.h << (32-shift));
		    dst.h = (x.h >>> shift) | (x.l << (32-shift));
		}
		
		function int64revrrot(dst, x, shift) {
		    dst.l = (x.h >>> shift) | (x.l << (32-shift));
		    dst.h = (x.l >>> shift) | (x.h << (32-shift));
		}
		
		function int64shr(dst, x, shift) {
		    dst.l = (x.l >>> shift) | (x.h << (32-shift));
		    dst.h = (x.h >>> shift);
		}
		
		function int64add(dst, x, y) {
			var w0 = (x.l & 0xffff) + (y.l & 0xffff);
			var w1 = (x.l >>> 16) + (y.l >>> 16) + (w0 >>> 16);
			var w2 = (x.h & 0xffff) + (y.h & 0xffff) + (w1 >>> 16);
			var w3 = (x.h >>> 16) + (y.h >>> 16) + (w2 >>> 16);
			dst.l = (w0 & 0xffff) | (w1 << 16);
			dst.h = (w2 & 0xffff) | (w3 << 16);
		}
		
		function int64add4(dst, a, b, c, d) {
			var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff);
			var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (w0 >>> 16);
			var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (w1 >>> 16);
			var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (w2 >>> 16);
			dst.l = (w0 & 0xffff) | (w1 << 16);
			dst.h = (w2 & 0xffff) | (w3 << 16);
		}
		
		function int64add5(dst, a, b, c, d, e) {
			var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff) + (e.l & 0xffff);
			var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (w0 >>> 16);
			var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (e.h & 0xffff) + (w1 >>> 16);
			var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (w2 >>> 16);
			dst.l = (w0 & 0xffff) | (w1 << 16);
			dst.h = (w2 & 0xffff) | (w3 << 16);
		}
		
		function str2rstr_utf8(input) {
			var output = "";
			var i = -1;
			var x, y;
		
			while(++i < input.length) {
				x = input.charCodeAt(i);
				y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
				if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
					x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
					i++;
				}
		
				if(x <= 0x7F)
					output += String.fromCharCode(x);
				else if(x <= 0x7FF)
					output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
		                                    0x80 | ( x         & 0x3F));
				else if(x <= 0xFFFF)
					output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
		                                    0x80 | ((x >>> 6 ) & 0x3F),
		                                    0x80 | ( x         & 0x3F));
				else if(x <= 0x1FFFFF)
					output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
		                                    0x80 | ((x >>> 12) & 0x3F),
		                                    0x80 | ((x >>> 6 ) & 0x3F),
		                                    0x80 | ( x         & 0x3F));
			}
			return output;
		}
	}
	
/* Step init */
/* ================================================================================================= */
			
	function startOtpProc(agtID, usrID, sessionID, viewType) {
		
		try {
			var winWidth = 0;
			var winHeight = 0;
			
			/* Windows가 아닌 기기로 접근 시 처리 */
			if(detectMobileDevice() || hrdClientGetOS().indexOf("Windows") < 0) {
				try {
					initOtpFrame(agtID,usrID,sessionID,"Frame");
				} catch(e) {
					otpErrHandler("102","OTP 호출 오류 - " + e.message);
					return false;
				}
			} else { // Windows
				if(viewType == "102") {
					try {
						initOtpFrame(agtID,usrID,sessionID,"Frame");
					} catch(e) {
						otpErrHandler("102","OTP 호출 오류 - " + e.message);
						return false;
					}
				} else {
					try {
						initOtpFrame(agtID,usrID,sessionID,"App");
					} catch(e) {
						otpErrHandler("102","OTP 호출 오류 - " + e.message);
						return false;
					}
				}
			}			
		} catch(e) {
			otpErrHandler("102","OTP 호출 오류 - " + e.message);
			return false;
		}
	}
	
	
	function getEncodeInfo() {
		try {
			var eType = document.charset;
			if(eType == "UTF-8" || eType == "utf-8") return true;
			else return false;
		} catch(e) {
			return false;
		}
	}
		
	function otpLogHandler(msg) {
		try {
			if(console.log(msg + " - " + new Date()));
		} catch(e) {
		}
	}
		
	function otpErrHandler(rtype, msg) {
		try {
			if(typeof loadOtpReceiver !== 'undefined' && typeof loadOtpReceiver === 'function') { 
				loadOtpReceiver(rtype, msg);
			} else {
				if(getEncodeInfo()) {
					alert("OTP 호출 과정에서 장애가 발생하였습니다. 다시 시도하여 주십시오.");
				} else {
					if(typeof EucMsg !== 'undefined' && typeof EucMsg === 'function') {
						EucMsg(3);
					}
				}
			}
		} catch(e) {
		}
	}