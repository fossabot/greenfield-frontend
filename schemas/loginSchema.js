export default () => [
  {
    name: 'email',
    label: 'Email Address',
    validation: 'required|email',
  },
  {
    name: 'password',
    label: 'Password',
    validation: 'required',
    type: 'password',
  },
  {
    type: 'submit',
    label: 'Sign in',
  },
];
