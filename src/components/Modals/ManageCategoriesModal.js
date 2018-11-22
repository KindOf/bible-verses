import React from 'react';
import { reduxForm, Field} from 'redux-form';
import { Menu, MenuItem, Button, ControlGroup } from '@blueprintjs/core';

import { FormSimpleText } from '../../components/Form';
import DialogModal from '../DialogModal';
import { generateRandomKey } from '../../utils';

const categoriesModal = 'categories-modal';

const ManageCategoriesModal = ({
  categories, deleting, categoryDelete, handleSubmit, categoryCreate
}) => {
  return (
    <DialogModal
      title="Categories"
      dialogId={categoriesModal}
    >
      <Menu>
        {
          Object.keys(categories || {}).map(key => (
            <MenuItem
              icon="book"
              key={generateRandomKey()}
              text={key}
              labelElement={
                <React.Fragment>
                  <Button
                    minimal
                    icon="trash"
                    intent="danger"
                    loading={deleting === key}
                    onClick={() => categoryDelete({ key, category: categories[key] })}
                  />
                </React.Fragment>
              }
            />
          ))
        }
      </Menu>
      <form
        onSubmit={handleSubmit(categoryCreate)}
        style={{ marginTop: '16px' }}
      >
        <ControlGroup fill>
          <Field
            large
            name="key"
            placeholder="Add new category..."
            component={FormSimpleText}
          />
          <Button
            intent="success"
            text="Create"
            type="submit"
          />
        </ControlGroup>
      </form>
    </DialogModal>
  )
}

export default reduxForm({
  form: 'category-form'
})(ManageCategoriesModal);
