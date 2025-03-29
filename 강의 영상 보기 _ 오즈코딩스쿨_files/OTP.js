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

	function genHrdOtpNumber(key, utVal) {
		
		/* ========================================================================================= */
		/* Class Variables */

		var VALIDITY = 60;
		var DIGITCNT = 6;
		
		/* ========================================================================================= */
		
		function getOtp(key, utVal) {
			try {
				var keyLen = key.length;		
				/*
				 * 정책변경에 따라 서버시간으로 수정. 
				var UT = Math.floor((new Date().getTime()/1000)/VALIDITY);
				*/
				var UT = Math.floor(utVal / VALIDITY);
				var timebasedOnetimePassword = HOTP(key, UT);
				var timebasedOnetimePasswordValue = timebasedOnetimePassword % Math.pow(10, DIGITCNT);
				return timebasedOnetimePasswordValue;
			} catch(e) {
				return '';
			}
		}
		
		function HOTP(secretKey, timeCounter) {
			try {
				var timeCounterHex = timeCounter.toString(16);
				while(timeCounterHex.length < 16) {
					timeCounterHex = "0" + timeCounterHex;
				}
				
				var HMAC = String(CryptoJS.HmacSHA1(CryptoJS.enc.Hex.parse(timeCounterHex), secretKey));
				var HOTP = Truncate(HMAC) & 0x7FFFFFFF;
				
				return HOTP;
			} catch(e) {
				return '';
			}
		}
		
		function Truncate(data) {
			try {
				var startByte = parseInt("0x" + data.substring(39, 40));		
				return parseInt("0x" + data.substring(startByte * 2, startByte * 2 + 8));
			} catch(e) {
				
			}
		}

		function validateOtp(otpStr) {
			try {
				var oStr = String(otpStr);
				
				var gapCnt = 0;
				gapCnt = (6 - oStr.length);
				
				for(var i=0 ; i < gapCnt ; i++) {
					oStr = "0" + oStr;
				}
				return oStr;
			} catch(e) {
				return '';
			}
		}
		
		try {
			var encKey = "";
			var keyLen = key.length;
			if(keyLen == 0) return "";
			
			encKey = hrdOtpEncodeUtf8(key);
			
			return validateOtp( getOtp(encKey, utVal) );
		} catch(e) {
			return "";
		}
	}
	
	
