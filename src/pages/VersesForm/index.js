import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import { ControlGroup, Button, ButtonGroup } from '@blueprintjs/core';

import { PageWrapper } from '../../components';
import {
  FormTextInput, FormSwitcher, FormTextArea, FormSelect, FormFileInput
} from '../../components/Form';
import { getCategories, createVerses } from '../../actions';

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'}
  justify-content: ${props => props.justify || 'flex-start'}
`;

const StyledControlGroup = styled(ControlGroup)`
  label {
    display: flex;
    align-items: center;
    padding-right: 8px;
  }
`;

class VersesForm extends Component {
  componentDidMount() {
    const { categoriesGet } = this.props;
    categoriesGet();
  }

  createVerse = values => {
    const { createVerse } = this.props;
    // eslint-disable-next-line
    const { bigPicture, smallPicture, soundFile, ...verse } = values
    createVerse(verse)
  }

  render() {
    const { reset, categories, handleSubmit } = this.props;
    return (
      <PageWrapper>
        <h1>Bible Verses</h1>
        <form onSubmit={handleSubmit(this.createVerse)}>
          <FlexBox justify="center">
            <ButtonGroup>
              <Button
                intent="success"
                rightIcon="arrow-up"
                type="submit"
              >
                Save
              </Button>
              <Button
                intent="primary"
                rightIcon="arrow-down"
              >
                Load Verse
              </Button>
              <Button
                intent="primary"
                rightIcon="document"
                onClick={reset}
              >
                New Verse
              </Button>
            </ButtonGroup>
          </FlexBox>
          <FlexBox>
            <Field
              large
              component={FormSwitcher}
              name="isLive"
              label="Live"
              formGroupProps={{ inline: true }}
            />
            <Field
              large
              component={FormSwitcher}
              name="isPremium"
              label="Premium"
              formGroupProps={{ inline: true }}
            />
          </FlexBox>
          <StyledControlGroup>
            <label htmlFor="category">Category</label>
            <Field
              fill
              large
              id="category"
              name="category"
              component={FormSelect}
              formGroupProps={{ inline: true }}
              options={categories}
            />
            <Button intent="success">Manage Categories</Button>
          </StyledControlGroup>
          <Field
            large
            component={FormTextInput}
            name="verseNumber"
            label="Verse Number"
          />
          <FlexBox flexDirection="column">
            <label htmlFor="videoUrl">Video Url</label>
            <Field
              large
              component={FormSwitcher}
              name="isVideoPremium"
              label="Premium"
              formGroupProps={{ inline: true }}
            />
            <Field
              large
              component={FormTextInput}
              name="videoUrl"
              placeholder="Vimeo or YouTube link"
            />
          </FlexBox>
          <Field
            fill
            large
            component={FormFileInput}
            name="soundFile"
            label="Voice File"
          />
          <Field
            fill
            large
            component={FormTextArea}
            name="verseText"
            label="Verse Text"
          />
          <Field
            fill
            large
            component={FormTextArea}
            name="devotionText"
            label="Devotion Text"
          />
          <h3>Images</h3>
          <Field
            fill
            large
            component={FormFileInput}
            name="bigPicture"
            label="HD Image"
            formGroupProps={{ labelInfo: "(1280x720)" }}
          />
          <Field
            fill
            large
            component={FormFileInput}
            name="smallPicture"
            label="Square Image"
            formGroupProps={{ labelInfo: "(720x720)" }}
          />
        </form>
      </PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  categories: Object.keys(state.categories.data).map(cat => ({ label: cat, value: cat }))
});

const mapDispatchToProps = dispatch => ({
  categoriesGet: () => dispatch(getCategories().request),
  createVerse: data => dispatch(createVerses(data).request)
})

export default compose(
  reduxForm({
    form: 'versesForm'
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(VersesForm);
