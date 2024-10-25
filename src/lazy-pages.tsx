import { lazy } from "react";

export const HomeLazy = lazy(() => import("./pages/home/home.page"));
export const SuccessAuthPageLazy = lazy(
  () => import("./pages/success-auth/success-auth.page")
);
export const SignInLazy = lazy(() => import("./pages/signin/signin.page"));
export const SignUpLazy = lazy(() => import("./pages/signup/signup.page"));
export const ErrorPageLazy = lazy(() => import("./pages/error/error.page"));
