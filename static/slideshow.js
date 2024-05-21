// Slideshow controls
document.querySelectorAll(".slideshow").forEach(s => {

    const view = s.querySelector(".view");
    const length = view.querySelectorAll("img").length;

    s.querySelectorAll(".controls a").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            let target = view.dataset.current;

            // Determine the target slide
            switch (event.target.getAttribute("href")) {
                case "#prev": target--; break;
                case "#next": target++; break;
                default:      target = event.target.getAttribute("href").slice(1);
            }

            // Loop around if out of bounds
            if (target < 0)       target = length - 1;
            if (target >= length) target = 0;

            // Update variables and UI state
            s.querySelectorAll(".controls a").forEach(a => delete a.dataset.active);
            view.dataset.current = target;
            s.querySelectorAll(`.controls a[href='#${target}']`).forEach(a => a.dataset.active = "");

            // Scroll to the target slide
            view.scrollTo({ 
                behavior: "smooth",
                left: view.querySelector(`#slide-${target}`).offsetLeft,
            });
        });
    });

});
