import React from 'react';
import { Menu, MenuItem, Button } from '@blueprintjs/core';

import DialogModal from '../DialogModal';
import { generateRandomKey } from '../../utils';

const versesModal = 'verses-modal';

const ManageVersesModal = ({ verses, deleting, verseDelete }) => {
  return (
    <DialogModal
      title="Verses"
      dialogId={versesModal}
    >
      <Menu>
        {
          Object.keys(verses || {}).map(key => (
            <MenuItem
              icon="book"
              key={generateRandomKey()}
              text={verses[key].verseNumber}
              labelElement={
                <Button
                  minimal
                  icon="trash"
                  intent="danger"
                  loading={deleting === key}
                  onClick={() => verseDelete({ id: key, verse: verses[key] })}
                />
              }
            />
          ))
        }
      </Menu>
    </DialogModal>
  )
}

export default ManageVersesModal;
