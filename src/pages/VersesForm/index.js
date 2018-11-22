import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';
import { ControlGroup, Button, ButtonGroup, Menu, MenuItem } from '@blueprintjs/core';

import { PageWrapper, DialogModal } from '../../components';
import { ManageVersesModal } from '../../components/Modals';
import {
  FormTextInput, FormSwitcher, FormTextArea, FormSelectGroup, FormFileInput
} from '../../components/Form';
import {
  getCategories, createVerses, getVerses, deleteVerse, toggleDialog
} from '../../actions';
import { generateRandomKey } from '../../utils';
import { required } from '../../utils/validators';

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'}
  justify-content: ${props => props.justify || 'flex-start'}
`;

const StyledControlGroup = styled(ControlGroup)`
  label {
    display: flex;
    align-items: center;
    // padding-right: 8px;
  }
`;

const versesModal = 'verses-modal';

class VersesForm extends Component {
  componentDidMount() {
    const { categoriesGet, versesGet } = this.props;
    categoriesGet();
    versesGet()
  }

  createVerse = verse => {
    const { createVerse } = this.props;

    createVerse(verse)
  }

  render() {
    const {
      reset, categories, handleSubmit, verses, modalToggle, verseDelete, deleting
    } = this.props;
    return (
      <PageWrapper>
        <h1>Bible Verses</h1>
        <form
          onSubmit={handleSubmit(this.createVerse)}
        >
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
                onClick={() => modalToggle(versesModal)}
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
          <Field
            fill
            large
            id="category"
            name="category"
            component={FormSelectGroup}
            formGroupProps={{ inline: true }}
            options={[ { label: '' }, ...categories]}
            validate={[ required ]}
          >
            <Button intent="success">Manage Categories</Button>
          </Field>
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
            name="note"
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
        <ManageVersesModal
          verses={verses}
          deleting={deleting}
          verseDelete={verseDelete}
        />
      </PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  categories: Object.keys(state.categories.data).map(cat => ({ label: cat, value: cat })),
  verses: state.verses.data,
  deleting: state.verses.deleting,
});

const mapDispatchToProps = dispatch => ({
  categoriesGet: () => dispatch(getCategories().request),
  createVerse: data => dispatch(createVerses(data).request),
  versesGet: () => dispatch(getVerses().request),
  verseDelete: data => dispatch(deleteVerse(data).request),
  modalToggle: id => dispatch(toggleDialog(id)),
})

export default compose(
  reduxForm({
    form: 'versesForm',
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(VersesForm);
