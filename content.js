// content.js

// Function to modify the page's HTML
function editPageHTML() {
    let username = "glamour_loop999";
    let myFlair = "https://lichess1.org/assets/______2/flair/img/food-drink.ice.webp";
    let silverTrophy = "https://lichess1.org/assets/_GxVjh9/images/trophy/silver-cup-2.png";
    let goldTrophy = "https://lichess1.org/assets/_z7cHiT/images/trophy/Fancy-Gold.png";

    if (window.location.href.indexOf(username) > -1) {
        let trophy1 =
            '<span class="trophy perf top10" title="Horde Top 10!">' +
            `<img src="${silverTrophy}"></span>`;
        let trophy2 =
            '<span class="trophy perf top50" title="Atomic Top 50 player!">' +
            `<img src="${goldTrophy}"></span>`;

        let defaultTrophies = '<div class="trophies"></div>';
        let customTrophies = `<div class="trophies">${trophy1}${trophy2}</div>`;

        document.body.innerHTML = document.body.innerHTML.replace(
            defaultTrophies,
            customTrophies
        );

        let defaultUsername =
            `<span class="online user-link" data-href="/@/${username}">` +
            `<i class="line"></i>${username}` +
            '<a href="/account/profile" title="Set your flair">' +
            `<img class="uflair" src="${myFlair}"></a></span>`;

        let customUsername =
            `<span class="online user-link" data-href="/@/${username}">` +
            '<i class="line"></i>' +
            '<span class="utitle" title="International Master">IM</span>&nbsp;' +
            username +
            '<a href="/account/profile" title="Set your flair">' +
            `<img class="uflair" src="${myFlair}"></a></span>`;

        document.body.innerHTML = document.body.innerHTML.replace(
            defaultUsername,
            customUsername
        );
    }
}

// Function to add the title link to specific user links
function addTitleLinkToUser() {
    let userHref = "/@/glamour_loop999";
    const userLinks = document.querySelectorAll(`a.user-link[href="${userHref}"]`);
    
    userLinks.forEach(userLink => {
        const titleLink = document.createElement('span');
        titleLink.className = 'utitle';
        titleLink.innerHTML = 'IM&nbsp;';
        userLink.insertBefore(titleLink, userLink.firstChild);
    });
}

// Function to add title link to the user's tagline
function addTitleLinkToUserTagline() {
    let username = "Uarekomodo9";
    const userTaglines = document.querySelectorAll('div.user-tagline-component');
    
    userTaglines.forEach(userTagline => {
        const userUsername = userTagline.querySelector('a.user-username-component.user-username-white.user-username-link.user-tagline-username[data-test-element="user-tagline-username"]');
        
        if (userUsername && userUsername.textContent.trim() === username) {
            const titleLink = document.createElement('a');
            titleLink.className = 'user-chess-title-component';
            titleLink.href = '/members/titled-players';
            titleLink.target = '_blank';
            titleLink.setAttribute('data-tooltip-target', '207');
            titleLink.innerHTML = 'IM';
            userTagline.insertBefore(titleLink, userTagline.firstChild);
        }
    });
}

// Call functions to apply modifications
editPageHTML();
addTitleLinkToUser();
addTitleLinkToUserTagline();
