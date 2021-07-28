Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
};


String.prototype.isNullOrEmpty = function () {
  if (this === null || this.length === 0) {
    return true;
  } else {
    return false;
  }
}

String.prototype.isNumber = function () {
  var patrn = /^[0-9]*$/;
  if (patrn.exec(this) == null || this == "") {
    return false
  } else {
    return true
  }
}
// Date.prototype.toString = function () {
// 	return Date.prototype.format(this)
// };

Number.prototype.toFloatFixed = function (num) {
  if (num == undefined) {
    num = 2;
  }
  return parseFloat(this.toFixed(num));
}

Number.prototype.toStringFixed = function (num) {
  if (num == undefined) {
    num = 2;
  }
  var res = parseFloat(this.toFixed(num)) + "";
  if (res.indexOf('.') == -1) {
    return res + ".00";
  } else {
    if (res.split('.')[1].length == 1) {
      return res + "0";
    }
  }
  return res;
}

String.prototype.toFloatFixed = function (num) {
  if (num == undefined) {
    num = 2;
  }
  var data = parseFloat(this);
  if (isNaN(data)) {
    return "NaN";
  }
  return data.toFloatFixed(num);
}

String.prototype.toStringFixed = function (num) {
  if (num == undefined) {
    num = 2;
  }
  var data = parseFloat(this);
  if (isNaN(data)) {
    return "NaN";
  }
  var res = data.toFloatFixed(num) + "";
  if (res.indexOf('.') == -1) {
    return res + ".00";
  } else {
    if (res.split('.')[1].length == 1) {
      return res + "0";
    }
  }
  return res;
}

String.prototype.gblen = function () {
  var len = 0;
  for (var i = 0; i < this.length; i++) {
    if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}

String.prototype.padLeft = function (len, ch) {
  ch = typeof (ch) === 'undefined' ? ' ' : ch;
  var s = String(this);
  while (s.gblen() < len)
    s = ch + s;
  return s;
}

String.prototype.padRight = function (len, ch) {
  ch = typeof (ch) === 'undefined' ? ' ' : ch;
  var s = String(this);
  while (s.gblen() < len)
    s = s + ch;
  return s;
}

Number.prototype.padLeft = function (len, ch) {
  return (this + "").padLeft(len, ch);
};

String.prototype.toFixed = function (num) {
  if (num == undefined) {
    num = 2;
  }
  var result = parseFloat(this)
  if (!isNaN(result)) {
    return result.toFixed(num);
  }
  return this;
}

String.prototype.padLeftCH = function (len, ch) {
  var cal = function (str) {
    let re = /[\u4E00-\u9FA5]/g; //测试中文字符的正则
    if (re.test(str)) //使用正则判断是否存在中文
      return str.match(re).length //返回中文的个数
    else
      return 0
  };
  ch = typeof (ch) === 'undefined' ? ' ' : ch;
  var s = String(this);
  var calNum = cal(s);
  if (len > s.length && calNum > 0) len += len - calNum;
  while (s.length < len)
    s = ch + s;
  return s;
};
//除法,如果沒有isShowAll参数或者isShowAll为true则显示2位小数
let accDiv = function (arg1, arg2, isShowAll) {
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {}
  // with (Math) {
  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  return accMul((r1 / r2), Math.pow(10, t2 - t1), isShowAll);
  // }
};
//乘法,如果沒有isShowAll参数或者isShowAll为true则显示2位小数
var accMul = function (arg1, arg2, isShowAll) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {}
  try {
    m += s2.split(".")[1].length
  } catch (e) {}
  if (isShowAll == undefined || !isShowAll) {
    return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(2);
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
};
//加法 ,如果沒有isShowAll参数或者isShowAll为true则显示2位小数
var accAdd = function (arg1, arg2, isShowAll) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  if (isShowAll == undefined || !isShowAll) {
    return ((arg1 * m + arg2 * m) / m).toFixed(2);
  }
  return (arg1 * m + arg2 * m) / m;
};
//减法 ,如果沒有isShowAll参数或者isShowAll为true则显示2位小数
var accSub = function (arg1, arg2, isShowAll) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  if (isShowAll == undefined || !isShowAll) {
    n = 2
  }
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
//加法
Number.prototype.add = function (arg) {
  return accAdd(this, arg);
};
//加法
String.prototype.add = function (arg) {
  return accAdd(this, arg);
};
//减法
Number.prototype.sub = function (arg) {
  return accSub(this, arg);
};

//减法
String.prototype.subs = function (arg) {
  return accSub(this, arg);
};
//除法
Number.prototype.div = function (arg) {
  return accDiv(this, arg);
};
//除法
String.prototype.div = function (arg) {
  return accDiv(this, arg);
};
//乘法
Number.prototype.mul = function (arg, isShowAll) {
  return accMul(this, arg, isShowAll);
};
//乘法
String.prototype.mul = function (arg, isShowAll) {
  return accMul(this, arg, isShowAll);
};

//向上取舍
var ceil = function (arg, roundType) {
  if (roundType == '3') {
    //精确到元
    return Math.ceil(arg);
  } else if (roundType == '2') {
    //精确到角
    let arg1 = parseFloat(parseFloat(arg).mul(10));
    return Math.ceil(arg1).div(10);
    // return;
  } else if (roundType == '1') {
    //精确到分
    let arg1 = parseFloat(parseFloat(arg).mul(100));
    return Math.ceil(arg1).div(100);
    // return;
  } else {
    return arg;
  }
};
//向下取舍
var floor = function (arg, roundType) {
  if (roundType == '3') {
    //精确到元
    return Math.floor(arg);
  } else if (roundType == '2') {
    //精确到角
    let arg1 = parseFloat(parseFloat(arg).mul(10));
    return Math.floor(arg1).div(10);
  } else if (roundType == '1') {
    //精确到分
    let arg1 = parseFloat(parseFloat(arg).mul(100));
    return Math.floor(arg1).div(100);
  } else {
    return arg;
  }
};
//向上取舍
Number.prototype.ceil = function (roundType) {
  return ceil(this.toString(), roundType);
};
//向上取舍
String.prototype.ceil = function (roundType) {
  return ceil(this.toString(), roundType);
};
//向下取舍
Number.prototype.floor = function (roundType) {
  return floor(this.toString(), roundType);
};
//向下取舍
String.prototype.floor = function (roundType) {
  return floor(this.toString(), roundType);
};



//去首尾逗号
var trim = function (str) {
  //去掉第一个逗号
  if (str.substr(0, 1) == ',') str = str.substr(1);
  //去掉最后一个逗号
  var reg = /,$/gi;
  str = str.replace(reg, "");
  return str;
};

function toThousands(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

String.prototype.toThousands = function (num) {
  return toThousands(num);
}

/**
 * 数值转换
 */
// String.prototype.toUnits = function (units ? : Map < number, string > | string, unitPos ? : number, thousand ? : boolean, fixedNumber ? : number) {
//   let num = this;
//   let valUnit: Map < number, string > ;
//   if (units == undefined) {
//     valUnit = new Map < number, string > ().set(1000, 'K').set(10000, 'W');
//   } else {
//     if (typeof (units) == "string") {
//       valUnit = new Map < number, string > ().set(unitPos, units);
//     } else {
//       valUnit = units;
//     }
//   }
//   fixedNumber = fixedNumber == 0 ? 0 : (fixedNumber || 2);
//   thousand = thousand == true;
//   //不指定就是自动适配
//   let newVal = num;
//   let curUnit = '';
//   if (unitPos == undefined) {
//     valUnit.forEach((v, k) => {
//       if (k < num) {
//         newVal = num.div(k).toFloatFixed(fixedNumber);
//         curUnit = v;
//       }
//     });
//   } else {
//     if (valUnit.has(unitPos)) {
//       newVal = num.div(unitPos).toFloatFixed(fixedNumber);
//       curUnit = valUnit.get(unitPos);
//     } else {
//       return "";
//     }
//   }
//   if (thousand)
//     return toThousands(newVal) + curUnit;
//   else
//     return newVal + curUnit;
// }
