/**
 * 11/04/2023
 * Pembantu tambahan sesuai
 * kriteria Submission Bookshelf API
 */

/**
 * Validate book name is empty
 * @param {string} method
 * @param {string} name
 * @return {Object} The evaluation of book name content
 */
function validBookName(method, name) {
  if (!name) {
    const msgBase = 'Mohon isi nama buku';
    const msgPOST = 'Gagal menambahkan buku. ' + msgBase;
    const msgPUT = 'Gagal memperbarui buku. ' + msgBase;
    return {
      ok: false,
      code: 400,
      status: 'fail',
      message: method === 'POST'? msgPOST: msgPUT,
    };
  }
  return {ok: true};
}

/**
 * Validate if read page is larger than page count
 * @param {string} method
 * @param {int} readPage
 * @param {int} pageCount
 * @return {Object} The evaluation of page comparison
 */
function validReadPage(method, readPage, pageCount) {
  if (readPage > pageCount) {
    const msgBase = 'readPage tidak boleh lebih besar dari pageCount';
    const msgPOST = 'Gagal menambahkan buku. ' + msgBase;
    const msgPUT = 'Gagal memperbarui buku. ' + msgBase;
    return {
      ok: false,
      code: 400,
      status: 'fail',
      message: method === 'POST'? msgPOST: msgPUT,
    };
  }
  return {ok: true};
}

/**
 * Log for array process results
 * @param {*} array
 * @param {*} marker
 */
function logArrayOfObjects(array, marker) {
  console.log(`##### Start of ${marker}#####`);
  console.log(array);
  console.log(`##### End of ${marker}#####`);
}

module.exports = {
  validBookName,
  validReadPage,
  logArrayOfObjects,
};
