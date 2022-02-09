import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SERIES_MESSAGE from '@salesforce/messageChannel/SeriesID__c';
import GetSeriesDetails from '@salesforce/apex/GetSeries.GetSeriesDetails';

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
            console.log('id passed '+ value);
            console.log(data);
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
    }
}