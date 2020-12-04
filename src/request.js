import axios from 'axios'
import md5 from 'js-md5'

var path = 'https://moanew.ecidi.com'
export function getToken(name) {
  let url = path + "/resettoken?username=" + name
  let newUrl = getReqUrl(url)
  return axios({
    method: 'post',
    url: newUrl,
    data: {}
  }).then((res) => {
    if (res.data.code == 10001) {
      window.localStorage.setItem("token", res.data.msg);
    } else {
      this.$vux.toast.text('网络异常')
    }
  }).catch((err) => {
    console.log(err)
  })
}

//删除文件
export function getFile(data, url) {
  return axios({
    method: 'get',
    url: url,
    data
  }).catch((e) => {
    if (e) console.log(e.toString())
  })
}


//删除文件
export function deleteFile(data, url) {
  return axios({
    method: 'delete',
    url: url,
    data
  }).catch((e) => {
    if (e) console.log(e.toString())
  })
}


//获得所有表单
export async function getSignData() {
  await getToken('')
  let url = path + '/moaapi/match/declare/page'
  let newUrl = getReqUrl(url)
  return axios({
    method: 'get',
    url: newUrl,
    params: {
      name: localStorage.getItem('formUsername')
    }
  }).catch((e) => {
    if (e) console.log(e.toString())
  })
}

//获取用户name获得已填写的表单
export async function getForm() {
  let name = localStorage.getItem('formUsername')
  await getToken(name)
  let url = path + '/moaapi/match/declare'
  let newUrl = getReqUrl(url, `userName=${name.toLowerCase()}`)
  return axios({
    method: 'get',
    url: newUrl
  }).catch((e) => {
    if (e) console.log(e.toString())
  })
}

//登录
export function login(name, pw) {
  let url = path + '/systemcenter/servlet/LoginServlet.cmd'
  let newUrl = getReqUrl(url)
  return axios({
    method: 'post',
    url: newUrl,
    params: {
      action: 'tologin',
      login: true,
      saveInfo: true,
      local: "zh_CN",
      username: name.toLowerCase(), // 统一小写
      password: pw,
    }
  }).catch((e) => {
    if (e) console.log(e.toString())
  })
}

//表单提交
export function submitForm(data) {
  let url = path + '/moaapi/match/declare'
  let newUrl = getReqUrl(url)
  return axios({
    method: 'post',
    url: newUrl,
    data: data
  }).catch((e) => {
    if (e) console.log(e.toString())
  })
}

//重新组织请求url，原始url中不能含参数
//加上token、timestamp、salt、sign
//sign=MD5(token+timestamp+salt+其他参数)
//ExtParams 必须是 a=1&b=2 形式的字符串
export const getReqUrl = (url, ExtParams) => {
  let token = window.localStorage.getItem("token") || "";
  let salt = "EcidiMOASalt";
  let Params = "";
  let timestamp = (new Date()).valueOf();
  Params += "timestamp=" + timestamp + "&token=" + token;
  if (typeof (ExtParams) != "undefined" && ExtParams != "")
    Params = Params + "&" + ExtParams;
  let ParamArr = sortUrlParams(Params);
  ParamArr = objKeySort(ParamArr);
  let paramstr = [];
  for (let i in ParamArr) {
    paramstr.push(i + "=" + ParamArr[i]);
  }
  paramstr = paramstr.join("&");
  let sign = md5(paramstr + "&salt=" + salt);
  //console.log(paramstr);
  return url + "?" + paramstr + "&sign=" + sign;
}

//获取url里的参数，return object
function sortUrlParams(str) {
  if (typeof str !== 'string') {
    return {};
  }
  let paramObj = {};
  let paramArr = decodeURI(str).split('&');
  for (let i = 0; i < paramArr.length; i++) {
    let tmp = paramArr[i].split('=');
    let key = tmp[0];
    let value = tmp[1] || "";
    //if (typeof value === 'string' && isNaN(Number(value)) === false && value !== "") {
    //  value = Number(value);
    //}
    if (typeof paramObj[key] === 'undefined') {
      paramObj[key] = value;
    } else {
      let newValue = Array.isArray(paramObj[key]) ? paramObj[key] : [
        paramObj[key]
      ];
      newValue.push(value);
      paramObj[key] = newValue;
    }
  }
  return paramObj;
}

//Object排序
function objKeySort(obj) {
  let newkey = Object.keys(obj).sort();
  let newObj = {};
  for (let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;
}

