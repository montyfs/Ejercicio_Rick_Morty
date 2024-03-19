import { LitElement, html, css } from 'lit-element';
import './get_data';

var span = document.getElementsByClassName("cerrar")[0];
var modal = document.getElementById("ventanaModal");
span.addEventListener("click",function() {
    modal.style.display = "none";
  });

class MiTabla extends LitElement {

    static get properties() {
        return {
            contenido: {type: Array}
        };
    }

    static get styles(){
        return css`
            :host{
                display:block;
            }
            .default{
                width: 50%;
            }
            th, td {
                width: 25%;
                border: 1px solid #000;
                padding: 0.3em;
            }
        `;
    }

    constructor() {
        super();
        this.contenido = [];
        this.addEventListener('ApiData', (e) => {this._dataFormat(e.detail.data)});
    }

    _dataFormat(data){
        let personajes = [];
        data["results"].forEach((element) => {
            personajes.push({
                name: element.name,
                img: element.image,
                gender: element.gender,
                status: element.status 
            })
        });
        this.contenido = personajes;
    }

    render() {  
        return html`
            <div>
                <obtener-datos url="https://rickandmortyapi.com/api/character" metodo="GET"></obtener-datos>
                <table class="default">
                    <tr>
                    <th>Nombre</th>
                    <th>Estatus</th>
                    <th>Genero</th>
                    <th>Imagen</th>
                    </tr>
                    ${this.contenido.map(elemento => html`
                    <tr>
                    <td>${elemento.name}</td>
                    <td>${elemento.status}</td>
                    <td>${elemento.gender}</td>
                    <td style="text-align: center;"><button @click="${{handleEvent: () => this.abrirModal(elemento.img)}}">Ver imagen</button></td>
                    </tr>
                    `)}
                </table>
            </div>
        `;
    }

    abrirModal(imagen) {
        
        let img = document.getElementById("imagen");
        img.src = imagen;
    
        let modal = document.getElementById("ventanaModal");
        modal.style.display = "block";  
    }

}

customElements.define('mi-tabla', MiTabla)



