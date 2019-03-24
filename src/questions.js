import {Separator} from 'inquirer';
import {questionNames} from './question-names';
import filterChoicesByVisibility from './filter-by-visibility';

export default function ({vcs, ciServices, visibility}) {
  return [
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
    ...vcs
      ? [{
        name: questionNames.CI_SERVICE,
        type: 'list',
        message: 'Which continuous integration service will be used?',
        choices: [...Object.keys(filterChoicesByVisibility(ciServices, visibility)), new Separator(), 'Other']
      }]
      : []
  ];
}
