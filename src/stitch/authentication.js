import { 
  AnonymousCredential,
  FacebookRedirectCredential, 
  GoogleRedirectCredential,
 } from "mongodb-stitch-browser-sdk";
import { app } from "./app.js";

export function addAuthenticationListener(listener) {
  app.auth.addAuthListener(listener);
}
export function removeAuthenticationListener(listener) {
  app.auth.removeAuthListener(listener);
}

export async function loginFacebook() {
  return await app.auth.loginWithRedirect(new FacebookRedirectCredential());
}

export function loginAnonymous() {
  // Allow users to log in anonymously
  const credential = new AnonymousCredential();
  return app.auth.loginWithCredential(credential);
}

export async function loginGoogle() { 
  return await app.auth.loginWithRedirect(new GoogleRedirectCredential());
}

export function handleOAuthRedirects() {
  if (app.auth.hasRedirectResult()) {
    return app.auth.handleRedirectResult();
  }
};

export function hasLoggedInUser() {
  // Check if there is currently a logged in user
  return app.auth.isLoggedIn;
}

export function getCurrentUser() {
  // Return the user object of the currently logged in user
  return app.auth.isLoggedIn ? app.auth.user : null;
}

export function logoutCurrentUser() {
  // Logout the currently logged in user
  const user = getCurrentUser();
  return app.auth.logoutUserWithId(user.id);
}

