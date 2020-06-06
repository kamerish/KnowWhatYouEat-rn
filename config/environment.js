var environments = {
    staging: {
        apiKey: "AIzaSyDx3gWsxYoguZd20R6fcgkXl1zIfpWKNmo",
        authDomain: "knowwhatyoueat-376d3.firebaseapp.com",
        databaseURL: "https://knowwhatyoueat-376d3.firebaseio.com",
        projectId: "knowwhatyoueat-376d3",
        storageBucket: "knowwhatyoueat-376d3.appspot.com",
        messagingSenderId: "166075026276",
        appId: "1:166075026276:web:1331de7b2a54e453840871",
        measurementId: "G-KJYEFFDXM4",
        GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyDx3gWsxYoguZd20R6fcgkXl1zIfpWKNmo"
    }
  };
  function getReleaseChannel() {
    let releaseChannel = Expo.Constants.manifest.releaseChannel;
    if (releaseChannel === undefined) {
      return "staging";
    } else if (releaseChannel === "staging") {
      return "staging";
    } else {
      return "staging";
    }
  }
  function getEnvironment(env) {
    console.log("Release Channel: ", getReleaseChannel());
    return environments[env];
  }
  var Environment = getEnvironment(getReleaseChannel());
  export default Environment;