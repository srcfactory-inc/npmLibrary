


const NumberHelper = {
	//화폐 형식으로 반환
	ToCurrency: function (num) {
		return Intl.NumberFormat().format(num);
	},


	//비트 값을 배열로 전환
	GetBitArray: function (num) { 
		var returnArr = [];

		var checkVal = 1;
		for (var i = 1; i < 64; i++) {
			if ((num & checkVal) != 0)
				returnArr.push(checkVal);
			
			checkVal <<= 1;
		}

		return returnArr;
	}
}


export default NumberHelper;