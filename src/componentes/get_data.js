import { LitElement } from 'lit-element';

class GetData extends LitElement {

    static get properties() {
        return {
          url: { type: String },
          metodo: { type: String }
        };
    }

    constructor() {
        super();
    }

    firstUpdated(){
        this.getData();
    }

    _sendData(data){
        this.dispatchEvent(new CustomEvent('ApiData', { 
            detail: {data},bubbles:true,composed:true
        }));
    }
    
    getData(){
        fetch(this.url, {method: this.metodo})
        .then((response) => {
            if(response.ok)return response.json();
            return Promise.reject(response);
        })
        .then((data) => {this._sendData(data);})
    }


}

customElements.define('obtener-datos', GetData);