export default {

    methods: {
        appendImage(src,id){
            let img = new Image();
            img.src = src;
            img.alt = 'Promotional image';
            let target = document.getElementById(id);
            target.appendChild(img);
        }
    }
}