import { InputHookReturn } from "../interfaces/inputHookReturn";

export class ValidationErrorMessages {
  static getTitleErrorMessage = (title: InputHookReturn): string | null => {
    if (title.isDirty) {
      if (title.isEmpty) {
        return "Заголовок не введён";
      } else if (title.minLengthError) {
        return "Длина должна быть больше 3 символов";
      } else if (title.maxLengthError) {
        return "Длина должна быть меньше 100 символов";
      }
    }
    return null;
  };

  static getDescriptionErrorMessage = (
    description: InputHookReturn
  ): string | null => {
    if (description.isDirty) {
      if (description.maxLengthError) {
        return "Длина должна быть меньше 200 символов";
      }
    }
    return null;
  };

  static getEmailErrorMessage = (email: InputHookReturn): string | null => {
    if (email.isDirty) {
      if (email.isEmpty) {
        return "Email не введён";
      } else if (email.emailError) {
        return "Email некорректный";
      } else if (email.minLengthError) {
        return "Длина должна быть больше 3 символов";
      }
    }
    return null;
  };

  static getPasswordErrorMessage = (
    password: InputHookReturn
  ): string | null => {
    if (password.isDirty) {
      if (password.isEmpty) {
        return "Пароль не введён";
      } else if (password.minLengthError) {
        return "Длина должна быть больше 8 символов";
      }
    }
    return null;
  };

  static getConfirmPasswordErrorMessage = (
    confirmPassword: InputHookReturn,
    password: InputHookReturn
  ): string | null => {
    if (confirmPassword.isDirty) {
      if (confirmPassword.isEmpty) {
        return "Подтверждение пароля не введено";
      } else if (
        confirmPassword.isDirty &&
        password.value.trim() !== confirmPassword.value.trim()
      ) {
        return "Пароли не совпадают";
      }
    }
    return null;
  };

  static getNameErrorMessage = (name: InputHookReturn): string | null => {
    if (name.isDirty) {
      if (name.isEmpty) {
        return "Имя не введено";
      } else if (name.minLengthError) {
        return "Длина должна быть больше 3 символов";
      }
    }
    return null;
  };

  static getSurnameErrorMessage = (surname: InputHookReturn): string | null => {
    if (surname.isDirty) {
      if (surname.isEmpty) {
        return "Фамилия не введена";
      } else if (surname.minLengthError) {
        return "Длина должна быть больше 3 символов";
      }
    }
    return null;
  };
}
