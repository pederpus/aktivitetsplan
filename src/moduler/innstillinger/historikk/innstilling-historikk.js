import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PT from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import * as AppPT from '../../../proptypes';
import VisibleIfDiv from '../../../felles-komponenter/utils/visible-if-div';
import { autobind } from '../../../utils';
import Innholdslaster from '../../../felles-komponenter/utils/innholdslaster';
import Accordion from '../../../felles-komponenter/accordion';
import InnstillingHistorikkInnslag from './innstilling-historikk-innslag';
import { hentInnstillingHistorikk } from './oppfolging-historikk-reducer';
import { hentInnstillingOppgavehistorikk } from './oppgave-historikk-reducer';
import {
    selectInnstillingHistorikk,
    selectInnstillingHistorikkStatus,
} from './historikk-selector';

class InnstillingHistorikk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apen: false,
        };
        autobind(this);
    }

    componentDidMount() {
        this.props.doHentInnstillingHistorikk();
        this.props.doHentInnstillingOppgavehistorikk();
    }

    onClick() {
        this.setState({ apen: !this.state.apen });
    }

    render() {
        const { innstillingHistorikk, innstillingHistorikkStatus } = this.props;

        const historikkListeSorted = innstillingHistorikk.sort((a, b) =>
            b.dato.localeCompare(a.dato)
        );

        const forstePeriode =
            historikkListeSorted[0] &&
            <InnstillingHistorikkInnslag
                key={historikkListeSorted[0].dato}
                innstillingHistorikk={historikkListeSorted[0]}
            />;

        const restenAvPeriodene = (
            <Accordion
                onClick={this.onClick}
                labelId={
                    this.state.apen
                        ? 'innstillinger.historikk.vis-mindre'
                        : 'innstillinger.historikk.vis-mer'
                }
            >
                {historikkListeSorted
                    .slice(1)
                    .map(innslag =>
                        <InnstillingHistorikkInnslag
                            key={innslag.dato}
                            innstillingHistorikk={innslag}
                        />
                    )}
            </Accordion>
        );

        return (
            <Innholdslaster
                avhengigheter={[innstillingHistorikkStatus]}
                spinnerStorrelse="M"
                className="instillinger__historikk-spinner"
            >
                <section className="innstillinger__historikk">
                    <Undertittel className="innstillinger__historikk-tittel">
                        <FormattedMessage id="innstillinger.historikk.tittel" />
                    </Undertittel>
                    {forstePeriode ||
                        <FormattedMessage id="innstillinger.historikk.ingenhistorikk" />}
                    <VisibleIfDiv visible={historikkListeSorted.length > 1}>
                        {restenAvPeriodene}
                    </VisibleIfDiv>
                </section>
            </Innholdslaster>
        );
    }
}

InnstillingHistorikk.propTypes = {
    innstillingHistorikkStatus: AppPT.status.isRequired,
    innstillingHistorikk: PT.arrayOf(AppPT.innstillingHistorikk).isRequired,
    doHentInnstillingHistorikk: PT.func.isRequired,
    doHentInnstillingOppgavehistorikk: PT.func.isRequired,
};

const mapStateToProps = state => ({
    innstillingHistorikkStatus: selectInnstillingHistorikkStatus(state),
    innstillingHistorikk: selectInnstillingHistorikk(state),
});

const mapDispatchToProps = dispatch => ({
    doHentInnstillingHistorikk: () => dispatch(hentInnstillingHistorikk()),
    doHentInnstillingOppgavehistorikk: () =>
        dispatch(hentInnstillingOppgavehistorikk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    InnstillingHistorikk
);
