import { useEffect, useState } from "react";
import { storageService } from "../services/storageService";

export const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return storageService.get(key, initialValue);
  });

  useEffect(() => {
    storageService.set(key, value);
  }, [key, value]);

  return [value, setValue];
};
