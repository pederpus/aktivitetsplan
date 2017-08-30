// Actions
export const TOGGLE_AKTIVITET_TYPE = 'filter/toggleAktivitetType';
export const TOGGLE_AKTIVITET_ETIKETT = 'filter/toggleAktivitetEtikett';
export const VELG_HISTORISK_PERIODE = 'filter/velg';
export const TOGGLE_AKTIVITET_STATUS = 'filter/toggleAktivitetStatus';

const initalState = {
    aktivitetTyper: {},
    aktivitetEtiketter: {},
    aktivitetStatus: {},
    historiskPeriode: null,
};

// Reducer
export default function reducer(state = initalState, action) {
    const data = action.data;
    switch (action.type) {
        case TOGGLE_AKTIVITET_TYPE: {
            const aktivitetTyper = { ...state.aktivitetTyper };
            aktivitetTyper[data] = !aktivitetTyper[data];
            return { ...state, aktivitetTyper };
        }
        case TOGGLE_AKTIVITET_ETIKETT: {
            const aktivitetEtiketter = { ...state.aktivitetEtiketter };
            aktivitetEtiketter[data] = !aktivitetEtiketter[data];
            return { ...state, aktivitetEtiketter };
        }
        case TOGGLE_AKTIVITET_STATUS: {
            const aktivitetStatus = { ...state.aktivitetStatus };
            aktivitetStatus[data] = !aktivitetStatus[data];
            return { ...state, aktivitetStatus };
        }
        case VELG_HISTORISK_PERIODE:
            return { ...state, historiskPeriode: data };
        default:
            return state;
    }
}

export function toggleAktivitetsType(aktivitetType) {
    return {
        type: TOGGLE_AKTIVITET_TYPE,
        data: aktivitetType,
    };
}

export function toggleAktivitetsEtikett(aktivitetEtikett) {
    return {
        type: TOGGLE_AKTIVITET_ETIKETT,
        data: aktivitetEtikett,
    };
}

export function velgHistoriskPeriode(historiskPeriode) {
    return {
        type: VELG_HISTORISK_PERIODE,
        data: historiskPeriode,
    };
}

export function toggleAktivitetsStatus(aktivitetStatus) {
    return {
        type: TOGGLE_AKTIVITET_STATUS,
        data: aktivitetStatus,
    };
}