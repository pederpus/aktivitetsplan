import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { isDirty } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';
import * as AppPT from '../../proptypes';
import AktivitetsmalForm from './aktivitetsmal-form';
import Innholdslaster from '../../felles-komponenter/utils/innholdslaster';
import AktivitetsmalModal from './aktivitetsmal-modal';
import {
    hentMal,
    selectGjeldendeMal,
    selectMalStatus,
} from './aktivitetsmal-reducer';

class AktivitetmalEndre extends Component {
    componentDidMount() {
        this.props.doHentMal();
    }

    render() {
        const { mal, avhengigheter, history, formIsDirty, intl } = this.props;

        function onRequestClose() {
            const dialogTekst = intl.formatMessage({
                id: 'aktkivitet-skjema.lukk-advarsel',
            });

            // eslint-disable-next-line no-alert
            if (!formIsDirty || confirm(dialogTekst)) {
                history.push('/');
            }
        }

        return (
            <AktivitetsmalModal onRequestClose={onRequestClose}>
                <Innholdslaster avhengigheter={avhengigheter}>
                    <section className="aktivitetmal aktivitetmal__innhold">
                        <AktivitetsmalForm
                            mal={mal}
                            isDirty={formIsDirty}
                            handleComplete={() => history.push('mal/')}
                            handleClose={() => onRequestClose()}
                        />
                    </section>
                </Innholdslaster>
            </AktivitetsmalModal>
        );
    }
}

AktivitetmalEndre.defaultProps = {
    mal: null,
};

AktivitetmalEndre.propTypes = {
    mal: AppPT.mal,
    doHentMal: PT.func.isRequired,
    avhengigheter: AppPT.avhengigheter.isRequired,
    history: AppPT.history.isRequired,
    formIsDirty: PT.bool.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = state => ({
    mal: selectGjeldendeMal(state),
    avhengigheter: [selectMalStatus(state)],
    formIsDirty: isDirty('aktivitetsmal-form')(state),
});

const mapDispatchToProps = dispatch => ({
    doHentMal: () => hentMal()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    injectIntl(AktivitetmalEndre)
);
