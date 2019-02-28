import { Formik, FormikActions, FormikProps } from 'formik';
import React, { Component } from 'react';
import DynamicFormView from './DynamicFormView';

export interface DynamicFormField {
  name: string;
  initialValue?: string;
  label?: string;
}

export interface Props {
  onSubmit: (formValues: FormValues) => Promise<void>;
  schema: DynamicFormField[];
}

export interface FormValues {
  [key: string]: string;
}

export default class DynamicForm extends Component<Props> {
  // SCHEMA IS FORCED TO BE IMMUTABLE
  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    const { schema } = this.props;
    const initialValues = schema.reduce(
      (accumulator: FormValues = {}, currentValue: DynamicFormField) => {
        const initialValue = currentValue.initialValue !== undefined ? currentValue.initialValue : '';
        return { ...accumulator, [currentValue.name]: initialValue };
      },
      {}
    );
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmitImpl}
        render={this.renderForm}
      />
    );
  }

  private handleSubmitImpl = async (
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

  private renderForm = (props: FormikProps<FormValues>) => {
    const { schema } = this.props;
    return <DynamicFormView {...props} schema={schema} />;
  };
}
