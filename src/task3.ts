// Задача 3. Брендированный тип и функция-сторож

export type UserId = string & { readonly brand: unique symbol };

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUserId(value: unknown): value is UserId {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

interface UserProfile {
  id: UserId;
  name: string;
  email: string;
}

function getUserProfile(id: UserId): UserProfile {
  return { id, name: "Демо-пользователь", email: "demo@example.com" };
}

function handleUnknownInput(input: unknown): void {
  if (isUserId(input)) {
    console.log("Профиль:", getUserProfile(input));
  } else {
    console.log("Не является UserId:", input);
  }
}

handleUnknownInput("123e4567-e89b-12d3-a456-426614174000");
handleUnknownInput("not-a-uuid");
handleUnknownInput(12345);

