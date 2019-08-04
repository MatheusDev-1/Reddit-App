const axios = require("axios")

let posts = []
let ultimo_post = ""
let selecionado = 0
let quantidade_de_posts = document.getElementsByClassName("list-group-item")
let imagem = document.getElementById("img").src

function addEventListeners(){
    document.querySelectorAll('.list-group-item').forEach(element => {
        element.addEventListener('mouseover', function(){
            document.getElementById("img").src = this.getAttribute('data-image')
        })

    })
}

function renderPosts(posts){
    posts.forEach(element => {
        try{if(element.data.post_hint == "image"){
            document.getElementById('posts').innerHTML = document.getElementById('posts').innerHTML  + `
        <li class="list-group-item" data-image=${element.data.preview.images[0].source.url}>
            <img src="icon.png" class="icon" >
            <img src=${element.data.thumbnail} class="thumbnail">
            <span class="badge badge-primary">${element.data.ups}</span>
            <span class="badge badge-secondary">u/${element.data.author}</span>
            <a>${element.data.title}</a>
        </li>`
        }
            }
        catch{}
        
    })

    
    this.addEventListeners();
}

let reddit = "meme"
let input = document.getElementsByClassName("input-reddit")[0].innerText

function executar_main(){    
    reddit = document.getElementsByClassName("input-reddit")[0].value

    function remover_items(){
        console.log("FAZER")
        let quantidade_de_posts = document.getElementsByClassName("list-group-item")[0]
    }

    function colocar_items(){
        axios.get(`https://www.reddit.com/r/${reddit}.json?limit=100&after=${ultimo_post}`)
        .then(response => {
            posts = response.data.data.children;
            after = response.data.data["after"];
            ultimo_post = after
            ultimo_post = after
            ultimo_post = after
            ultimo_post = after
            quantidade_de_posts = document.getElementsByClassName("list-group-item")
            renderPosts(posts)
            console.log(after)
            console.log(quantidade_de_posts[quantidade_de_posts.length-1])
            quantidade_de_posts[quantidade_de_posts.length-1].addEventListener("dblclick", executar_main)
        })
        .catch(error => {
            console.log(error)
        })
        
    }  
    colocar_items()
}

let mudar = document.getElementById("mudar").addEventListener("click", muitas_vezes)

function muitas_vezes(){
    executar_main()
    //setInterval(executar_main, 3000)
}

function key_down(){
    focus(quantidade_de_posts[selecionado])
    quantidade_de_posts++
}

window.addEventListener('keydown', key_down)

