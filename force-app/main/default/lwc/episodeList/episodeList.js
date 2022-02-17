import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe, MessageContext, publish } from 'lightning/messageService';
import SERIES_MESSAGE from '@salesforce/messageChannel/SeriesID__c';
import EPISODE_MESSAGE from '@salesforce/messageChannel/EpisodeID__c';
import GetEpisodeList from '@salesforce/apex/GetEpisode.GetEpisodeList';
import EpiList_message from '@salesforce/messageChannel/EpisodeListRefresh__c';

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
            this.seasons = result;
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
            EpiList_message,
            (message) => {
                this.handleRefresh(message);
            });
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
        this.seriesid = message.seriesid;        
        this.seriesname = message.seriesname;
    }

    handleEpisodeclick(event){
        this.selectedID = event.target.dataset.id;
        const message = {episodeID: this.selectedID};
        publish(this.messageContext, EPISODE_MESSAGE, message);

    }
    handleRefresh(message){
        if(message.action==='refresh'){
        GetEpisodeList({ recordId: message.seriesid })
        .then(data =>{
            let result = JSON.parse(data);
            this.seasons = result;
        })
        .catch(error => {
            this.error = error;
        })
        }
    }
}