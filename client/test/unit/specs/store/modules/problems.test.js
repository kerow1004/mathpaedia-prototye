import problemsStore from '@/store/modules/problems';

describe('store modules - problems', () => {
  const problems = [
    {
      sentence: 'math problem sentence 1',
      picture: 'http://picture.math.com/1234561',
      choices: ['11', '12', '13', '14', '15'],
    },
    {
      sentence: 'math problem sentence 2',
      picture: 'http://picture.math.com/1234562',
      choices: ['21', '22', '23', '24', '25'],
    },
  ];

  test('mutations - SET_PROBLEMS set state problems', () => {
    const state = {
      problems: [],
    };

    problemsStore.mutations.SET_PROBLEMS(state, problems);
    expect(state.problems).toBe(problems);
  });

  test('mutations - ADD_PROBLEMS add a problem into state problems', () => {
    const state = {
      problems,
    };
    const problem = {
      sentence: 'math problem sentence 3',
      picture: 'http://picture.math.com/1234563',
      choices: ['31', '32', '33', '34', '35'],
    };

    problemsStore.mutations.ADD_PROBLEM(state, problem);
    expect(state.problems).toHaveLength(3);
  });

  // TODO: unit test for actions with mocking axios

  test('getters - problems returns the problems of state', () => {
    const state = {
      problems,
    };

    expect(problemsStore.getters.problems(state)).toBe(problems);
  });
});
