// Sujeito a mudança

export interface IUserRepository {
  Create(
    name: string,
    username: string,
  ): {
    name: string;
    username: string;
  };
  findContactByUsername(username: string): { name: string; username: string };
}
