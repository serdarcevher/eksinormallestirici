const favorileriSirala = () => {
    // Entry listesini favorilere göre sırala
    const list = document.getElementById('entry-item-list');
    if (list) {
        const listItems = Array.from(list.querySelectorAll('li[data-favorite-count]'));
        listItems.sort((a, b) => {
            return parseInt(b.getAttribute('data-favorite-count')) - parseInt(a.getAttribute('data-favorite-count'));
        });
        
        // Mevcut elemanları kaldır
        listItems.forEach(item => item.remove());
        
        // Sıralanmış elemanları ekle
        listItems.forEach(item => list.appendChild(item));
    }

    // Favori ikonlarını ekle
    const favoritesExist = document.querySelector('ul#entry-list li:first-child span.favorite-links') !== null;

    if (!favoritesExist) {
        document.querySelectorAll('ul#entry-list li').forEach(li => {
            const favoriteCount = li.getAttribute('data-favorite-count');
            const rateOptions = li.querySelector('span.rate-options');
            
            if (rateOptions) {
                rateOptions.insertAdjacentHTML(
                    'afterend',
                    `<span class="favorite-links">
                        <a class="icon icon-damla"></a>
                        <a class="favorite-count toggles" style="display: inline;">${favoriteCount}</a>
                    </span>`
                );
            }
        });
    }

    // Başlık listesini entry sayısına göre sırala
    const topicList = document.querySelector('ul.topic-list');
    if (topicList) {
        // Entry sayılarını data attribute olarak ekle
        document.querySelectorAll('ul.topic-list li').forEach(li => {
            const entryCountEl = li.querySelector('a small');
            if (entryCountEl) {
                const entryCount = parseInt(entryCountEl.textContent);
                li.setAttribute('data-entry-count', entryCount);
            }
        });

        // Listeyi sırala
        const topicItems = Array.from(topicList.querySelectorAll('li[data-entry-count]'));
        topicItems.sort((a, b) => {
            return parseInt(b.getAttribute('data-entry-count')) - parseInt(a.getAttribute('data-entry-count'));
        });

        // Mevcut elemanları kaldır ve sıralı şekilde ekle
        topicItems.forEach(item => item.remove());
        topicItems.forEach(item => topicList.appendChild(item));
    }
};

const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sortFavorites") {
        favorileriSirala();
    }
});