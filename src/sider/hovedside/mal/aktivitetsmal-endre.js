import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { hentMal } from '../../../moduler/mal/mal-reducer';
import * as AppPT from '../../../proptypes';
import AktivitetsmalForm from './aktivitetsmal-form';
import Innholdslaster from '../../../felles-komponenter/utils/innholdslaster';
import AktivitetsmalModal from './aktivitetsmal-modal';
import history from '../../../history';
import {
    selectGjeldendeMal,
    selectMalSlice,
} from '../../../moduler/mal/mal-selector';

class AktivitetmalEndre extends Component {
    componentDidMount() {
        this.props.doHentMal();
    }

    render() {
        const { mal } = this.props;

        return (
            <Innholdslaster avhengigheter={[this.props.malData]}>
                <section className="aktivitetmal aktivitetmal__innhold">
                    <AktivitetsmalForm
                        mal={mal}
                        handleComplete={() => history.push('mal/')}
                    />
                </section>
            </Innholdslaster>
        );
    }
}

AktivitetmalEndre.defaultProps = {
    mal: null,
    malData: null,
};

AktivitetmalEndre.propTypes = {
    mal: AppPT.mal,
    doHentMal: PT.func.isRequired,
    malData: AppPT.avhengigheter.isRequired,
};

const mapStateToProps = state => ({
    mal: selectGjeldendeMal(state),
    malData: selectMalSlice(state),
});

const mapDispatchToProps = dispatch => ({
    doHentMal: () => hentMal()(dispatch),
});

export default AktivitetsmalModal(
    connect(mapStateToProps, mapDispatchToProps)(AktivitetmalEndre)
);
