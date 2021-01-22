import * as Yup from 'yup';

export const stepsInOrder = [
  "firstName",
  "address",
  "numberOfChildren",
  "occupation",
  "email", 
];

export const stepsData = {
  firstName: {
    initialValue: "",
    placeholder: "Jane Doe",
    label: "What is your first name?",
  },
  address: {
    initialValue: "",
    placeholder: "Address",
    label: "What is your address?",
  },
  numberOfChildren: {
    initialValue: 0,
    label: "How many children you have?",
  },
  occupation: {
    initialValue: "",
    label: "What is your occupation?",
    type: 'radio',
    options: [
      {
        label: 'Employed',
        value: 'EMPLOYED',
      },
      {
        label: 'Self employed',
        value: 'SELF_EMPLOYED',
      },
      {
        label: 'Student',
        value: 'STUDENT',
      },
    ]
  },
  email: {
    initialValue: "",
    placeholder: "johndoe@gmail.com",
    label: "What is your email address?",
  },
};

const requiredMessage = 'This field is required.'

export const WizardSchema = Yup.object().shape({
  firstName: Yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(requiredMessage),
  address: Yup
    .string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required(requiredMessage),
  numberOfChildren: Yup
    .number()
    .required(requiredMessage),
  occupation: Yup
    .string()
    .oneOf(Object.values(['EMPLOYED', 'SELF_EMPLOYED', 'STUDENT']))
    .required(requiredMessage),
  email: Yup
    .string()
    .email('Invalid email')
    .required(requiredMessage),
});