import React from 'react';
import PT from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import history from '../../../history';

function NavigasjonslinjeKnapp({ ariaLabel, lenke, className }) {
    return (
        <FormattedMessage id={ariaLabel}>
            {label =>
                <button
                    className={classNames(
                        'navigasjonslinje__button',
                        className
                    )}
                    aria-label={label}
                    onClick={() => history.push(lenke)}
                />}
        </FormattedMessage>
    );
}

NavigasjonslinjeKnapp.defaultProps = {
    className: '',
};

NavigasjonslinjeKnapp.propTypes = {
    ariaLabel: PT.string.isRequired,
    lenke: PT.string.isRequired,
    className: PT.string,
};

export default NavigasjonslinjeKnapp;