import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
import PT from 'prop-types';
import Modal from '../../felles-komponenter/modal/modal';
import ModalHeader from '../../felles-komponenter/modal/modal-header';
import ModalContainer from '../../felles-komponenter/modal/modal-container';

function AktivitetsmalModal({ onRequestClose, children }) {
    return (
        <div>
            <Modal
                header={<ModalHeader className="aktivitetmal__modal" />}
                contentLabel="aktivitetsmal-modal"
                onRequestClose={onRequestClose}
            >
                <ModalContainer>
                    <Innholdstittel className="aktivitetmal__header">
                        <FormattedMessage id="aktivitetsmal.mitt-mal.header" />
                    </Innholdstittel>
                    {children}
                </ModalContainer>
            </Modal>
        </div>
    );
}

AktivitetsmalModal.propTypes = {
    onRequestClose: PT.func,
    children: PT.node.isRequired,
};

AktivitetsmalModal.defaultProps = {
    onRequestClose: null,
};

export default AktivitetsmalModal;
