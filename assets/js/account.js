var config = {
  apiKey: "AIzaSyBDyLpzCS8pimBAzwnGwZa0WWoUlf3BQ2k",
  authDomain: "group-project-1-c2e2d.firebaseapp.com",
  databaseURL: "https://group-project-1-c2e2d.firebaseio.com",
  projectId: "group-project-1-c2e2d",
  storageBucket: "group-project-1-c2e2d.appspot.com",
  messagingSenderId: "355709778913"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    var token = result.credential.accessToken;
  }
  var user = result.user;

}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});


var uiConfig = {
  callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType;
        return true;
      },
      signInFailure: function(error) {
        return handleUIError(error);
      },
      uiShown: function() {
        
        document.getElementById('loader').style.display = 'none';
      }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    queryParameterForWidgetMode: 'mode',
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',

  signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      
      {provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
       requireDisplayName: true
        },
      
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],

  tosUrl: '<your-tos-url>',

  privacyPolicyUrl: function () {
      window.location.assign('<your-privacy-policy-url>');
  }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', uiConfig);

if (ui.isPendingRedirect()) {
  ui.start('#firebaseui-auth-container', uiConfig);
}

ui.start('#firebaseui-auth-container', {
  signInOptions: [
      {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,

          authMethod: 'https://accounts.google.com',

          clientId: 'xxxxxxxxxxxxxxxxx.apps.googleusercontent.com'
      },

      {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,

          signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,

          forceSameDevice: false,

          emailLinkSignIn: function () {
              return {

                  url: 'https://www.example.com/completeSignIn?showPromo=1234',

                  dynamicLinkDomain: 'example.page.link',

                  handleCodeInApp: true,

                  iOS: {
                      bundleId: 'com.example.ios'
                  },

                  android: {
                      packageName: 'com.example.android',
                      installApp: true,
                      minimumVersion: '12'
                  }
              };
          
          }
      },
      { provider: firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID }
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
});

anonymousUser.linkWithCredential(permanentCredential);

var data = null;
var anonymousUser = firebase.auth().currentUser;
ui.start('#firebaseui-auth-container', {
autoUpgradeAnonymousUsers: true,
signInSuccessUrl: 'index.html',
signInOptions: [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
],
callbacks: {
  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    return true;
  },
  signInFailure: function(error) {
    if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
      return Promise.resolve();
    }
    var cred = error.credential;
    var app = firebase.app();
    return app.database().ref('users/' + firebase.auth().currentUser.uid)
        .once('value')
        .then(function(snapshot) {
          data = snapshot.val();
          return firebase.auth().signInWithCredential(cred);
        })
        .then(function(user) {
          return app.database().ref('users/' + user.uid).set(data);
        })
        .then(function() {
          return anonymousUser.delete();
        }).then(function() {
          data = null;
          window.location.assign('index.html');
        });

  }
}
});


ui.disableAutoSignIn();