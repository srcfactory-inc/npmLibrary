import StringHelper from "./StringHelper";


const DateHelper = {
	//날짜 요일명 추출
	GetWeekday: function (dt = Date.now(), fullname = false) { 
		return dt.toLocaleString('default', { weekday: fullanme ? 'long' : 'short' });
	},


	//입력 포멧에 맞춰 날짜값을 문자열로 반환
	ToDateTimeString: function (dt, format = 'yyyy-MM-dd') { 
		if (dt == null) return '';

		var year = this.getFullYear();
		var shortYear = year % 100;
		var month = this.getMonth() + 1;
		var day = this.getDate();
		var hour = this.getHours();
		var minute = this.getMinutes();
		var second = this.getSeconds();
		var weekday = this.GetWeekday(null);

		return format.replace(/yyyy/g, year.toString())
			.replace(/yy/g, shortYear.toString())
			.replace(/MM/g, month.toString().padStart(2, '0'))
			.replace(/ddd/g, weekday)
			.replace(/dd/g, day.toString().padStart(2, '0'))
			.replace(/tt/g, (hour >= 12 ? '오후' : '오전'))
			.replace(/hh/g, (hour % 12).toString().padStart(2, '0'))
			.replace(/HH/g, hour.toString().padStart(2, '0'))
			.replace(/mm/g, minute.toString().padStart(2, '0'))
			.replace(/ss/g, second.toString().padStart(2, '0'));
	},


	//시간에서 년-월-일만 추출
	GetDateOnly: function (dt) { 
		return StringHelper.ToDateTime(this.ToDateTimeString(dt.ToString()));
	},


	//한국 시간값으로 변환
	ToKorDate: function (dt) { 
		return new Date(dt.getTime() - (-540 - new Date().getTimezoneOffset()) * 60000);
	},


	//실행 위치의 시간값 반환
	ToLocaleDate: function (dt, timezone) { 
		return new Date(dt.getTime() + (timezone + new Date().getTimezoneOffset()) * 60000);
	},


	//시간값 추가
	AddDate: function (dt, year, month, day, hour, minute, second) { 
		var returnDt = new Date(dt.getTime()
			+ 86400000 * day
			+ 3600000 * hour
			+ 60000 * minute
			+ 1000 * second
		);

		returnDt.setFullYear(returnDt.getFullYear() + year);
		returnDt.setMonth(returnDt.getMonth() + month);

		return returnDt;
	},


	//보기좋게 짧은 값으로 반환
	ToSimpleString: function (dt) { 
		if (new Date().getTime() - dt.getTime() > 86400000 * 30) {
			return this.ToDateTimeString(dt, 'yyyy.MM');
		}
		else if (this.ToDateTimeString(dt) == this.ToDateTimeString(new Date())) {
			return this.ToDateTimeString(dt, 'HH:mm');
		}
		else { 
			return this.ToDateTimeString(dt, 'MM-dd');
		}
	}
};

export default DateHelper;