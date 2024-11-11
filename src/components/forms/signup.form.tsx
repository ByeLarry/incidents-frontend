import { memo, useEffect, useRef, useState } from "react";
import { ButtonComponent } from "../ui/button/button";
import { FormComponent } from "../ui/form/form";
import { LabelComponent } from "../ui/label/label";
import { SignUpDto } from "../../libs/dto/signup.dto";
import useInput from "../../libs/hooks/input.hook";
import { useNavigate } from "react-router-dom";
import userStore from "../../stores/user.store";
import { InputComponent } from "../ui/input/input";
import { ValidationErrorMessages } from "../../libs/helpers/validation-error-messages";
import { useSignup } from "../../libs/hooks/signup";
import { UserDto } from "../../libs/dto/user.dto";
import ReCAPTCHA from "react-google-recaptcha";

export const SignUpForm: React.FC = memo(() => {
  const email = useInput("", { email: true, minLength: 3, isEmpty: true });
  const password = useInput("", { minLength: 8, isEmpty: true });
  const name = useInput("", { minLength: 3, isEmpty: true });
  const surname = useInput("", { minLength: 3, isEmpty: true });
  const confirmPassword = useInput("", { minLength: 8, isEmpty: true });
  const navigate = useNavigate();
  const { changeUser } = userStore;
  const { signupResponse, mutateSignup, isPendingSignup, isSuccessSignup } =
    useSignup();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");

  useEffect(() => {
    if (isSuccessSignup && signupResponse) {
      changeUser((signupResponse.data.user as UserDto) || null);
      navigate("/", { replace: true });
    }
  }, [changeUser, isSuccessSignup, navigate, signupResponse]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signupData: SignUpDto = {
      email: email.value,
      password: password.value,
      name: name.value,
      surname: surname.value,
      recaptchaToken,
    };
    recaptchaRef.current?.reset();
    setRecaptchaToken("");
    mutateSignup(signupData);
  };

  const onReCaptchaChange = (token?: string | null) => {
    setRecaptchaToken(token || "");
  };

  return (
    <>
      <FormComponent title="Регистрация" onSubmit={onSubmit}>
        <div className="form__item">
          <InputComponent
            type="email"
            placeholder="Email"
            value={email.value}
            id="email"
            name="email"
            onChange={email.onChange}
            onBlur={email.onBlur}
            required={true}
          />
          {ValidationErrorMessages.getEmailErrorMessage(email) && (
            <LabelComponent htmlFor="email">
              {ValidationErrorMessages.getEmailErrorMessage(email)}
            </LabelComponent>
          )}
        </div>
        <div className="form__item">
          <InputComponent
            type="text"
            placeholder="Имя"
            value={name.value}
            id="name"
            name="name"
            onChange={name.onChange}
            onBlur={name.onBlur}
            required={true}
          />
          {ValidationErrorMessages.getNameErrorMessage(name) && (
            <LabelComponent htmlFor="name">
              {ValidationErrorMessages.getNameErrorMessage(name)}
            </LabelComponent>
          )}
        </div>
        <div className="form__item">
          <InputComponent
            type="text"
            placeholder="Фамилия"
            value={surname.value}
            id="surname"
            name="surname"
            onChange={surname.onChange}
            onBlur={surname.onBlur}
            required={true}
          />
          {ValidationErrorMessages.getSurnameErrorMessage(surname) && (
            <LabelComponent htmlFor="surname">
              {ValidationErrorMessages.getSurnameErrorMessage(surname)}
            </LabelComponent>
          )}
        </div>
        <div className="form__item">
          <InputComponent
            type="password"
            placeholder="Пароль"
            value={password.value}
            id="password"
            name="password"
            onChange={password.onChange}
            onBlur={password.onBlur}
            required={true}
          />
          {ValidationErrorMessages.getPasswordErrorMessage(password) && (
            <LabelComponent htmlFor="password">
              {ValidationErrorMessages.getPasswordErrorMessage(password)}
            </LabelComponent>
          )}
        </div>
        <div className="form__item">
          <InputComponent
            type="password"
            placeholder="Подтверждение пароля"
            value={confirmPassword.value}
            id="confirmPassword"
            name="confirmPassword"
            onChange={confirmPassword.onChange}
            onBlur={confirmPassword.onBlur}
            required={true}
          />
          {ValidationErrorMessages.getConfirmPasswordErrorMessage(
            confirmPassword,
            password
          ) && (
            <LabelComponent htmlFor="confirmPassword">
              {ValidationErrorMessages.getConfirmPasswordErrorMessage(
                confirmPassword,
                password
              )}
            </LabelComponent>
          )}
        </div>
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={onReCaptchaChange}
          ref={recaptchaRef}
        />
        <ButtonComponent
          disabled={
            isPendingSignup ||
            !email.inputValid ||
            !password.inputValid ||
            !confirmPassword.inputValid ||
            !name.inputValid ||
            !surname.inputValid ||
            !recaptchaToken ||
            password.value.trim() !== confirmPassword.value.trim()
          }
          type="submit"
        >
          Войти
        </ButtonComponent>
      </FormComponent>
    </>
  );
});
