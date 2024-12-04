export const mapRatingToValue = (rating) => {
  if (rating < 2) return 'newbie';
  if (rating < 4) return 'smart';
  return 'genius';
};