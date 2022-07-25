import { ICreateNewContact } from "../usecases/CreateNewContact";

export interface ILoginPageProps {
  createNewContactUsecase: ICreateNewContact;
}
