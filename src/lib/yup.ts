import * as yup from "yup";

yup.setLocale({
  mixed: { required: { key: "required", data: {} } },
  string: { email: { key: "wrong_email", data: {} } },
});

export { yup };
