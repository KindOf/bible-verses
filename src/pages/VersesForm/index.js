import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import styled from 'styled-components';
import { Button, ButtonGroup, Icon } from '@blueprintjs/core';

import { PageWrapper } from '../../components';
import { ManageVersesModal, ManageCategoriesModal } from '../../components/Modals';
import {
  FormTextInput, FormSwitcher, FormTextArea, FormSelectGroup, FormFileInput
} from '../../components/Form';
import {
  getCategories, createVerses, getVerses, deleteVerse, toggleDialog, setFormValues, updateVerses, createCategory, deleteCategory
} from '../../actions';
import { required } from '../../utils/validators';

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'}
  justify-content: ${props => props.justify || 'flex-start'}
`;

const StyledTickIcon = styled(Icon)`
  && {
    margin-left: 16px;
  }
`;

const versesModal = 'verses-modal';
const categoriesModal = 'categories-modal';

class VersesForm extends Component {
  componentDidMount() {
    const { categoriesGet, versesGet } = this.props;
    categoriesGet();
    versesGet()
  }

  createVerse = verse => {
    const { createVerse, selectedVerseKey, verseUpdate, verses } = this.props;

    if (selectedVerseKey) {
      verseUpdate({
        oldVerse: verses[selectedVerseKey],
        verse,
        selectedVerseKey
      });
    } else {
      createVerse(verse)
    }
  }

  loadVerse = key => {
    const { modalToggle, loadVersesForm } = this.props;
    loadVersesForm(key);
    modalToggle(null)
  }

  render() {
    const {
      categoriesTitles, categories, handleSubmit, verses, modalToggle, verseDelete, deleting, loadVersesForm,
      isBigPicturePresent, isSmallPicturePresent, isSoundFilePresent, reset, categoryCreate,
      categoryDelete
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
                onClick={() => {loadVersesForm(); reset()}}
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
            options={[ { label: '' }, ...categoriesTitles]}
            validate={[ required ]}
          >
            <Button
              intent="success"
              onClick={() => modalToggle(categoriesModal)}
            >
              Manage Categories
            </Button>
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
            formGroupProps={{
              labelInfo: (
                <span className="bp3-text-muted">
                  {isSoundFilePresent && <StyledTickIcon icon='tick' intent='success' />}
                </span>
              )
            }}
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
            formGroupProps={{
              labelInfo: (
                <span className="bp3-text-muted">
                  (1280x720)
                  {isBigPicturePresent && <StyledTickIcon icon='tick' intent='success' />}
                </span>
              )
            }}
          />
          <Field
            fill
            large
            component={FormFileInput}
            name="smallPicture"
            label="Square Image"
            formGroupProps={{
              labelInfo: (
                <span className="bp3-text-muted">
                  (720x720)
                  {isSmallPicturePresent && <StyledTickIcon icon='tick' intent='success' />}
                </span>
              )
            }}
          />
        </form>
        <ManageVersesModal
          verses={verses}
          deleting={deleting}
          verseDelete={verseDelete}
          loadVerse={this.loadVerse}
        />
        <ManageCategoriesModal
          categories={categories}
          categoryCreate={categoryCreate}
          categoryDelete={categoryDelete}
        />
      </PageWrapper>
    )
  }
}

const selector = formValueSelector('versesForm');

const mapStateToProps = state => ({
  categoriesTitles: Object.keys(state.categories.data).map(cat => ({ label: cat, value: cat })),
  categories: state.categories.data,
  verses: state.verses.data,
  selectedVerseKey: state.verses.selectedVerseKey,
  deleting: state.verses.deleting,
  initialValues: state.verses.formInitialValues,
  isBigPicturePresent: selector(state, 'bigPicture') !== '',
  isSmallPicturePresent: selector(state, 'smallPicture') !== '',
  isSoundFilePresent: selector(state, 'soundFile') !== '',
});

const mapDispatchToProps = dispatch => ({
  categoriesGet: () => dispatch(getCategories().request),
  categoryCreate: ({ key }) => dispatch(createCategory(key).request),
  categoryDelete: data => dispatch(deleteCategory(data).request),
  createVerse: data => dispatch(createVerses(data).request),
  verseUpdate: data => dispatch(updateVerses(data).request),
  versesGet: () => dispatch(getVerses().request),
  verseDelete: data => dispatch(deleteVerse(data).request),
  modalToggle: id => dispatch(toggleDialog(id)),
  loadVersesForm: key => dispatch(setFormValues(key)),
});


const WrappedVersesForm = reduxForm({
  form: 'versesForm',
  enableReinitialize: true,
})(VersesForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedVersesForm);
