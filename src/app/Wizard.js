import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const stepsData = {
  firstName: {
    initialValue: "",
    placeholder: "John Doe",
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

const stepsInOrder = [
  "firstName",
  "address",
  "numberOfChildren",
  "occupation",
  "email",
];

function Wizard() {
  const [, setCookie] = useCookies(['Authorization']);
  const navigate = useNavigate();
  const location = useLocation()
  const step = /[^/]*$/.exec(location.pathname)[0];
  const stepData = stepsData[step];
  const userInputCache = JSON.parse(localStorage.getItem('user_input')) || {}

  useEffect(() => {
    if (stepData === undefined) {
      // handle non-step urls
      navigate(`/wizard/${stepsInOrder[0]}`);
      return null;
    }
  }, [stepData, navigate]);

  if (stepData === undefined) {
    return null;
  }

  const stepIndex = stepsInOrder.findIndex((s) => s === step);
  const isLastStep = stepIndex === stepsInOrder.length - 1;

  function handleSubmit(values) {
    localStorage.setItem("user_input", JSON.stringify({
      ...userInputCache,
      ...values
    }))

    if (!isLastStep) {
      const nextStepIndex = stepIndex + 1;
      return navigate(`/wizard/${stepsInOrder[nextStepIndex]}`);
    }

    fetch(new URL('user', process.env.REACT_APP_API_URL), {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(token => {
        setCookie('Authorization', `Bearer ${token.jwt}`)
        navigate('/recommendation')
      })
      .catch(err => console.log(err))
  }

  const initialValues = stepsInOrder.reduce((mem, stepKey) => {
    mem[stepKey] = userInputCache[stepKey] || stepsData[stepKey].initialValue
    return mem;
  }, {})

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <Outlet />
        <button type="submit">{isLastStep ? "Submit" : "Next"}</button>
      </Form>
    </Formik>
  );
}

export default Wizard;
