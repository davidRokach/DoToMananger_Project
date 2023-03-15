const useForm = () => {
  window.data = {};
  window;
  /************* input validation ***************/
  const onValidateField = (input) => {
    data[input.name] = input.value;
  };
  // בדיקת שדות רקים
  const onCheckEmptyFileds = (schema, btn) => {
    const isArrayEmpty = schema.filter((key) => !data[key]);
    if (isArrayEmpty.length)
      // אם אין תוכן בשדות
      return btn.setAttribute("disabled", "disabled");

    btn.removeAttribute("disabled"); // הפעלת הכפתור
    return;
  };
  // בדיקה בשינוי תוכן השדה
  const onChangeInputField = (element, schema, btn) => {
    const { input } = element;
    onValidateField(input);
    onCheckEmptyFileds(schema, btn);
  };
  // מחיקת כל השדות
  const onClearFormFields = (fields) => {
    fields.forEach((field) => {
      field.removeEventListener("input", onChangeInputField);
      field.value = "";
    });
    data = {};
  };

  return {
    onChangeInputField,
    onClearFormFields,
  };
};

export default useForm;
