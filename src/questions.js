import {questionNames} from './question-names.js';

export default function ({vcs, ciServices, pathWithinParent}) {
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
    ...vcs && !pathWithinParent
      ? [{
        name: questionNames.CI_SERVICE,
        type: 'list',
        message: 'Which continuous integration service will be used?',
        choices: [...Object.keys(ciServices), 'Other']
      }]
      : []
  ];
}
