/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserAuthenticator } from "../../interfaces/authenticators/IUserAuthenticator";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../libs/FirebaseLib";
import { IContactMolde } from "../../interfaces/IContactMolde";

export class GoogleAuthenticator implements IUserAuthenticator {
  async getUserInfo(): Promise<IContactMolde> {
    const googleAuthProvider = new GoogleAuthProvider();
    const userInfo = await signInWithPopup(firebaseAuth, googleAuthProvider);

    return {
      name: userInfo.user.displayName,
      username: userInfo.user.email,
      number: userInfo.user.phoneNumber,
      avatarURL: userInfo.user.photoURL,
    } as any as IContactMolde;
  }
}
