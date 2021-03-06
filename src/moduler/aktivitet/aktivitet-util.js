import 'moment-duration-format';
import { moment } from '../../utils';
import {
    MOTE_TYPE,
    SAMTALEREFERAT_TYPE,
    STATUS_AVBRUTT,
    STATUS_FULLFOERT,
} from '../../constant';

export function aktivitetEquals(a, b) {
    return (
        a.status === b.status &&
        a.type === b.type &&
        a.etikett === b.etikett &&
        a.avtalt === b.avtalt
    );
}

export function compareAktivitet(a, b) {
    if (b.avtalt && !a.avtalt) {
        return 1;
    } else if (!b.avtalt && a.avtalt) {
        return -1;
    }
    if (a.opprettetDato !== null && b.opprettetDato === null) {
        return -1;
    }
    if (a.opprettetDato === null && b.opprettetDato !== null) {
        return 1;
    }
    return b.opprettetDato.localeCompare(a.opprettetDato);
}

export function beregnKlokkeslettVarighet(aktivitet) {
    const fraDato = aktivitet.fraDato;
    const tilDato = aktivitet.tilDato;
    if (fraDato && tilDato) {
        const fraMoment = moment(fraDato);
        const tilMoment = moment(tilDato);
        const klokkeslett = fraMoment.minutes() + fraMoment.hours() * 60;
        const varighet = moment.duration(tilMoment.diff(fraMoment)).asMinutes();
        return {
            dato: fraMoment.startOf('day').toISOString(),
            klokkeslett,
            varighet,
        };
    }
    return {};
}

export function beregnFraTil(data) {
    const dato = data.dato;
    const klokkeslett = data.klokkeslett;
    const varighet = data.varighet;
    if (dato && klokkeslett && varighet) {
        const fraDato = moment(dato)
            .startOf('day')
            .minute(klokkeslett)
            .toISOString();
        const tilDato = moment(fraDato).add(varighet, 'minutes').toISOString();
        return {
            fraDato,
            tilDato,
        };
    }
    return {};
}

export function formatterVarighet(varighet) {
    return moment.duration(varighet, 'minutes').format('h:mm', { trim: false });
}

export function formatterKlokkeslett(klokkeslett) {
    return formatterVarighet(klokkeslett);
}

function moteManglerPubliseringAvSamtalereferat(type, erReferatPublisert) {
    return type === MOTE_TYPE && !erReferatPublisert;
}

function samtalreferatManglerPublisering(type, erReferatPublisert) {
    return type === SAMTALEREFERAT_TYPE && !erReferatPublisert;
}

export function manglerPubliseringAvSamtaleReferat(aktivitet, status) {
    const { type, erReferatPublisert } = aktivitet;
    return (
        !type ||
        (moteManglerPubliseringAvSamtalereferat(type, erReferatPublisert) &&
            status !== STATUS_AVBRUTT) ||
        samtalreferatManglerPublisering(type, erReferatPublisert)
    );
}

function erMoteOgAvbrutt(status, aktivitetType) {
    return status === STATUS_AVBRUTT && aktivitetType === MOTE_TYPE;
}

function erAvtaltOgAvbrutt(erAvtalt, status) {
    return erAvtalt && status === STATUS_AVBRUTT;
}

function erFullfoertUtenReferat(erAvtalt, status, aktivitetType) {
    return (
        erAvtalt &&
        status === STATUS_FULLFOERT &&
        aktivitetType !== SAMTALEREFERAT_TYPE &&
        aktivitetType !== MOTE_TYPE
    );
}

export function trengerBegrunnelse(erAvtalt, status, aktivitetType) {
    return (
        erAvtaltOgAvbrutt(erAvtalt, status) ||
        erFullfoertUtenReferat(erAvtalt, status, aktivitetType) ||
        erMoteOgAvbrutt(status, aktivitetType)
    );
}
