import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe, MessageContext, publish } from 'lightning/messageService';
import SERIES_MESSAGE from '@salesforce/messageChannel/SeriesID__c';
import EPISODE_MESSAGE from '@salesforce/messageChannel/EpisodeID__c';
import GetEpisodeList from '@salesforce/apex/GetEpisode.GetEpisodeList';

export default class EpisodeList extends LightningElement {

    subscription = null;
    _seriesid;
    @track seasons;
    @track error;
    
    get seriesid() {
        return this._seriesid;
    }
    set seriesid(value) {
        this._seriesid = value;

        GetEpisodeList({ recordId: value })
        .then(data =>{
            let result = JSON.parse(data);
            console.log('id passed '+ value);
            console.log(data);
            this.seasons = result;
            console.log(result);
        })
        .catch(error => {
            this.error = error;
        })
    }
    _seriesname;
    get seriesname() {
        return this._seriesname;
    }
    set seriesname(value) {
        this._seriesname = value;
    }
    isLoading = false;

    @wire(MessageContext)
    messageContext;
    connectedCallback() {

      this.subscription = subscribe(
          this.messageContext,
          SERIES_MESSAGE,
          (message) => {
              this.handleSeriesPass(message);
          });
    }
    disconnectedCallback() {
      unsubscribe(this.subscription);
      this.subscription = null;
    }
    handleSeriesPass(message) {
        console.log(message);
        this.seriesid = message.seriesid;        
        this.seriesname = message.seriesname;
    }

    handleSeriesclick(event){
        console.log(event.target.dataset.id);
        this.selectedID = event.target.dataset.id;
        const message = {episodeid: this.selectedID};
        console.log('do spakowania: '+JSON.stringify(message));
        publish(this.messageContext, EPISODE_MESSAGE, message);

    }
}