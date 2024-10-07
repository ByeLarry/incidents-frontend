import { memo, useEffect } from "react";
import { ButtonComponent } from "../ui/button/button";
import { FormComponent } from "../ui/form/form";
import { LabelComponent } from "../ui/label/label";
import useInput from "../../libs/hooks/input.hook";
import { useNavigate } from "react-router-dom";
import userStore from "../../stores/user.store";
import { InputComponent } from "../ui/input/input";
import { SignInDto } from "../../libs/dto/signin.dto";
import { ValidationErrorMessages } from "../../libs/helpers/validation-error-messages";
import { useSignin } from "../../libs/hooks/signin";

export const SignInForm: React.FC = memo(() => {
  const navigate = useNavigate();
  const { changeUser } = userStore;
  const email = useInput("", { email: true, minLength: 3, isEmpty: true });
  const password = useInput("", { minLength: 8, isEmpty: true });
  const { mutateSignin, isPendingSignin, signinResponse, isSuccessSignin } =
    useSignin();

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
    };
    mutateSignin(signinData);
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
        <ButtonComponent
          disabled={
            !email.inputValid || !password.inputValid || isPendingSignin
          }
          type="submit"
        >
          Войти
        </ButtonComponent>
      </FormComponent>
    </>
  );
});
