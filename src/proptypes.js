import { PropTypes as PT } from 'react';

export const aktivitet = PT.shape({
    tittel: PT.string.isRequired,
    fraDato: PT.string.isRequired,
    tilDato: PT.string.isRequired,
    opprettetDato: PT.string,
    detaljer: PT.object,
    beskrivelse: PT.string,
    avtalt: PT.bool
});

export const dialog = PT.shape({
    id: PT.string.isRequired,
    overskrift: PT.string.isRequired
});

export const henvendelse = PT.shape({
    dialogId: PT.string.isRequired,
    tekst: PT.string.isRequired,
    avsender: PT.string.isRequired,
    sendt: PT.number.isRequired
});

export const etikett = PT.shape({
    id: PT.string,
    type: PT.string,
    visningsTekst: PT.string
});

export const endringslogg = PT.shape({
    endringsBeskrivelse: PT.string,
    endretAv: PT.string,
    endretDato: PT.number
});

export const oppfolgingStatus = PT.shape({
    status: PT.string,
    data: PT.object
});

export const vilkar = PT.shape({
    text: PT.string,
    hash: PT.string
});

export const mal = PT.shape({
    mal: PT.string,
    endretAv: PT.string,
    dato: PT.number
});

export const feil = PT.shape({
    is: PT.string.isRequired,
    type: PT.string.isRequired,
    detaljer: PT.string
});
