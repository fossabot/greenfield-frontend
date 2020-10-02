export default () => [
  {
    name: 'current_password',
    label: 'Current Password',
    validation: 'required',
    type: 'password',
  },
  {
    name: 'password',
    label: 'New Password',
    validation: 'required',
    type: 'password',
  },
  {
    type: 'submit',
    label: 'Update password',
  },
];
