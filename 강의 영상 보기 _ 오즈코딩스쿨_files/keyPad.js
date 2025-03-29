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

/* ======================================================================================== */
/* HRD URL DEFINE */
/* ======================================================================================== */
/*
var resPath = "https://hrd.thinkinnovation.co.kr/fdsService/hrdOTP/Library/res/";
*/
var resPath = "https://fds.hrdkorea.or.kr/fdsService/hrdOTP/Library/res/";

/* ======================================================================================== */
	
var targetHrdOtpElement;
var targetHrdOtpFWIDTH;

function hrdKeyPadUtils() {
	var fillKeyPad = false;
	var PADTYPE = "";

	this.fillHrdKeyPad = function(ele, padType, fWidth) {
		try {			
			if(!fillKeyPad) {	
				targetHrdOtpElement = ele;
				PADTYPE = padType;
				targetHrdOtpFWIDTH = fWidth;

				appendHrdKeyboard();
				fillKeyPad = true;
			} else {
				fillKeyPad = false;
				
				if(PADTYPE == "Frame") {
					removeHrdFrameKeyBoard();
				} else if(PADTYPE == "Layer") {
					removeHrdKeyBoard();
				} else {
					return false;
				}
				PADTYPE = "";
			}
		} catch(e) {
			loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
		}
	}
	
	this.clearKeyPad = function() {
		try {		
			fillKeyPad = false;
			
			if(PADTYPE == "Frame") {
				removeHrdFrameKeyBoard();
			} else if(PADTYPE == "Layer") {
				removeHrdKeyBoard();
			} else {
				return false;
			}
		} catch(e) {
			loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
		}
	}
	
	function appendHrdKeyboard() {
		try {	
			if(PADTYPE == "Frame") {
				if(frameKeyPad()) {
					var kArr = new Array();
					kArr = genKeyOrder();
					
					var tWidth = null;
					
					if(targetHrdOtpFWIDTH >= 300) {
						tWidth = Math.ceil(targetHrdOtpFWIDTH / 6) - 6;
					} else {
						tWidth = Math.ceil(targetHrdOtpFWIDTH / 3) - 6;
					}
					
					if(document.getElementsByClassName == undefined || document.getElementsByClassName == "undefined") {
						if (!document.querySelectorAll) {
							(function(d, s) {
								d=document, s=d.createStyleSheet();
								d.querySelectorAll = function(r, c, i, j, a) {
									a=d.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
									for (i=r.length; i--;) {
										s.addRule(r[i], 'k:v');
										for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
										s.removeRule(0);
									}
									return c;
								}
							})()
							
							for(var i=0 ; i < kArr.length ; i++) {
								document.querySelectorAll(".hrdFrameKeyPadBtn")[i].innerHTML = "<img src='"+ resPath +"img_num/"+ kArr[i] +"_b.png' border='0'>";
								document.querySelectorAll(".hrdFrameKeyPadBtn")[i].setAttribute("id", kArr[i]); 
							}
						} else {
							for(var i=0 ; i < kArr.length ; i++) {
								document.querySelectorAll(".hrdFrameKeyPadBtn")[i].innerHTML = "<img src='"+ resPath +"img_num/"+ kArr[i] +"_b.png' border='0'>";
								document.querySelectorAll(".hrdFrameKeyPadBtn")[i].setAttribute("id", kArr[i]); 
							}
						}
					} else {
						for(var i=0 ; i < kArr.length ; i++) {
							document.getElementsByClassName("hrdFrameKeyPadBtn")[i].innerHTML = "<img src='"+ resPath +"img_num/"+ kArr[i] +"_b.png' width='"+ tWidth +"px' height='"+ tWidth +"px' border='0'>";
							document.getElementsByClassName("hrdFrameKeyPadBtn")[i].setAttribute("id", kArr[i]); 
						}
					}
				}
			} else {
				if(gridKeyPad()) {
					var kArr = new Array();
					kArr = genKeyOrder();
					
					if(document.getElementsByClassName == undefined || document.getElementsByClassName == "undefined") {
						if (!document.querySelectorAll) {
							
						} else {
							for(var i=0 ; i < kArr.length ; i++) {
								document.querySelectorAll(".hrdKeyPadBtn")[i].innerHTML = "<img src='"+ resPath +"img_num/"+ kArr[i] +"_b.png' border='0'>";
								document.querySelectorAll(".hrdKeyPadBtn")[i].setAttribute("id", kArr[i]); 
							}
						}
					} else {
						for(var i=0 ; i < kArr.length ; i++) {
							document.getElementsByClassName("hrdKeyPadBtn")[i].innerHTML = "<img src='"+ resPath +"img_num/"+ kArr[i] +"_b.png' border='0'>";
							document.getElementsByClassName("hrdKeyPadBtn")[i].setAttribute("id", kArr[i]); 
						}
					}
				}
			}

		} catch(e) {
			loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
		}
	}
	
	function gridKeyPad() {
		
		try {
			var dTop = 0;
			var dLeft = 0;
			var rect = targetHrdOtpElement.getBoundingClientRect();
			
			dTop = parseInt( rect.top ) + parseInt( targetHrdOtpElement.style.height ) + 5;
			dLeft = parseInt( rect.left );
			
			var iDiv = document.createElement('div');
			iDiv.id = 'hrdKeyPad';
			iDiv.className = 'hrdKeyPad';
			iDiv.style.position = "absolute";
			iDiv.style.top = dTop;
			iDiv.style.left = dLeft;
			document.getElementsByTagName('body')[0].appendChild(iDiv);
			
			var kStr = "";
			kStr += "<Table border='0' bgcolor='#525c6e'>";
			kStr += "<Tr height='30'>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "</Tr>";
			kStr += "<Tr height='30'>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "</Tr>";
			kStr += "<Tr height='30'>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "</Tr>";
			kStr += "<Tr height='30'>";
			kStr += "<Td><img src='"+ resPath +"img_num/del_one_w.png' onclick='javascript:hrdKeyPadDeleteLastStr();'></Td>";
			kStr += "<Td><button class='hrdKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:48;height:48'></button></Td>";
			kStr += "<Td><img src='"+ resPath +"img_num/del_all_w.png' onclick='javascript:hrdKeyPadDeleteAllStr();'></Td>";
			kStr += "</Tr>";
			kStr += "</Table>";
			
			iDiv.innerHTML = kStr;
			
			return true;

		} catch(e) {
			loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
			return false;
		}
	}
	
	
	function frameKeyPad() {
		try {
			try {
				targetHrdOtpFWIDTH =  targetHrdOtpFWIDTH.toString().replace(/[^0-9]/g,"");
			} catch(e) {
				alert(e.message);
				targetHrdOtpFWIDTH = targetHrdOtpElement.clientWidth;
			}
			
			if(targetHrdOtpFWIDTH == null || targetHrdOtpFWIDTH == "" || targetHrdOtpFWIDTH == "0") {
				targetHrdOtpFWIDTH = targetHrdOtpElement.clientWidth;
			}

			var keyFrame = document.createElement("div");
			keyFrame.id = 'hrdFrameKeyPad';
			keyFrame.className = 'hrdFrameKeyPad';
			keyFrame.style.position = "absolute";
			keyFrame.style.width = targetHrdOtpFWIDTH;
			keyFrame.style.height = (Math.ceil(targetHrdOtpFWIDTH / 6) - 4) * 2 + "px";
			
			targetHrdOtpElement.parentNode.insertBefore(keyFrame, targetHrdOtpElement.nextSibling);
			
			var kStr = "";
				
			if(targetHrdOtpFWIDTH >= 300) {
				var tWidth = Math.ceil(targetHrdOtpFWIDTH / 6) - 4;
				
				kStr += "<Table border='0' bgcolor='#525c6e'>";
				kStr += "<Tr height='"+ tWidth +"'>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "</Tr>";
				kStr += "<Tr height='"+ tWidth +"'>";
				kStr += "<Td width='"+ tWidth +"'><img src='"+ resPath +"img_num/del_one_w.png' onclick='javascript:hrdKeyPadDeleteLastStr();' style='width:"+ tWidth +";height:"+ tWidth +"'></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><img src='"+ resPath +"img_num/del_all_w.png' onclick='javascript:hrdKeyPadDeleteAllStr();' style='width:"+ tWidth +";height:"+ tWidth +"'></Td>";
				kStr += "</Tr>";
				kStr += "</Table>";
			} else {
				var tWidth = Math.ceil(targetHrdOtpFWIDTH / 3) - 4;
				
				kStr += "<Table border='0' bgcolor='#525c6e'>";
				kStr += "<Tr height='"+ tWidth +"'>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "</Tr>";
				kStr += "<Tr height='"+ tWidth +"'>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "</Tr>";
				kStr += "<Tr height='"+ tWidth +"'>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "</Tr>";
				kStr += "<Tr height='"+ tWidth +"'>";
				kStr += "<Td width='"+ tWidth +"'><img src='"+ resPath +"img_num/del_one_w.png' onclick='javascript:hrdKeyPadDeleteLastStr();' style='width:"+ tWidth +";height:"+ tWidth +"'></Td>";
				kStr += "<Td width='"+ tWidth +"'><button class='hrdFrameKeyPadBtn' id='' onclick='javascript:setOtpVal(id);' style='width:"+ tWidth +";height:"+ tWidth +"'></button></Td>";
				kStr += "<Td width='"+ tWidth +"'><img src='"+ resPath +"img_num/del_all_w.png' onclick='javascript:hrdKeyPadDeleteAllStr();' style='width:"+ tWidth +";height:"+ tWidth +"'></Td>";
				kStr += "</Tr>";
				kStr += "</Table>";
			}
			
			keyFrame.innerHTML = kStr;
			
			return true;
		} catch(e) {
			loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
			return false;
		}
	}
	
	function genKeyOrder() {
		try {
			var noArr = new Array('0','1','2','3','4','5','6','7','8','9'); 
			var retArr = new Array();
	 
	        while(retArr.length < 10) { 
	            var number = 0; //랜덤번호 가져오는 변수
	            number = Math.floor(Math.random() * noArr.length - 1) + 1;
	            retArr.push(noArr[number]);
	            noArr.splice(number, 1);
	        }        
	        return retArr;
		} catch(e) {
			loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
			return "";
		}
	}
	
	function removeHrdKeyBoard() {
		try {
			var iDiv = document.getElementById("hrdKeyPad");
			
			iDiv.innerHTML = "";
			document.getElementsByTagName('body')[0].removeChild(iDiv);
			
			window.parent.removeEventListener("resize", function(event){ event.preventDefault(); });
			window.parent.removeEventListener('touchmove', function(event) { event.preventDefault(); });
		} catch(e) {
			loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
		} 		
	}
	
	function removeHrdFrameKeyBoard() {
		try {
			var iDiv = document.getElementById("hrdFrameKeyPad");

			iDiv.innerHTML = "";
			iDiv.parentNode.removeChild(iDiv);
			
			window.parent.removeEventListener("resize", function(event){ event.preventDefault(); });
			window.parent.removeEventListener('touchmove', function(event) { event.preventDefault(); });
		} catch(e) {
			loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
		} 		
	}
}

/*  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

function setOtpVal(val) {
	try {
		if(targetHrdOtpElement.value.length <= 5)
			targetHrdOtpElement.value += val;
		else
			alert("자리수가 초과되었습니다.\r\nOTP 비밀번호는 총 6자리입니다.");
	} catch(e) {
		loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
	}
}

function hrdKeyPadDeleteLastStr() {
	try {
		if(targetHrdOtpElement.value.length > 0) {
			targetHrdOtpElement.value = targetHrdOtpElement.value.replace(/(\s+)?.$/, '');
		}
	} catch(e) {
		loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
	}
}

function hrdKeyPadDeleteAllStr() {
	try {
		targetHrdOtpElement.value = "";
	} catch(e) {
		loadKeypadReceiver("102","HRD Keyboard API 장애발생 - " + e.message);
	}
}


function hrdKeyPadLoaded() {
	
}
