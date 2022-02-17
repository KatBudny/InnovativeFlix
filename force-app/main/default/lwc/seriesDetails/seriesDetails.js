import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SERIES_MESSAGE from '@salesforce/messageChannel/SeriesID__c';
import GetSeriesDetails from '@salesforce/apex/GetSeries.GetSeriesDetails';
import EpiList_message from '@salesforce/messageChannel/EpisodeListRefresh__c';

export default class SeriesDetails extends LightningElement {

    _seriesid;
    @track series;
    @track error;

    get seriesid() {
        return this._seriesid;
    }
    set seriesid(value) {
        this._seriesid = value;

        GetSeriesDetails({ recordId: value })
        .then(data =>{
            this.series = data;
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
    }
    handleRefresh(message){
        if(message.action==='refresh'){
            GetSeriesDetails({ recordId: message.seriesid })
            .then(data =>{
                this.series = data;
            })
            .catch(error => {
                this.error = error;
            })
        }
    }
}