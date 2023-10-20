import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    MissionUtils.Console.print("숫자 야구를 시작합니다.");
    const computerNumber = this.getRandomNumber();
    await this.startGame(computerNumber);
    const isEnd = await this.endGame();
    if (!isEnd) this.play();
  }

  checkInputValid(input) {
    const numberInput = Number(input);

    if (isNaN(numberInput)) {
      throw "숫자가 잘못된 형식입니다.";
    } else if (input.length !== 3) {
      throw "세자리 숫자로 입력해주세요.";
    } else {
      const inputIntArray = Array.from(input).map((data) => parseInt(data));
      const checkArray = [];
      for (let i = 0; i < inputIntArray.length; i++) {
        if (checkArray.includes(inputIntArray[i])) throw "서로 다른 숫자를 입력하세요.";
        checkArray.push(inputIntArray[i]);
      }
    }
  }

  async startGame(computerNumber) {
    try {
      const userNumber = await MissionUtils.Console.readLineAsync("숫자를 입력해주세요 : ");
      this.checkInputValid(userNumber);
      const result = this.getBaseballResult(userNumber, computerNumber);
      if (result === 0) {
        await this.startGame(computerNumber);
      } else {
        MissionUtils.Console.print("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.");
        return 1;
      }
    } catch (error) {
      throw new Error(`[ERROR] ${error}`);
    }
  }

  async endGame() {
    const isEndGame = await MissionUtils.Console.readLineAsync("");

    if (isEndGame == 1) return 0;
    else if (isEndGame == 2) return 1;
    else throw new Error("숫자를 다시 입력해주세요.");
  }

  getBaseballResult(userNumber, computerNumber) {
    const inputIntArray = Array.from(userNumber).map((data) => parseInt(data));

    let strike = 0;
    let ball = 0;
    let nothing = false;

    for (let i = 0; i < inputIntArray.length; i++) {
      if (inputIntArray[i] === computerNumber[i]) {
        strike += 1;
      } else if (computerNumber.includes(inputIntArray[i])) {
        ball += 1;
      }
    }
    if (strike === 0 && ball === 0) nothing = true;

    const strikeMessage = strike ? `${strike}스트라이크` : "";
    const ballMessage = ball ? `${ball}볼` : "";
    const nothingMessage = "낫싱";

    if (nothing) {
      MissionUtils.Console.print(nothingMessage);
      return 0;
    } else if (strike === 3) {
      MissionUtils.Console.print(`${ballMessage} ${strikeMessage}`.trim());
      MissionUtils.Console.print(`3개의 숫자를 모두 맞히셨습니다! 게임 종료`);
      return 1;
    } else if (strike !== 3) {
      MissionUtils.Console.print(`${ballMessage} ${strikeMessage}`.trim());
      return 0;
    }
  }

  getRandomNumber() {
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
