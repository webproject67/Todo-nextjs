export default function convertDate(value: string): string {
  return new Date(value).toLocaleDateString('default', {
    hour: 'numeric',
    minute: 'numeric',
  });
}
