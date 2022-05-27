import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const Signup = lazy(() => import("../pages/signup/Signup"))
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/Reset_Password/ResetPassword"));
const EditProfile = lazy(() => import("../pages/home/EditProfile/EditProfile"));


/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  signup: "/auth/signup",
  forgotPassword: "/auth/forgotpassword",
  resetPassword: "/auth/reset-password",
  editProfile : "/edit"
};

/*
 * Routes: path & lazy loaded component
 */ 
export const routes: any[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.login,
    component: Login,
  },
  {
    path: paths.signup,
    component: Signup,
  },
  {
    path: paths.forgotPassword,
    component: ForgotPassword,
  },
  {
    path: paths.resetPassword,
    component: ResetPassword,
  },
  {
    path: paths.editProfile,
    component: EditProfile,
  },
];
