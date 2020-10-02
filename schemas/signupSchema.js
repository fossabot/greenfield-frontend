export default () => [
  {
    name: 'first_name',
    label: 'First Name',
    validation: 'required',
  },
  {
    name: 'surname',
    label: 'Surname',
    validation: 'required',
  },
  {
    name: 'email',
    label: 'Email Address',
    validation: 'required|email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    validation: 'required',
    type: 'password',
  },
  {
    type: 'submit',
    label: 'Sign up',
  },
];
