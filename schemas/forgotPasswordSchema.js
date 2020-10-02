export default () => [
  {
    name: 'email',
    label: 'Email Address',
    validation: 'required|email',
    type: 'email',
  },
  {
    type: 'submit',
    label: 'Reset password',
  },
];
