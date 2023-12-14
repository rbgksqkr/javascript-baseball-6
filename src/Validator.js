const Validator = {
  isValidLength(user) {
    if (user.length > 3 || user.length < 3) {
      throw Error('[ERROR] 3자리 숫자를 입력해야 합니다.');
    }
  },
  isValidDiff(user) {
    const tempUserList = [];
    for (let i = 0; i < user.length; i++) {
      if (tempUserList.includes(user[i])) {
        throw Error('[ERROR] 서로 다른 숫자를 입력해야 합니다.');
      }
      tempUserList.push(user[i]);
    }
    return 1;
  },

  isNumber(user) {
    for (let i = 0; i < user.length; i++) {
      if (isNaN(user[i])) {
        throw Error('[ERROR] 숫자를 입력해야 합니다.');
      }
    }
  },
};

export default Validator;
