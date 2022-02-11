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
            console.log('id passed '+ value);
            console.log(data);
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
        console.log(message);
        this.seriesid = message.seriesid;
        if(message.seriesid == null){
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