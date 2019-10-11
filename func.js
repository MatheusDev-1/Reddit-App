const axios = require("axios")

let posts = []
let ultimo_post = ""
let after = ""
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

async function renderPosts(posts){
    posts.forEach(element => {
        try{
            if(element.data.post_hint == "image"){
            document.getElementById('posts').innerHTML = document.getElementById('posts').innerHTML  + `
        <li class="list-group-item" data-image=${element.data.preview.images[0].source.url}>
            <img src="icon.png" class="icon" >
            <img src=${element.data.thumbnail} class="thumbnail">
            <span class="badge badge-primary">${element.data.ups}</span>
            <span class="badge badge-secondarynm">u/${element.data.author}</span>
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

async function remover_items(){

    console.log(`Quantidade de Posts: ${quantidade_de_posts.length}`)
    console.log(`After: ${after}`)
    console.log(`After: ${ultimo_post}`)


    while(quantidade_de_posts.length != 0){
        quantidade_de_posts[0].remove()
    }   
} 

async function executar_main(){  
    imagem = document.getElementById("img")
    imagem.src = "load.gif"

    reddit = await document.getElementsByClassName("input-reddit")[0].value

    async function colocar_items(){
        await axios.get(`https://www.reddit.com/r/${reddit}.json?limit=100&after=${ultimo_post}`)
        .then(async response => {
            posts = response.data.data.children;
            after = response.data.data["after"];
            ultimo_post = after
            quantidade_de_posts = document.getElementsByClassName("list-group-item")

            renderPosts(posts)

            try{
                if(quantidade_de_posts.length != 0){
                    quantidade_de_posts[quantidade_de_posts.length-1].addEventListener("dblclick", colocar_items)
                }
            }
            catch{
                console.log("Não foi possivel adicionar EventListener")
            }
        })
        .catch(error => {
            console.log(error)
        })
        console.log("Colocou")
        if(quantidade_de_posts.length >= 1){
            imagem.src = ""
        }
    }
    
    //await remover_items()
    await remover_items()
    if(quantidade_de_posts.length == 0){
        await colocar_items()
        await colocar_items()
    }
    
    
}

let mudar = document.getElementById("mudar").addEventListener("click", executar_main)


