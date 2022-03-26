


const ArrayHelper = {
	ToDataString: function (arr, devider = '|') { 
		return devider + this.join(devider) + devider;
	}
};


export default ArrayHelper;