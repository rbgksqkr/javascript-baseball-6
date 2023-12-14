import { MissionUtils } from '@woowacourse/mission-utils';
import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validator from './Validator.js';

class App {
  async play() {
    OutputView.printStartGame();
    const computer = this.getComputerNumber();
    await this.startGame(computer);
  }

  async startGame(computer) {
    const userInput = await InputView.readUserNumber();
    const user = this.getUserNumberList(userInput);
    Validator.isNumber(user);
    Validator.isValidDiff(user);
    Validator.isValidLength(user);
    Validator.isValidRange(user);
    const result = this.getGameResult(computer, user);
    if (result === 1) {
      await this.afterGame();
      return;
    }
    await this.startGame(computer);
  }

  async afterGame() {
    OutputView.printEndGame();
    const answer = await InputView.readAfterGame();
    if (answer == 1) {
      await this.play();
    }
  }

  getBaseballResult(computer, user) {
    const baseballResult = { strike: 0, ball: 0 };
    for (let i = 0; i < computer.length; i++) {
      if (user[i] === computer[i]) {
        baseballResult.strike += 1;
        continue;
      }
      if (computer.includes(user[i])) {
        baseballResult.ball += 1;
      }
    }
    return baseballResult;
  }

  getGameResult(computer, user) {
    const { strike, ball } = this.getBaseballResult(computer, user);

    if (ball === 0 && strike === 0) {
      MissionUtils.Console.print(`낫싱`);
    } else if (ball > 0 && strike === 0) {
      MissionUtils.Console.print(`${ball}볼`);
    } else if (strike > 0 && ball === 0) {
      MissionUtils.Console.print(`${strike}스트라이크`);
    } else if (ball > 0 && strike > 0) {
      MissionUtils.Console.print(`${ball}볼 ${strike}스트라이크`);
    }

    if (strike === 3) return 1;
    return 0;
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
