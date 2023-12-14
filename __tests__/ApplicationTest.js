import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('숫자 야구 게임', () => {
  test('게임 종료 후 재시작', async () => {
    // given
    const randoms = [1, 3, 5, 5, 8, 9];
    const answers = ['246', '135', '1', '597', '589', '2'];
    const logSpy = getLogSpy();
    const messages = ['낫싱', '3스트라이크', '1볼 1스트라이크', '3스트라이크', '게임 종료'];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when
    const app = new App();
    await expect(app.play()).resolves.not.toThrow();

    // then
    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('1스트라이크 테스트', async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ['124', '135'];
    const logSpy = getLogSpy();
    const messages = ['1스트라이크'];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when
    const app = new App();
    await expect(app.play()).resolves.not.toThrow();

    // then
    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('2스트라이크 테스트', async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ['134', '135'];
    const logSpy = getLogSpy();
    const messages = ['2스트라이크'];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when
    const app = new App();
    await expect(app.play()).resolves.not.toThrow();

    // then
    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('2볼 1스트라이크 테스트', async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ['315', '135'];
    const logSpy = getLogSpy();
    const messages = ['2볼 1스트라이크'];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when
    const app = new App();
    await expect(app.play()).resolves.not.toThrow();

    // then
    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('1부터 9까지의 숫자가 아니면 예외가 발생한다.', async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ['120'];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when & then
    const app = new App();

    await expect(app.play()).rejects.toThrow('[ERROR]');
  });

  test('숫자가 아니면 예외가 발생한다.', async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ['12a'];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when & then
    const app = new App();

    await expect(app.play()).rejects.toThrow('[ERROR]');
  });

  test('서로 다른 숫자가 아니면 예외가 발생한다.', async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ['112'];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when & then
    const app = new App();

    await expect(app.play()).rejects.toThrow('[ERROR]');
  });

  test('숫자가 3자리가 아니면 예외가 발생한다.', async () => {
    // given
    const randoms = [1, 3, 5];
    const answers = ['1234'];

    mockRandoms(randoms);
    mockQuestions(answers);

    // when & then
    const app = new App();

    await expect(app.play()).rejects.toThrow('[ERROR]');
  });
});
