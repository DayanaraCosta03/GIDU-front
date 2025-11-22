export interface UserResponse {
  token: string;
  dni: string;
  name: string;
  role: string;
}

export const useUseStore = defineStore("user", () => {
  const user = ref<UserResponse | null | "loading">("loading");

  const changeUser = (newUser: UserResponse | null | "loading") => {
    user.value = newUser;
  };

  return {
    user,
    changeUser,
  };
});
