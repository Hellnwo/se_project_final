import React, {useState, useCallback } from "react";

function useFormValidation(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest(".modal__form").checkValidity());
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );
  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

export default useFormValidation;
