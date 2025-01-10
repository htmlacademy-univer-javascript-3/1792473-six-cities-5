export const formatReviewDate = (date: string) => (new Date(date)).toLocaleDateString(undefined, {month: 'long', year: 'numeric'});
