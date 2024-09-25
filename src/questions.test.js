import any from '@travi/any';
import {describe, expect, it} from 'vitest';

import {questionNames, questions} from './index.js';

describe('questions', () => {
  const visibility = any.word();
  const ciServiceNames = any.listOf(any.word);
  const ciServices = any.objectWithKeys(ciServiceNames);

  it('should include the confirmation about unit testing', () => {
    expect(questions({})).toEqual([
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
    ]);
  });

  it('should include the ci-service choice when a project will be the root project', () => {
    expect(questions({vcs: any.simpleObject(), ciServices, visibility})).toEqual([
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
      },
      {
        name: questionNames.CI_SERVICE,
        type: 'list',
        message: 'Which continuous integration service will be used?',
        choices: [...ciServiceNames, 'Other']
      }
    ]);
  });

  it('should not include the ci-service choice when a project will not be the root project', () => {
    expect(questions({vcs: any.simpleObject(), ciServices, visibility, pathWithinParent: any.string()})).toEqual([
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
    ]);
  });
});
