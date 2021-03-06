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
    let re = /[\u4E00-\u9FA5]/g; //???????????????????????????
    if (re.test(str)) //????????????????????????????????????
      return str.match(re).length //?????????????????????
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
//??????,????????????isShowAll????????????isShowAll???true?????????2?????????
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
//??????,????????????isShowAll????????????isShowAll???true?????????2?????????
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
//?????? ,????????????isShowAll????????????isShowAll???true?????????2?????????
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
//?????? ,????????????isShowAll????????????isShowAll???true?????????2?????????
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
//??????
Number.prototype.add = function (arg) {
  return accAdd(this, arg);
};
//??????
String.prototype.add = function (arg) {
  return accAdd(this, arg);
};
//??????
Number.prototype.sub = function (arg) {
  return accSub(this, arg);
};

//??????
String.prototype.subs = function (arg) {
  return accSub(this, arg);
};
//??????
Number.prototype.div = function (arg) {
  return accDiv(this, arg);
};
//??????
String.prototype.div = function (arg) {
  return accDiv(this, arg);
};
//??????
Number.prototype.mul = function (arg, isShowAll) {
  return accMul(this, arg, isShowAll);
};
//??????
String.prototype.mul = function (arg, isShowAll) {
  return accMul(this, arg, isShowAll);
};

//????????????
var ceil = function (arg, roundType) {
  if (roundType == '3') {
    //????????????
    return Math.ceil(arg);
  } else if (roundType == '2') {
    //????????????
    let arg1 = parseFloat(parseFloat(arg).mul(10));
    return Math.ceil(arg1).div(10);
    // return;
  } else if (roundType == '1') {
    //????????????
    let arg1 = parseFloat(parseFloat(arg).mul(100));
    return Math.ceil(arg1).div(100);
    // return;
  } else {
    return arg;
  }
};
//????????????
var floor = function (arg, roundType) {
  if (roundType == '3') {
    //????????????
    return Math.floor(arg);
  } else if (roundType == '2') {
    //????????????
    let arg1 = parseFloat(parseFloat(arg).mul(10));
    return Math.floor(arg1).div(10);
  } else if (roundType == '1') {
    //????????????
    let arg1 = parseFloat(parseFloat(arg).mul(100));
    return Math.floor(arg1).div(100);
  } else {
    return arg;
  }
};
//????????????
Number.prototype.ceil = function (roundType) {
  return ceil(this.toString(), roundType);
};
//????????????
String.prototype.ceil = function (roundType) {
  return ceil(this.toString(), roundType);
};
//????????????
Number.prototype.floor = function (roundType) {
  return floor(this.toString(), roundType);
};
//????????????
String.prototype.floor = function (roundType) {
  return floor(this.toString(), roundType);
};



//???????????????
var trim = function (str) {
  //?????????????????????
  if (str.substr(0, 1) == ',') str = str.substr(1);
  //????????????????????????
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
 * ????????????
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
//   //???????????????????????????
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
