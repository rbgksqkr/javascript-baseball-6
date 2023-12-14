import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  async play() {
    const computer = this.getComputerNumber();
    const user = await MissionUtils.Console.readLineAsync('');
    console.log(this.getUserNumberList(user));
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
    console.log(computer);
  }
}

const app = new App();
app.play();

export default App;
