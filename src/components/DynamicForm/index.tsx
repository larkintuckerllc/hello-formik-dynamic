import { Formik, FormikActions, FormikProps } from 'formik';
import React, { Component } from 'react';
import DynamicFormView from './DynamicFormView';

const wait = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

export interface DynamicFormField {
  name: string;
  initialValue?: string;
  required?: boolean;
}

export interface Props {
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
        return { ...accumulator, [currentValue.name]: currentValue.initialValue = '' };
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
    setStatus({});
    try {
      await wait();
      // throw new Error(); // TESTING ERROR CASE
      resetForm();
      setStatus({ succeeded: true });
      setSubmitting(false);
      // tslint:disable-next-line
      console.log(formValues);
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
