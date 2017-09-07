import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { DatoEllerTidSiden } from '../../../felles-komponenter/dato';
import { hentVeileder } from '../../../ducks/veileder';
import * as AppPT from '../../../proptypes';
import Lenke from '../../../felles-komponenter/utils/lenke';

const NAV = 'NAV';
const SYSTEM = 'SYSTEM';
const EKSTERN = 'EKSTERN';

const ESKALERING_STOPPET = 'ESKALERING_STOPPET';
const ESKALERING_STARTET = 'ESKALERING_STARTET';
const ESKALERING_MAX_LENGTH = 120;

class InnstillingHistorikkInnslag extends Component {
    componentWillMount() {
        const innstillingHistorikk = this.props.innstillingHistorikk;
        if (innstillingHistorikk.opprettetAv === NAV) {
            this.props.doHentVeileder(innstillingHistorikk.opprettetAvBrukerId);
        }
    }

    hentKomponentMedNavn() {
        const {
            opprettetAv,
            opprettetAvBrukerId,
        } = this.props.innstillingHistorikk;
        switch (opprettetAv) {
            case NAV:
                return (
                    <FormattedMessage
                        id="innstillinger.historikk.innslag.opprettet-av-nav"
                        values={{
                            veileder: `${this.props.veileder[
                                opprettetAvBrukerId
                            ] || ''}`,
                        }}
                    />
                );
            case SYSTEM:
                return (
                    <FormattedMessage id="innstillinger.historikk.innslag.opprettet-av-system" />
                );
            case EKSTERN:
                return (
                    <FormattedMessage id="innstillinger.historikk.innslag.opprettet-av-ekstern" />
                );
            default:
                return null;
        }
    }

    render() {
        const {
            type,
            dato,
            begrunnelse,
            dialogId,
        } = this.props.innstillingHistorikk;
        const tekstType = type.replace(/_/g, '-').toLowerCase();
        const innslagHeaderId = `innstillinger.historikk.innslag.${tekstType}`;

        const begrunnelseVisning = () => {
            if ([ESKALERING_STARTET, ESKALERING_STOPPET].includes(type)) {
                const begrunnelseTekst =
                    !!begrunnelse && begrunnelse.length > ESKALERING_MAX_LENGTH
                        ? `${begrunnelse.substring(
                              0,
                              ESKALERING_MAX_LENGTH
                          )}... `
                        : `${begrunnelse} `;
                return (
                    <Normaltekst className="innslag__begrunnelse">
                        {begrunnelseTekst}
                        <Lenke href={`/dialog/${dialogId}`}>
                            <FormattedMessage
                                id={'innstillinger.historikk.innslag.les_mer'}
                            />
                        </Lenke>
                    </Normaltekst>
                );
            }

            return (
                <Normaltekst className="innslag__begrunnelse">
                    {begrunnelse}
                </Normaltekst>
            );
        };

        return (
            <div className="historikk__innslag">
                <Element className="innslag__header">
                    <FormattedMessage id={innslagHeaderId} />
                </Element>
                {begrunnelseVisning()}
                <Undertekst>
                    <DatoEllerTidSiden>{dato}</DatoEllerTidSiden>
                    &nbsp;
                    {this.hentKomponentMedNavn()}
                </Undertekst>
            </div>
        );
    }
}

InnstillingHistorikkInnslag.defaultProps = {
    doHentVeileder: undefined,
    veileder: undefined,
};

InnstillingHistorikkInnslag.propTypes = {
    innstillingHistorikk: AppPT.innstillingHistorikk.isRequired,
    doHentVeileder: PT.func.isRequired,
    veileder: AppPT.veileder,
};

const mapStateToProps = state => ({
    veileder: state.data.veiledere.data,
});

const mapDispatchToProps = dispatch => ({
    doHentVeileder: veilederId => dispatch(hentVeileder(veilederId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    InnstillingHistorikkInnslag
);
