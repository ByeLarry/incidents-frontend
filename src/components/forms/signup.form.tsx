import { memo, useEffect } from "react";
import { ButtonComponent } from "../ui/button/button";
import { FormComponent } from "../ui/form/form";
import { LabelComponent } from "../ui/label/label";
import csrfStore from "../../stores/csrf.store";
import { SignUpDto } from "../../dto/signup.dto";
import { User } from "../../interfaces/user";
import useInput from "../../hooks/useInput.hook";
import { useNavigate } from "react-router-dom";
import userStore from "../../stores/user.store";
import { InputComponent } from "../ui/input/input";
import { ValidationErrorMessages } from "../../utils/validationErrorMessages";
import { useSignup } from "../../hooks/useSignup";

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

  useEffect(() => {
    if (isSuccessSignup && signupResponse) {
      changeUser(signupResponse.data as User);
      csrfStore.changeCsrf(signupResponse.data.csrf_token);
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
    };
    mutateSignup(signupData);
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
        <ButtonComponent
          disabled={
            isPendingSignup ||
            !email.inputValid ||
            !password.inputValid ||
            !confirmPassword.inputValid ||
            !name.inputValid ||
            !surname.inputValid ||
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
