import { Formik, FormikActions, FormikProps } from 'formik';
import React, { Component } from 'react';
import DynamicFormView from './DynamicFormView';

export interface DynamicFormField {
  name: string;
  initialValue?: string;
  label?: string;
  required?: boolean;
}

export interface Props {
  onSubmit: (formValues: FormValues) => Promise<void>;
  onValidate?: (formValies: FormValues) => FormErrors;
  schema: DynamicFormField[];
}

export interface FormValues {
  [key: string]: string;
}
export interface FormErrors {
  [key: string]: string;
}

export default class DynamicForm extends Component<Props> {
  // NO CHANGING SCHEMA, ETC.
  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    const { schema } = this.props;
    const initialValues = schema.reduce(
      (accumulator: FormValues = {}, currentValue: DynamicFormField) => {
        const initialValue =
          currentValue.initialValue !== undefined ? currentValue.initialValue : '';
        return { ...accumulator, [currentValue.name]: initialValue };
      },
      {}
    );
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        render={this.renderForm}
        validate={this.handleValidate}
      />
    );
  }

  private handleSubmit = async (
    formValues: FormValues,
    { resetForm, setStatus, setSubmitting }: FormikActions<FormValues>
  ) => {
    const { onSubmit } = this.props;
    setStatus({});
    try {
      await onSubmit(formValues);
      resetForm();
      setStatus({ succeeded: true });
      setSubmitting(false);
    } catch (err) {
      setStatus({ failed: true });
      setSubmitting(false);
    }
  };

  private handleValidate = (formValues: FormValues) => {
    const { onValidate, schema } = this.props;
    let errors: FormErrors = {};
    schema.forEach(field => {
      if (field.required !== true) {
        return;
      }
      const { name } = field;
      if (formValues[name] === undefined) {
        errors[name] = 'Required';
      } else if (formValues[name].trim() === '') {
        errors[name] = 'Must not be blank';
      }
    });
    if (onValidate !== undefined) {
      const additionalErrors = onValidate(formValues);
      errors = { ...errors, ...additionalErrors };
    }
    return errors;
  };

  private renderForm = (props: FormikProps<FormValues>) => {
    const { schema } = this.props;
    return <DynamicFormView {...props} schema={schema} />;
  };
}
