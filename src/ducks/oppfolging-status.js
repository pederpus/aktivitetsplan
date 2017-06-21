import * as Api from './api';
import { STATUS, doThenDispatch } from './utils';

// Actions
export const OK = 'oppfolgingStatus/OK';
export const FEILET = 'oppfolgingStatus/FEILET';
export const PENDING = 'oppfolgingStatus/PENDING';

export const AVSLA_OK = 'oppfolgingStatus/avsla/OK';
export const AVSLA_FEILET = 'oppfolgingStatus/avsla/FEILET';
export const AVSLA_PENDING = 'oppfolgingStatus/avsla/PENDING';

export const GODTA_OK = 'oppfolgingStatus/godta/OK';
export const GODTA_FEILET = 'oppfolgingStatus/godta/FEILET';
export const GODTA_PENDING = 'oppfolgingStatus/godta/PENDING';

export const START_OK = 'oppfolgingStatus/start/OK';
export const START_FEILET = 'oppfolgingStatus/start/FEILET';
export const START_PENDING = 'oppfolgingStatus/start/PENDING';

const initalState = {
    status: STATUS.NOT_STARTED,
    brukerHarAvslatt: false,
    data: {},
};

// Reducer
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case PENDING:
        case START_PENDING:
            return {
                ...state,
                status: state.status === STATUS.NOT_STARTED
                    ? STATUS.PENDING
                    : STATUS.RELOADING,
            };
        case FEILET:
        case START_FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case OK:
        case START_OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case GODTA_OK:
            return {
                ...state,
                status: STATUS.OK,
                brukerHarAvslatt: false,
                data: action.data,
            };
        case GODTA_FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case GODTA_PENDING:
            return {
                ...state,
                status: state.status === STATUS.NOT_STARTED
                    ? STATUS.PENDING
                    : STATUS.RELOADING,
            };
        case AVSLA_OK:
            return {
                ...state,
                status: STATUS.OK,
                brukerHarAvslatt: true,
                data: action.data,
            };
        case AVSLA_FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case AVSLA_PENDING:
            return {
                ...state,
                status: state.status === STATUS.NOT_STARTED
                    ? STATUS.PENDING
                    : STATUS.RELOADING,
            };
        default:
            return state;
    }
}

// Action Creators - NB! Disse brukes av aktivitetsplan
export function hentOppfolgingStatus() {
    return doThenDispatch(() => Api.hentOppfolgingStatus(), {
        OK,
        FEILET,
        PENDING,
    });
}

export function godtaVilkar(hash) {
    return doThenDispatch(() => Api.godtaVilkar(hash), {
        OK: GODTA_OK,
        FEILET: GODTA_FEILET,
        PENDING: GODTA_PENDING,
    });
}

export function avslaVilkar(hash) {
    return doThenDispatch(() => Api.avslaaVilkar(hash), {
        OK: AVSLA_OK,
        FEILET: AVSLA_FEILET,
        PENDING: AVSLA_PENDING,
    });
}
export function startOppfolging() {
    return doThenDispatch(() => Api.startOppfolgin1g(), {
        OK: START_OK,
        FEILET: START_FEILET,
        PENDING: START_PENDING,
    });
}