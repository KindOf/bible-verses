import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Button, Classes } from '@blueprintjs/core';

import { toggleDialog } from '../../actions';

const DialogModal = ({
  title, dialogId, openDialogId, children, close
}) => {
  return (
    <div className={Classes.DIALOG_CONTAINER}>
      <Dialog
        icon="info-sign"
        title={title}
        onClose={close}
        isOpen={dialogId === openDialogId}
      >
        <React.Fragment>
          <div className={Classes.DIALOG_BODY}>
            {children}
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={close} className={Classes.DIALOG_CLOSE_BUTTON}>Close</Button>
            </div>
          </div>
        </React.Fragment>
      </Dialog>
    </div>
  )
};

const mapStateToProps = state => ({ openDialogId: state.global.openDialogId });

const mapDispatchToProps = dispatch => ({ close: () => dispatch(toggleDialog())});

export default connect(mapStateToProps, mapDispatchToProps)(DialogModal);
