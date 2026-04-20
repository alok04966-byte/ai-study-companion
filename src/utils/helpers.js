export const formatDate = (dateString) => {
  if (!dateString) return "No date";
  return dateString;
};

export const normalizeText = (value) => (value || "").trim().toLowerCase();
