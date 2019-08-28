(function() {
  const state = {
    id: 'main',
    user: 'Root User',
    comment: 'main root Post',
    children: [
      {
        id: '123abc',
        user: 'bhavan',
        comment: 'hey there first level comment 1',
        children: [
          {
            id: '456a',
            user: 'bhavan',
            comment: 'hey there second level comment 1',
            children: [
              {
                id: 'xyz1',
                user: 'akhya',
                comment: 'hey there third level comment 1',
                children: []
              },
              {
                id: 'xyz2',
                user: 'prakhar',
                comment: 'hey there third level comment 2',
                children: []
              }
            ]
          },
          {
            id: '456b',
            user: 'pallavi',
            comment: 'hey there second level comment 2',
            children: []
          },
          {
            id: '456c',
            user: 'pallavi',
            comment: 'hey there second level comment 3',
            children: []
          }
        ]
      },
      {
        id: '123abd',
        user: 'bhavan',
        comment: 'hey there first level comment 2',
        children: []
      },
      {
        id: '123abe',
        user: 'bhavan',
        comment: 'hey there first level comment 3',
        children: []
      },
      {
        id: '123abf',
        user: 'bhavan',
        comment: 'hey there first level comment 4',
        children: []
      }
    ]
  };
  let comments = [];
  const flatten = (data, author, level) => {
    data.forEach(comment => {
      comments.push({
        id: comment.id,
        user: comment.user,
        comment: comment.comment,
        author: author,
        level: level
      });
      if (comment.children.length) {
        flatten(comment.children, author + '__' + comment.id, level + 1);
      }
    });
  };
  const renderComment = comment => {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper level-' + comment.level;
    wrapper.style.marginLeft = (comment.level - 1) * 30 + 'px';
    wrapper.style.maxWidth = 800 - comment.level * 30 + 'px';
    const user = document.createElement('h4');
    const comm = document.createElement('p');
    const inp = document.createElement('input');
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerHTML = comment.user[0];
    inp.className = 'comment-input';
    inp.setAttribute('author', comment.author + '__' + comment.id);
    inp.placeholder = 'enter your comment here';
    user.innerHTML = comment.user;
    comm.innerHTML = comment.comment;
    wrapper.append(avatar);
    wrapper.append(user);
    wrapper.append(comm);
    wrapper.append(inp);
    return wrapper;
  };
  const app = document.getElementById('app');
  const renderComments = comments => {
    const html = comments.map(comment => renderComment(comment));
    html.forEach(com => app.append(com));
  };
  const insetComment = (author, value) => {
    const comment = {
      id: (Math.random() * 10).toFixed(1),
      comment: value,
      children: [],
      user: 'Mahesh',
      author: author
    };
    const ids = author.split('__');
    let idx = 0;
    let current = state;
    while (idx < ids.length - 1) {
      current = current.children.find(comm => comm.id === ids[idx + 1]);
      idx++;
    }
    current.children = [...current.children, { ...comment }];
  };
  const render = () => {
    comments = [];
    flatten(state.children, state.id, 1);
    renderComments(comments);
  };
  const attachEvents = () => {
    app.addEventListener('keyup', e => {
      if (e.target.nodeName === 'INPUT' && e.which === 13) {
        app.innerHTML = '';
        const author = e.target.getAttribute('author');
        insetComment(author, e.target.value);
        render();
      }
    });
  };
  render();
  attachEvents();
})();
