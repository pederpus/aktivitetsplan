import React, { Component } from 'react';
import PT from 'prop-types';
import { formValueSelector, isDirty } from 'redux-form';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { validForm } from 'react-redux-form-validation';
import { VIS_MALER } from '~config'; // eslint-disable-line
import LagreAktivitet from '../lagre-aktivitet';
import { formNavn } from '../aktivitet-form-utils';
import { moment } from '../../../../utils';
import Textarea from '../../../../felles-komponenter/skjema/textarea/textarea';
import Input from '../../../../felles-komponenter/skjema/input/input';
import Datovelger from '../../../../felles-komponenter/skjema/datovelger/datovelger';
import {
    SOKEAVTALE_AKTIVITET_TYPE,
    STATUS_PLANLAGT,
} from '../../../../constant';
import PeriodeValidering from '../../../../felles-komponenter/skjema/datovelger/periode-validering';
import {
    maksLengde,
    pakrevd,
} from '../../../../felles-komponenter/skjema/validering';
import AktivitetFormHeader from '../aktivitet-form-header';
import { selectValgtMalverkSlice } from '../../../malverk/malverk-selector';
import Malverk from '../../../malverk/malverk';

function erAvtalt(verdi, props) {
    return !!props.avtalt;
}

const OPPFOLGING_MAKS_LENGDE = 255;
const BESKRIVELSE_MAKS_LENGDE = 5000;
const MAKS_SOKNADER = 100000;

const pakrevdFraDato = pakrevd(
    'sokeavtale-aktivitet-form.feilmelding.paakrevd-fradato'
).hvisIkke(erAvtalt);

const pakrevdTilDato = pakrevd(
    'sokeavtale-aktivitet-form.feilmelding.paakrevd-tildato'
);

// eslint-disable-next-line no-confusing-arrow
const pakrevdAntall = (value, props) =>
    (value && value.toString().length > 0) || erAvtalt(value, props)
        ? undefined
        : <FormattedMessage id="sokeavtale-aktivitet-form.feilmelding.paakrevd-antall" />;

// eslint-disable-next-line no-confusing-arrow
const numericAntall = (value, props) =>
    (value && /^[0-9]+$/.test(value)) || erAvtalt(value, props)
        ? undefined
        : <FormattedMessage id="sokeavtale-aktivitet-form.feilmelding.numerisk-antall" />;

// eslint-disable-next-line no-confusing-arrow
const begrensetAntallSoknader = (value, props) =>
    (value && value < MAKS_SOKNADER) || erAvtalt(value, props)
        ? undefined
        : <FormattedMessage
              id="sokeavtale-aktivitet-form.feilmelding.soknad-antall"
              values={{ MAKS_LENGDE: MAKS_SOKNADER }}
          />;

const begrensetAvtaleOppfolgingLengde = maksLengde(
    'sokeavtale-aktivitet-form.feilmelding.oppfolging-lengde',
    OPPFOLGING_MAKS_LENGDE
).hvisIkke(erAvtalt);

const begrensetBeskrivelseLengde = maksLengde(
    'sokeavtale-aktivitet-form.feilmelding.beskrivelse-lengde',
    BESKRIVELSE_MAKS_LENGDE
).hvisIkke(erAvtalt);

// TODO fiks i separat quickfix
// eslint-disable-next-line react/prefer-stateless-function
class SokeAvtaleAktivitetForm extends Component {
    render() {
        const {
            handleSubmit,
            errorSummary,
            currentFraDato,
            currentTilDato,
            avtalt,
            endre,
        } = this.props;

        const erAktivitetAvtalt = avtalt === true;

        return (
            <form
                onSubmit={handleSubmit}
                noValidate="noValidate"
                autoComplete="off"
            >
                <div className="skjema-innlogget aktivitetskjema">
                    {errorSummary}
                    <AktivitetFormHeader
                        tittelId="sokeavtale-aktivitet-form.header"
                        ingressType={SOKEAVTALE_AKTIVITET_TYPE}
                        pakrevdInfoId="aktivitet-form.pakrevd-felt-info"
                    />
                    <Malverk
                        visible={VIS_MALER}
                        endre={endre}
                        type="SOKEAVTALE"
                    />
                    <Input
                        feltNavn="tittel"
                        disabled
                        className="hidden"
                        labelId="sokeavtale-aktivitet-form.label.overskrift"
                        bredde="fullbredde"
                    />

                    <PeriodeValidering
                        feltNavn="periodeValidering"
                        fraDato={currentFraDato}
                        tilDato={currentTilDato}
                        errorMessageId="datepicker.feilmelding.egen.fradato-etter-frist"
                    >
                        <div className="dato-container">
                            <Datovelger
                                feltNavn="fraDato"
                                disabled={erAktivitetAvtalt}
                                labelId="sokeavtale-aktivitet-form.label.fra-dato"
                                senesteTom={currentTilDato}
                            />
                            <Datovelger
                                feltNavn="tilDato"
                                labelId="sokeavtale-aktivitet-form.label.til-dato"
                                tidligsteFom={currentFraDato}
                            />
                        </div>
                    </PeriodeValidering>

                    <Input
                        feltNavn="antallStillingerSokes"
                        disabled={erAktivitetAvtalt}
                        labelId="sokeavtale-aktivitet-form.label.antall"
                        bredde="S"
                    />
                    <Textarea
                        feltNavn="avtaleOppfolging"
                        disabled={erAktivitetAvtalt}
                        labelId="sokeavtale-aktivitet-form.label.avtale-oppfolging"
                        maxLength={OPPFOLGING_MAKS_LENGDE}
                        visTellerFra={500}
                    />
                    <Textarea
                        feltNavn="beskrivelse"
                        disabled={erAktivitetAvtalt}
                        labelId="sokeavtale-aktivitet-form.label.beskrivelse"
                        maxLength={BESKRIVELSE_MAKS_LENGDE}
                        visTellerFra={500}
                    />
                </div>
                <LagreAktivitet />
            </form>
        );
    }
}

SokeAvtaleAktivitetForm.propTypes = {
    handleSubmit: PT.func,
    errorSummary: PT.node.isRequired,
    currentFraDato: PT.instanceOf(Date),
    currentTilDato: PT.instanceOf(Date),
    avtalt: PT.bool,
    isDirty: PT.bool.isRequired,
    endre: PT.bool,
};

SokeAvtaleAktivitetForm.defaultProps = {
    handleSubmit: undefined,
    currentFraDato: undefined,
    currentTilDato: undefined,
    avtalt: false,
    endre: false,
};

const SokeavtaleAktivitetReduxForm = validForm({
    form: formNavn,
    errorSummaryTitle: (
        <FormattedMessage id="sokeavtale-aktivitet-form.feiloppsummering-tittel" />
    ),
    enableReinitialize: true,
    validate: {
        fraDato: [pakrevdFraDato],
        tilDato: [pakrevdTilDato],
        antallStillingerSokes: [
            pakrevdAntall,
            numericAntall,
            begrensetAntallSoknader,
        ],
        beskrivelse: [begrensetBeskrivelseLengde],
        avtaleOppfolging: [begrensetAvtaleOppfolgingLengde],
        periodeValidering: [],
    },
})(SokeAvtaleAktivitetForm);

const mapStateToProps = (state, props) => {
    const selector = formValueSelector(formNavn);
    const valgtMalverk = selectValgtMalverkSlice(state);
    const aktivitet = props.endre
        ? props.aktivitet
        : valgtMalverk || props.aktivitet || {};
    return {
        initialValues: {
            status: STATUS_PLANLAGT,
            tittel: props.defaultTittel,
            avtalt: false,
            ...aktivitet,
        },
        currentFraDato: selector(state, 'fraDato')
            ? moment(selector(state, 'fraDato')).toDate()
            : undefined,
        currentTilDato: selector(state, 'tilDato')
            ? moment(selector(state, 'tilDato')).toDate()
            : undefined,
        isDirty: isDirty(formNavn)(state),
        avtalt: aktivitet && aktivitet.avtalt,
    };
};

export default connect(mapStateToProps)(SokeavtaleAktivitetReduxForm);
