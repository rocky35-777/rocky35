/**
 * FunlabUtil Class
 */
function FunlabUtil() {
	var _this = this;
	
	/**
	 * 주소 조회
	 * 
	 * @param param
	 * @param callback
	 */
	_this.getAddress = function(param, callback) {
		$.ajax({
			url: '/api/getAddress',
			async: false,
			type: 'get',
			dataType: 'json',
			data: param,
			success: function(result) {
				//console.dir(result);
				
				if (callback != undefined) {
					callback(result, param);
				}
			},
			fail: function(err) {
				alert(err);
			}
		});
	};
	
	/**
	 * 주소 셀렉트박스 생성
	 * 
	 * @param obj
	 * @param param
	 */
	_this.genSelectAddress = function(obj, param) {
	
		// param.gubun		sd / sgg
		// param.code		11
		
		_this.getAddress(param, function(result){
			//console.dir(result);
			
			var html = '';
			//html += '<select>';
			
			if (param.gubun == 'sd') {
				html += '<option value="">시/도 선택</option>';
			} else if (param.gubun == 'sgg') {
				html += '<option value="">구/군 선택</option>';
			}
			
			$.each(result, function(i, v){
				html += '<option value="' + v.code + '">' + v.code_name + '</option>';
			});
			
			//html += '</select>';
			
			obj.empty();
			obj.append(html);
		});
	};
	
	/**
	 * 문자열 치환
	 * 
	 * @param originStr		문자열 대체를 처리할 원 문자열
	 * @param targetStr		대체하기 원하는 문자(열)
	 * @param replaceStr	대체될 문자(열)
	 */
	_this.replaceAll = function(originStr, searchStr, replaceStr) {
	    return originStr.split(searchStr).join(replaceStr);
	};
	
	/**
	 * 숫자만 입력
	 * 
	 * @param obj			인풋 오브젝트
	 */
	_this.onlyNumeric = function(obj) {
		k = event.keyCode;
		
		if ((k >= 48 && k <= 57) || // 숫자만 입력
			event.shiftKey || // shiftKey
			k == 8 || // backspace
			k == 9 || // tab
			k == 46 || // delete
			k == 37 || // left arrow
			k == 38 || // up arrow
			k == 39 || // right arrow
			k == 40 // down arrow
			) {
	        return true;
	    } else {
	        event.returnValue = false;
	    }
	};
	
	// 인풋 파일 컨트롤러 초기화
	_this.initInputFile = function() {
		var self = this;
		
		var scope = $('*[data-role="ui-input-file"]');
		
		scope.each(function() {
			scope.data('is-init', true);
			
			var inputFile = $(this).find('input[type=file]');
			var inputFake = $(this).find('input[type=text]');
			//var inputButton = $(this).find('input[type=button]');
			var inputButton = $(this).find('label');
			var inputIsChange = $(this).find('*[data-role=ipt-is-change]');
			var inputOrdSeq = $(this).find('*[data-role=ipt-ord-seq]');
			
			/* IE9 버그로 인해 label로 변경함
			inputButton.on('click', function() {
				inputFile.trigger('click');
			});
			*/
			
			inputFile.on('change', function() {
				var fileName = $(this).val();
				inputFake.val(fileName);
				
				// 기존파일을 삭제하고 변경등록시
				if (inputOrdSeq.val() != '') {
					inputIsChange.val('Y');
				}
			});
		});
	};

	// Input의 Value를 Trim 처리
	_this.trimInputValue = function($inputs) {
		$.each($inputs, function(idx, $input) {
			var val = $.trim($input.val());
			$input.val(val);
		});
	};

	// 아이디 유효성 검사
	_this.isValidId = function(val) {
		var regId = /^[a-z0-9]{3,50}$/;
		return regId.test(val);
	};

	// 비밀번호 유효성 검사
	_this.isValidPassword = function(val) {
		var regPw = /^(?=.*[a-zA-Z])((?=.*[!@#$%^*+=-])|(?=.*[0-9])).{6,15}$/;

		if (!regPw.test(val)) {
			return false;
		}

		if (val.length < 6 || val.length > 15) {
			return false;
		}

		return true;
	};

	// 핸드폰번호 유효성 검사
	_this.isValidPhone = function(val) {
		var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
		return regPhone.test(val);
	};

  // 핸드폰번호 4자리만 유효성 검사
	_this.isValidPhoneNumber4 = function(val) {
		var regPhoneNum = /^([0-9]{4})$/;
		return regPhoneNum.test(val);
	}

	// 이메일 유효성 검사
	_this.isValidEmail = function(val) {
		var regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return regEmail.test(val);
	};

	// 이름 유효성 검사
	_this.isValidUserName = function(val) {
		var regNm = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}$/;
		return regNm.test(val);
	};

	//한글 이름 유효성 검사
	_this.isValidKoreanName = function(val) {
		var regName = /^[가-힣]{2,15}$/;
		return regName.test(val);
	}

	// 아이디 입력시 한글
	_this.isExistHangul = function(str) {
		var intErr;
		var strValue = str;
		var retCode = 0;
		var re = /[~!@\#$%<>^&*\()\-=+_\']/gi; //특수문자 정규식 변수 선언

		for (i = 0; i < strValue.length; i++) {
			var retCode = strValue.charCodeAt(i)
			var retChar = strValue.substr(i,1).toUpperCase()
			retCode = parseInt(retCode)

			// 입력받은 값중에 한글이 있으면 에러
			if ((retChar < '0' || retChar > '9') &&
				(retChar < 'A' || retChar > 'Z') &&
				(retCode > 255 || retCode < 0) ) {
				intErr = -1;
				break;

			}
			/*
			// 입력받은 값중에 특수문자가 있으면 에러
			else if(re.test(strValue)) {
				intErr = -1;
				break;
			}
			*/
		}

		return (intErr);
	};

	// 3자리 마다 콤마 찍기
	_this.numberWithCommas = function(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	/*****************************
	 * 입력 받은 문자열에서 숫자만 반환
	 * 예) 입력 010-1234-5678   => 출력 01012345678
	 * @param val
	 * @returns string
	 *****************************/
	_this.getNumberOnly = function(val) {
		var returnval = val;
		returnval = new String(returnval);
		var regex = /[^0-9]/g;
		returnval = returnval.replace(regex, '');

		return returnval;
	}
	
	_this.init = function() {
		_this.initInputFile();
	}();
}

var util = new FunlabUtil();