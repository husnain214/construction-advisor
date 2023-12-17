export const signupForm = {
  textFields: [
    {
      type: 'text',
      name: 'fullname',
      label: 'Full Name',
      placeholder: 'Maria Boone',
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'maria@site.com',
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Enter password',
    },
    {
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
    },
    {
      name: 'phoneNumber',
      label: 'Phone',
      placeholder: '+92xxxxxxxxxx',
    },
    {
      type: 'text',
      name: 'cnicNumber',
      label: 'CNIC',
      placeholder: 'xxxxxxxxxxxx',
    },
    {
      type: 'text',
      name: 'age',
      label: 'Age',
      placeholder: 'Enter your age',
    },
  ],
  genders: ['male', 'female', 'other'],
  roles: ['customer', 'contractor'],
};
