const Validator = {
  isValidLength(userNumbers) {
    if (userNumbers.length > 3 || userNumbers.length < 3) {
      throw Error('[ERROR] 3자리 숫자를 입력해야 합니다.');
    }
  },
  isValidDiff(userNumbers) {
    const tempUserList = [];
    for (let i = 0; i < userNumbers.length; i++) {
      if (tempUserList.includes(userNumbers[i])) {
        throw Error('[ERROR] 서로 다른 숫자를 입력해야 합니다.');
      }
      tempUserList.push(userNumbers[i]);
    }
    return 1;
  },

  isNumber(userNumbers) {
    for (let i = 0; i < userNumbers.length; i++) {
      if (isNaN(userNumbers[i])) {
        throw Error('[ERROR] 숫자를 입력해야 합니다.');
      }
    }
  },

  isValidRange(userNumbers) {
    userNumbers.map((number) => {
      if (number < 1 || number > 9) {
        throw Error('[ERROR] 1부터 9 사이의 숫자를 입력해야 합나디.');
      }
    });
  },
};

export default Validator;
