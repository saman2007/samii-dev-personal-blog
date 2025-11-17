import * as yup from "yup";

yup.setLocale({
  mixed: { required: { key: "required" } },
  string: { email: { key: "wrong_email" } },
});

export { yup };
