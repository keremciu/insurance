import { Field } from "formik";
import { useParams } from "react-router-dom";

import { stepsData } from './Wizard'

function WizardStep() {
  const { step } = useParams();
  const stepData = stepsData[step];
  return (
    <div>
      <label htmlFor={step}>{stepData.label}</label>
      {stepData.type === 'radio' ?
        <div role="group" aria-labelledby="my-radio-group">
          {stepData.options.map(option =>
            <label key={option.value}>
              <Field type="radio" name={step} value={option.value} />
              {option.label}
            </label>
          )}
        </div>
        :
        <Field
          type="text"
          id={step}
          name={step}
          placeholder={stepData.placeholder}
        />}
    </div>
  );
}

export default WizardStep;
