import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SERIES_MESSAGE from '@salesforce/messageChannel/SeriesID__c';
import GetEpisodeID from '@salesforce/apex/GetEpisode.GetEpisodeID';

export default class EpisodeList extends LightningElement {

    subscription = null;
    selectedProductId;
    _seriesid;
    @track episodes;
    @track error;
    
    get seriesid() {
        return this._seriesid;
    }
    set seriesid(value) {
        this._seriesid = value;

        GetEpisodeID({ recordId: value })
        .then(data =>{
            console.log('id passed '+ value);
            this.episodes = data;
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
        this.selectedProductId=null;
    }
}