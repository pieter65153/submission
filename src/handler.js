/**
 * 11/04/2023
 * Penanganan permintaan dan respon pengguna
 */

const {nanoid} = require('nanoid');
const bookDetails = require('./bookshelf');
const {
  validBookName,
  validReadPage,
} = require('./helper');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const checkBookName = validBookName('POST', name);
  if (!checkBookName.ok) {
    const response = h.response({
      status: checkBookName.status,
      message: checkBookName.message,
    });
    response.code(checkBookName.code);
    return response;
  }

  const checkReadpage = validReadPage('POST', readPage, pageCount);
  if (!checkReadpage.ok) {
    const response = h.response({
      status: checkReadpage.status,
      message: checkReadpage.message,
    });
    response.code(checkReadpage.code);
    return response;
  }

  const id = nanoid(32);
  const finished = pageCount === readPage ? true: false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBookDetails = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  bookDetails.push(newBookDetails);

  const isSuccess = bookDetails
      .filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getBooksHandler = (request, h) => {
  const params = JSON.parse(JSON.stringify(request.query));
  const paramsLength = Object.keys(params).length;

  if (paramsLength == 1 && params.reading) {
    const boolRead = params.reading == 1 ? true: false;
    const myBooks = bookDetails.filter((n) => n.reading == boolRead);
    const books = myBooks.map(
        ({id, name, publisher}) => ({id, name, publisher}),
    );
    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  }

  if (paramsLength == 1 && params.finished) {
    const boolRead = params.finished == 1 ? true: false;
    const myBooks = bookDetails.filter((n) => n.finished == boolRead);
    const books = myBooks.map(
        ({id, name, publisher}) => ({id, name, publisher}),
    );
    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  }

  if (paramsLength == 1 && params.name) {
    const term = params.name.toLowerCase();
    const myBooks = bookDetails.filter(function(n) {
      return n.name.toLowerCase().includes(term);
    });
    const books = myBooks.map(
        ({id, name, publisher}) => ({id, name, publisher}),
    );
    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  }

  const books = bookDetails.map(
      ({id, name, publisher}) => ({id, name, publisher}),
  );
  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const book = bookDetails.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  };

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const {bookId} = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const checkBookName = validBookName('PUT', name);
  if (!checkBookName.ok) {
    const response = h.response({
      status: checkBookName.status,
      message: checkBookName.message,
    });
    response.code(checkBookName.code);
    return response;
  }

  const checkReadpage = validReadPage('PUT', readPage, pageCount);
  if (!checkReadpage.ok) {
    const response = h.response({
      status: checkReadpage.status,
      message: checkReadpage.message,
    });
    response.code(checkReadpage.code);
    return response;
  }

  const finished = pageCount === readPage ? true: false;
  const updatedAt = new Date().toISOString();
  const indexDetails = bookDetails.findIndex((book) => book.id === bookId);

  if (indexDetails !== -1) {
    bookDetails[indexDetails] = {
      ...bookDetails[indexDetails],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const {bookId} = request.params;

  const indexDetails = bookDetails.findIndex((book) => book.id === bookId);

  if (indexDetails !== -1) {
    bookDetails.splice(indexDetails, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
