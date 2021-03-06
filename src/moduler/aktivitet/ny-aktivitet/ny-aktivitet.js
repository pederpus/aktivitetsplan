import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Innholdstittel } from 'nav-frontend-typografi';
import Bilde from '../../../felles-komponenter/bilde/bilde';
import { hentIdentitet } from '../../identitet/identitet-reducer';
import Lenkepanel from '../../../felles-komponenter/lenkepanel';
import leggTilAktivitetSvg from '../../../img/legg-til-aktivitet-illustrasjon.svg';
import Modal from '../../../felles-komponenter/modal/modal';
import { selectErVeileder } from '../../identitet/identitet-selector';

class NyAktivitet extends Component {
    componentDidMount() {
        this.props.doHentIdentitet();
    }

    render() {
        const { erVeileder, intl } = this.props;
        return (
            <Modal
                contentLabel="ny-aktivitet-modal"
                contentClass="ny-aktivitet-visning"
            >
                <div className="ny-aktivitet-modal__header">
                    <Bilde
                        className="ny-aktivitet-modal__bilde"
                        src={leggTilAktivitetSvg}
                        alt={intl.formatMessage({
                            id: 'ny-aktivitet-modal.bilde.alt-tekst',
                        })}
                    />
                    <Innholdstittel className="ny-aktivitet-tittel">
                        <FormattedMessage id="ny-aktivitet-modal.tittel" />
                    </Innholdstittel>
                </div>
                <div className="ny-aktivitet-modal__ny-aktivitet-lenker">
                    <Lenkepanel href="/aktivitet/ny/stilling">
                        <FormattedMessage id="ny-aktivitet-modal.ledig-stilling" />
                    </Lenkepanel>
                    <Lenkepanel href="/aktivitet/ny/mote" hidden={!erVeileder}>
                        <FormattedMessage id="ny-aktivitet-modal.mote" />
                    </Lenkepanel>
                    <Lenkepanel href="/aktivitet/ny/egen">
                        <FormattedMessage id="ny-aktivitet-modal.egen-aktivitet" />
                    </Lenkepanel>
                    <Lenkepanel
                        href="/aktivitet/ny/sokeavtale"
                        hidden={!erVeileder}
                    >
                        <FormattedMessage id="ny-aktivitet-modal.sokeavtale-aktivitet" />
                    </Lenkepanel>
                    <Lenkepanel
                        href="/aktivitet/ny/behandling"
                        hidden={!erVeileder}
                    >
                        <FormattedMessage id="ny-aktivitet-modal.medisinsk-behandling" />
                    </Lenkepanel>
                    <Lenkepanel
                        href="/aktivitet/ny/samtalereferat"
                        hidden={!erVeileder}
                    >
                        <FormattedMessage id="ny-aktivitet-modal.samtalereferat" />
                    </Lenkepanel>
                    <Lenkepanel href="/aktivitet/ny/ijobb">
                        <FormattedMessage id="ny-aktivitet-modal.jobb-jeg-er-i" />
                    </Lenkepanel>
                </div>
            </Modal>
        );
    }
}

NyAktivitet.propTypes = {
    doHentIdentitet: PT.func.isRequired,
    erVeileder: PT.bool.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
    erVeileder: selectErVeileder(state),
});

const mapDispatchToProps = dispatch => ({
    doHentIdentitet: () => dispatch(hentIdentitet()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(NyAktivitet)
);
