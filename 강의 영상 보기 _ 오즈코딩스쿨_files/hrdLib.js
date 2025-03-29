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

function hrdFDSUtils() {
	
	/* ======================================================================================== */
	var isDebug = false;
	
	var srvUrl = "";
	var httpUrl = "";
	
	var usrID = "";
	/* ======================================================================================== */
	/* HRD URL DEFINE */
	/* ======================================================================================== */
	/*
	srvUrl = "https://hrd.thinkinnovation.co.kr/fdsService/hrdFDS/JSP/";
	httpUrl = "https://hrd.thinkinnovation.co.kr/fdsService/hrdFDS/Library/";
	hrdInstallDownUrl = "https://hrd.thinkinnovation.co.kr/WinApp/hrdLMS_Setup.exe";
	*/
	srvUrl = "https://fds.hrdkorea.or.kr/fdsService/hrdFDS/JSP/";
	httpUrl = "https://fds.hrdkorea.or.kr/fdsService/hrdFDS/Library/";
	hrdInstallDownUrl = "https://fds.hrdkorea.or.kr/WinApp/hrdLMS_Setup.exe";
	
	
	var otpAlert = "<정상적인 경로로 접근하지 않았습니다>\r\n\r\n동일 기기에서 다수의 계정이 연속적으로 접속됨이 확인되었습니다.\r\n원격훈련 진행 시 유의하여 주시기 바랍니다.\r\n\r\n한국산업인력공단 훈련품질향상센터\r\n052-714-8346";

	/* ======================================================================================== */
	
	var hexcase = 0;  
	var b64pad  = "="; 
	function hex_sha512(s)    { return rstr2hex(rstr_sha512(str2rstr_utf8(s))); }
	function b64_sha512(s)    { return rstr2b64(rstr_sha512(str2rstr_utf8(s))); }
	function any_sha512(s, e) { return rstr2any(rstr_sha512(str2rstr_utf8(s)), e);}
	function hex_hmac_sha512(k, d) { return rstr2hex(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d))); }
	function b64_hmac_sha512(k, d) { return rstr2b64(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d))); }
	function any_hmac_sha512(k, d, e) { return rstr2any(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)), e);}
	function sha512_vm_test() {
		return hex_sha512("abc").toLowerCase() ==
	    "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a" +
	    "2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f";
	}
	
	function rstr_sha512(s) {
		return binb2rstr(binb_sha512(rstr2binb(s), s.length * 8));
	}
	
	function rstr_hmac_sha512(key, data) {
		var bkey = rstr2binb(key);
		if(bkey.length > 32) bkey = binb_sha512(bkey, key.length * 8);
		var ipad = Array(32), opad = Array(32);
		for(var i = 0; i < 32; i++) {
		    ipad[i] = bkey[i] ^ 0x36363636;
		    opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		var hash = binb_sha512(ipad.concat(rstr2binb(data)), 1024 + data.length * 8);
		return binb2rstr(binb_sha512(opad.concat(hash), 1024 + 512));
	}
	
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
	
	function rstr2b64(input) {
		try { b64pad } catch(e) { b64pad=''; }
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var output = "";
		var len = input.length;
		for(var i = 0; i < len; i += 3) {
		    var tripvar = (input.charCodeAt(i) << 16)
		                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
		                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
		    for(var j = 0; j < 4; j++) {
		    	if(i * 8 + j * 6 > input.length * 8) output += b64pad;
		    	else output += tab.charAt((tripvar >>> 6*(3-j)) & 0x3F);
		    }
		}
		return output;
	}
	
	function rstr2any(input, encoding) {
		var divisor = encoding.length;
		var i, j, q, x, quotient;
		var dividend = Array(Math.ceil(input.length / 2));
		for(i = 0; i < dividend.length; i++) {
			dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
		}
		var full_length = Math.ceil(input.length * 8 /
	                                    (Math.log(encoding.length) / Math.log(2)));
		var remainders = Array(full_length);
		for(j = 0; j < full_length; j++) {
			quotient = Array();
			x = 0;
			for(i = 0; i < dividend.length; i++) {
				x = (x << 16) + dividend[i];
				q = Math.floor(x / divisor);
				x -= q * divisor;
				if(quotient.length > 0 || q > 0)
					quotient[quotient.length] = q;
			}
			remainders[j] = x;
			dividend = quotient;
		}
	
		var output = "";
		for(i = remainders.length - 1; i >= 0; i--)
			output += encoding.charAt(remainders[i]);
	
		return output;
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
	
	function str2rstr_utf16le(input) {
		var output = "";
		for(var i = 0; i < input.length; i++)
			output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
	                                  (input.charCodeAt(i) >>> 8) & 0xFF);
		return output;
	}
	
	function str2rstr_utf16be(input) {
		var output = "";
		for(var i = 0; i < input.length; i++)
			output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
	                                   input.charCodeAt(i)        & 0xFF);
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
	
	function binb2rstr(input) {
		var output = "";
		for(var i = 0; i < input.length * 32; i += 8)
			output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
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
	
	function checkCookie(){
		try {
			if(navigator.cookieEnabled) return true;
		    document.cookie = "cookietest=1";
		    var ret = document.cookie.indexOf("cookietest=") != -1;
		    document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
		    return ret;
		} catch(e) {
			return false;
		}
	}
	
	function chkSameUsr(usrId) {
		try {
			var lsAvailable = false;
			
			if(typeof localStorage !== 'undefined') {
				try {
					localStorage.setItem('hrd_test', 'yes');
					if (localStorage.getItem('hrd_test') === 'yes') {
						localStorage.removeItem('hrd_test');
						lsAvailable = true;
					} 
				} catch(e) { }
			} 
			
			if(lsAvailable) {
				if(localStorage.getItem("prvId") === null || localStorage.getItem("prvId") == "") {
					localStorage.setItem("prvId", usrId);  
					localStorage.setItem("prvIdDt", new Date());  
					return true;
				} else {
					var prvUsr = localStorage.getItem("prvId");
					var prvIdDt = localStorage.getItem("prvIdDt");
					var nowIdDt = null;
					var minDtGap = null;
					
					if(prvUsr != usrId) {
						nowIdDt = new Date();
						minDtGap = nowIdDt.getTime() - new Date(prvIdDt).getTime();
						minDtGap = minDtGap / 1000 / 60;
						
						if(minDtGap <= 20) {
							localStorage.setItem("prvId", usrId);  
							localStorage.setItem("prvIdDt", new Date());  
							return false;
						} else {
							localStorage.setItem("prvId", usrId);  
							localStorage.setItem("prvIdDt", new Date());  
							return true;
						}
					} else {
						localStorage.setItem("prvId", usrId);  
						localStorage.setItem("prvIdDt", new Date());  
						return true;
					}
				} 
				return true;
			} else {
				if(checkCookie) {
					if(getCookie("prvId") === null) {
						setCookie("prvId", usrId, 365);
						setCookie("prvIdDt", new Date(), 365);
						return true;
					} else {
						var prvUsr = getCookie("prvId");
						var prvIdDt = getCookie("prvIdDt");
						var nowIdDt = null;
						var minDtGap = null;
						
						if(prvUsr != usrId) {
							nowIdDt = new Date();
							minDtGap = nowIdDt.getTime() - new Date(prvIdDt).getTime();
							minDtGap = minDtGap / 1000 / 60;
							
							if(minDtGap <= 20) {
								setCookie("prvId", usrId, 365);
								setCookie("prvIdDt", new Date(), 365);
								return false;
							} else {
								setCookie("prvId", usrId, 365);
								setCookie("prvIdDt", new Date(), 365);
								return true;
							}
						} else {
							setCookie("prvId", usrId, 365);
							setCookie("prvIdDt", new Date(), 365);
							return true;
						}
					}
				} else {
					return true;
				}
			}
		} catch(e) {
			return true;
		}
	}
	
	function getCookie(c_name) {
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0 ; i < ARRcookies.length ; i++) {
			x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x = x.replace(/^\s+|\s+$/g,"");
			if(x == c_name) {
				return unescape(y);
			}
		}
	}

	function setCookie(c_name, value, exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
	}
	
	var DownBrowserChecker = {
		    init: function () {
		        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
		        this.OS = this.searchString(this.dataOS) || "an unknown OS";
		    },
		    searchString: function (data) {
		        for (var i=0;i<data.length;i++) {
		            var dataString = data[i].string;
		            var dataProp = data[i].prop;
		            this.versionSearchString = data[i].versionSearch || data[i].identity;
		            if (dataString) {
		                if (dataString.indexOf(data[i].subString) != -1)
		                    return data[i].identity;
		            }
		            else if (dataProp)
		                return data[i].identity;
		        }
		    },
		    searchVersion: function (dataString) {
		        var index = dataString.indexOf(this.versionSearchString);
		        if (index == -1) return;
		        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		    },
		    dataBrowser: [
		        {
		            string: navigator.userAgent,
		            subString: "Chrome",
		            identity: "Chrome"
		        },
		        {   string: navigator.userAgent,
		            subString: "OmniWeb",
		            versionSearch: "OmniWeb/",
		            identity: "OmniWeb"
		        },
		        {
		            string: navigator.vendor,
		            subString: "Apple",
		            identity: "Safari",
		            versionSearch: "Version"
		        },
		        {
		            prop: window.opera,
		            identity: "Opera",
		            versionSearch: "Version"
		        },
		        {
		            string: navigator.vendor,
		            subString: "iCab",
		            identity: "iCab"
		        },
		        {
		            string: navigator.vendor,
		            subString: "KDE",
		            identity: "Konqueror"
		        },
		        {
		            string: navigator.userAgent,
		            subString: "Firefox",
		            identity: "Firefox"
		        },
		        {
		            string: navigator.vendor,
		            subString: "Camino",
		            identity: "Camino"
		        },
		        {       // for newer Netscapes (6+)
		            string: navigator.userAgent,
		            subString: "Netscape",
		            identity: "Netscape"
		        },
		        {
		            string: navigator.userAgent,
		            subString: "MSIE",
		            identity: "Explorer",
		            versionSearch: "MSIE"
		        },
		        {
		            string: navigator.userAgent,
		            subString: "Gecko",
		            identity: "Mozilla",
		            versionSearch: "rv"
		        },
		        {       // for older Netscapes (4-)
		            string: navigator.userAgent,
		            subString: "Mozilla",
		            identity: "Netscape",
		            versionSearch: "Mozilla"
		        }
		    ],
		    dataOS : [
		        {
		            string: navigator.platform,
		            subString: "Win",
		            identity: "Windows"
		        },
		        {
		            string: navigator.platform,
		            subString: "Mac",
		            identity: "Mac"
		        },
		        {
		               string: navigator.userAgent,
		               subString: "iPhone",
		               identity: "iPhone/iPod"
		        },
		        {
		            string: navigator.platform,
		            subString: "Linux",
		            identity: "Linux"
		        }
		    ]
		
		};
		DownBrowserChecker.init();
		
	var browserInfo = {
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
	browserInfo.init();

	var BrowserPrint = {
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
				    	return hex_sha512(strng);
				    }
				} catch(e) {
					return "NONE";
				}
			}
	};
	BrowserPrint.init();	
	
	var GLPrint = {
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
	GLPrint.init();
	
	var TabID = {
		init : function() {
			this._ID = this.getTabID() || "0";
		},
		getTabID: function() {
			try {
				var iPageTabID = sessionStorage.getItem("tabID");
				var iLocalTabID;
				
				if(iPageTabID == null) {			
					iLocalTabID = localStorage.getItem("tabID");
					if(iLocalTabID >= 10) {
						iLocalTabID = 0;
						localStorage.setItem("tabID",iLocalTabID);
					}
					
					var iPageTabID = (iLocalTabID == null) ? 1 : Number(iLocalTabID) + 1;
					localStorage.setItem("tabID",iPageTabID);
					sessionStorage.setItem("tabID",iPageTabID);
				}
					
				return iPageTabID;
			} catch(e) {
				return 0;
			}	
		}
	};
	TabID.init();
	
	var BZ_ID = {
		init : function() {
			this._ID = this.getID() || "UNKNOWN";
		},
		getID : function() {
			var rId = "";
			var lsAvailable = false;
			try {
				if(typeof localStorage !== 'undefined') {
					try {
						localStorage.setItem('hrd_test', 'yes');
						if (localStorage.getItem('hrd_test') === 'yes') {
							localStorage.removeItem('hrd_test');
							lsAvailable = true;
						} 
					} catch(e) { }
				} 
				
				try {
					rId = String( Math.random().toString(36).substr(2, 9) );
				} catch(e) { rId = ""; }
				
				if(rId != "" && rId != null) {
					if(lsAvailable) {
						if(localStorage.getItem("hrdId") === null) {
							localStorage.setItem("hrdId", rId);  
						} 
						return String( localStorage.getItem("hrdId") );
					} else {
						if(checkCookie) {
							if(getCookie("hrdId") === null) {
								setCookie("hrdId", rId, 365);
							}
							return String( getCookie("hrdId") );
						} else {
							return "UNKNOWN";
						}
					}
				} else {
					return "UNKNOWN";
				}
			} catch(e) {
				return "UNKNOWN";
			}
		}
	}
	BZ_ID.init();
		
	var ClientInfo = {
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
	ClientInfo.init();
	

	var enc64List, dec64List;
	 
	function initBase64() {
	    enc64List = new Array();
	    dec64List = new Array();
	    var i;
	    for (i = 0; i < 26; i++) {
	        enc64List[enc64List.length] = String.fromCharCode(65 + i);
	    }
	    for (i = 0; i < 26; i++) {
	        enc64List[enc64List.length] = String.fromCharCode(97 + i);
	    }
	    for (i = 0; i < 10; i++) {
	        enc64List[enc64List.length] = String.fromCharCode(48 + i);
	    }
	    enc64List[enc64List.length] = "+";
	    enc64List[enc64List.length] = "/";
	    for (i = 0; i < 128; i++) {
	        dec64List[dec64List.length] = -1;
	    }
	    for (i = 0; i < 64; i++) {
	        dec64List[enc64List[i].charCodeAt(0)] = i;
	    }
	}
 
	function base64Encode(str) {
	    initBase64();
	    var c, d, e, end = 0;
	    var u, v, w, x;
	    var ptr = -1;
	    var input = str.split("");
	    var output = "";
	    while(end == 0) {
	        c = (typeof input[++ptr] != "undefined") ? input[ptr].charCodeAt(0) : 
	            ((end = 1) ? 0 : 0);
	        d = (typeof input[++ptr] != "undefined") ? input[ptr].charCodeAt(0) : 
	            ((end += 1) ? 0 : 0);
	        e = (typeof input[++ptr] != "undefined") ? input[ptr].charCodeAt(0) : 
	            ((end += 1) ? 0 : 0);
	        u = enc64List[c >> 2];
	        v = enc64List[(0x00000003 & c) << 4 | d >> 4];
	        w = enc64List[(0x0000000F & d) << 2 | e >> 6];
	        x = enc64List[e & 0x0000003F];
	        if (end >= 1) {x = "=";}
	        if (end == 2) {w = "=";}
	        if (end < 3) {output += u + v + w + x;}
	    }
	    var formattedOutput = "";
	    var lineLength = 76;
	    while (output.length > lineLength) {
	     formattedOutput += output.substring(0, lineLength) + "\n";
	     output = output.substring(lineLength);
	    }
	    formattedOutput += output;
	    return formattedOutput;
	}
 
	function base64Decode(str) {
	    var c=0, d=0, e=0, f=0, i=0, n=0;
	    var input = str.split("");
	    var output = "";
	    var ptr = 0;
	    do {
	        f = input[ptr++].charCodeAt(0);
	        i = dec64List[f];
	        if ( f >= 0 && f < 128 && i != -1 ) {
	            if ( n % 4 == 0 ) {
	                c = i << 2;
	            } else if ( n % 4 == 1 ) {
	                c = c | ( i >> 4 );
	                d = ( i & 0x0000000F ) << 4;
	            } else if ( n % 4 == 2 ) {
	                d = d | ( i >> 2 );
	                e = ( i & 0x00000003 ) << 6;
	            } else {
	                e = e | i;
	            }
	            n++;
	            if ( n % 4 == 0 ) {
	                output += String.fromCharCode(c) + 
	                          String.fromCharCode(d) + 
	                          String.fromCharCode(e);
	            }
	        }
	    }
	    while (typeof input[ptr] != "undefined");
	    output += (n % 4 == 3) ? String.fromCharCode(c) + String.fromCharCode(d) : 
	              ((n % 4 == 2) ? String.fromCharCode(c) : "");
	    return output;
	}
	
	this.hrdFDS = function(AGENT_ID, USER_ID, SESSION_ID, DebugYN) {
		USER_ID = "BASE64STR" + base64Encode( USER_ID );
		
		usrID = USER_ID;
		
		if(DebugYN != null && DebugYN == true) isDebug = true;
		
		try {
			try {
				if(browserInfo.os == "" || browserInfo.os == null) {
					var nAgent = navigator.userAgent;
					if(nAgent.indexOf("Windows ") >= 0) {
						browserInfo.os = "Windows";
					}
				}
				
				if(browserInfo.os == "Windows") {
					checkWinApp("innoFDS", AGENT_ID, USER_ID, SESSION_ID);
				} 
			} catch(e) {
				if(isDebug)
					alert("hrdFDS Loading(1) Ex : " + e.message);
			}
			
			try {
				setTimeout(function() {
					
					var alertYN = "N";
					if(!chkSameUsr(USER_ID)) {
						alertYN = "Y";
					}
					
					var fcVal = BrowserPrint.print;
					var glVal = GLPrint.print;
					var tzVal = ClientInfo.TimeZone;
					var sInfo = ClientInfo.ScreenInfo;
					var bzInfo = ClientInfo.BrowserDetail;
					var plugInfo = ClientInfo.PluginList;
					var tabId = TabID._ID;
					var bzId = BZ_ID._ID;
					
					closeScript(AGENT_ID, USER_ID, SESSION_ID, fcVal, tzVal, sInfo, bzInfo, plugInfo, glVal, tabId, bzId, alertYN);
				}, 1000);
			} catch(e) {
				if(isDebug)
					alert("hrdFDS Loading(2) Ex : " + e.message);
			}
			
		} catch(e) {
		}
	}
	
	function closeScript(AGENT_ID, USER_ID, SESSION_ID, fcVal, tzVal, sInfo, bzInfo, plugInfo, glVal, tabId, bzId, alertYN) {
		
		var useXDR = window.XDomainRequest && (window.XMLHttpRequest && new XMLHttpRequest().responseType === undefined);
		var HRD = "";
		HRD = AGENT_ID + ":IT:";
		HRD += USER_ID + ":IT:";
		HRD += SESSION_ID + ":IT:";
		HRD += fcVal + ":IT:";
		HRD += hex_sha512( sInfo ) + ":IT:";
		HRD += hex_sha512( bzInfo ) + ":IT:";
		HRD += tzVal + ":IT:";
		HRD += sInfo + ":IT:";
		HRD += bzInfo + ":IT:";
		HRD += debugChk() + ":IT:";
		HRD += plugInfo + ":IT:";
		HRD += hex_sha512( plugInfo ) + ":IT:";
		HRD += hex_sha512( glVal ) + ":IT:";
		HRD += tabId + ":IT:";
		HRD += bzId + ":IT:";
		HRD += alertYN + ":IT:";
		
		if(useXDR) {
			try {
				if($.ajaxSetup !== "undefined")
					$.ajaxSetup({ cache: false });
				
				if($.support.cors !== "undefined")
					$.support.cors = true;
				
				var xdr = new XDomainRequest();
				var exportUrl = srvUrl + "regiScriptInfo.jsp?HRD=" + HRD; 
				
				var isSuccess = true;		
				
				xdr.onload = function (data) {                    
				};
				xdr.onsuccess = function() {
			    };
			    xdr.onprogress = function() {
			    };
				xdr.onerror = function () {
					isSuccess = false;
				};
					
				xdr.open("get", exportUrl);
				xdr.send();
				
				var response = xdr.responseText;
				xdr == null;
				
				if(alertYN == "Y") {
					if(getEncodeInfo()) {
						alert(otpAlert);
					} else {
						try {
							var winWidth = 0;
							var winHeight = 0;
							
							var cBrowser = browserInfo.browser;
							
							if(cBrowser.indexOf("Explorer") >= 0) {
								if(DownBrowserChecker.version > 9) {
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
							
							var left = ((winWidth / 2) - 250) + "px";
							var top = ((winHeight / 2) - 150) + "px";
					
							var params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=300,left=' + left + ',top=' + top;
							var popYN = window.open(httpUrl + 'fdsAlert.jsp', 'exeDown', params);
						} catch(e) {
							alert("pop ex : " + e.message);
						}
					}
				}
				
			} catch(e) {
				if(isDebug)
					alert("hrdFDS regiScript(1) Ex : " + e.message);
				return "";
			}
		} else {
			try {
				if($.ajaxSetup !== "undefined")
					$.ajaxSetup({ cache: false });
				
				if($.support.cors !== "undefined")
					$.support.cors = true;
				
				$.ajax({
					type : "POST",
					url  : srvUrl + "regiScriptInfo.jsp",
					data : {
						HRD : HRD
					},
					dataType : "text",
					success : function(data) {
						if(alertYN == "Y") {
							if(getEncodeInfo()) {
								alert(otpAlert);
							} else {
								try {
									var winWidth = 0;
									var winHeight = 0;
									
									var cBrowser = browserInfo.browser;
									
									if(cBrowser.indexOf("Explorer") >= 0) {
										if(DownBrowserChecker.version > 9) {
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
									
									var left = ((winWidth / 2) - 250) + "px";
									var top = ((winHeight / 2) - 150) + "px";
							
									var params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=500,height=300,left=' + left + ',top=' + top;
									var popYN = window.open(httpUrl + 'fdsAlert.jsp', 'exeDown', params);
								} catch(e) {
									alert("pop ex : " + e.message);
								}
							}
						}
					},
					error : function(xhr, textStatus, error) {
						if(isDebug)
							alert("hrdFDS regiScript(2) Error : " + error);
					}
				});
			} catch(e) {
				if(isDebug)
					alert("hrdFDS regiScript(2) Ex : " + e.message);
				return "";
			}
		}
	}
	
	
	function checkWinApp(KeyVal, AGENT_ID, USER_ID, SESSION_ID) {
		var useXDR = window.XDomainRequest;
		var inputParam = KeyVal + " " + AGENT_ID + " " + USER_ID + " " + SESSION_ID;
		
		if($.get === "undefined") {
			if(useXDR) {
				checkWinApp_xDomin(inputParam);
			} 
		} else {
			checkWinApp_jQuery(inputParam);
		}
	}
	
	
	function checkWinApp_xDomin(inputParam) {
		try {
			if($.ajaxSetup !== "undefined")
				$.ajaxSetup({ cache: false });
			
			if($.support.cors !== "undefined")
				$.support.cors = true;
			
			var xdr = new XDomainRequest();
			var exportUrl = "http://127.0.0.1:42401?" + inputParam; 
			
			var isSuccess = true;		
			
			xdr.onload = function (data) { 
			};
			xdr.onsuccess = function() {
		    };
		    xdr.onprogress = function() {
		    };
			xdr.onerror = function () {
				isSuccess = false;
				removeConsole();
				openHRDInstall(); 
			};
				
			xdr.open("get", exportUrl);
			xdr.send();
			
			var response = xdr.responseText;
			
			xdr == null;
			
			removeConsole();
			
		} catch(e) {
			removeConsole();
			
			if(isDebug)
				alert("hrdFDS execApp(1) Ex : " + e.message);
			
			return "";
		}
	}
	
	
	function checkWinApp_jQuery(inputParam) {
		try {	
			if($.ajaxSetup !== "undefined")
				$.ajaxSetup({ cache: false });
			
			if($.support.cors !== "undefined")
				$.support.cors = true;
			
			var exportUrl = "http://127.0.0.1:42401?" + inputParam; 
			$.get(exportUrl, 
				function(data) { 
				}
			)
			.error(function(xhr, textStatus, error) { 
				removeConsole();
				openHRDInstall();
			});
			
		} catch(e) { 
			removeConsole();
			
			if(isDebug)
				alert("hrdFDS execApp(2-Win) Ex : " + e.message);
		}
	}

	function openHRDInstall() {
		try {
			var downMsg = "";
			downMsg += "단말정보수집 프로그램 설치\r\n";
			downMsg += "본프로그램은 신뢰할 수 있는 원격훈련 학습환경을 지원하기 위하여 온라인 학습환경 중 일부 정보를 수집합니다.\r\n";
			downMsg += "* 수집목적 : 원격훈련 부정부실 예방 및 훈련결과 모니터링\r\n";
			downMsg += "* 수집근거 : 근로자직업능력 개발법 제7조의 2. 직업능력개발훈련 모니터링에 관한 규정. 사업주 직업능력개발훈련 지원규정.\r\n";
			downMsg += "* 수집항목 : IP,MAC,HDD 식별정보 등\r\n";
			downMsg += "* 사용용도 : 직업능력개발훈련 모니터링 및 연구지원 활동\r\n";
			downMsg += "* 수집기관 : 한국산업인력공단\r\n";
			
			if(getFDSEncodeInfo()) {
				if(confirm(downMsg)) {
					location.href = hrdInstallDownUrl;
				}
			} else {
				try {
					var winWidth = 0;
					var winHeight = 0;
					
					var cBrowser = browserInfo.browser;
					
					if(cBrowser.indexOf("Explorer") >= 0) {
						if(DownBrowserChecker.version > 9) {
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
					
					var left = ((winWidth / 2) - 270) + "px";
					var top = ((winHeight / 2) - 230) + "px";
			
					var params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=540,height=460,left=' + left + ',top=' + top;
					var popYN = window.open(httpUrl + 'DownIntro.jsp?inputParam=NEW', 'exeDown', params);
				} catch(e) {
					
				}
			}
		} catch(e) {  }
	}		
	
	function getFDSEncodeInfo() {
		try {
			var eType = document.charset;
			if(eType == "UTF-8" || eType == "utf-8") return true;
			else return false;
		} catch(e) {
			return false;
		}
	}
	
	function removeConsole() {			
		try {			
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
	
	function debugChk() {
		try {
			var threshold = 160;
			var widthThreshold = window.outerWidth - window.innerWidth > threshold;
			var heightThreshold = window.outerHeight - window.innerHeight > threshold;
			
			if(window.innerHeight == 0 || window.innerWidth == 0) return "N";	
			else if(widthThreshold || heightThreshold) return "Y";
			else return "N";
		} catch(e) {
			return "N";
		}
	}
	
	this.getOS = function() {
		return browserInfo.os;
	}
	
	this.getOSVer = function() {
		return browserInfo.osVersion;
	}
	
	this.getBrowser = function() {
		return browserInfo.browser;
	}
	
	this.getIE_Version = function() {    
        var rv = -1;     
        if (navigator.appName == 'Microsoft Internet Explorer') {        
             var ua = navigator.userAgent;        
             var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
             if (re.exec(ua) != null)            
                 rv = parseFloat(RegExp.$1);    
            }    
        return rv; 
	} 

	this.getNIDeviceKey = function() {
		try {
			if(browserInfo.os == "iOS") {
				return hex_sha512( GLPrint.print + ClientInfo.NaviDetail);
			} else {
				return hex_sha512( BrowserPrint.print + GLPrint.print );
			}
		} catch(e) {
			return "";
		}
	}	
};

function checkLoaded() {
	return true;
}