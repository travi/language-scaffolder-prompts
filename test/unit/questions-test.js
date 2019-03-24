import {Separator} from 'inquirer';
import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import * as choicesVisibilityFilter from '../../src/filter-by-visibility';
import {questions, questionNames} from '../../src';

suite('questions', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(choicesVisibilityFilter, 'default');
  });

  teardown(() => sandbox.restore());

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

  test('that the ci-service choice is included when a project will be versioned', () => {
    const ciServices = any.simpleObject();
    const visibility = any.word();
    const filteredCiServiceNames = any.listOf(any.word);
    const filteredCiServices = any.objectWithKeys(filteredCiServiceNames);
    choicesVisibilityFilter.default.withArgs(ciServices, visibility).returns(filteredCiServices);

    assert.deepInclude(
      questions({vcs: any.simpleObject(), ciServices, visibility}),
      {
        name: questionNames.CI_SERVICE,
        type: 'list',
        message: 'Which continuous integration service will be used?',
        choices: [...filteredCiServiceNames, new Separator(), 'Other']
      }
    );
  });
});
