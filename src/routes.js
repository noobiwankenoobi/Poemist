import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from 'src/components/App';
import HomeView from 'src/containers/HomeView';
import ProfileView from 'src/containers/ProfileView';
import CloseUpPoemView from 'src/containers/CloseUpPoemView';
import WriteView from 'src/containers/WriteView.jsx';
import StyleView from 'src/containers/StyleView.jsx';

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeView} />
      <Route path="/about" component={About} />
      <Route path="/profile" component={ProfileView} />
      <Route path="/new/write" component={WriteView} />
      <Route path="/new/stylize" component={StyleView} />
      <Route path="/edit/stylize/:id" component={StyleView} />
      <Route path="/edit/write/:id" component={WriteView} />
      <Route path="/poem/:id" component={CloseUpPoemView} />
    </Route>
  </Router>
);

//
// <Router history={browserHistory}>
//   <Route path="/" component={App}>
//     <Route path="about" component={About}/>
//     <Route path="users" component={Users}>
//       <Route path="/user/:userId" component={User}/>
//     </Route>
//     <Route path="*" component={NoMatch}/>
//   </Route>
// </Router>
