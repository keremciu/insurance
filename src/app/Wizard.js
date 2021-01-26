import { Formik, Form } from "formik";
import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';

import { stepsData, stepsInOrder, WizardSchema } from './Wizard.config'

// edge case: if user use the URL bar to reach last field then try to send form without filling one of the fields
function NavigateToShowError({ errors, lastStep }) {
  const navigate = useNavigate();
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (!errors[lastStep] && errorKeys.length > 0) {
      const [firstErrorKey] = errorKeys
      // TODO: we can show user a general error to explain why they're navigated.
      navigate(`${process.env.PUBLIC_URL}/wizard/${firstErrorKey}`);
    }
  }, [lastStep, errors, navigate]);
  return null;
}

function Wizard() {
  const [, setCookie] = useCookies(['Authorization']);
  const navigate = useNavigate();
  const location = useLocation()
  const step = /[^/]*$/.exec(location.pathname)[0];
  const stepData = stepsData[step];
  const wrongStep = stepData === undefined;

  useEffect(() => {
    if (wrongStep) {
      // navigate user to the first field, navigate requires useEffect.
      // here replace is important, otherwise browser history will keep `wizard` path as valid path.
      navigate(`${process.env.PUBLIC_URL}/wizard/${stepsInOrder[0]}`, { replace: true });
    }
  }, [wrongStep, navigate]);

  if (wrongStep) {
    return null;
  }

  const userInputCache = JSON.parse(localStorage.getItem('user_input')) || {}
  const stepIndex = stepsInOrder.findIndex((s) => s === step);
  const isLastStep = stepIndex === stepsInOrder.length - 1;

  function persistValues(values, step) {
    localStorage.setItem("user_input", JSON.stringify({
      ...userInputCache,
      step: values[step]
    }))
  }

  async function handleNext(validateForm, values) {
    // validateField doesn't give any callback that's why I had to use validateForm.
    // there is an issue here: https://github.com/formium/formik/issues/2021
    const errors = await validateForm()
    if (errors[step]) {
      return null;
    }
    persistValues(values, step)
    if (stepData.rejectionStep && values[step] === 'false') {
      return navigate(`${process.env.PUBLIC_URL}/wizard/${stepData.rejectionStep}`);
    }
    const nextStepIndex = stepIndex + 1;
    return navigate(`${process.env.PUBLIC_URL}/wizard/${stepsInOrder[nextStepIndex]}`);
  }

  async function handleSubmit(values) {
    persistValues(values, step)
    const { children, ...omitChildrenStep } = values
    fetch(new URL('user', process.env.REACT_APP_API_URL), {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(omitChildrenStep)
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        } else {
          throw new Error('Network error')
        }
      })
      .then(token => {
        setCookie('Authorization', `Bearer ${token.jwt}`, {
          path: '/'
        })
        navigate(`${process.env.PUBLIC_URL}/recommendation`);
      })
      .catch(err => console.log(err))
  }

  const initialValues = stepsInOrder.reduce((mem, stepKey) => {
    mem[stepKey] = userInputCache[stepKey] || stepsData[stepKey].initialValue
    return mem;
  }, {})

  return (
    <Formik initialValues={initialValues} validationSchema={WizardSchema} onSubmit={handleSubmit}>
      {({ validateForm, values, errors }) => (
        <Form>
          <Outlet />
          {isLastStep ?
            (
              <>
                <button type="submit">Submit</button>
                <NavigateToShowError errors={errors} lastStep={step} />
              </>)
            :
            <button type="button" disabled={errors[step]} onClick={() => handleNext(validateForm, values)}>Next</button>
          }
        </Form>
      )}
    </Formik>
  );
}

export default Wizard;
