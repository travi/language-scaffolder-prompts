import {Separator} from 'inquirer';

import {assert} from 'chai';
import any from '@travi/any';

import {questionNames, questions} from '../../src/index.js';

suite('questions', () => {
  const ciServiceNames = any.listOf(any.word);
  const ciServices = any.objectWithKeys(ciServiceNames);

  test('that the confirmation about unit-testing is included', () => {
    assert.deepEqual(
      questions({}),
      [
        {
          name: questionNames.UNIT_TESTS,
          message: 'Will this project be unit tested?',
          type: 'confirm',
          default: true
        },
        {
          name: questionNames.INTEGRATION_TESTS,
          message: 'Will this project be integration tested?',
          type: 'confirm',
          default: true
        }
      ]
    );
  });

  test('that the ci-service choice is included when a project will be versioned as the root project', () => {
    const visibility = any.word();

    assert.deepInclude(
      questions({vcs: any.simpleObject(), ciServices, visibility}),
      {
        name: questionNames.CI_SERVICE,
        type: 'list',
        message: 'Which continuous integration service will be used?',
        choices: [...ciServiceNames, new Separator(), 'Other']
      }
    );
  });

  test('that the ci-service choice is not included when a project will not be the root project', () => {
    const visibility = any.word();

    assert.notDeepInclude(
      questions({vcs: any.simpleObject(), ciServices, visibility, pathWithinParent: any.string()}),
      {
        name: questionNames.CI_SERVICE,
        type: 'list',
        message: 'Which continuous integration service will be used?',
        choices: [...ciServiceNames, new Separator(), 'Other']
      }
    );
  });
});
