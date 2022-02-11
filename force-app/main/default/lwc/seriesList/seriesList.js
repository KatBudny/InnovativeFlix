import {LightningElement,api,wire,track} from 'lwc';
import GetSeriesList from '@salesforce/apex/GetSeries.GetSeriesList';
import { subscribe, unsubscribe, MessageContext, publish } from 'lightning/messageService';
import SERIES_MESSAGE from '@salesforce/messageChannel/SeriesID__c';
import EPISODE_MESSAGE from '@salesforce/messageChannel/EpisodeID__c';
import refresh_message from '@salesforce/messageChannel/SeriesRefresh__c';


export default class seriesList extends LightningElement {
    @track multiple = true;
    @track series;
    @wire(MessageContext) messageContext;

    handleSeriesclick(event){        
        console.log(event.target.dataset.name);
        console.log(event.target.dataset.id);
        this.selectedID = event.target.dataset.id;
        this.selectedName = event.target.dataset.name;
        const message = {seriesid: this.selectedID};
        const messageEpi = {episodeID: null};
        console.log('do spakowania: '+JSON.stringify(message));
        publish(this.messageContext, SERIES_MESSAGE, message);
        publish(this.messageContext, EPISODE_MESSAGE, messageEpi);
    }
    @wire(MessageContext)
    messageContext;
    connectedCallback() {
        GetSeriesList()
        .then(data =>{
            console.log(data);
            this.series = data;
        })
        .catch(error => {
            this.error = error;
            console.log('error ' +error);
        })

      this.subscription = subscribe(
          this.messageContext,
          refresh_message,
          (message) => {
              this.handleRefresh(message);
          });
    }
    disconnectedCallback() {
      unsubscribe(this.subscription);
      this.subscription = null;
    }
 
    handleRefresh(message) {
        console.log('wchodzi w metode handle')
        if(message.action==='refresh'){
            GetSeriesList()
            .then(data =>{
                console.log(data);
                this.series = data;
            })
            .catch(error => {
                this.error = error;
                console.log('error ' +error);
            })
        }

    }
}