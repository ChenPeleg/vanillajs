class mainApp {
    constructor() {

    }
}

window.addEventListener("popstate", event => {
    // Grab the history state id
    //  let stateId = event.state.id;
    // Show clicked id in console (just for fun)
    console.log(window.location.hash);
    // Visually select the clicked button/tab/box
    //select_tab(stateId);
    // Load content for this tab/page
    //load_content(stateId);
});