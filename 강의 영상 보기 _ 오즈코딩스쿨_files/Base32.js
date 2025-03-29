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

	
	
	function hrdOtpEncodeUtf8(str) {
		
		/* ========================================================================================= */
		/* Class Variables */

		var BASE32_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('');
		var BASE32_DECODE_CHAR = { 
		    'A': 0,  'B': 1,  'C': 2,  'D': 3,  'E': 4,  'F': 5,  'G': 6,  'H': 7, 
		    'I': 8,  'J': 9,  'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 
		    'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 
		    'Y': 24, 'Z': 25, '2': 26, '3': 27, '4': 28, '5': 29, '6': 30, '7': 31
		};

		var blocks = [0, 0, 0, 0, 0, 0, 0, 0];
		/* ========================================================================================= */
		
		try {
			var v1, v2, v3, v4, v5, code, end = false, base32Str = '',
				index = 0, i, start = 0, bytes = 0, length = str.length;
		    do {
		    	blocks[0] = blocks[5];
		    	blocks[1] = blocks[6];
		    	blocks[2] = blocks[7];
		    	for (i = start; index < length && i < 5; ++index) {
		    		code = str.charCodeAt(index);
			        if (code < 0x80) {
		        		blocks[i++] = code;
			        } else if (code < 0x800) {
		        		blocks[i++] = 0xc0 | (code >> 6);
			            blocks[i++] = 0x80 | (code & 0x3f);
			        } else if (code < 0xd800 || code >= 0xe000) {
			            blocks[i++] = 0xe0 | (code >> 12);
			            blocks[i++] = 0x80 | ((code >> 6) & 0x3f);
			            blocks[i++] = 0x80 | (code & 0x3f);
			        } else {
			            code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++index) & 0x3ff));
			            blocks[i++] = 0xf0 | (code >> 18);
			            blocks[i++] = 0x80 | ((code >> 12) & 0x3f);
			            blocks[i++] = 0x80 | ((code >> 6) & 0x3f);
			            blocks[i++] = 0x80 | (code & 0x3f);
			        }
	    		}
		    	
		        bytes += i - start;
		        start = i - 5;
		        if (index === length) {
		        	++index;
		        }
		        if (index > length && i < 6) {
		        	end = true;
		        }
		        v1 = blocks[0];
		        if (i > 4) {
		        	v2 = blocks[1];
		        	v3 = blocks[2];
		        	v4 = blocks[3];
		        	v5 = blocks[4];
		        	base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
		            	BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
		            	BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
		            	BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
		            	BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
		            	BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
		            	BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] +
		            	BASE32_ENCODE_CHAR[v5 & 31];
		        } else if (i === 1) {
		        	base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
		        	BASE32_ENCODE_CHAR[(v1 << 2) & 31] +
		        	'======';
		        } else if (i === 2) {
		        	v2 = blocks[1];
		        	base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
		        		BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
		        		BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
	        			BASE32_ENCODE_CHAR[(v2 << 4) & 31] +
	        			'====';
		        } else if (i === 3) {
		        	v2 = blocks[1];
		        	v3 = blocks[2];
		        	base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
		        		BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
		        		BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
		        		BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
		        		BASE32_ENCODE_CHAR[(v3 << 1) & 31] +
		        		'===';
		        } else {
		        	v2 = blocks[1];
		        	v3 = blocks[2];
		        	v4 = blocks[3];
		        	base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] +
		        		BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
		        		BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
		        		BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
		        		BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
		        		BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
		        		BASE32_ENCODE_CHAR[(v4 << 3) & 31] +
		        		'=';
		        }
		    } while (!end);
		    
			return base32Str;
		} catch(e) {
			return '';
		}
	}
	
