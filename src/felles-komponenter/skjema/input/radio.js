import React from 'react';
import PT from 'prop-types';
import { Radio as NavRadio } from 'nav-frontend-skjema';
import { CustomField } from 'react-redux-form-validation';
import { touch } from 'redux-form';

function InnerInputComponent({
    input,
    forhandsvalgt,
    errorMessage, // eslint-disable-line no-unused-vars
    meta, // eslint-disable-line no-unused-vars
    ...rest
}) {
    const inputProps = {
        ...input,
        ...rest,
    };
    const gjeldendeFeltVerdi = input.value;
    const radioButtonVerdi = rest.value;
    return (
        <NavRadio
            {...inputProps}
            checked={gjeldendeFeltVerdi === radioButtonVerdi || forhandsvalgt}
            // Fikser fokus/markering feil i IE
            onBlur={() => {
                // slik at dette feltet valideres
                meta.dispatch(touch(meta.form, input.name));
            }}
            onFocus={() => {}}
        />
    );
}

InnerInputComponent.defaultProps = {
    input: undefined,
    errorMessage: undefined,
    meta: undefined,
    forhandsvalgt: false,
};

InnerInputComponent.propTypes = {
    input: PT.object, // eslint-disable-line react/forbid-prop-types
    errorMessage: PT.object, // eslint-disable-line react/forbid-prop-types
    meta: PT.object, // eslint-disable-line react/forbid-prop-types
    forhandsvalgt: PT.bool,
};

function Radio({ id, feltNavn, className, ...rest }) {
    return (
        <CustomField
            name={feltNavn}
            errorClass="skjemaelement--harFeil"
            className={className}
            id={id}
            customComponent={<InnerInputComponent {...rest} />}
        />
    );
}

Radio.defaultProps = {
    className: '',
    id: undefined,
};

Radio.propTypes = {
    feltNavn: PT.string.isRequired,
    id: PT.string,
    className: PT.string,
};

export default Radio;
