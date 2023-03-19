export const getCurrentDate = (date: string | number) => {
  const dasboardDate = new Date(date);

  const day = dasboardDate.getDate();
  const suffix =
    day >= 11 && day <= 13 ? "th" : ["st", "nd", "rd"][(day % 10) - 1] || "th";
  const formattedDate = `${day}${suffix} ${dasboardDate.toLocaleString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  )}`;

  return formattedDate;
};
