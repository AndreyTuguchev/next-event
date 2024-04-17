export function imageLazyLoadObserver (){

    let doObserve;
    let imageObserver;

    if ( typeof window !== "undefined" && typeof document !== "undefined" ) {

        imageObserver = new IntersectionObserver(function( entries ) {
            entries.forEach(function(entry) {

                if ( false === doObserve ){
                    imageObserver.unobserve(entry.target);

                }else if (entry.isIntersecting) {
                    
                    let lazyImage = entry.target ;

                    if ( "IMG" === lazyImage.tagName && null != lazyImage?.dataset?.src && 
                        lazyImage?.dataset?.src.indexOf("//") !== -1 
                        && !lazyImage.classList.contains("lazyloaded") ) {

                        lazyImage.src = lazyImage?.dataset?.src;
                        lazyImage.removeAttribute("data-src")
                        lazyImage.classList.add("lazyloaded");
                    }

                    // when we observe NOT images then we can simply add lazyload class to load background image for this element
                    if ( "IMG" !== lazyImage.tagName ){
                        lazyImage.classList.add("lazyloaded");
                    }
                }
            })
        }, 
        {rootMargin: "100px"}
        );
}

return function imagesObserver( doObserve=true ){

        
        let arr = document.querySelectorAll('img[data-src*="//"]:not(.lazyloaded)')
        arr.forEach(function(v) {
            if ( false === doObserve ){
                imageObserver.unobserve(v);
            }else{
                imageObserver.observe(v);
            }
        });
        
        let bgImgArr = document.querySelectorAll('[style*="background-image"]:not(.lazyloaded)')
        bgImgArr.forEach(function(v) {
            if ( false === doObserve ){
                imageObserver.unobserve(v);
            }else{
                imageObserver.observe(v);
            }
        });

        if ( doObserve ){
            console.log('startObserving elements')
        }else{
            console.log('STOP Observing elements')
        }
    }


}