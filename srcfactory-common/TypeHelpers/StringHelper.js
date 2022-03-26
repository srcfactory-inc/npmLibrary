import _ from 'underscore';


const StringHelper = {
	//문자열 Byte길이 반환
	GetBytes: function (str) {
		var len = 0;

		for (var i = 0; i < str.length; i++) {
			var c = str.charCodeAt(i);
			len += c >> 11 ? 3 : c >> 7 ? 2 : 1;
		}

		return len;
	},


	//전화번호 값 배열 반환
	GetPhoneArr: function (str) { 
		var numStr = str.replace(/^0-9/g, '');

		if (numStr.length < 10 || numStr.length > 11) {
			return [numStr];
		}
		else { 
			return [
				numStr.substring(0, 3),
				numStr.substring(3, numStr.length == 10 ? 6 : 7),
				numStr.substring(numStr.length == 10 ? 6 : 7)
			];
		}
	},


	//문자열 자르기
	CutString: function (str, limit, suffix = '..', byteLength = true) { 
		if (byteLength === true) {
			var returnStr = '';
			var totalBytes = 0;

			for (var i = 0; i < str.length; i++) { 
				totalBytes += this.GetBytes(str.charAt(i));

				if (totalBytes > limit) { 
					if (i < str.length)
						returnStr += suffix;
					
					break;
				}

				returnStr += str.charAt(i);
			}

			return returnStr;
		} else { 
			return str.substring(0, limit) + (str.length > limit ? suffix : '');
		}
	},


	//문자열 HTML 태그 해체
	ClearHtmlTag: function (str) { 
		return str.replace(/</g, '&lt;').replace(/>/g, '&gt');
	},


	//쌍따옴표 html형식으로 변환
	DoubleQuoteToHtml: function (str) { 
		return str.replace(/"/g, '&quote;');
	},


	//빈문자 html형식으로 변환
	SpaceToHtml: function (str) { 
		return str.replace(/ /g, '&nbsp;');
	},


	//HTML평문으로 전환
	ToHtmlPlainText: function (str) { 
		return this.SpaceToHtml(this.DoubleQuoteToHtml(this.ClearHtmlTag(str)));
	},


	//와일드카드 문자열 평문처리 (\, ", ', "")
	ReplaceWildcardChar: function (str) {
		return str.replace(/'/g, '\\\'')
			.replace(/"/g, '\\"')
			.replace(/\\/g, '\\\\');
	},


	//치환처리
	Format: function (str, args) { 
		var returnStr = str;

		for (var i = 0; i < args.length; i++) {
			returnStr = returnStr.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i]);
		}

		return returnStr;
	},


	//문자열을 UUID형식으로 전환
	ToUUID: function (str) { 
		if (str.length != 32) {
			console.log('문자열 길이가 32자가 아닙니다. - 입력길이: ' + str.length);
			return str;
		}
		else { 
			return str.substring(0, 8) + '-'
				+ str.substring(8, 12) + '-'
				+ str.substring(12, 16) + '-'
				+ str.substring(16, 20) + '-'
				+ str.substring(20, 32);
		}
	},


	//문자열을 날짜형식으로 전환
	ToDateTime: function (str) { 
		if (Date.prototype.toISOString) {
			return new Date(new Date(str).getTime() + new Date(str).getTimezoneOffset() * 60000);
		}
		else { 
			var dt = new Date(parseInt(str.substring(0, 4)), parseInt(str.substring(5, 7)), parseInt(str.substring(8, 10)));

			if (str.length > 10) dt.setHours(parseInt(str.substring(11, 13)));
			if (str.length > 13) dt.setMinutes(parseInt(str.substring(14, 16)));
			if (str.length > 16) dt.setSeconds(parseInt(str.substring(17, 19)));

			return new Date(dt.getTime() + dt.getTimezoneOffset() * 60000);
		}
	}
};

export default StringHelper;