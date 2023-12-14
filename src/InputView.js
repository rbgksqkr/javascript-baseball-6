import { MissionUtils } from '@woowacourse/mission-utils';

const InputView = {
  async readUserNumber() {
    const number = await MissionUtils.Console.readLineAsync('숫자를 입력해주세요 : ');
    return number;
  },

  async readAfterGame() {
    const result = await MissionUtils.Console.readLineAsync(
      '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n'
    );
    return result;
  },
};

export default InputView;
