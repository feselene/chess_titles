// === GLOBAL CONSTANTS ===
const lichessUsername = "glamour_loop999";
const chessDotComUsername = "LEAFSTORMSWAYSWITCH";
const titleShort = "IM";
const titleFull = "International Master";

// === LICHESS PATCHING ===
function patchLichess() {
    const username = "glamour_loop999";
    const titleText = "International Master";
    const titleShort = "IM";
    const silverTrophy = "https://lichess1.org/assets/_GxVjh9/images/trophy/silver-cup-2.png";
    const goldTrophy = "https://lichess1.org/assets/_z7cHiT/images/trophy/Fancy-Gold.png";

    const titleHTML = `<span class="utitle" title="${titleText}">${titleShort}</span>&nbsp;`;

    // 1. Inject title into profile header
    document.querySelectorAll('span.online.user-link').forEach(span => {
        const href = span.getAttribute('data-href');
        if (href && href.includes(`/@/${username}`) && !span.querySelector('.utitle')) {
            const innerHTML = span.innerHTML;
            span.innerHTML = `<i class="line"></i>${titleHTML}${username}` + innerHTML.split(username)[1];
        }
    });

    // 2. Inject title next to any user links
    document.querySelectorAll(`a.user-link[href="/@/${username}"]`).forEach(link => {
        if (!link.querySelector('.utitle')) {
            const titleSpan = document.createElement('span');
            titleSpan.className = 'utitle';
            titleSpan.title = titleText;
            titleSpan.innerText = titleShort;
            link.insertBefore(titleSpan, link.firstChild);
            link.insertBefore(document.createTextNode('\u00A0'), titleSpan.nextSibling);
        }
    });

    // 3. Inject trophies if profile has an empty <div class="trophies">
    document.querySelectorAll('div.trophies').forEach(trophiesDiv => {
        const parent = trophiesDiv.closest('div.user-show-box') || trophiesDiv.closest('main');
        if (parent && window.location.href.includes(username) && trophiesDiv.innerHTML.trim() === "") {
            const trophy1 =
                `<span class="trophy perf top10" title="Horde Top 10!">` +
                `<img src="${silverTrophy}"></span>`;
            const trophy2 =
                `<span class="trophy perf top50" title="Atomic Top 50 player!">` +
                `<img src="${goldTrophy}"></span>`;
            trophiesDiv.innerHTML = trophy1 + trophy2;
        }
    });
}

// === CHESS.COM PATCHING ===
function patchChessDotCom() {
    const targetUsername = "LEAFSTORMSWAYSWITCH";

    const observer = new MutationObserver(() => {
        const usernameEls = document.querySelectorAll('a[data-test-element="user-tagline-username"]');

        usernameEls.forEach((el) => {
            const name = el.textContent?.trim();
            const tagline = el.closest('.user-tagline-component');
            if (!tagline) return;

            // Remove any IM we previously injected if it's next to the wrong username
            tagline.querySelectorAll('[data-im-by="me"]').forEach(imTag => {
                const usernameEl = imTag.closest('.user-tagline-component')?.querySelector('a[data-test-element="user-tagline-username"]');
                const confirmedName = usernameEl?.textContent?.trim();
                if (confirmedName !== targetUsername) {
                    imTag.remove();
                }
            });

            if (name !== targetUsername) return;

            // Skip if a real title is already present
            const hasRealTitle = [...tagline.querySelectorAll('.user-chess-title-component')]
                .some(title => title.getAttribute('data-im-by') !== 'me' && title.textContent.trim() !== "");
            if (hasRealTitle) return;

            // Skip if we've already injected our IM
            const alreadyHasOurIM = tagline.querySelector('[data-im-by="me"]');
            if (alreadyHasOurIM) return;

            // Inject the IM title
            const title = document.createElement('a');
            title.className = 'user-chess-title-component';
            title.href = '/members/titled-players';
            title.target = '_blank';
            title.innerText = ' IM';
            title.setAttribute('data-im-by', 'me');

            tagline.insertBefore(title, el);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}


// === DOMAIN ROUTING ===
if (window.location.hostname.includes("lichess.org")) {
    patchLichess();
} else if (window.location.hostname.includes("chess.com")) {
    patchChessDotCom();
}

