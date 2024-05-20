document.addEventListener('DOMContentLoaded', () => {

    const pages = document.querySelectorAll('a.page');

    // Maintains a set of all selected option for each category
    let query = [];
    let filter = {
        'category': new Set(),
        'tier': new Set(),
        'class': new Set(),
        'nation': new Set()
    };
    document.querySelectorAll('.option').forEach(o => {
        o.addEventListener('click', e => {
            set = filter[e.target.closest('section').id]
            if( set.has(e.target.title) ){
                set.delete(e.target.title);
                e.target.removeAttribute('checked');
            } else {
                set.add(e.target.title);
                e.target.setAttribute('checked', '');
            }
            updateFilter(pages, filter, query);
        });
    });
    
    // Extract 'tags' from search and add to query
    const search = document.getElementById('search');
    search.addEventListener('input', () => {
        query = search.value.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(' ');
        updateFilter(pages, filter, query);
    });
});

function updateFilter(pages, filter, query){
    pages.forEach(page => {
        let condition = [];

        // Test each property of filter query category sets
        // TODO: this is spaghetti
        for(const key of Object.keys(filter)){
            let terms = [...filter[key]];
            // If category actually has a desired filter, append boolean
            // True if at least one term in category is found in page's data attribute
            if(terms.length > 0){
                condition.push( terms.some(term => page.getAttribute('data-' + key).includes(term.toUpperCase())) );
            }
        }

        // Account for custom search query
        if(query && query.length > 0){
            condition.push( query.every(term => page.dataset.tags.normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(term)) )
        }

        // All categories that actually have a desired filter must match page to be displayed
        page.style.display = condition.every(b => b) ? 'inline-flex' : 'none';
    });
}


