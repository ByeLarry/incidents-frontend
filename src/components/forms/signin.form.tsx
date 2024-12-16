import { memo, useEffect, useRef, useState } from "react";
import { ButtonComponent } from "../ui/button/button";
import { FormComponent } from "../ui/form/form";
import { LabelComponent } from "../ui/label/label";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { SignInDto } from "../../dto";
import { ValidationErrorMessages } from "../../helpers";
import { useSignin } from "../../hooks";
import useInput from "../../hooks/input.hook";
import userStore from "../../stores/user.store";
import { InputComponent } from "../ui/input/input";

export const SignInForm: React.FC = memo(() => {
  const navigate = useNavigate();
  const { changeUser } = userStore;
  const email = useInput("", { email: true, minLength: 3, isEmpty: true });
  const password = useInput("", { minLength: 8, isEmpty: true });
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const { mutateSignin, isPendingSignin, signinResponse, isSuccessSignin } =
    useSignin();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (isSuccessSignin && signinResponse) {
      changeUser(signinResponse.data.user);
      navigate("/", { replace: true });
    }
  }, [changeUser, isSuccessSignin, navigate, signinResponse]);

  const onSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const signinData: SignInDto = {
      email: email.value,
      password: password.value,
      recaptchaToken,
    };
    recaptchaRef.current?.reset();
    setRecaptchaToken("");
    mutateSignin(signinData);
  };

  const onReCaptchaChange = (token?: string | null) => {
    setRecaptchaToken(token || "");
  };

  return (
    <>
      <FormComponent title="Вход" onSubmit={onSubmit}>
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
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={onReCaptchaChange}
          ref={recaptchaRef}
        />
        <ButtonComponent
          disabled={
            !email.inputValid ||
            !password.inputValid ||
            isPendingSignin ||
            !recaptchaToken
          }
          type="submit"
        >
          Войти
        </ButtonComponent>
      </FormComponent>
    </>
  );
});
