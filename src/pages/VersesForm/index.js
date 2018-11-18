import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import { PageWrapper } from '../../components';
import {
  FormTextInput, FormSwitcher, FormTextArea, FormSelect, FormFileInput
} from '../../components/Form';

class VersesForm extends Component {
  render() {
    return (
      <PageWrapper>
        <h1>Bible Verses</h1>
        <form>
          <Field
            large
            component={FormTextInput}
            name="verseNumber"
            placeholder="email@example.com"
            label="Verse Number"
            // validate={[ required, validateEmail ]}
          />
          <Field
            large
            component={FormSwitcher}
            name="isLive"
            label="Live"
            formGroupProps={{ inline: true }}
          />
          <Field
            fill
            large
            component={FormTextArea}
            name="verseText"
            label="Verse Text"
            // validate={[ required, validateEmail ]}
          />
          <Field
            fill
            large
            name="book"
            label="Book"
            component={FormSelect}
            // formGroupProps={{ inline: true }}
            options={[
              {
                label: 'one',
                value: 1
              },
              {
                label: 'two',
                value: 2
              }
            ]}
            // validate={[ required, validateEmail ]}
          />
          <Field
            fill
            large
            component={FormFileInput}
            name="voiceFile"
            label="Voice File"
            // validate={[ required, validateEmail ]}
          />
        </form>
      </PageWrapper>
    )
  }
}

export default reduxForm({
  form: 'versesForm'
})(VersesForm);
