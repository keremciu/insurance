import { useFormikContext, Field } from "formik";
import { useParams } from "react-router-dom";

import { stepsData } from './Wizard.config'

function WizardStep() {
  const { errors } = useFormikContext();
  const { step } = useParams();
  const stepData = stepsData[step];
  return (
    <div>
      <label htmlFor={step}>{stepData.label}</label>
      {stepData.type === 'radio' ?
        <div className="radioGroup" role="group" aria-labelledby="my-radio-group">
          {stepData.options.map(option =>
            <label key={option.value}>
              <Field type="radio" name={step} value={option.value} />
              {option.label}
            </label>
          )}
        </div>
        :
        <Field
          type={stepData.type || "text"}
          id={step}
          name={step}
          placeholder={stepData.placeholder}
        />}
      {errors[step] && <div className="errorText">{errors[step]}</div>}
    </div>
  );
}

export default WizardStep;
