import { Formik, Form, Field } from 'formik'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const stepsData = {
  "firstName": {
    initialValue: '',
    placeholder: 'John Doe',
    label: 'What is your first name?'
  },
  "address": {
    initialValue: '',
    placeholder: 'Address',
    label: 'What is your address?'
  },
  "numberOfChildren": {
    initialValue: 0,
    label: 'How many children you have?'
  },
  "occupation": {
    initialValue: "",
    label: 'What is your occupation?'
  },
  "email": {
    initialValue: "",
    placeholder: 'johndoe@gmail.com',
    label: 'What is your email address?'
  }
}
const stepsInOrder = ["firstName", "address", "numberOfChildren", "occupation", "email"]

function Wizard() {
  const { step } = useParams();
  const navigate = useNavigate()
  const stepData = stepsData[step]
  const stepIndex = stepsInOrder.findIndex(s => s === step)
  const isLastStep = stepIndex === stepsInOrder.length - 1

  useEffect(() => {
    if (stepData === undefined) {
      // handle non-step urls
      navigate(`/wizard/${stepsInOrder[0]}`)
      return null;
    }
  }, [stepData, navigate])

  if (stepData === undefined) {
    return null;
  }

  function handleSubmit(values) {
    if (!isLastStep) {
      const nextStepIndex = stepIndex + 1
      navigate(`/wizard/${stepsInOrder[nextStepIndex]}`)
    }
    // send request here
  }

  return (
    <Formik initialValues={{ [step]: stepData.initialValue }} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label htmlFor={step}>{stepData.label}</label>
          <Field type="text" id={step} name={step} placeholder={stepData.placeholder} />
        </div>
        <button type="submit">{isLastStep ? 'Submit' : 'Next'}</button>
      </Form>
    </Formik>
  )
}

export default Wizard