import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  async play() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
    const computer = this.getComputerNumber();
    const userInput = await MissionUtils.Console.readLineAsync('숫자를 입력해주세요 : ');
    const user = this.getUserNumberList(userInput);
    this.getBaseballResult(computer, user);
  }

  getBaseballResult(computer, user) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < computer.length; i++) {
      if (user[i] === computer[i]) {
        strike += 1;
        break;
      }
      if (computer.includes(user[i])) {
        ball += 1;
      }
    }
    if (ball === 0 && strike === 0) {
      MissionUtils.Console.print(`낫싱`);
      return 0;
    } else if (ball > 0 && strike === 0) {
      MissionUtils.Console.print(`${ball}볼`);
    } else if (strike > 0 && ball === 0) {
      MissionUtils.Console.print(`${strike}스트라이크`);
    } else if (ball > 0 && strike > 0) {
      MissionUtils.Console.print(`${ball}볼 ${strike}스트라이크`);
    }
  }

  getUserNumberList(numbers) {
    return [...numbers].map((number) => parseInt(number));
  }

  getComputerNumber() {
    const computer = [];
    while (computer.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
    return computer;
  }
}

const app = new App();
app.play();

export default App;
