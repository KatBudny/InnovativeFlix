import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import EPISODE_MESSAGE from '@salesforce/messageChannel/EpisodeID__c';
import GetEpisodeDetails from '@salesforce/apex/GetEpisode.GetEpisodeDetails';

export default class EpisodeDetails extends LightningElement {

    _episodeID;
    @track episode;
    @track error;
    @track showDetails;

    get episodeID() {
        return this._episodeID;
    }
    set episodeID(value) {
        this._episodeID = value;

        GetEpisodeDetails({ recordId: value })
        .then(data =>{
            console.log('id passed '+ value);
            console.log('episod odebrany');
            console.log(data);
            this.episode = data;
        })
        .catch(error => {
            this.error = error;
        })
    }

    @wire(MessageContext)
    messageContext;
    connectedCallback() {
      this.subscription = subscribe(
          this.messageContext,
          EPISODE_MESSAGE,
          (message) => {
              this.handleEpisodePass(message);
          });
    }
    disconnectedCallback() {
      unsubscribe(this.subscription);
      this.subscription = null;
    }
    handleEpisodePass(message) {
        console.log(message);
        this.episodeID = message.episodeID;
        if(message.episodeID == null){
            console.log('chowa')
            this.showDetails = false;
        }
        else{
            console.log('odkrywa')
            this.showDetails = true;
            
        }
        console.log(showDetails).value;

    }
}