/**
 * 11/04/2023
 * Penguji tambahan sesuai
 * kriteria Submission Bookshelf API
 */

const {
  validBookName,
  validReadPage,
} = require('../src/helper');

const {expect, test} = require('@jest/globals');

describe('empty book name check', () => {
  test('it should return failed messages at POST', () => {
    const result = {
      ok: false,
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    };
    expect(validBookName('POST')).toMatchObject(result);
  });

  test('it should return failed messages at PUT', () => {
    const result = {
      ok: false,
      code: 400,
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    };
    expect(validBookName('PUT')).toMatchObject(result);
  });

  test('it should return ok at POST', () => {
    const bookName = 'Arabian Nights';
    expect(validBookName('POST', bookName)).toHaveProperty('ok', true);
  });

  test('it should return ok at PUT', () => {
    const bookName = 'Arabian Nights';
    expect(validBookName('PUT', bookName)).toHaveProperty('ok', true);
  });
});

describe('page read vs page count comparison', () => {
  test('it should fails when page read > page count at POST', () => {
    const msg1 = 'Gagal menambahkan buku. ';
    const msg2 = 'readPage tidak boleh lebih besar dari pageCount';
    const result = {
      ok: false,
      code: 400,
      status: 'fail',
      message: msg1 + msg2,
    };
    expect(validReadPage('POST', 1001, 1000)).toMatchObject(result);
  });

  test('it should fails when page read > page count at PUT', () => {
    const msg1 = 'Gagal memperbarui buku. ';
    const msg2 = 'readPage tidak boleh lebih besar dari pageCount';
    const result = {
      ok: false,
      code: 400,
      status: 'fail',
      message: msg1 + msg2,
    };
    expect(validReadPage('PUT', 1001, 1000)).toMatchObject(result);
  });

  test('it should return ok when page read = page count at POST', () => {
    expect(validReadPage('POST', 1000, 1000)).toHaveProperty('ok', true);
  });

  test('it should return ok when page read < page count at POST', () => {
    expect(validReadPage('POST', 725, 1000)).toHaveProperty('ok', true);
  });

  test('it should return ok when page read = page count at PUT', () => {
    expect(validReadPage('PUT', 1000, 1000)).toHaveProperty('ok', true);
  });

  test('it should return ok when page read < page count at PUT', () => {
    expect(validReadPage('PUT', 725, 1000)).toHaveProperty('ok', true);
  });
});
