import { MissionUtils } from '@woowacourse/mission-utils';

class App {
  async play() {
    const computer = this.getComputerNumber();
    console.log(computer);
    const user = await MissionUtils.Console.readLineAsync('');
    console.log(user);
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
