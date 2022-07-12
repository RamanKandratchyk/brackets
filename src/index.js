module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;

  let configArr = [];
  for (let i = 0; i < bracketsConfig.length; i++) {
    configArr[i] = bracketsConfig[i].join('');
  };

  let regConfig = [];
  for (let i = 0; i < configArr.length; i++) {
    regConfig[i] = configArr[i].replace(/\(\)|\[\]|\|\|/g, match => {
      if (match === '()') return '\\(\\)';
      if (match === '[]') return '\\[\\]';
      if (match === '||') return '\\|\\|';
    });
  };

  let reg = new RegExp(regConfig.join('|'), 'g');

  let testStr = str;
  let z;
  do {
    z = testStr.length;
    testStr = testStr.replace(reg, '');
  } while (z !== testStr.length);

  return !testStr.length;
}
