import React, { Component } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
    Innholdstittel,
    Normaltekst,
    Undertittel,
} from 'nav-frontend-typografi';
import Modal from '../../felles-komponenter/modal/modal';
import ModalContainer from '../../felles-komponenter/modal/modal-container';
import { ONBOARDING_VIDEO_URL } from '../../environment';
import { HtmlText } from '../../text';
import VisibleIfDiv from '../../felles-komponenter/utils/visible-if-div';
import VilkarHistorikk from '../vilkar/vilkar-historikk';
import { hentHistoriskeVilkar } from '../vilkar/historiske-vilkar';
import {
    selectHistoriskeVilkar,
    selectHistoriskeVilkarStatus,
} from '../vilkar/historiske-vilkar-selector';
import * as AppPT from '../../proptypes';
import Innholdslaster from '../../felles-komponenter/utils/innholdslaster';

class InformasjonModal extends Component {
    componentDidMount() {
        const { doHentHistoriskeVilkar } = this.props;
        doHentHistoriskeVilkar();
    }
    render() {
        const { historiskeVilkar, historiskeVilkarStatus } = this.props;

        return (
            <Modal
                contentLabel="informasjon-modal"
                contentClass="informasjon-visnign"
            >
                <ModalContainer className="informasjon-modal-container">
                    <Innholdstittel>
                        <FormattedMessage id="informasjon.tittel" />
                    </Innholdstittel>
                    <Normaltekst>
                        <FormattedMessage id="informasjon.hjelpetekst" />
                    </Normaltekst>
                    <iframe
                        title="onboarding-video"
                        frameBorder="0"
                        scrolling="no"
                        src={ONBOARDING_VIDEO_URL}
                        className="video-player"
                    />
                    <Undertittel>
                        <FormattedMessage id="informasjon.informasjonstekst.tittel" />
                    </Undertittel>
                    <HtmlText
                        className="mellomrom"
                        id="informasjon.informasjonstekst.tekst"
                    />
                    <Innholdslaster
                        spinnerStorrelse="S"
                        avhengigheter={[historiskeVilkarStatus]}
                    >
                        <VisibleIfDiv
                            visible={historiskeVilkar.length > 0}
                            className="vilkar__historikk-container"
                        >
                            <hr className="vilkar__delelinje" />
                            <VilkarHistorikk
                                resterendeVilkar={historiskeVilkar}
                            />
                        </VisibleIfDiv>
                    </Innholdslaster>
                </ModalContainer>
            </Modal>
        );
    }
}

InformasjonModal.propTypes = {
    doHentHistoriskeVilkar: PT.func.isRequired,
    historiskeVilkarStatus: AppPT.status.isRequired,
    historiskeVilkar: PT.arrayOf(AppPT.vilkar).isRequired,
};

const mapStateToProps = state => ({
    historiskeVilkarStatus: selectHistoriskeVilkarStatus(state),
    historiskeVilkar: selectHistoriskeVilkar(state),
});

const mapDispatchToProps = dispatch => ({
    doHentHistoriskeVilkar: () => dispatch(hentHistoriskeVilkar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InformasjonModal);
