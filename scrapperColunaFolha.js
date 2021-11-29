// ==UserScript==
// @name        Folha de Sao Paulo Coluna Scrapper
// @namespace   Violentmonkey Scripts
// @match       https://www1.folha.uol.com.br/colunas/*
// @grant       none
// @version     1.0
// @author      ggarber
// @description Scraps news article before pay wall blocks it
// ==/UserScript==

const banned_classes = [
     'c-subscribe-ads__description',
     'gallery-widget-carousel__info-description',
     'c-tools-share__info'
]

const paragraphs = Array.from(document.querySelectorAll('.c-news__content p'))
const article = paragraphs.reduce((acc, curr) => { 
     const currClasses = Array.from(curr.classList)
     if(currClasses.some(currClass => banned_classes.includes(currClass))){
          return acc += ''
     }     
     return acc += curr.textContent
}, 0)

document.querySelector('body').innerHTML = article
