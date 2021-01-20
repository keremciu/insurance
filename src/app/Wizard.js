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
  }
}
const stepsInOrder = ["firstName", "address", "numberOfChildren", "occupation", "email"]

function Wizard() {
  const { step } = useParams();
  const navigate = useNavigate()
  const stepData = stepsData[step]

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
    const nextStepIndex = stepsInOrder.findIndex(s => s === step) + 1
    navigate(`/wizard/${stepsInOrder[nextStepIndex]}`)
  }

  return (
    <Formik initialValues={{ [step]: stepData.initialValue }} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label>{stepData.label}</label>
          <Field type="text" name={step} placeholder={stepData.placeholder} />
          <button type="submit">Next</button>
        </div>
      </Form>
    </Formik>
  )
}

export default Wizard