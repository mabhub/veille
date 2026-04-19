/**
 * Single formatter reused on the index and on every post page so
 * the French "dd month yyyy" rendering stays consistent.
 */
export const DATE_FORMATTER = new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});
