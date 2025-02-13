import { useState } from "react";

export const useNewData = (initialData: any) => {
  const [newData, setNewData] = useState(initialData);
  return { newData, setNewData };
};
