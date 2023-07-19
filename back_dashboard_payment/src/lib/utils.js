
export const getTagClass = function (tag) {
  switch (tag) {
    case 'success':
      return {
        class: 'text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full',
        title: 'Success'
      };
    case 'processing':
      return {
        class: 'text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700 rounded-full',
        title: 'En traitement'
      };
    case 'error':
      return {
        class: 'text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full',
        title: 'Échoué'
      };
    default:
      return {
        class: 'text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full',
        title: 'En traitement'
      };
  }
}