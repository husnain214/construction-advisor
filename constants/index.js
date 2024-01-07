export const signupForm = {
  textFields: [
    {
      type: 'text',
      name: 'name',
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
      name: 'phone',
      label: 'Phone',
      placeholder: '+92xxxxxxxxxx',
    },
    {
      type: 'text',
      name: 'cnic',
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

export const updateUserForm = {
  textFields: [
    {
      type: 'text',
      name: 'name',
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
      name: 'phone',
      label: 'Phone',
      placeholder: '+92xxxxxxxxxx',
    },
    {
      type: 'text',
      name: 'cnic',
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
