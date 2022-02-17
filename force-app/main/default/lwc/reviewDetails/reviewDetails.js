import { LightningElement, wire, track } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SERIES_MESSAGE from '@salesforce/messageChannel/SeriesID__c';
import GetReviewDetails from '@salesforce/apex/GetSeries.GetReviewDetails';

export default class ReviewDetails extends LightningElement { _seriesid;
    @track reviews;
    @track error;
    _seriesid;

    get seriesid() {
        return this._seriesid;
    }
    set seriesid(value) {
        this._seriesid = value;

        GetReviewDetails({ recordId: value })
        .then(data =>{
            this.reviews = data;
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
        this.seriesid = message.seriesid;
        if(message.seriesid == null){
            this.showDetails = false;
        }
        else{
            this.showDetails = true;
            
        }  
    }
}