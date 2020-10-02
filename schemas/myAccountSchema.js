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
    type: 'submit',
    label: 'Update profile',
  },
];
