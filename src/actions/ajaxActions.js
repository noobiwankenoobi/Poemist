const baseUrl = window.location.protocol + '//' + window.location.host;
const $ = window.$;

function recievePassage(dispatch, book) {
  dispatch({
    type: 'PASSAGE_RECEIVED',
    passage: book,
  });
}

function recievePoem(dispatch, poem) {
  dispatch({
    type: 'POEM_RECEIVED',
    poem,
  });
}

function recievePoems(dispatch, poems) {
  dispatch({
    type: 'POEMS_RECEIVED',
    poems,
  });
}

function likeToggled(dispatch, book) {
  dispatch({
    type: 'LIKE_TOGGLED',
    like: book,
  });
}

function recieveUser(dispatch, returnedUser) {
  if (returnedUser.username) {
    dispatch({
      type: 'CURRENT_USER_RECEIVED',
      user: returnedUser,
    });
  } else {
    dispatch({
      type: 'LOGIN_ERROR_RECEIVED',
      error: returnedUser,
    });
  }
}

module.exports = {
  getNewPassage: () => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/books/new`,
        success: recievePassage.bind(null, dispatch),
      });
    }
  ),
  getPoem: id => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/poems/${id}`,
        success: recievePoem.bind(null, dispatch),
      });
    }
  ),
  getIndexPoems: () => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/poems/`,
        success: recievePoems.bind(null, dispatch),
      });
    }
  ),
  loginUser: user => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/users/login`,
        method: 'POST',
        data: { user },
        success: recieveUser.bind(null, dispatch),
      });
    }
  ),
  signUpUser: user => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/users/`,
        method: 'POST',
        data: { user },
        success: recieveUser.bind(null, dispatch),
      });
    }
  ),
  toggleLike: like => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/likes`,
        method: 'POST',
        data: { like },
        success: likeToggled.bind(null, dispatch),
      });
    }
  ),
};