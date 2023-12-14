const Validator = {
  isValidLength(user) {
    if (user.length > 3 || user.length < 3) {
      throw Error('[ERROR] 3자리 숫자를 입력해야 합니다.');
    }
  },
};

export default Validator;
